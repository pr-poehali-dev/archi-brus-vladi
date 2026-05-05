import { useState } from "react";
import Icon from "@/components/ui/icon";

const FAQS = [
  {
    category: "Цена и смета",
    icon: "CircleDollarSign",
    q: "Сколько стоит фундамент и входит ли он в цену?",
    a: "Фундамент — отдельная статья бюджета, так как его стоимость зависит от типа грунта, уклона участка и проекта. В среднем по Приморью: свайно-винтовой — от 150 000 ₽, ленточный — от 320 000 ₽, плита — от 450 000 ₽. Мы поможем выбрать оптимальный вариант под ваш участок и дадим точную смету до подписания договора.",
  },
  {
    category: "Комплектация",
    icon: "Package",
    q: "Что входит в домокомплект? Это просто брус или полноценный дом?",
    a: "Домокомплект — это полный набор для сборки дома: профилированный брус, стропильная система, балки перекрытий, окна, входная дверь, крепёжные элементы и подробный монтажный план. В комплектации «Комфорт» и «Премиум» дополнительно входит утеплитель, фасадная отделка и черновые работы внутри. Вы получаете всё необходимое — без поездок по базам и лишних затрат на поиск материалов.",
  },
  {
    category: "Гарантии",
    icon: "ShieldCheck",
    q: "Какую гарантию вы даёте на дом и материалы?",
    a: "На домокомплект мы даём 5 лет гарантии на конструктив и 3 года на монтажные работы. Брус проходит заводскую камерную сушку и обработку антисептиком — это исключает растрескивание и грибок. Все условия фиксируются в договоре. Если что-то пойдёт не так — устраним за наш счёт.",
  },
  {
    category: "Сроки",
    icon: "Clock",
    q: "Сколько времени займёт строительство от заявки до заселения?",
    a: "Производство домокомплекта на заводе занимает 14–30 дней. Сборка на вашем участке — от 7 до 25 дней в зависимости от площади и сложности проекта. То есть уже через 2–2,5 месяца после подписания договора вы можете заходить в готовый дом. Для сравнения: обычная стройка из кирпича занимает 1,5–2 года.",
  },
  {
    category: "Логистика",
    icon: "MapPin",
    q: "Работаете ли вы за пределами Приморского края?",
    a: "Да. Мы доставляем домокомплекты по всему Дальнему Востоку: Хабаровский край, Сахалин, Камчатка, Амурская область, Якутия. Монтажные бригады выезжают на объект. Стоимость доставки рассчитывается индивидуально. Уточните ваш регион — и мы сразу назовём сроки и цену доставки.",
  },
  {
    category: "Первый шаг",
    icon: "MessageCircle",
    q: "С чего начать? Нет проекта, нет участка — можно обратиться?",
    a: "Конечно. Большинство наших клиентов приходят именно без проекта и участка. На первой консультации мы разбираемся в вашей ситуации, рассказываем про варианты, считаем примерный бюджет. Это бесплатно и ни к чему не обязывает. Просто позвоните или напишите — и мы всё объясним простым языком.",
  },
  {
    category: "Договор",
    icon: "FileText",
    q: "Как происходит оплата? Есть ли рассрочка или ипотека?",
    a: "Оплата поэтапная: 50% — при подписании договора и запуске производства, 50% — перед отгрузкой комплекта. Работаем с ипотекой (в том числе Дальневосточной под 2%) и потребительскими кредитами через банки-партнёры. Помогаем оформить документы — это входит в наш сервис.",
  },
  {
    category: "Отличие",
    icon: "Zap",
    q: "Чем вы отличаетесь от обычной бригады шабашников?",
    a: "Три принципиальных отличия: 1) Заводское производство — каждая деталь нарезана с точностью до миллиметра, никакой «подгонки топором» на месте. 2) Фиксированная смета — цена не меняется в процессе стройки, всё прописано в договоре. 3) Юридическая ответственность — мы официальная компания, а не частная бригада. В случае спора есть кому предъявить претензии.",
  },
];

export default function FAQ({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 bg-[#F4F7F6] relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" stroke="#1A3C34" strokeWidth="1"/>
          <circle cx="100" cy="100" r="60" stroke="#1A3C34" strokeWidth="1"/>
          <circle cx="100" cy="100" r="40" stroke="#1A3C34" strokeWidth="1"/>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" stroke="#D4AF37" strokeWidth="1"/>
          <circle cx="100" cy="100" r="55" stroke="#D4AF37" strokeWidth="1"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Частые вопросы</span>
            <div className="w-8 h-px bg-[#D4AF37]" />
          </div>
          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-[#1A3C34] mb-4">
            Всё, что вы хотели<br />
            <span className="relative inline-block">
              спросить
              <span className="absolute bottom-1 left-0 right-0 h-1 bg-[#D4AF37]/40 rounded" />
            </span>{" "}до звонка
          </h2>
          <p className="text-[#1A3C34]/50 text-lg max-w-xl mx-auto">
            Собрали ответы на вопросы, которые чаще всего задают перед принятием решения
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Левая колонка — список вопросов */}
          <div className="lg:col-span-2 space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? "border-[#D4AF37]/50 shadow-lg bg-white" : "border-[#1A3C34]/10 bg-white hover:border-[#D4AF37]/30 hover:shadow-md"}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 p-5 text-left group"
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-[#1A3C34]" : "bg-[#F4F7F6] group-hover:bg-[#1A3C34]/10"}`}>
                      <Icon name={faq.icon} size={18} className={isOpen ? "text-[#D4AF37]" : "text-[#1A3C34]/60"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-medium">{faq.category}</span>
                      <p className={`font-semibold text-sm leading-snug mt-0.5 transition-colors ${isOpen ? "text-[#1A3C34]" : "text-[#1A3C34]/80"}`}>
                        {faq.q}
                      </p>
                    </div>
                    <div className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isOpen ? "border-[#D4AF37] bg-[#D4AF37] rotate-45" : "border-[#1A3C34]/20 group-hover:border-[#D4AF37]"}`}>
                      <Icon name="Plus" size={14} className={isOpen ? "text-[#1A3C34]" : "text-[#1A3C34]/50"} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5" style={{ animation: "faqOpen 0.25s ease" }}>
                      <div className="ml-14 pl-0 border-l-2 border-[#D4AF37]/30 pl-4">
                        <p className="text-[#1A3C34]/70 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Правая колонка — CTA-карточка */}
          <div className="space-y-5 sticky top-24">
            <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(145deg, #1A3C34, #2C5E50)" }}>
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center mb-4">
                  <Icon name="HelpCircle" size={24} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-cormorant text-2xl font-bold text-white mb-2">
                  Не нашли ответ?
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">
                  Задайте любой вопрос — ответим честно и без продажного давления
                </p>
                <button
                  onClick={() => scrollTo("form")}
                  className="w-full bg-[#D4AF37] hover:bg-[#c49e2e] text-[#1A3C34] font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] text-sm"
                >
                  Задать вопрос
                </button>
                <a
                  href="https://wa.me/79242467120"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white py-3 rounded-xl transition-all text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
                    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.785 6.86L2 30l7.34-1.762A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.29 19.93c-.344-.172-2.035-1.004-2.35-1.118-.316-.115-.546-.172-.776.172-.23.344-.889 1.118-1.09 1.348-.2.23-.4.258-.745.086-.344-.172-1.452-.535-2.767-1.708-1.022-.913-1.712-2.04-1.912-2.384-.2-.344-.021-.53.15-.702.154-.154.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.603-.086-.172-.776-1.87-1.063-2.562-.28-.672-.564-.58-.776-.59l-.66-.012c-.23 0-.603.086-.918.43-.316.344-1.205 1.177-1.205 2.87s1.234 3.33 1.406 3.56c.172.23 2.428 3.71 5.882 5.204.823.355 1.465.567 1.965.726.826.263 1.578.226 2.172.137.662-.099 2.035-.832 2.322-1.635.287-.803.287-1.491.2-1.635-.086-.143-.316-.23-.66-.402z"/>
                  </svg>
                  Написать в WhatsApp
                </a>
              </div>
            </div>

            {/* Доверие-блок */}
            <div className="rounded-2xl border border-[#1A3C34]/10 bg-white p-5">
              <p className="text-[#1A3C34]/40 text-[10px] uppercase tracking-widest mb-4">Вам не придётся беспокоиться о</p>
              <div className="space-y-3">
                {[
                  ["ShieldCheck", "Скрытых платежах — цена фиксируется в договоре"],
                  ["Clock", "Срыве сроков — этапы прописаны с датами"],
                  ["Wrench", "Некачественных материалах — заводское производство"],
                  ["PhoneOff", "Давлении менеджеров — консультируем без навязывания"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={icon} size={12} className="text-[#D4AF37]" />
                    </div>
                    <span className="text-[#1A3C34]/70 text-xs leading-relaxed">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes faqOpen { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: translateY(0) } }`}</style>
    </section>
  );
}