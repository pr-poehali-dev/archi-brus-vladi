import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface NavbarProps {
  scrollTo: (id: string) => void;
}

export default function Navbar({ scrollTo }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPopup(true), 20000);
    return () => clearTimeout(t);
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  const NAV_LINKS = [
    ["catalog", "Проекты"],
    ["features", "Преимущества"],
    ["steps", "Как работаем"],
    ["portfolio", "Портфолио"],
    ["reviews", "Отзывы"],
    ["form", "Консультация"],
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#1A3C34] shadow-xl" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="font-cormorant text-2xl font-bold tracking-wide text-white">
            АРХИ<span className="text-[#D4AF37]">БРУС</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(([id, label]) => (
              <button key={id} onClick={() => handleNav(id)} className="text-white/70 hover:text-[#D4AF37] text-sm tracking-wider transition-colors uppercase">{label}</button>
            ))}
            <a
              href="tel:+79242467120"
              className="flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/50 hover:bg-[#D4AF37]/25 text-[#D4AF37] font-bold text-sm ml-2 px-4 py-2 transition-all hover:scale-105"
            >
              <Icon name="Phone" size={14} className="text-[#D4AF37]" />
              +7 (924) 246-71-20
            </a>
            <button onClick={() => handleNav("form")} className="bg-[#D4AF37] hover:bg-[#c49e2e] text-[#1A3C34] font-semibold text-sm px-5 py-2.5 transition-all hover:scale-105">
              Перезвоните мне
            </button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1A3C34] flex flex-col items-center justify-center gap-10">
          {NAV_LINKS.map(([id, label]) => (
            <button key={id} onClick={() => handleNav(id)} className="font-cormorant text-4xl font-bold text-white hover:text-[#D4AF37] transition-colors">{label}</button>
          ))}
          <a href="tel:+79242467120" className="text-[#D4AF37] font-bold text-xl mt-4 flex items-center gap-2">
            <Icon name="Phone" size={18} />
            +7 (924) 246-71-20
          </a>
        </div>
      )}

      {popup && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center md:justify-end p-4 md:p-8 pointer-events-none">
          <div
            className="pointer-events-auto bg-[#1A3C34] border border-[#D4AF37]/50 shadow-2xl p-6 md:p-8 max-w-sm w-full relative"
            style={{ animation: "slideUp 0.4s ease" }}
          >
            <button
              onClick={() => setPopup(false)}
              className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0">
                <Icon name="Phone" size={18} className="text-[#D4AF37]" />
              </div>
              <p className="text-white font-medium text-sm leading-snug">
                Позвони и запишись<br />на консультацию
              </p>
            </div>
            <a
              href="tel:+79242467120"
              className="block w-full bg-[#D4AF37] hover:bg-[#c49e2e] text-[#1A3C34] font-bold text-center py-3.5 text-lg tracking-wide transition-all hover:scale-[1.02]"
            >
              +7 (924) 246-71-20
            </a>
          </div>
          <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }`}</style>
        </div>
      )}
    </>
  );
}
