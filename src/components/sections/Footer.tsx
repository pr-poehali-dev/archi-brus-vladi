interface FooterProps {
  scrollTo: (id: string) => void;
}

export default function Footer({ scrollTo }: FooterProps) {
  return (
    <footer className="bg-[#1A3C34] border-t border-white/5 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-cormorant text-2xl font-bold mb-1">
            <span style={{ color: "#00e5cc", textShadow: "0 0 6px #00e5cc, 0 0 16px #00e5cc, 0 0 50px rgba(0,229,204,.5)" }}>АРХИБРУС</span>
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
  );
}