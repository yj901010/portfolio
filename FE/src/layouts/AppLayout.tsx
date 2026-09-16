import { Outlet, useLocation } from "react-router-dom";
import AppNav from "../components/AppNav";
import SiteFooter from "../components/SiteFooter";
import ScrollToTop from "../components/ScrollToTop";

export default function AppLayout() {
  const { pathname } = useLocation();
  return (
    <div className="nf-app">
      <a className="nf-skip-link" href="#main-content">
        본문으로 바로가기
      </a>
      <AppNav />
      <main
        id="main-content"
        className={pathname === "/contact" ? "nf-contact-offset" : undefined}
      >
        <ScrollToTop />
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
