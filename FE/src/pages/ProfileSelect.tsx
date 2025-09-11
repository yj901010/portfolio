import { motion } from "framer-motion";
import type { Profile } from "../types/profile";
import { useNavigate } from "react-router-dom";

const profiles: Profile[] = [
  { id: "test", name: "테스터", role: "Backend", avatarBg: "from-red-500 to-red-700", emoji: "😎" },
  { id: "guest", name: "GUEST", role: "Viewer", avatarBg: "from-slate-500 to-slate-700", emoji: "🥸" },
];

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
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          >
            <motion.div
              className={`relative aspect-square w-full rounded-md md:rounded-lg overflow-hidden bg-gradient-to-br ${p.avatarBg}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl select-none">
                {p.emoji}
              </div>
              <div className="absolute inset-0 ring-4 ring-transparent group-hover:ring-neutral-200 transition-all duration-200" />
            </motion.div>

            <div className="text-sm md:text-lg font-medium text-neutral-400 group-hover:text-neutral-100 transition-colors">
              {p.name}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.button 
        className="mt-20 px-6 py-2 border border-neutral-600 text-neutral-400 hover:border-neutral-200 hover:text-neutral-200 transition-colors"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        프로필 관리
      </motion.button>
    </div>
  );
}