import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const LEADS_URL = "https://functions.poehali.dev/473def77-fbda-41fa-bf71-6f8e7e0cc5a0";
const PASSWORD = "arhibrus2026";

interface Lead {
  id: number;
  name: string;
  phone: string;
  goal: string;
  created_at: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const login = () => {
    if (pass === PASSWORD) {
      setAuthed(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetch(LEADS_URL)
      .then(r => r.json())
      .then(d => setLeads(d.leads || []))
      .finally(() => setLoading(false));
  }, [authed]);

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.phone.includes(search) ||
    (l.goal || "").toLowerCase().includes(search.toLowerCase())
  );

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#1A3C34] flex items-center justify-center font-golos px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="font-cormorant text-4xl font-bold text-white mb-1">
              АРХИ<span className="text-[#D4AF37]">БРУС</span>
            </div>
            <p className="text-white/40 text-sm tracking-widest uppercase">Панель управления</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8">
            <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Пароль</label>
            <input
              type="password"
              value={pass}
              onChange={e => { setPass(e.target.value); setPassError(false); }}
              onKeyDown={e => e.key === "Enter" && login()}
              placeholder="Введите пароль"
              className={`w-full bg-white/5 border ${passError ? "border-red-400" : "border-white/10"} focus:border-[#D4AF37] text-white placeholder-white/20 px-4 py-3.5 outline-none transition-colors text-sm mb-1`}
            />
            {passError && <p className="text-red-400 text-xs mb-3">Неверный пароль</p>}
            <button
              onClick={login}
              className="w-full bg-[#D4AF37] hover:bg-[#c49e2e] text-[#1A3C34] font-semibold text-sm py-3.5 transition-all mt-4"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F6] font-golos">
      {/* Header */}
      <div className="bg-[#1A3C34] px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="font-cormorant text-2xl font-bold text-white">
          АРХИ<span className="text-[#D4AF37]">БРУС</span>
          <span className="text-white/30 text-sm font-golos font-normal ml-3 tracking-wider">Заявки</span>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="text-white/40 hover:text-white text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
        >
          <Icon name="LogOut" size={14} />
          Выйти
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-[#1A3C34]/10 p-5">
            <p className="text-[#1A3C34]/40 text-xs uppercase tracking-wider mb-1">Всего заявок</p>
            <p className="font-cormorant text-4xl font-bold text-[#1A3C34]">{leads.length}</p>
          </div>
          <div className="bg-white border border-[#1A3C34]/10 p-5">
            <p className="text-[#1A3C34]/40 text-xs uppercase tracking-wider mb-1">Сегодня</p>
            <p className="font-cormorant text-4xl font-bold text-[#1A3C34]">
              {leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
          <div className="bg-white border border-[#1A3C34]/10 p-5 col-span-2 md:col-span-1">
            <p className="text-[#1A3C34]/40 text-xs uppercase tracking-wider mb-1">Последняя заявка</p>
            <p className="font-cormorant text-xl font-bold text-[#1A3C34]">
              {leads.length > 0 ? formatDate(leads[0].created_at) : "—"}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A3C34]/30" />
          <input
            type="text"
            placeholder="Поиск по имени, телефону или цели..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-[#1A3C34]/10 focus:border-[#D4AF37] text-[#1A3C34] placeholder-[#1A3C34]/30 pl-11 pr-4 py-3.5 outline-none transition-colors text-sm"
          />
        </div>

        {/* Table */}
        <div className="bg-white border border-[#1A3C34]/10 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center gap-3 py-20 text-[#1A3C34]/40">
              <Icon name="Loader2" size={20} className="animate-spin" />
              <span className="text-sm">Загружаем заявки...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-[#1A3C34]/30">
              <Icon name="Inbox" size={40} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">{search ? "Ничего не найдено" : "Заявок пока нет"}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1A3C34]/10 bg-[#F4F7F6]">
                    <th className="text-left text-xs uppercase tracking-wider text-[#1A3C34]/40 px-6 py-4 font-medium">#</th>
                    <th className="text-left text-xs uppercase tracking-wider text-[#1A3C34]/40 px-6 py-4 font-medium">Имя</th>
                    <th className="text-left text-xs uppercase tracking-wider text-[#1A3C34]/40 px-6 py-4 font-medium">Телефон</th>
                    <th className="text-left text-xs uppercase tracking-wider text-[#1A3C34]/40 px-6 py-4 font-medium">Цель</th>
                    <th className="text-left text-xs uppercase tracking-wider text-[#1A3C34]/40 px-6 py-4 font-medium">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, i) => (
                    <tr key={lead.id} className={`border-b border-[#1A3C34]/5 hover:bg-[#F4F7F6] transition-colors ${i % 2 === 0 ? "" : "bg-[#F4F7F6]/50"}`}>
                      <td className="px-6 py-4 text-[#1A3C34]/30 text-sm">{lead.id}</td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-[#1A3C34] text-sm">{lead.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`tel:${lead.phone.replace(/\D/g, "")}`}
                          className="text-[#2C5E50] text-sm hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                        >
                          <Icon name="Phone" size={12} />
                          {lead.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        {lead.goal ? (
                          <span className="text-xs bg-[#1A3C34]/8 text-[#1A3C34] px-3 py-1 border border-[#1A3C34]/10">{lead.goal}</span>
                        ) : (
                          <span className="text-[#1A3C34]/20 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-[#1A3C34]/50 text-sm">{formatDate(lead.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filtered.length > 0 && (
          <p className="text-[#1A3C34]/30 text-xs mt-4 text-right">
            Показано {filtered.length} из {leads.length} заявок
          </p>
        )}
      </div>
    </div>
  );
}
