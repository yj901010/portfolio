import { useParams, Navigate } from "react-router-dom";
import { getProfileById } from "../assets/profiles";
import PortfolioNav from "../components/PortfolioNav";
import PortfolioHero from "../components/PortfolioHero";
import Row from "../components/Row";
import { buildPortfolioContent } from "../assets/portfolioData";

export default function Portfolio() {
  const { profileId = "" } = useParams();
  const profile = getProfileById(profileId);
  if (!profile) return <Navigate to="/" replace />;

  const { hero, rows } = buildPortfolioContent(profile);

  return (
    <div className="min-h-screen bg-black text-white">
      <PortfolioNav profile={profile} />
      <main className="pt-16">
        <PortfolioHero item={hero} />
        <div className="w-full space-y-10 px-4 md:px-10 mt-4 md:mt-6">
          {rows.map((r) => (
            <Row key={r.id} row={r} />
          ))}
          <footer className="mt-16 pb-20 text-center text-white/40 text-sm">
            <p>© {new Date().getFullYear()} Myflix — Portfolio Browse UI</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
