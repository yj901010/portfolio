import type { Profile } from "../types/profile";

export const profiles: Profile[] = [
  {
    id: "leeyj",
    name: "이영재",
    role: "Backend",
    avatarBg: "from-red-500 to-red-700",
    emoji: "😎",
  },
];

export function getProfileById(id: string): Profile | undefined {
  return profiles.find((p) => p.id === id);
}

export const PROFILES = profiles;
