export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/60 text-white/60">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} LeeYeongjae. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-white" href="mailto:you@example.com">Email</a>
            <a className="hover:text-white" href="https://github.com/yj901010" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="hover:text-white" href="/privacy">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
