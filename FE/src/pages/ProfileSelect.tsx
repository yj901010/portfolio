import { motion } from "framer-motion";
import type { Profile } from "../types/profile";
import { useNavigate } from "react-router-dom";

const profiles: Profile[] = [
  { id: "test", name: "테스터", role: "Backend", avatarBg: "from-red-500 to-red-700" },
  { id: "guest", name: "GUEST", role: "Viewer", avatarBg: "from-slate-500 to-slate-700" },
];

export default function ProfileSelect() {
  const nav = useNavigate();
  const enter = (p: Profile) => nav(`/portfolio/${p.id}`);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-semibold mb-10 tracking-wide">누가 보고 있나요?</h1>

      <div className="grid grid-cols-2 gap-8 w-full max-w-2xl px-6">
        {profiles.map((p) => (
          <motion.button
            key={p.id}
            onClick={() => enter(p)}
            className="group relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${p.avatarBg}`} />
            
            <div className="absolute inset-0 flex items-center justify-center text-5xl font-black select-none opacity-90">
              {p.name.slice(0, 1)}
            </div>

            <div className="absolute inset-0 ring-0 ring-red-500/0 group-hover:ring-4 group-hover:ring-red-500/60 transition-all" />

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm">
              <div className="text-lg font-semibold">{p.name}</div>
              <div className="text-xs text-neutral-300">{p.role}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-10 text-neutral-400 text-sm">프로필은 이후에 더 추가/편집할 수 있어요.</div>
    </div>
  );
}
