import { Github } from "lucide-react";
import type { ProfileData } from "./types";

export const PROFILE: ProfileData = {
  name: "Lee Yeongjae",
  title: "Backend Developer",
  subtitle: "Spring Boot · FastAPI · GCP · AWS · Kafka · Redis",
  avatar: "/info/leeyj.jpg",
  email: "joker901010@gmail.com",
  phone: "+82 10-6515-0987", 
  links: [
    {
      label: "View Profile",
      href: "https://github.com/yj901010",
      icon: Github,
    },
  ],
};
