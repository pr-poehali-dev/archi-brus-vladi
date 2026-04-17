import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Reveal } from "@/lib/hooks";
import { LEADS_URL } from "@/lib/data";

export default function LeadForm() {
  const [form, setForm] = useState({ name: "", phone: "", goal: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <section id="form" className="py-28 bg-[#F4F7F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">

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
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="/privacy" target="_blank" className="underline hover:text-white/50 transition-colors">
                    согласием на обработку персональных данных
                  </a>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
