import type { Profile } from "../types/profile";

export const profiles: Profile[] = [
  { id: "test",  name: "테스터", role: "Backend 개발자", avatarBg: "from-red-500 to-red-700",   emoji: "😎" },
  { id: "guest", name: "GUEST",  role: "Viewer",        avatarBg: "from-slate-500 to-slate-700", emoji: "🥸" },
];

export function getProfileById(id: string): Profile | undefined {
  return profiles.find((p) => p.id === id);
}
