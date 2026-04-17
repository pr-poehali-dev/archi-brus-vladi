import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface NavbarProps {
  scrollTo: (id: string) => void;
}

export default function Navbar({ scrollTo }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
            <a href="tel:+79242467120" className="text-white font-medium text-sm ml-4 hover:text-[#D4AF37] transition-colors">+7 (924) 246-71-20</a>
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
          <a href="tel:+79242467120" className="text-white/70 mt-4">+7 (924) 246-71-20</a>
        </div>
      )}
    </>
  );
}
