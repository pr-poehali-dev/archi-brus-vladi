import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F7F6]">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#1A3C34]/60 hover:text-[#1A3C34] transition-colors mb-10 text-sm"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>

        <h1 className="font-cormorant text-4xl font-bold text-[#1A3C34] mb-2">
          Согласие на обработку персональных данных
        </h1>
        <p className="text-[#1A3C34]/40 text-sm mb-10">Редакция от 17 апреля 2026 г.</p>

        <div className="bg-white p-8 md:p-12 shadow-sm space-y-8 text-[#1A3C34]/80 text-base leading-relaxed">

          <section>
            <h2 className="font-cormorant text-2xl font-bold text-[#1A3C34] mb-3">1. Общие положения</h2>
            <p>
              Настоящее согласие на обработку персональных данных (далее — Согласие) предоставляется
              физическим лицом (далее — Субъект персональных данных, Пользователь) компании
              <strong> АРХИБРУС</strong> (далее — Оператор), осуществляющей деятельность по
              производству и строительству домокомплектов во Владивостоке и Приморском крае.
            </p>
            <p className="mt-3">
              Согласие дано в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ
              «О персональных данных».
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-bold text-[#1A3C34] mb-3">2. Состав персональных данных</h2>
            <p>Пользователь даёт согласие на обработку следующих персональных данных:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Фамилия, имя, отчество (при наличии)</li>
              <li>Номер телефона</li>
              <li>Цель обращения</li>
              <li>Иные сведения, добровольно предоставленные в форме обратной связи</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-bold text-[#1A3C34] mb-3">3. Цели обработки</h2>
            <p>Персональные данные обрабатываются в следующих целях:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Обработка заявок и консультирование по вопросам строительства</li>
              <li>Подготовка коммерческих предложений и расчётов</li>
              <li>Связь с Пользователем по указанным им контактным данным</li>
              <li>Исполнение договорных обязательств</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-bold text-[#1A3C34] mb-3">4. Способы обработки</h2>
            <p>
              Обработка персональных данных осуществляется смешанным способом (с использованием
              средств автоматизации и без таковых), включая: сбор, запись, систематизацию,
              накопление, хранение, уточнение, использование, передачу (при наличии оснований),
              обезличивание, блокирование, удаление и уничтожение.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-bold text-[#1A3C34] mb-3">5. Передача третьим лицам</h2>
            <p>
              Оператор не передаёт персональные данные третьим лицам без согласия Субъекта,
              за исключением случаев, предусмотренных действующим законодательством Российской
              Федерации.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-bold text-[#1A3C34] mb-3">6. Срок обработки и хранения</h2>
            <p>
              Согласие действует с момента его предоставления и до момента его отзыва Субъектом
              персональных данных. Персональные данные хранятся не дольше, чем этого требуют
              цели их обработки.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-bold text-[#1A3C34] mb-3">7. Права Субъекта персональных данных</h2>
            <p>Пользователь вправе:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Получить информацию об обработке своих персональных данных</li>
              <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
              <li>Отозвать настоящее согласие, направив письменное заявление Оператору</li>
              <li>Обжаловать действия Оператора в Роскомнадзоре или в суде</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-bold text-[#1A3C34] mb-3">8. Контакты Оператора</h2>
            <p>
              По вопросам обработки персональных данных и для отзыва согласия Вы можете обратиться:
            </p>
            <div className="mt-3 space-y-1">
              <p><strong>Компания:</strong> АРХИБРУС</p>
              <p><strong>Регион деятельности:</strong> Владивосток и Приморский край</p>
              <p><strong>Сайт:</strong> arhibrus.ru</p>
            </div>
          </section>

          <section className="border-t border-[#F4F7F6] pt-8">
            <p className="text-sm text-[#1A3C34]/50">
              Нажимая кнопку «Получить расчёт» на сайте, Пользователь подтверждает, что ознакомлен
              с настоящим Согласием, понимает его содержание и в полной мере соглашается с
              изложенными условиями обработки персональных данных.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
