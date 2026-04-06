import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HOUSE_IMG = "https://cdn.poehali.dev/projects/6cec83f6-886a-402c-8698-2003e58f639f/files/5226f03f-dfa2-41ff-a569-e74745a1ba10.jpg";
const PLAN_IMG = "https://cdn.poehali.dev/projects/6cec83f6-886a-402c-8698-2003e58f639f/files/c56fc596-896a-4805-9608-689e3d5516ff.jpg";

const PROJECTS = [
  { id: 1, name: "Алтайский кедр", area: 148, floors: 2, price: "4 200 000", tag: "Готово" },
  { id: 2, name: "Северный фьорд", area: 220, floors: 2, price: "6 800 000", tag: "В работе" },
  { id: 3, name: "Берёзовая роща", area: 96, floors: 1, price: "2 900 000", tag: "Готово" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Заявка", desc: "Оставляете контакты — связываемся в течение 2 часов, уточняем задачу" },
  { num: "02", title: "Проект", desc: "Разрабатываем 3D-модель домокомплекта с учётом участка и бюджета" },
  { num: "03", title: "Производство", desc: "Изготавливаем все элементы на заводе с контролем качества" },
  { num: "04", title: "Сборка", desc: "Монтируем дом на вашем участке под ключ за 30–90 дней" },
];

const MATERIALS = [
  { id: "eco", label: "Клееный брус", multiplier: 1.0 },
  { id: "prof", label: "Профилированный брус", multiplier: 0.75 },
  { id: "clt", label: "CLT-панели", multiplier: 1.35 },
  { id: "srub", label: "Оцилиндрованное бревно", multiplier: 0.85 },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [area, setArea] = useState(120);
  const [floors, setFloors] = useState(1);
  const [material, setMaterial] = useState("eco");
  const [extras, setExtras] = useState({ terrace: false, garage: false, bath: false });
  const [menuOpen, setMenuOpen] = useState(false);

  const BASE_PRICE = 28000;
  const mat = MATERIALS.find(m => m.id === material)!;
  let total = area * BASE_PRICE * mat.multiplier * floors * (floors === 2 ? 0.9 : 1);
  if (extras.terrace) total += 250000;
  if (extras.garage) total += 380000;
  if (extras.bath) total += 420000;

  const fmt = (n: number) => Math.round(n).toLocaleString("ru-RU");

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-golos overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5">
        <div className="font-oswald text-2xl font-black tracking-widest text-white">
          АРХИ<span className="text-[#ff4d00]">БРУС</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wider text-white/60">
          {[["projects","ПРОЕКТЫ"],["about","О НАС"],["process","ПРОЦЕСС"],["calculator","КАЛЬКУЛЯТОР"],["contacts","КОНТАКТЫ"]].map(([id,label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="hover:text-[#ff4d00] transition-colors">{label}</button>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8">
          {[["projects","ПРОЕКТЫ"],["about","О НАС"],["process","ПРОЦЕСС"],["calculator","КАЛЬКУЛЯТОР"],["contacts","КОНТАКТЫ"]].map(([id,label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="font-oswald text-4xl font-bold tracking-widest hover:text-[#ff4d00] transition-colors">{label}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 pt-24 px-6 md:px-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HOUSE_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 to-transparent" />

        <div className="absolute top-0 left-0 w-1 h-full bg-[#ff4d00]" />

        <div className="relative z-10 max-w-5xl">
          <div className="inline-block bg-[#ff4d00] text-white text-xs font-bold tracking-[0.3em] px-4 py-2 mb-6 uppercase">
            Домокомплекты из дерева
          </div>
          <h1 className="font-oswald text-6xl md:text-[9vw] font-black leading-none tracking-tight uppercase mb-6">
            Дом,<br />
            <span className="[text-stroke:2px_white] [-webkit-text-stroke:2px_white] text-transparent">который</span><br />
            живёт
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-lg mb-10 font-light leading-relaxed">
            Проектируем и производим домокомплекты из клееного бруса. Сборка за 30–90 дней.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("calculator")}
              className="bg-[#ff4d00] hover:bg-[#e64400] text-white font-oswald font-bold text-lg tracking-widest px-10 py-4 uppercase transition-all hover:scale-105"
            >
              Рассчитать стоимость
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className="border border-white/30 hover:border-white text-white font-oswald font-bold text-lg tracking-widest px-10 py-4 uppercase transition-all hover:bg-white/5"
            >
              Смотреть проекты
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-16 grid grid-cols-3 gap-0 border-t border-white/10 pt-8 max-w-xl">
          {[["150+","проектов"],["30","дней монтаж"],["10 лет","гарантия"]].map(([val, label]) => (
            <div key={label} className="pr-8">
              <div className="font-oswald text-3xl font-black text-[#ff4d00]">{val}</div>
              <div className="text-white/40 text-xs uppercase tracking-wider mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 md:px-16">
        <AnimSection>
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="text-[#ff4d00] text-xs font-bold tracking-[0.4em] uppercase mb-3">— Наши работы</div>
              <h2 className="font-oswald text-5xl md:text-7xl font-black uppercase leading-none">
                Проекты
              </h2>
            </div>
            <div className="hidden md:block w-24 h-px bg-[#ff4d00]" />
          </div>
        </AnimSection>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <AnimSection key={p.id}>
              <div
                className="group relative overflow-hidden bg-[#141414] border border-white/5 hover:border-[#ff4d00]/50 transition-all duration-500 cursor-pointer"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={HOUSE_IMG}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`text-xs font-bold tracking-wider px-3 py-1 ${p.tag === "Готово" ? "bg-[#ff4d00] text-white" : "bg-white/10 border border-white/20 text-white"}`}>
                    {p.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-oswald text-2xl font-bold uppercase mb-2">{p.name}</h3>
                  <div className="flex gap-4 text-white/40 text-sm mb-4">
                    <span>{p.area} м²</span>
                    <span>{p.floors} эт.</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-oswald text-xl font-black text-[#ff4d00]">от {p.price} ₽</span>
                    <Icon name="ArrowRight" size={20} className="text-white/20 group-hover:text-[#ff4d00] transition-colors" />
                  </div>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-16 bg-[#ff4d00] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -left-10 -bottom-10 w-64 h-64 rounded-full bg-black/10" />

        <AnimSection className="relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-white/60 text-xs font-bold tracking-[0.4em] uppercase mb-3">— О компании</div>
              <h2 className="font-oswald text-5xl md:text-7xl font-black uppercase leading-none text-white mb-8">
                О нас
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                АРХИБРУС — производитель домокомплектов из массива дерева с 2014 года. Мы работаем по всей России: от Калининграда до Владивостока.
              </p>
              <p className="text-white/70 leading-relaxed">
                Собственное производство в Сибири, авторские проекты и жёсткий контроль на каждом этапе — от выбора леса до сдачи объекта.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[["2014", "год основания"],["500+","довольных семей"],["3", "завода"],["100%","своё производство"]].map(([val, label]) => (
                <div key={label} className="bg-black/10 p-6">
                  <div className="font-oswald text-4xl font-black text-white mb-1">{val}</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimSection>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 px-6 md:px-16">
        <AnimSection>
          <div className="mb-16">
            <div className="text-[#ff4d00] text-xs font-bold tracking-[0.4em] uppercase mb-3">— Как мы работаем</div>
            <h2 className="font-oswald text-5xl md:text-7xl font-black uppercase leading-none">
              Процесс
            </h2>
          </div>
        </AnimSection>

        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-white/10" />
          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((s, i) => (
              <AnimSection key={s.num}>
                <div className="relative" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#ff4d00] flex items-center justify-center flex-shrink-0">
                      <span className="font-oswald text-xl font-black text-white">{s.num}</span>
                    </div>
                    <div className="h-px flex-1 bg-white/10 md:hidden" />
                  </div>
                  <h3 className="font-oswald text-2xl font-bold uppercase mb-3">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 px-6 md:px-16 bg-[#111]">
        <AnimSection>
          <div className="mb-16">
            <div className="text-[#ff4d00] text-xs font-bold tracking-[0.4em] uppercase mb-3">— Интерактивный расчёт</div>
            <h2 className="font-oswald text-5xl md:text-7xl font-black uppercase leading-none">
              Калькулятор
            </h2>
          </div>
        </AnimSection>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl">
          <AnimSection>
            <div className="space-y-8">
              {/* Area */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-white/60 text-sm uppercase tracking-wider font-medium">Площадь дома</label>
                  <span className="font-oswald text-3xl font-black text-[#ff4d00]">{area} м²</span>
                </div>
                <input
                  type="range" min={50} max={500} value={area}
                  onChange={e => setArea(+e.target.value)}
                  className="w-full accent-[#ff4d00] cursor-pointer"
                />
                <div className="flex justify-between text-white/20 text-xs mt-1">
                  <span>50 м²</span><span>500 м²</span>
                </div>
              </div>

              {/* Floors */}
              <div>
                <label className="text-white/60 text-sm uppercase tracking-wider font-medium block mb-3">Этажность</label>
                <div className="flex gap-3">
                  {[1, 2].map(f => (
                    <button
                      key={f}
                      onClick={() => setFloors(f)}
                      className={`flex-1 py-4 font-oswald font-bold text-xl uppercase tracking-wider border transition-all ${floors === f ? "bg-[#ff4d00] border-[#ff4d00] text-white" : "border-white/10 text-white/40 hover:border-white/30"}`}
                    >
                      {f} этаж{f === 2 ? "а" : ""}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <label className="text-white/60 text-sm uppercase tracking-wider font-medium block mb-3">Материал</label>
                <div className="grid grid-cols-2 gap-3">
                  {MATERIALS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setMaterial(m.id)}
                      className={`py-3 px-4 text-sm font-medium border text-left transition-all ${material === m.id ? "bg-[#ff4d00] border-[#ff4d00] text-white" : "border-white/10 text-white/40 hover:border-white/30"}`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extras */}
              <div>
                <label className="text-white/60 text-sm uppercase tracking-wider font-medium block mb-3">Дополнения</label>
                <div className="space-y-2">
                  {([["terrace","Терраса","+ 250 000 ₽"],["garage","Гараж","+ 380 000 ₽"],["bath","Баня","+ 420 000 ₽"]] as const).map(([key, label, price]) => (
                    <button
                      key={key}
                      onClick={() => setExtras(e => ({ ...e, [key]: !e[key] }))}
                      className={`w-full flex items-center justify-between py-3 px-4 border transition-all ${extras[key] ? "bg-[#ff4d00]/10 border-[#ff4d00]" : "border-white/10 hover:border-white/20"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 ${extras[key] ? "bg-[#ff4d00] border-[#ff4d00]" : "border-white/20"}`}>
                          {extras[key] && <Icon name="Check" size={12} />}
                        </div>
                        <span className="text-sm font-medium text-white">{label}</span>
                      </div>
                      <span className="text-[#ff4d00] text-sm font-bold">{price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </AnimSection>

          {/* Result */}
          <AnimSection>
            <div className="sticky top-28">
              <div className="bg-[#0a0a0a] border border-white/10 p-8">
                <div className="text-white/40 text-xs uppercase tracking-wider mb-2">Предварительная стоимость</div>
                <div className="font-oswald text-5xl md:text-6xl font-black text-[#ff4d00] mb-1">
                  {fmt(total)} ₽
                </div>
                <div className="text-white/30 text-sm mb-8">
                  ≈ {fmt(total / area)} ₽ / м²
                </div>

                <div className="space-y-3 mb-8 border-t border-white/5 pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Площадь</span>
                    <span className="text-white">{area} м²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Этажей</span>
                    <span className="text-white">{floors}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Материал</span>
                    <span className="text-white">{mat.label}</span>
                  </div>
                  {extras.terrace && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Терраса</span>
                      <span className="text-[#ff4d00]">+250 000 ₽</span>
                    </div>
                  )}
                  {extras.garage && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Гараж</span>
                      <span className="text-[#ff4d00]">+380 000 ₽</span>
                    </div>
                  )}
                  {extras.bath && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Баня</span>
                      <span className="text-[#ff4d00]">+420 000 ₽</span>
                    </div>
                  )}
                </div>

                <div className="text-white/20 text-xs mb-6 leading-relaxed">
                  * Расчёт предварительный. Точная стоимость определяется после проектирования.
                </div>

                <button
                  onClick={() => scrollTo("contacts")}
                  className="w-full bg-[#ff4d00] hover:bg-[#e64400] text-white font-oswald font-bold text-lg tracking-widest py-5 uppercase transition-all hover:scale-[1.02]"
                >
                  Получить точный расчёт
                </button>
              </div>

              <div className="mt-4 overflow-hidden opacity-40 hover:opacity-60 transition-opacity">
                <img src={PLAN_IMG} alt="Планировка" className="w-full h-32 object-cover" />
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 md:px-16">
        <AnimSection>
          <div className="mb-16">
            <div className="text-[#ff4d00] text-xs font-bold tracking-[0.4em] uppercase mb-3">— Напишите нам</div>
            <h2 className="font-oswald text-5xl md:text-7xl font-black uppercase leading-none">
              Контакты
            </h2>
          </div>
        </AnimSection>

        <div className="grid md:grid-cols-2 gap-16">
          <AnimSection>
            <div className="space-y-4">
              <input
                type="text" placeholder="Ваше имя"
                className="w-full bg-transparent border border-white/10 focus:border-[#ff4d00] text-white placeholder-white/20 px-6 py-4 outline-none transition-colors"
              />
              <input
                type="tel" placeholder="Телефон"
                className="w-full bg-transparent border border-white/10 focus:border-[#ff4d00] text-white placeholder-white/20 px-6 py-4 outline-none transition-colors"
              />
              <textarea
                rows={4} placeholder="Расскажите о вашем проекте..."
                className="w-full bg-transparent border border-white/10 focus:border-[#ff4d00] text-white placeholder-white/20 px-6 py-4 outline-none transition-colors resize-none"
              />
              <button className="w-full bg-[#ff4d00] hover:bg-[#e64400] text-white font-oswald font-bold text-lg tracking-widest py-5 uppercase transition-all hover:scale-[1.01]">
                Отправить заявку
              </button>
              <p className="text-white/20 text-xs text-center">Отвечаем в течение 2 часов в рабочее время</p>
            </div>
          </AnimSection>

          <AnimSection>
            <div className="space-y-8">
              {[
                { icon: "Phone", label: "Телефон", val: "+7 (800) 555-35-35" },
                { icon: "Mail", label: "Email", val: "info@archibrus.ru" },
                { icon: "MapPin", label: "Производство", val: "Новосибирск, Сибирский тракт, 15" },
                { icon: "Clock", label: "Режим работы", val: "Пн–Пт 9:00–18:00" },
              ].map(({ icon, label, val }) => (
                <div key={label} className="flex gap-5 items-start group">
                  <div className="w-12 h-12 bg-[#ff4d00]/10 border border-[#ff4d00]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff4d00] transition-colors">
                    <Icon name={icon} fallback="Phone" size={20} className="text-[#ff4d00] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-white/30 text-xs uppercase tracking-wider mb-1">{label}</div>
                    <div className="text-white font-medium">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-oswald text-xl font-black tracking-widest">
          АРХИ<span className="text-[#ff4d00]">БРУС</span>
        </div>
        <div className="text-white/20 text-xs">© 2024 АРХИБРУС. Все права защищены.</div>
        <div className="flex gap-6 text-white/30 text-xs uppercase tracking-wider">
          <button onClick={() => scrollTo("projects")} className="hover:text-[#ff4d00] transition-colors">Проекты</button>
          <button onClick={() => scrollTo("contacts")} className="hover:text-[#ff4d00] transition-colors">Контакты</button>
        </div>
      </footer>
    </div>
  );
}