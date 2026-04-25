import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Vote } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/', badge: null },
    { label: 'Process', to: '/process', badge: null },
    { label: 'Assistant', to: '/assistant', badge: null },
    { label: 'About', to: '#', badge: null },
  ];

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f0f0]">
      {/* ── NAVBAR ── */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-6 pt-4 pb-2 pointer-events-none">
        <div
          className={`
            pointer-events-auto w-full max-w-3xl
            bg-white rounded-full
            flex items-center justify-between gap-1 px-2 py-2
            transition-all duration-300
            ${scrolled
              ? 'shadow-[0_4px_24px_rgba(0,0,0,0.12)]'
              : 'shadow-[0_2px_14px_rgba(0,0,0,0.08)]'}
          `}
        >
          {/* Logo pill — left edge */}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors no-underline"
            aria-label="ElectWise Home"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
              <Vote size={13} className="text-white" />
            </div>
            <span className="text-[14px] font-bold text-gray-900 tracking-tight hidden sm:block">
              ElectWise
            </span>
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`
                    relative flex items-center gap-2 px-5 py-2 rounded-full text-[14px] font-semibold
                    transition-all duration-200 no-underline select-none
                    ${active
                      ? 'bg-[#c6f135] text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}
                  `}
                >
                  {link.label}
                  {link.badge !== null && (
                    <span
                      className={`
                        w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center
                        ${active ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'}
                      `}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-2">
            <Link
              to="/assistant"
              className="hidden sm:flex items-center px-5 py-2 bg-gray-900 text-white text-[13px] font-bold rounded-full hover:bg-gray-800 transition-colors no-underline"
            >
              Try AI →
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="pointer-events-auto absolute top-[72px] left-6 right-6 bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    flex items-center gap-2 px-4 py-3 rounded-2xl text-[14px] font-semibold
                    transition-colors no-underline
                    ${active
                      ? 'bg-[#c6f135] text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="h-px bg-gray-100 my-1" />
            <Link
              to="/assistant"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center px-4 py-3 bg-gray-900 text-white text-[14px] font-bold rounded-2xl no-underline"
            >
              Try AI Assistant →
            </Link>
          </div>
        )}
      </header>

      {/* ── PAGE CONTENT ── */}
      <main className="flex-1 w-full pt-0">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                  <Vote size={14} className="text-white" />
                </div>
                <span className="font-bold text-gray-900">ElectWise</span>
              </div>
              <p className="text-sm text-gray-400 max-w-[240px] leading-relaxed">
                Empowering citizens to navigate the election process with confidence.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              {[
                { title: 'Product', links: ['Features', 'Assistant', 'Process Guide', 'Timeline'] },
                { title: 'Resources', links: ['Documentation', 'Blog', 'FAQ', 'Support'] },
                { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Accessibility'] },
              ].map((col) => (
                <div key={col.title}>
                  <div className="font-bold text-gray-900 mb-3">{col.title}</div>
                  {col.links.map((l) => (
                    <a key={l} href="#features" className="block text-gray-400 hover:text-violet-600 transition-colors mb-2">
                      {l}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2024 ElectWise. All rights reserved.</p>
            <p className="text-sm text-gray-500">Powered by Google Gemini AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
