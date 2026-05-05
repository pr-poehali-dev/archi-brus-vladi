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
    ["calculator", "Калькулятор"],
    ["faq", "Вопросы"],
    ["steps", "Как работаем"],
    ["portfolio", "Портфолио"],
    ["reviews", "Отзывы"],
    ["form", "Консультация"],
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#1A3C34] shadow-xl" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="font-cormorant text-2xl font-bold tracking-wide">
            <span style={{ color: "#00e5cc", textShadow: "0 0 6px #00e5cc, 0 0 16px #00e5cc, 0 0 50px rgba(0,229,204,.5)" }}>АРХИБРУС</span>
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
          <div
            className="pointer-events-auto bg-[#1A3C34] border border-[#D4AF37]/50 shadow-2xl max-w-sm w-full relative overflow-hidden"
            style={{ animation: "slideUp 0.4s ease" }}
          >
            <button
              onClick={() => setPopup(false)}
              className="absolute top-3 right-3 z-10 text-white/60 hover:text-white transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
            <div className="overflow-hidden" style={{ height: "300px" }}>
              <img
                src="https://cdn.poehali.dev/projects/6cec83f6-886a-402c-8698-2003e58f639f/bucket/cb8091d2-9776-4160-9733-7212af80c6ea.png"
                alt="АрхиБрус"
                className="w-full block object-cover object-top"
                style={{ height: "380px" }}
              />
            </div>
            <div className="p-4 flex gap-3">
              <a
                href="tel:+79242467120"
                className="flex-1 bg-[#D4AF37] hover:bg-[#c49e2e] text-[#1A3C34] font-bold text-center py-3 text-base tracking-wide transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Icon name="Phone" size={16} />
                +7 (924) 246-71-20
              </a>
              <a
                href="https://архибрус.рф"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold text-center py-3 text-base tracking-wide transition-all flex items-center justify-center"
              >
                Перейти на сайт
              </a>
            </div>
          </div>
          <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }`}</style>
        </div>
      )}
    </>
  );
}