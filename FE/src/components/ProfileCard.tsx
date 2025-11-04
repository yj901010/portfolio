import type { ProfileData } from "../assets/types";

export default function ProfileCard({ profile }: { profile: ProfileData }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-neutral-900/80 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
      <div className="absolute -top-8 left-1/2 h-16 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,.15),transparent_60%)] blur-xl" />
      <div className="flex items-start gap-4">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="h-14 w-14 rounded-full object-cover ring-2 ring-white/10"
        />
        <div className="flex-1">
          <div className="font-bold">{profile.name}</div>
          <div className="text-xs text-white/70">{profile.title}</div>
          <div className="mt-1 text-[11px] text-white/60">{profile.subtitle}</div>

          <div className="mt-3 flex flex-wrap gap-2">
            {profile.links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-sm
                           ring-1 ring-white/10 hover:bg-white/20 transition"
              >
                <Icon size={16} className="shrink-0" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
