"""Render six-second, silent scene-element loops from existing portfolio artwork.

Requires Pillow, numpy, imageio-ffmpeg (offline build-time tools only).
Run: python scripts/render-previews.py --repo .
"""
from pathlib import Path
import argparse
import json
import math
import subprocess
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HERE = Path(__file__).resolve().parent
if (HERE / 'deps').exists():
    sys.path.insert(0, str(HERE / 'deps'))
import imageio_ffmpeg
from paper_motion import texture_from_quad, sheet, quad_geometry

W, H, FPS, SECONDS = 1280, 720, 24, 6
Y, X = np.mgrid[:H, :W].astype(np.float32)
TAU = math.tau
RNG = np.random.default_rng(901010)


def load(path):
    return Image.open(path).convert('RGB').resize((W, H), Image.Resampling.LANCZOS)


def pixels(image):
    return np.asarray(image, dtype=np.float32)


def frame(array):
    return Image.fromarray(np.clip(array, 0, 255).astype(np.uint8))


def gaussian(cx, cy, sx, sy):
    return np.exp(-0.5 * (((X - cx) / sx) ** 2 + ((Y - cy) / sy) ** 2))


def mask_polygon(points, blur=7):
    mask = Image.new('L', (W, H))
    ImageDraw.Draw(mask).polygon(points, fill=255)
    return np.asarray(mask.filter(ImageFilter.GaussianBlur(blur)), dtype=np.float32) / 255



def tlatfarm_renderer(layers):
    base = load(layers / 'tlatfarm-plate.webp')
    drone = Image.open(layers / 'drone.png').convert('RGBA')
    def render(p):
        t = p / TAU
        image = base.convert('RGBA')
        # Approach from the horizon, then pass out to the right. The camera stays fixed.
        width = round(30 + 520 * t*t)
        sprite = drone.resize((width, max(1,round(width * drone.height / drone.width))), Image.Resampling.LANCZOS)
        sprite = sprite.rotate(-3.5 * t*t, Image.Resampling.BICUBIC, expand=True)
        if t < .12:
            sprite.putalpha(sprite.getchannel('A').point(lambda a: round(a * t/.12)))
        cx, cy = 915 + 800 * t**4, 153 + 112 * t*t
        image.alpha_composite(sprite, (round(cx-sprite.width/2),round(cy-sprite.height/2)))
        return image.convert('RGB')
    return render


def rain_renderer(art):
    base = pixels(load(art / 'ssfinder.png'))
    drops = [(float(RNG.uniform(-30, W + 30)), float(RNG.uniform(0, H)), int(RNG.integers(2, 5)),
              int(RNG.integers(11, 28)), int(RNG.integers(20, 65))) for _ in range(145)]
    def render(p):
        image = frame(base).convert('RGBA')
        rain = Image.new('RGBA', (W, H))
        draw = ImageDraw.Draw(rain)
        progress = p / TAU
        for x0, y0, loops, length, alpha in drops:
            yy = (y0 + progress * loops * (H + 60)) % (H + 60) - 30
            xx = x0 - (yy - y0) * .13
            # Roofed foreground is drier; keep the yellow umbrella readable.
            a = alpha if xx < 720 else round(alpha * .5)
            draw.line((xx, yy, xx - length * .13, yy + length), fill=(179, 202, 218, a), width=1)
        return Image.alpha_composite(image, rain).convert('RGB')
    return render


def checkmate_renderer(art):
    base = pixels(load(art / 'checkmate.png'))
    corners = [(724,100),(1098,215),(910,659),(484,478)]
    flat = quad_geometry(corners)
    paper = mask_polygon(corners,18)
    def render(p):
        axis = X + .52*Y
        center = 940 + 145*math.sin(p)
        light = np.exp(-((axis-center)/140)**2)*paper
        shade = np.exp(-((axis-center-200)/85)**2)*paper
        lit = base*(1+.16*light[...,None]-.06*shade[...,None])
        # Only the top-left edge lifts; the pen and lower page remain still.
        lift = 12 * (.5-.5*math.cos(2*p))
        def geometry(u,v):
            x,y=flat(u,v)
            bend=(1-u)**3*(1-v)**5
            return x+lift*.25*bend,y-lift*bend
        # Carry the same window lighting into the moving sheet texture.
        lit_texture=texture_from_quad(lit,corners)
        return frame(sheet(lit,lit_texture,geometry,nx=16,ny=10,shadow=.035*(lift/12)))
    return render


def fairy_renderer(art):
    base = pixels(load(art / 'myfairy.png'))
    falls = mask_polygon([(396,68),(421,69),(442,160),(412,165)],3)
    lantern = gaussian(101,380,42,61)
    cottage = gaussian(1088,134,30,23)
    front = texture_from_quad(base,[(693,245),(1050,199),(1070,550),(665,595)])
    back = texture_from_quad(base,[(693,245),(337,174),(244,497),(665,595)])
    def render(p):
        t=p/TAU
        # Vertical travelling highlights: no horizontal water displacement.
        flow=falls*(2.8*np.sin(Y/6-p*10)+1.8*np.sin(Y/11-p*6))
        flicker=.53+.20*math.sin(p*5)+.12*math.sin(p*9+.4)
        glow=lantern*(flicker*22)+cottage*(5+3*math.sin(p*3))
        scene=base+flow[...,None]+glow[...,None]*np.array([1,.57,.16])
        progress=max(0,min(1,(t-.14)/.65))
        ease=progress*progress*(3-2*progress)
        angle=math.pi*ease
        # A curved paper surface lifts around the book spine, right to left.
        def geometry(u,v):
            theta=angle-.24*math.sin(math.pi*u)*math.sin(angle)
            right=357+48*v
            left=356+65*v
            x=693-28*v+u*((right+left)/2*math.cos(theta)+(right-left)/2)
            resting=-58.5-13*v+(12.5+14*v)*math.cos(theta)
            y=245+350*v+u*resting-u*135*math.sin(theta)
            return x,y
        opacity=min(1,t/.06,max(0,(1-t)/.13))
        texture=front if angle<math.pi/2 else back
        tint=.91+.09*abs(math.cos(angle))
        return frame(sheet(scene,texture,geometry,opacity=opacity,nx=28,ny=8,tint=tint,shadow=.14*math.sin(angle)))
    return render


def khope_renderer(layers):
    document=Image.open(layers/'khope-document.png').convert('RGBA')
    background=Image.new('RGBA',(W,H),'#15252d')
    draw=ImageDraw.Draw(background)
    draw.line((0,174,W,174),fill='#31434c',width=1)
    draw.line((0,545,W,545),fill='#31434c',width=1)
    blank=Image.new('RGBA',document.size,'#9fadaa')
    lines=ImageDraw.Draw(blank)
    for yy in range(160,730,45):
        lines.line((62,yy,440 if yy%90 else 360,yy),fill='#728988',width=2)
    def render(p):
        spread=.5+.5*math.cos(p)
        image=background.copy()
        # Separate research sheets gather into one document, then ease apart.
        placements=[(blank,948-73*spread,387,-11+9*spread),
                    (blank,1040+115*spread,371,-11-9*spread),
                    (document,1089+18*spread,383,-11)]
        for paper,cx,cy,angle in placements:
            sprite=paper.rotate(angle,Image.Resampling.BICUBIC,expand=True)
            shadow=Image.new('RGBA',sprite.size,(0,0,0,0))
            shadow.putalpha(sprite.getchannel('A').point(lambda a:round(a*.24)))
            shadow=shadow.filter(ImageFilter.GaussianBlur(12))
            image.alpha_composite(shadow,(round(cx-sprite.width/2-8),round(cy-sprite.height/2+10)))
            image.alpha_composite(sprite,(round(cx-sprite.width/2),round(cy-sprite.height/2)))
        return image.convert('RGB')
    return render


def encode(name, render, output, samples):
    path = output / f'{name}.mp4'
    command = [imageio_ffmpeg.get_ffmpeg_exe(), '-hide_banner', '-loglevel', 'error', '-y',
               '-f', 'rawvideo', '-vcodec', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}',
               '-r', str(FPS), '-i', '-', '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '23',
               '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '3.1', '-movflags', '+faststart', str(path)]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    try:
        for n in range(FPS * SECONDS):
            image = render(TAU * n / (FPS * SECONDS))
            if samples and n in (0, 36, 72, 108, 143):
                image.save(samples / f'{name}-{n:03}.jpg', quality=90)
            process.stdin.write(image.tobytes())
        process.stdin.close()
        if process.wait() != 0:
            raise RuntimeError(f'FFmpeg failed: {name}')
    except BaseException:
        process.kill()
        process.wait()
        raise
    return {'file': path.name, 'seconds': SECONDS, 'fps': FPS, 'width': W, 'height': H,
            'bytes': path.stat().st_size, 'audio': False}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--repo', type=Path, default=HERE.parent)
    parser.add_argument('--layers', type=Path, default=HERE / 'video-assets')
    parser.add_argument('--output', type=Path)
    parser.add_argument('--samples', type=Path)
    args = parser.parse_args()
    art = args.repo / 'FE/public/artwork'
    output = args.output or args.repo / 'FE/public/videos'
    output.mkdir(parents=True, exist_ok=True)
    if args.samples:
        args.samples.mkdir(parents=True, exist_ok=True)
    renderers = {'khope': khope_renderer(args.layers), 'tlatfarm': tlatfarm_renderer(args.layers),
                 'checkmate': checkmate_renderer(art), 'ssfinder': rain_renderer(art), 'myfairy': fairy_renderer(art)}
    manifest = []
    for name, render in renderers.items():
        result = encode(name, render, output, args.samples)
        manifest.append(result)
        print(json.dumps(result), flush=True)
    (output / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
