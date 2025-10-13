import { motion } from "framer-motion";
import type { Profile } from "../types/profile";
import { useNavigate } from "react-router-dom";
import { profiles } from "../assets/profiles";

export default function ProfileSelect() {
  const nav = useNavigate();
  const enter = (p: Profile) => nav(`/portfolio/${p.id}`);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-neutral-200">
      <h1 className="text-3xl md:text-5xl font-semibold mb-16 tracking-wide">누가 보고 있나요?</h1>

      <div className="flex items-start justify-center gap-4 md:gap-8">
        {profiles.map((p) => (
          <motion.div
            key={p.id}
            onClick={() => enter(p)}
            className="group w-24 md:w-36 flex flex-col items-center gap-2 cursor-pointer"
            whileHover={{ y: -4 }}
          >
            <div
              className={`w-24 h-24 md:w-36 md:h-36 rounded-lg bg-gradient-to-br ${p.avatarBg} grid place-items-center text-4xl md:text-6xl`}
            >
              <span>{p.emoji ?? "👤"}</span>
            </div>
            <div className="text-sm md:text-base text-neutral-300 group-hover:text-white transition-colors">
              {p.name}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="mt-20 px-6 py-2 border border-neutral-600 text-neutral-400 rounded hover:border-neutral-200 hover:text-neutral-200 transition-colors"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        프로필 관리
      </motion.button>
    </div>
  );
}
