import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/6cec83f6-886a-402c-8698-2003e58f639f/bucket/abf65af5-492f-4692-8488-71436c566e87.jpg";
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

const REVIEWS = [
  {
    category: "Семья с детьми",
    text: "Давно хотели свой дом, но боялись, что стройка затянется и выйдет дороже, чем планировали. С АРХИБРУС все оказалось намного понятнее: помогли выбрать проект, все объяснили простым языком, всегда были на связи. Сейчас уже живем в доме и очень довольны.",
    author: "Анна и Сергей",
    city: "Артем",
    avatar: "https://cdn.poehali.dev/projects/6cec83f6-886a-402c-8698-2003e58f639f/files/f828db5b-8942-46f8-9061-c843866eb938.jpg",
  },
  {
    category: "Для дачи",
    text: "Искали вариант для дачи, чтобы без лишней суеты и бесконечных переделок. Понравилось, что сразу дали понятный расчет и объяснили, из чего складывается цена. Дом получился теплый, аккуратный и именно такой, как мы хотели.",
    author: "Ирина",
    city: "Владивосток",
    avatar: "https://cdn.poehali.dev/projects/6cec83f6-886a-402c-8698-2003e58f639f/files/dbce0a11-478c-4140-98d0-e8538bf72e18.jpg",
  },
  {
    category: "Для постоянного проживания",
    text: "Для нас было важно, чтобы дом был надежный и чтобы не пришлось постоянно что-то доделывать. Выбрали АРХИБРУС, потому что все выглядело честно и спокойно, без пустых обещаний. Работой остались довольны, видно, что люди знают свое дело.",
    author: "Алексей",
    city: "Уссурийск",
    avatar: "https://cdn.poehali.dev/projects/6cec83f6-886a-402c-8698-2003e58f639f/files/1f42d40e-db0a-4140-b480-2c945909b32f.jpg",
  },
  {
    category: "Для бизнеса / базы отдыха",
    text: "Заказывали домокомплект под гостевой дом для базы отдыха. Нужен был вариант, который можно быстро запустить и не растянуть стройку на неопределенный срок. Все прошло организованно, результат нас устроил, сейчас уже думаем о следующем объекте.",
    author: "Максим",
    city: "Приморский край",
    avatar: "https://cdn.poehali.dev/projects/6cec83f6-886a-402c-8698-2003e58f639f/files/c88090aa-aa50-454a-8619-1af060b05e8f.jpg",
  },
  {
    category: "Первый опыт строительства",
    text: "Мы вообще раньше не сталкивались со строительством и переживали, что ничего не поймем. Но нам все объяснили поэтапно, подсказали по проекту и помогли определиться с комплектацией. Было ощущение, что с нами работают по-человечески, а это очень важно.",
    author: "Екатерина",
    city: "Находка",
    avatar: "https://cdn.poehali.dev/projects/6cec83f6-886a-402c-8698-2003e58f639f/files/4f05016f-e81d-4c2f-84fb-c6980ce07fa8.jpg",
  },
];

const PORTFOLIO_TABS = ["ИЖС (Для жизни)", "Базы отдыха (B2B)", "Дачи и Бани"];

const PORTFOLIO: { tab: string; label: string; title: string; image: string; description: string; time: string; location: string }[] = [
  // ИЖС
  {
    tab: "ИЖС (Для жизни)",
    label: "Частный дом (ИЖС)",
    title: "Дом в пригороде Владивостока",
    image: "https://cdn.poehali.dev/projects/6cec83f6-886a-402c-8698-2003e58f639f/bucket/7028ad06-ef7a-4a81-ae53-a6adc8b5aa55.png",
    description: "Проект 120 кв.м. для постоянного проживания семьи из 4 человек. Высокие потолки, панорамное остекление, отделка «под ключ».",
    time: "18 дней",
    location: "Артем",
  },
  {
    tab: "ИЖС (Для жизни)",
    label: "Частный дом (ИЖС)",
    title: "Одноэтажный дом для молодой семьи",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Компактный проект 85 кв.м. с двумя спальнями и просторной кухней-гостиной. Тёплый пол, отделка под ключ. Идеально для начала семейной жизни.",
    time: "14 дней",
    location: "Владивосток",
  },
  {
    tab: "ИЖС (Для жизни)",
    label: "Частный дом (ИЖС)",
    title: "Двухэтажный дом с мансардой",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Просторный дом 160 кв.м. с мансардным этажом, 4 спальнями и двумя санузлами. Остекление второго света, вид на сопки.",
    time: "25 дней",
    location: "Уссурийск",
  },
  {
    tab: "ИЖС (Для жизни)",
    label: "Частный дом (ИЖС)",
    title: "Дом с террасой на берегу залива",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Проект 110 кв.м. с панорамной террасой 20 кв.м. Усиленное утепление для морского климата, большие окна с видом на залив.",
    time: "20 дней",
    location: "Находка",
  },
  {
    tab: "ИЖС (Для жизни)",
    label: "Частный дом (ИЖС)",
    title: "Дом под маткапитал и ипотеку",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Доступный проект 95 кв.м. реализован с использованием материнского капитала и семейной ипотеки. Три спальни, полная отделка.",
    time: "16 дней",
    location: "Спасск-Дальний",
  },
  // Базы отдыха
  {
    tab: "Базы отдыха (B2B)",
    label: "База отдыха (B2B)",
    title: "Глэмпинг в Хасанском районе",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Комплекс из 5 гостевых модулей по 45 кв.м. Адаптирован под круглогодичную сдачу в аренду туристам. Возведен до начала сезона.",
    time: "30 дней",
    location: "Андреевка",
  },
  {
    tab: "Базы отдыха (B2B)",
    label: "База отдыха (B2B)",
    title: "Эко-лагерь на берегу реки",
    image: "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Три гостевых домика по 35 кв.м. плюс общий банный корпус. Проект рассчитан на поток до 20 туристов одновременно.",
    time: "22 дня",
    location: "Кировский район",
  },
  {
    tab: "Базы отдыха (B2B)",
    label: "База отдыха (B2B)",
    title: "Гостиничный комплекс у моря",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Восемь стандартных номеров по 28 кв.м. с террасами. Быстрый монтаж позволил запустить объект к летнему сезону в сжатые сроки.",
    time: "45 дней",
    location: "Славянка",
  },
  {
    tab: "Базы отдыха (B2B)",
    label: "База отдыха (B2B)",
    title: "Туристический лагерь для корпоративов",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Четыре домика 40 кв.м. с общей зоной барбекю и беседками. Корпоративная аренда, заполняемость от 80% в первый сезон.",
    time: "28 дней",
    location: "Михайловский район",
  },
  {
    tab: "Базы отдыха (B2B)",
    label: "База отдыха (B2B)",
    title: "Семейный кемпинг с домиками",
    image: "https://images.unsplash.com/photo-1533760881669-80db4d7b341e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Шесть домов 50 кв.м. для семейного отдыха с детьми. Детская площадка, огороженная территория, Wi-Fi покрытие всего участка.",
    time: "35 дней",
    location: "Хасан",
  },
  // Дачи и Бани
  {
    tab: "Дачи и Бани",
    label: "Дача и Баня",
    title: "Гостевой дом с парной",
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Уютный проект 60 кв.м. с просторной террасой для загородного отдыха на выходных. Полноценная парилка и зона отдыха.",
    time: "14 дней",
    location: "Надеждинск",
  },
  {
    tab: "Дачи и Бани",
    label: "Дача и Баня",
    title: "Летняя дача с верандой",
    image: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Лёгкий дачный проект 50 кв.м. с открытой верандой 15 кв.м. Летняя кухня, погреб, место для барбекю. Сдан к первым выходным сезона.",
    time: "10 дней",
    location: "Партизанск",
  },
  {
    tab: "Дачи и Бани",
    label: "Дача и Баня",
    title: "Баня с комнатой отдыха",
    image: "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Отдельно стоящая баня 36 кв.м.: парилка, моечная, просторная комната отдыха с камином. Лиственница внутри, теплообменник на трубе.",
    time: "8 дней",
    location: "Артем",
  },
  {
    tab: "Дачи и Бани",
    label: "Дача и Баня",
    title: "Дача для круглогодичного отдыха",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Утеплённый проект 70 кв.м. с двумя спальнями и камином. Рассчитан на использование зимой — двойное утепление, тёплый пол в санузле.",
    time: "16 дней",
    location: "Уссурийский район",
  },
  {
    tab: "Дачи и Бани",
    label: "Дача и Баня",
    title: "Комплекс: дача + баня",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Два объекта на одном участке: дача 65 кв.м. и баня 30 кв.м. с переходным крытым коридором. Всё собрано за один приезд бригады.",
    time: "18 дней",
    location: "Дальнереченск",
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
          {/* counter badge */}
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

      {/* dots */}
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
        {/* progress bar */}
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
              {r.avatar ? (
                <img src={r.avatar} alt={r.author} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#1A3C34] flex items-center justify-center">
                  <Icon name="User" size={16} className="text-[#D4AF37]" />
                </div>
              )}
            </div>
            <div>
              <p className="font-cormorant text-lg font-bold text-[#1A3C34]">{r.author}</p>
              <p className="text-[#1A3C34]/40 text-xs">{r.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
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
            {[["catalog","Проекты"],["features","Преимущества"],["steps","Как работаем"],["portfolio","Портфолио"],["reviews","Отзывы"],["form","Консультация"]].map(([id, label]) => (
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
          {[["catalog","Проекты"],["features","Преимущества"],["steps","Как работаем"],["portfolio","Портфолио"],["reviews","Отзывы"],["form","Консультация"]].map(([id, label]) => (
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
                      <p className="text-white/50 text-sm">Мы свяжемся с вами в течение часа.</p>
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