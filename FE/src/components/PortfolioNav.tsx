import AppNav from "./AppNav";
import type { Profile } from "../types/profile";

export default function PortfolioNav({ profile }: { profile?: Profile }) {
  return <AppNav profile={profile} />;
}
