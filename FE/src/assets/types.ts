export type CopyKey = "email" | "phone";

export type SocialLink = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

export type ProfileData = {
  name: string;
  title: string;
  subtitle: string;
  avatar: string; // /profile.jpg 등
  email: string;
  phone: string;
  links: SocialLink[];
};
