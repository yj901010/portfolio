
import React from "react";

export default function TopNav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={
      `fixed top-0 inset-x-0 z-50 transition-colors duration-300
       ${scrolled ? "bg-black/90" : "bg-gradient-to-b from-black/80 to-transparent"}`
    }>
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded-sm" />
          <nav className="hidden md:flex items-center gap-5 text-sm">
            <a className="text-white font-semibold" href="#home">Home</a>
            <a className="text-white/80 hover:text-white" href="#tv">TV Shows</a>
            <a className="text-white/80 hover:text-white" href="#movies">Movies</a>
            <a className="text-white/80 hover:text-white" href="#new">New & Popular</a>
            <a className="text-white/80 hover:text-white" href="#list">My List</a>
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button aria-label="Search" className="text-white/90 hover:text-white">🔍</button>
          <button aria-label="Notifications" className="text-white/90 hover:text-white">🔔</button>
          <div className="w-8 h-8 rounded bg-white/20 grid place-items-center text-white">👤</div>
        </div>
      </div>
    </header>
  );
}
