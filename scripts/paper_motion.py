"""Small textured paper mesh used by the offline video renderer."""
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter


def texture_from_quad(base, corners, size=512):
    v, u = np.mgrid[0:1:complex(size), 0:1:complex(size)].astype(np.float32)
    a,b,c,d = [np.array(p,dtype=np.float32) for p in corners]
    xy = ((1-u)*(1-v))[...,None]*a + (u*(1-v))[...,None]*b + (u*v)[...,None]*c + ((1-u)*v)[...,None]*d
    return sample(base,xy[...,0],xy[...,1])


def sample(texture,x,y):
    x=np.clip(x,0,texture.shape[1]-1.001)
    y=np.clip(y,0,texture.shape[0]-1.001)
    ix,iy=x.astype(np.int32),y.astype(np.int32)
    fx,fy=(x-ix)[...,None],(y-iy)[...,None]
    return ((texture[iy,ix]*(1-fx)+texture[iy,ix+1]*fx)*(1-fy)
            +(texture[iy+1,ix]*(1-fx)+texture[iy+1,ix+1]*fx)*fy)


def sheet(base, texture, geometry, opacity=1, nx=24, ny=8, tint=1, shadow=0):
    """Rasterize a curling page; interpolate UVs within small triangles."""
    h,w=base.shape[:2]
    vertices=[]
    for j in range(ny+1):
        row=[]
        for i in range(nx+1):
            u,v=i/nx,j/ny
            x,y=geometry(u,v)
            row.append((x,y,u,v))
        vertices.append(row)
    output=base.copy()
    if shadow>0:
        mask=Image.new('L',(w,h))
        outline=[p[:2] for p in vertices[0]]+[row[-1][:2] for row in vertices[1:]]
        outline += [p[:2] for p in reversed(vertices[-1][:-1])]+[row[0][:2] for row in reversed(vertices[1:-1])]
        ImageDraw.Draw(mask).polygon([(x+2,y+9) for x,y in outline], fill=round(255*shadow*opacity))
        shade=np.asarray(mask.filter(ImageFilter.GaussianBlur(9)),dtype=np.float32)/255
        output*=1-shade[...,None]
    for j in range(ny):
        for i in range(nx):
            a,b,c,d=vertices[j][i],vertices[j][i+1],vertices[j+1][i+1],vertices[j+1][i]
            for points in ((a,b,c),(a,c,d)):
                p=np.array(points,dtype=np.float32)
                x0=max(0,math.floor(p[:,0].min())); x1=min(w,math.ceil(p[:,0].max())+1)
                y0=max(0,math.floor(p[:,1].min())); y1=min(h,math.ceil(p[:,1].max())+1)
                if x1<=x0 or y1<=y0: continue
                yy,xx=np.mgrid[y0:y1,x0:x1].astype(np.float32)
                xA,yA=p[0,:2];xB,yB=p[1,:2];xC,yC=p[2,:2]
                det=(yB-yC)*(xA-xC)+(xC-xB)*(yA-yC)
                if abs(det)<.001: continue
                wa=((yB-yC)*(xx-xC)+(xC-xB)*(yy-yC))/det
                wb=((yC-yA)*(xx-xC)+(xA-xC)*(yy-yC))/det
                wc=1-wa-wb
                inside=(wa>=-.001)&(wb>=-.001)&(wc>=-.001)
                if not inside.any(): continue
                u=wa*p[0,2]+wb*p[1,2]+wc*p[2,2]
                v=wa*p[0,3]+wb*p[1,3]+wc*p[2,3]
                color=sample(texture,u*(texture.shape[1]-1),v*(texture.shape[0]-1))*tint
                region=output[y0:y1,x0:x1]
                region[inside]=region[inside]*(1-opacity)+color[inside]*opacity
    return output


def quad_geometry(corners):
    a,b,c,d=corners
    def point(u,v):
        return tuple((1-u)*(1-v)*a[k]+u*(1-v)*b[k]+u*v*c[k]+(1-u)*v*d[k] for k in (0,1))
    return point
