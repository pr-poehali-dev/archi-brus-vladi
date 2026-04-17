import Icon from "@/components/ui/icon";
import { HERO_BG } from "@/lib/data";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="Дом" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1A3C34]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A3C34]/30 via-transparent to-[#1A3C34]/60" />
      </div>

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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase">
        <span>Листать</span>
        <Icon name="ChevronDown" size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
