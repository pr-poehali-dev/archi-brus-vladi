import { useState, useEffect } from "react";

const AREAS = [40, 60, 80, 100, 120, 150, 180, 200];

const FLOORS = [
  { label: "Одноэтажный", value: 1, mult: 1 },
  { label: "Полутора этажный", value: 1.5, mult: 1.35 },
  { label: "Двухэтажный", value: 2, mult: 1.6 },
];

const KITS = [
  {
    id: "standard",
    name: "Стандарт",
    desc: "Домокомплект под ключ: брус, стропила, окна, двери",
    basePrice: 55000,
    color: "#2C5E50",
  },
  {
    id: "comfort",
    name: "Комфорт",
    desc: "Стандарт + утепление, фасад, черновая отделка внутри",
    basePrice: 82000,
    color: "#1A3C34",
  },
  {
    id: "premium",
    name: "Премиум",
    desc: "Комфорт + чистовая отделка, сантехника, электрика",
    basePrice: 115000,
    color: "#0f2420",
  },
];

const EXTRAS = [
  { id: "terrace", label: "Терраса / веранда", price: 180000 },
  { id: "garage", label: "Гараж или навес", price: 250000 },
  { id: "sauna", label: "Баня в комплекте", price: 320000 },
  { id: "foundation", label: "Фундамент под ключ", price: 420000 },
];

function formatPrice(n: number) {
  return n.toLocaleString("ru-RU") + " ₽";
}

export default function Calculator({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [area, setArea] = useState(80);
  const [floor, setFloor] = useState(FLOORS[0]);
  const [kit, setKit] = useState(KITS[1]);
  const [extras, setExtras] = useState<string[]>([]);
  const [price, setPrice] = useState(0);
  const [animPrice, setAnimPrice] = useState(0);
  const [step, setStep] = useState(1);

  const toggleExtra = (id: string) => {
    setExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  useEffect(() => {
    const base = area * kit.basePrice * floor.mult;
    const extrasTotal = EXTRAS.filter(e => extras.includes(e.id)).reduce((s, e) => s + e.price, 0);
    setPrice(Math.round(base + extrasTotal));
  }, [area, floor, kit, extras]);

  useEffect(() => {
    const diff = price - animPrice;
    if (diff === 0) return;
    const step = Math.ceil(Math.abs(diff) / 20);
    const timer = setTimeout(() => {
      setAnimPrice(prev => {
        if (Math.abs(price - prev) <= step) return price;
        return prev + (diff > 0 ? step : -step);
      });
    }, 16);
    return () => clearTimeout(timer);
  }, [price, animPrice]);

  const progress = ((step - 1) / 3) * 100;

  return (
    <section id="calculator" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f2420 0%, #1A3C34 50%, #2C5E50 100%)" }}>
      {/* bg decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #D4AF37, transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #D4AF37, transparent)" }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #D4AF37 40px, #D4AF37 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #D4AF37 40px, #D4AF37 41px)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Онлайн-калькулятор</span>
            <div className="w-8 h-px bg-[#D4AF37]" />
          </div>
          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-white mb-4">
            Узнайте стоимость <span className="text-[#D4AF37]">вашего дома</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Выберите параметры — и за 30 секунд получите примерную стоимость вашего домокомплекта
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => setStep(s)}
                className={`w-9 h-9 rounded-full text-sm font-bold transition-all duration-300 border-2 ${step >= s ? "bg-[#D4AF37] border-[#D4AF37] text-[#1A3C34]" : "bg-transparent border-white/30 text-white/40"}`}
              >
                {s}
              </button>
              {s < 3 && <div className={`w-16 h-0.5 transition-all duration-500 ${step > s ? "bg-[#D4AF37]" : "bg-white/20"}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left — steps */}
          <div className="lg:col-span-3 space-y-4">

            {/* Step 1 — Area */}
            <div
              className={`rounded-2xl border transition-all duration-400 overflow-hidden ${step === 1 ? "border-[#D4AF37]/60 bg-white/5" : "border-white/10 bg-white/[0.02]"}`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setStep(1)}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step === 1 ? "bg-[#D4AF37] text-[#1A3C34]" : "bg-white/10 text-white/60"}`}>1</span>
                  <span className="text-white font-semibold text-lg">Площадь дома</span>
                </div>
                <span className="text-[#D4AF37] font-bold">{area} кв.м</span>
              </button>
              {step === 1 && (
                <div className="px-5 pb-6">
                  <div className="grid grid-cols-4 gap-2 mb-5">
                    {AREAS.map(a => (
                      <button
                        key={a}
                        onClick={() => setArea(a)}
                        className={`py-3 rounded-xl text-sm font-bold transition-all duration-200 border ${area === a ? "bg-[#D4AF37] border-[#D4AF37] text-[#1A3C34] scale-105 shadow-lg" : "bg-white/5 border-white/20 text-white/70 hover:border-[#D4AF37]/50 hover:text-white"}`}
                      >
                        {a} м²
                      </button>
                    ))}
                  </div>
                  <input
                    type="range"
                    min={40} max={200} step={5}
                    value={area}
                    onChange={e => setArea(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                  <div className="flex justify-between text-white/40 text-xs mt-1">
                    <span>40 м²</span><span>200 м²</span>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="mt-5 w-full bg-[#D4AF37] hover:bg-[#c49e2e] text-[#1A3C34] font-bold py-3 rounded-xl transition-all hover:scale-[1.02]"
                  >
                    Далее →
                  </button>
                </div>
              )}
            </div>

            {/* Step 2 — Floors */}
            <div
              className={`rounded-2xl border transition-all duration-400 overflow-hidden ${step === 2 ? "border-[#D4AF37]/60 bg-white/5" : "border-white/10 bg-white/[0.02]"}`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setStep(2)}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step === 2 ? "bg-[#D4AF37] text-[#1A3C34]" : step > 2 ? "bg-[#D4AF37] text-[#1A3C34]" : "bg-white/10 text-white/60"}`}>2</span>
                  <span className="text-white font-semibold text-lg">Этажность</span>
                </div>
                <span className="text-[#D4AF37] font-bold">{floor.label}</span>
              </button>
              {step === 2 && (
                <div className="px-5 pb-6 space-y-3">
                  {FLOORS.map(f => (
                    <button
                      key={f.value}
                      onClick={() => setFloor(f)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${floor.value === f.value ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-white/15 bg-white/[0.03] hover:border-white/30"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${floor.value === f.value ? "border-[#D4AF37]" : "border-white/30"}`}>
                          {floor.value === f.value && <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />}
                        </div>
                        <span className="text-white font-medium">{f.label}</span>
                      </div>
                      {f.mult > 1 && (
                        <span className="text-white/40 text-xs">+{Math.round((f.mult - 1) * 100)}% к цене</span>
                      )}
                    </button>
                  ))}
                  <button
                    onClick={() => setStep(3)}
                    className="mt-2 w-full bg-[#D4AF37] hover:bg-[#c49e2e] text-[#1A3C34] font-bold py-3 rounded-xl transition-all hover:scale-[1.02]"
                  >
                    Далее →
                  </button>
                </div>
              )}
            </div>

            {/* Step 3 — Kit + Extras */}
            <div
              className={`rounded-2xl border transition-all duration-400 overflow-hidden ${step === 3 ? "border-[#D4AF37]/60 bg-white/5" : "border-white/10 bg-white/[0.02]"}`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setStep(3)}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step === 3 ? "bg-[#D4AF37] text-[#1A3C34]" : "bg-white/10 text-white/60"}`}>3</span>
                  <span className="text-white font-semibold text-lg">Комплектация</span>
                </div>
                <span className="text-[#D4AF37] font-bold">{kit.name}</span>
              </button>
              {step === 3 && (
                <div className="px-5 pb-6">
                  <div className="space-y-3 mb-6">
                    {KITS.map(k => (
                      <button
                        key={k.id}
                        onClick={() => setKit(k)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${kit.id === k.id ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-white/15 bg-white/[0.03] hover:border-white/30"}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${kit.id === k.id ? "border-[#D4AF37]" : "border-white/30"}`}>
                              {kit.id === k.id && <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />}
                            </div>
                            <div>
                              <div className="text-white font-bold">{k.name}</div>
                              <div className="text-white/50 text-xs mt-0.5">{k.desc}</div>
                            </div>
                          </div>
                          <span className="text-[#D4AF37] text-sm font-bold whitespace-nowrap">от {formatPrice(k.basePrice)}/м²</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Дополнительно</p>
                    <div className="grid grid-cols-2 gap-2">
                      {EXTRAS.map(e => (
                        <button
                          key={e.id}
                          onClick={() => toggleExtra(e.id)}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 ${extras.includes(e.id) ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-white/15 bg-white/[0.03] hover:border-white/30"}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${extras.includes(e.id) ? "bg-[#D4AF37] border-[#D4AF37]" : "border-white/30"}`}>
                              {extras.includes(e.id) && <span className="text-[#1A3C34] text-xs font-bold">✓</span>}
                            </div>
                            <span className="text-white text-xs font-medium leading-tight">{e.label}</span>
                          </div>
                          <span className="text-[#D4AF37] text-xs ml-6">+{formatPrice(e.price)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right — Price card */}
          <div className="lg:col-span-2 sticky top-24">
            <div className="rounded-2xl border border-[#D4AF37]/40 overflow-hidden" style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))" }}>
              <div className="p-6 border-b border-white/10">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Примерная стоимость</p>
                <div className="font-cormorant text-4xl font-bold text-[#D4AF37] transition-all duration-200 tabular-nums">
                  {formatPrice(animPrice)}
                </div>
                <p className="text-white/40 text-xs mt-2">* Итоговая цена уточняется после замеров и выбора материалов</p>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Площадь</span>
                  <span className="text-white font-medium">{area} кв.м</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Этажность</span>
                  <span className="text-white font-medium">{floor.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Комплектация</span>
                  <span className="text-white font-medium">{kit.name}</span>
                </div>
                {extras.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Доп. опции</span>
                    <span className="text-white font-medium">{extras.length} шт.</span>
                  </div>
                )}
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between">
                  <span className="text-white/70 font-medium">Итого:</span>
                  <span className="text-[#D4AF37] font-bold text-lg">{formatPrice(animPrice)}</span>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-3">
                <button
                  onClick={() => scrollTo("form")}
                  className="w-full bg-[#D4AF37] hover:bg-[#c49e2e] text-[#1A3C34] font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg text-base"
                >
                  Получить точный расчёт
                </button>
                <a
                  href="https://wa.me/79242467120"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-white/20 hover:border-[#D4AF37]/50 text-white/80 hover:text-white py-3 rounded-xl transition-all text-sm font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
                    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.785 6.86L2 30l7.34-1.762A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.29 19.93c-.344-.172-2.035-1.004-2.35-1.118-.316-.115-.546-.172-.776.172-.23.344-.889 1.118-1.09 1.348-.2.23-.4.258-.745.086-.344-.172-1.452-.535-2.767-1.708-1.022-.913-1.712-2.04-1.912-2.384-.2-.344-.021-.53.15-.702.154-.154.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.603-.086-.172-.776-1.87-1.063-2.562-.28-.672-.564-.58-.776-.59l-.66-.012c-.23 0-.603.086-.918.43-.316.344-1.205 1.177-1.205 2.87s1.234 3.33 1.406 3.56c.172.23 2.428 3.71 5.882 5.204.823.355 1.465.567 1.965.726.826.263 1.578.226 2.172.137.662-.099 2.035-.832 2.322-1.635.287-.803.287-1.491.2-1.635-.086-.143-.316-.23-.66-.402z"/>
                  </svg>
                  Написать в WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[["127+", "домов построено"], ["8 лет", "на рынке"], ["100%", "фиксированная цена"]].map(([val, lbl]) => (
                <div key={lbl} className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="font-cormorant text-2xl font-bold text-[#D4AF37]">{val}</div>
                  <div className="text-white/40 text-xs mt-0.5 leading-tight">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
