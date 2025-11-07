import { Outlet } from "react-router-dom";
import AppNav from "../components/AppNav";
import SiteFooter from "../components/SiteFooter";
import ScrollToTop from "../components/ScrollToTop";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <AppNav />
      <main className="pt-2">
        <ScrollToTop />
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
