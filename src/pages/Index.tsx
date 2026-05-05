import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Reveal } from "@/lib/hooks";
import { PROJECTS, FEATURES, STEPS, PORTFOLIO, PORTFOLIO_TABS, REVIEWS } from "@/lib/data";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import LeadForm from "@/components/sections/LeadForm";
import Calculator from "@/components/sections/Calculator";
import Footer from "@/components/sections/Footer";

function PortfolioTabs({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState(PORTFOLIO_TABS[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = PORTFOLIO.filter(p => p.tab === activeTab);
  const item = items[activeIndex];

  const switchTab = (tab: string) => { setActiveTab(tab); setActiveIndex(0); };
  const prev = () => setActiveIndex(i => (i - 1 + items.length) % items.length);
  const next = () => setActiveIndex(i => (i + 1) % items.length);

  return (
    <div>
      <Reveal>
        <div className="flex justify-center gap-3 mt-10 mb-10 flex-wrap">
          {PORTFOLIO_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={`text-sm font-medium px-5 py-2.5 border transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#1A3C34] text-white border-[#1A3C34]"
                  : "bg-transparent text-[#1A3C34] border-[#1A3C34]/30 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Reveal>

      <div key={`${activeTab}-${activeIndex}`} className="grid md:grid-cols-2 gap-0 bg-white shadow-lg overflow-hidden" style={{ animation: "fadeIn 0.35s ease" }}>
        <div className="aspect-[4/3] md:aspect-auto overflow-hidden relative">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A3C34]/10" />
          <div className="absolute bottom-4 left-4 bg-[#1A3C34]/80 text-white text-xs px-3 py-1 font-medium tracking-wider">
            {activeIndex + 1} / {items.length}
          </div>
        </div>
        <div className="p-10 md:p-12 flex flex-col justify-between">
          <div>
            <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-bold border border-[#D4AF37]/30 px-3 py-1 inline-block mb-6">
              {item.label}
            </span>
            <h3 className="font-cormorant text-3xl md:text-4xl font-bold text-[#1A3C34] mb-4">{item.title}</h3>
            <p className="text-[#1A3C34]/65 text-base leading-relaxed mb-8">{item.description}</p>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-[#D4AF37]" />
                <span className="text-[#1A3C34] font-semibold text-sm">Сборка: {item.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-[#D4AF37]" />
                <span className="text-[#1A3C34] font-semibold text-sm">{item.location}</span>
              </div>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
            <button
              onClick={() => scrollTo("form")}
              className="bg-[#D4AF37] hover:bg-[#c49e2e] text-[#1A3C34] font-semibold text-sm px-8 py-4 transition-all hover:scale-105"
            >
              Хочу такой же проект
            </button>
            <div className="flex gap-2">
              <button onClick={prev} className="w-10 h-10 border border-[#1A3C34]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-all text-[#1A3C34]/50">
                <Icon name="ChevronLeft" size={18} />
              </button>
              <button onClick={next} className="w-10 h-10 border border-[#1A3C34]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-all text-[#1A3C34]/50">
                <Icon name="ChevronRight" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`transition-all duration-300 ${i === activeIndex ? "w-8 h-2 bg-[#D4AF37]" : "w-2 h-2 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60"}`}
          />
        ))}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }`}</style>
    </div>
  );
}

function ReviewsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = REVIEWS.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(i => (i + 1) % total), 5000);
    return () => clearInterval(t);
  }, [paused, total]);

  const prev = () => { setPaused(true); setActive(i => (i - 1 + total) % total); };
  const next = () => { setPaused(true); setActive(i => (i + 1) % total); };

  const r = REVIEWS[active];

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative bg-white overflow-hidden min-h-[280px] flex flex-col justify-between p-10 md:p-14 shadow-lg">
        {!paused && (
          <div key={active} className="absolute top-0 left-0 h-[3px] bg-[#D4AF37]" style={{ animation: "progress 5s linear forwards" }} />
        )}

        <div className="flex flex-col gap-6">
          <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-medium border border-[#D4AF37]/30 px-3 py-1 self-start">
            {r.category}
          </span>
          <div className="relative">
            <span className="font-cormorant text-8xl text-[#D4AF37]/15 leading-none absolute -top-4 -left-2 select-none">"</span>
            <p className="text-[#1A3C34]/75 text-base md:text-lg leading-relaxed pt-6 relative z-10 max-w-3xl">{r.text}</p>
          </div>
          <div className="flex items-center gap-3 pt-4 border-t border-[#F4F7F6]">
            <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded-full">
              <img src={r.avatar} alt={r.author} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-cormorant text-lg font-bold text-[#1A3C34]">{r.author}</p>
              <p className="text-[#1A3C34]/40 text-xs">{r.city}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPaused(true); setActive(i); }}
              className={`transition-all duration-300 ${i === active ? "w-8 h-2 bg-[#D4AF37]" : "w-2 h-2 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} className="w-10 h-10 border border-[#1A3C34]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-all text-[#1A3C34]/50">
            <Icon name="ChevronLeft" size={18} />
          </button>
          <button onClick={next} className="w-10 h-10 border border-[#1A3C34]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] flex items-center justify-center transition-all text-[#1A3C34]/50">
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>

      <style>{`@keyframes progress { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}

export default function Index() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-[#1A3C34] font-golos overflow-x-hidden">

      <Navbar scrollTo={scrollTo} />

      <HeroSection scrollTo={scrollTo} />

      {/* ── FEATURES ── */}
      <section id="features" className="py-28 bg-[#1A3C34]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-block w-8 h-px bg-[#D4AF37] mb-4" />
              <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-white mb-4">
                Почему выбирают <em className="text-[#D4AF37] not-italic">АРХИБРУС</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 120}>
                <div className="group border border-white/10 hover:border-[#D4AF37]/50 p-8 transition-all duration-500 hover:bg-[#2C5E50]/30">
                  <div className="text-4xl mb-6">{f.icon}</div>
                  <h3 className="font-cormorant text-2xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{f.description}</p>
                  <div className="mt-6 w-8 h-px bg-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:w-16 transition-all duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section id="catalog" className="py-28 bg-[#F4F7F6]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Каталог</span>
                <div className="w-8 h-px bg-[#D4AF37]" />
              </div>
              <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-[#1A3C34]">
                Популярные проекты
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="group bg-white overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#1A3C34]/20 group-hover:bg-[#1A3C34]/10 transition-colors" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-cormorant text-2xl font-bold text-[#1A3C34] mb-3">{p.title}</h3>
                    <div className="flex gap-3 mb-4">
                      {p.stats.map(s => (
                        <span key={s} className="text-xs bg-[#F4F7F6] text-[#2C5E50] px-3 py-1 font-medium">{s}</span>
                      ))}
                    </div>
                    <p className="text-[#1A3C34]/60 text-sm leading-relaxed mb-5">{p.description}</p>
                    <div className="flex items-center justify-between border-t border-[#F4F7F6] pt-4">
                      <span className="font-cormorant text-2xl font-bold text-[#1A3C34]">{p.price}</span>
                      <button
                        onClick={() => scrollTo("form")}
                        className="text-[#D4AF37] text-sm font-medium hover:text-[#1A3C34] transition-colors flex items-center gap-1"
                      >
                        Узнать детали <Icon name="ArrowRight" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section id="steps" className="py-28 bg-[#2C5E50]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <Reveal>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Процесс</span>
                <div className="w-8 h-px bg-[#D4AF37]" />
              </div>
              <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-white">
                Как мы работаем
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-0">
            {STEPS.map((s, i) => (
              <Reveal key={s.number} delay={i * 100}>
                <div className="relative flex flex-col items-start md:items-center text-left md:text-center px-0 md:px-6 py-8 md:py-0">
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 right-0 h-px bg-[#D4AF37]/20" style={{ width: "calc(100% - 2rem)" }} />
                  )}
                  <div className="relative z-10 w-16 h-16 bg-[#1A3C34] border border-[#D4AF37]/40 flex items-center justify-center mb-5">
                    <span className="font-cormorant text-xl font-bold text-[#D4AF37]">{s.number}</span>
                  </div>
                  <h3 className="font-cormorant text-xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-28 bg-[#F4F7F6]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <Reveal>
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Портфолио</span>
                <div className="w-8 h-px bg-[#D4AF37]" />
              </div>
              <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-[#1A3C34]">
                Реализованные проекты
              </h2>
              <p className="text-[#1A3C34]/50 mt-4 text-base">Наше портфолио по направлениям строительства</p>
            </div>
          </Reveal>

          <PortfolioTabs scrollTo={scrollTo} />
        </div>
      </section>

      <Calculator scrollTo={scrollTo} />

      <LeadForm />

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-28 bg-[#F4F7F6] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Отзывы</span>
                <div className="w-8 h-px bg-[#D4AF37]" />
              </div>
              <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-[#1A3C34]">
                Что говорят наши клиенты
              </h2>
            </div>
          </Reveal>

          <ReviewsCarousel />
        </div>
      </section>

      <Footer scrollTo={scrollTo} />

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://t.me/+79242467120"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-transform hover:scale-110"
          style={{ backgroundColor: "#229ED9" }}
          aria-label="Написать в Telegram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="white">
            <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm6.894 9.373-2.37 11.168c-.175.787-.633.979-1.283.609l-3.54-2.608-1.708 1.644c-.189.189-.347.347-.711.347l.254-3.607 6.564-5.929c.285-.254-.062-.395-.444-.141l-8.112 5.108-3.494-1.093c-.76-.238-.775-.76.159-1.124l13.647-5.263c.634-.23 1.188.141.984 1.13-.001-.001-.001 0 0 0z" />
          </svg>
        </a>
        <a
          href="https://wa.me/79242467120"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-transform hover:scale-110"
          style={{ backgroundColor: "#25D366" }}
          aria-label="Написать в WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" fill="white">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.785 6.86L2 30l7.34-1.762A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.54 11.54 0 0 1-5.88-1.605l-.42-.25-4.354 1.046 1.072-4.243-.274-.435A11.56 11.56 0 0 1 4.4 16C4.4 9.59 9.59 4.4 16 4.4S27.6 9.59 27.6 16 22.41 27.6 16 27.6zm6.29-8.67c-.344-.172-2.035-1.004-2.35-1.118-.316-.115-.546-.172-.776.172-.23.344-.889 1.118-1.09 1.348-.2.23-.4.258-.745.086-.344-.172-1.452-.535-2.767-1.708-1.022-.913-1.712-2.04-1.912-2.384-.2-.344-.021-.53.15-.702.154-.154.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.603-.086-.172-.776-1.87-1.063-2.562-.28-.672-.564-.58-.776-.59l-.66-.012c-.23 0-.603.086-.918.43-.316.344-1.205 1.177-1.205 2.87s1.234 3.33 1.406 3.56c.172.23 2.428 3.71 5.882 5.204.823.355 1.465.567 1.965.726.826.263 1.578.226 2.172.137.662-.099 2.035-.832 2.322-1.635.287-.803.287-1.491.2-1.635-.086-.143-.316-.23-.66-.402z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}