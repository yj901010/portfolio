import { Mail, Phone } from "lucide-react";
import PillButton from "../components/PillButton";
import ProfileCard from "../components/ProfileCard";
import { PROFILE } from "../assets/constants";

export default function Contact() {
  return (
    <div className="min-h-[70vh] bg-black text-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto w-full max-w-md">
          <ProfileCard profile={PROFILE} />
        </div>

        <p className="mt-8 text-center text-white/80">
          언제든 편한 방법으로 연락 주세요!
        </p>

        <div className="mt-5 flex flex-col items-center gap-3">
          <PillButton
            icon={<Mail size={16} />}
            label={PROFILE.email}
            href={`mailto:${PROFILE.email}`}
            copyValue={PROFILE.email}
            copyKey="email"
          />
          <PillButton
            icon={<Phone size={16} />}
            label={PROFILE.phone}
            href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
            copyValue={PROFILE.phone}
            copyKey="phone"
          />
        </div>
      </main>
    </div>
  );
}
