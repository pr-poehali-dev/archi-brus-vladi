import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80";
const LEADS_URL = "https://functions.poehali.dev/473def77-fbda-41fa-bf71-6f8e7e0cc5a0";

const PROJECTS = [
  {
    title: 'Проект "Приморье-100"',
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    stats: ["📐 102 кв.м", "🛏 3 спальни"],
    description: "Идеален для постоянного проживания семьи из 4 человек. Просторная кухня-гостиная.",
    price: "от 3 500 000 ₽",
  },
  {
    title: 'Проект "Инвест-Модуль"',
    image: "https://images.unsplash.com/photo-1542314831-c53cd4185af1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    stats: ["📐 45 кв.м", "Терраса 15 кв.м"],
    description: "Создан специально для баз отдыха и сдачи в аренду. Окупаемость от 2 лет.",
    price: "от 1 800 000 ₽",
  },
  {
    title: 'Проект "Шале Хасан"',
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    stats: ["📐 150 кв.м", "Второй свет"],
    description: "Премиальное решение с панорамным остеклением и высокими потолками.",
    price: "от 5 200 000 ₽",
  },
];

const FEATURES = [
  {
    icon: "🏭",
    title: "Заводское качество",
    description: "Высокая точность деталей исключает продувание стен и долгую подгонку материалов на строительной площадке.",
  },
  {
    icon: "📝",
    title: "Фиксируемая смета",
    description: "Вы получаете один понятный продукт. Мы фиксируем цену на комплект — никаких скрытых платежей и внезапных удорожаний.",
  },
  {
    icon: "📈",
    title: "Решения для инвесторов",
    description: "Подберем формат домокомплекта для базы отдыха, глэмпинга или арендного бизнеса для быстрого выхода на окупаемость.",
  },
];

const STEPS = [
  { number: "01", title: "Проект и Смета", description: "Выбираем проект, делаем точный расчет до рубля." },
  { number: "02", title: "Договор", description: "Фиксируем сроки, цены и гарантии юридически." },
  { number: "03", title: "Производство", description: "Изготавливаем комплект на заводе за 14–30 дней." },
  { number: "04", title: "Сборка", description: "Доставляем и собираем дом на вашем участке." },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [form, setForm] = useState({ name: "", phone: "", goal: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Пожалуйста, укажите имя и телефон");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(LEADS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
        setForm({ name: "", phone: "", goal: "" });
      } else {
        setError(data.error || "Ошибка отправки");
      }
    } catch {
      setError("Не удалось отправить. Попробуйте позже.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-[#1A3C34] font-golos overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#1A3C34] shadow-xl" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="font-cormorant text-2xl font-bold tracking-wide text-white">
            АРХИ<span className="text-[#D4AF37]">БРУС</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[["catalog","Проекты"],["features","Преимущества"],["steps","Как работаем"],["form","Консультация"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-white/70 hover:text-[#D4AF37] text-sm tracking-wider transition-colors uppercase">{label}</button>
            ))}
            <a href="tel:+79146940560" className="text-white font-medium text-sm ml-4 hover:text-[#D4AF37] transition-colors">+7 (914) 694-05-60</a>
            <button onClick={() => scrollTo("form")} className="bg-[#D4AF37] hover:bg-[#c49e2e] text-[#1A3C34] font-semibold text-sm px-5 py-2.5 transition-all hover:scale-105">
              Перезвоните мне
            </button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1A3C34] flex flex-col items-center justify-center gap-10">
          {[["catalog","Проекты"],["features","Преимущества"],["steps","Как работаем"],["form","Консультация"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="font-cormorant text-4xl font-bold text-white hover:text-[#D4AF37] transition-colors">{label}</button>
          ))}
          <a href="tel:+79146940560" className="text-white/70 mt-4">+7 (914) 694-05-60</a>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="Дом" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1A3C34]/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A3C34]/30 via-transparent to-[#1A3C34]/60" />
        </div>

        {/* Decorative gold line */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-32 pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-[#D4AF37]/40 text-[#D4AF37] text-xs tracking-[0.3em] uppercase px-4 py-2 mb-8">
              <span className="w-4 h-px bg-[#D4AF37]" />
              Владивосток и Дальний Восток
            </div>
            <h1 className="font-cormorant text-5xl md:text-7xl font-bold leading-[1.1] text-white mb-6">
              Дом вашей мечты —<br />
              <em className="text-[#D4AF37] not-italic">за понятные деньги,</em><br />
              в понятные сроки
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-xl mb-10">
              Производим домокомплекты и помогаем пройти весь путь: от выбора проекта до сборки на вашем участке. Без строительного хаоса и растущих смет.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("form")}
                className="bg-[#D4AF37] hover:bg-[#c49e2e] text-[#1A3C34] font-semibold text-base px-8 py-4 transition-all hover:scale-105"
              >
                Рассчитать стоимость
              </button>
              <button
                onClick={() => scrollTo("catalog")}
                className="border border-white/40 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] font-medium text-base px-8 py-4 transition-all"
              >
                Смотреть проекты
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase">
          <span>Листать</span>
          <Icon name="ChevronDown" size={16} className="animate-bounce" />
        </div>
      </section>

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
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">Каталог</span>
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
                  {/* Connector line */}
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

      {/* ── LEAD FORM ── */}
      <section id="form" className="py-28 bg-[#F4F7F6]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Info */}
            <Reveal>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-medium">Консультация</span>
                </div>
                <h2 className="font-cormorant text-5xl font-bold text-[#1A3C34] leading-tight mb-6">
                  Начните<br />с консультации
                </h2>
                <p className="text-[#1A3C34]/65 leading-relaxed mb-10 text-base">
                  Оставьте заявку, и мы поможем выбрать домокомплект под ваш участок, бюджет и задачу. Вы получите понятный расчет и рекомендации по комплектации.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: "Check", text: "Без навязывания услуг" },
                    { icon: "CreditCard", text: "Работаем с ипотекой и маткапиталом" },
                    { icon: "MapPin", text: "Экскурсии на готовые объекты" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#1A3C34] flex items-center justify-center flex-shrink-0">
                        <Icon name={icon} size={14} className="text-[#D4AF37]" />
                      </div>
                      <span className="text-[#1A3C34]/80 text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={150}>
              <div className="bg-[#1A3C34] p-8 md:p-10">
                <div className="space-y-5">
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white placeholder-white/20 px-4 py-3.5 outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#D4AF37] text-white placeholder-white/20 px-4 py-3.5 outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Цель строительства</label>
                    <select
                      value={form.goal}
                      onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
                      className="w-full bg-[#1A3C34] border border-white/10 focus:border-[#D4AF37] text-white px-4 py-3.5 outline-none transition-colors text-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Выберите цель...</option>
                      <option>Дом для себя (ИЖС)</option>
                      <option>Дача / Гостевой дом</option>
                      <option>База отдыха / Инвестиции</option>
                    </select>
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs text-center">{error}</p>
                  )}

                  {submitted ? (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4">
                        <Icon name="Check" size={20} className="text-[#D4AF37]" />
                      </div>
                      <p className="font-cormorant text-2xl font-bold text-white mb-2">Заявка принята!</p>
                      <p className="text-white/50 text-sm">Мы свяжемся с вами в течение рабочего дня.</p>
                    </div>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="w-full bg-[#D4AF37] hover:bg-[#c49e2e] disabled:opacity-60 text-[#1A3C34] font-semibold text-base py-4 transition-all hover:scale-[1.02] mt-2 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Icon name="Loader2" size={16} className="animate-spin" />
                          Отправляем...
                        </>
                      ) : "Получить расчет за 1 день"}
                    </button>
                  )}
                  <p className="text-white/25 text-xs text-center leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1A3C34] border-t border-white/5 py-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-cormorant text-2xl font-bold text-white mb-1">
              АРХИ<span className="text-[#D4AF37]">БРУС</span>
            </div>
            <p className="text-white/30 text-xs">Производство домокомплектов во Владивостоке и Приморском крае.</p>
          </div>
          <div className="flex gap-8 text-white/30 text-xs uppercase tracking-wider">
            <button onClick={() => scrollTo("catalog")} className="hover:text-[#D4AF37] transition-colors">Проекты</button>
            <button onClick={() => scrollTo("features")} className="hover:text-[#D4AF37] transition-colors">Преимущества</button>
            <button onClick={() => scrollTo("form")} className="hover:text-[#D4AF37] transition-colors">Контакты</button>
          </div>
          <p className="text-white/20 text-xs">© 2026 Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}