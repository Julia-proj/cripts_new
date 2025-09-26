// src/App.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronDown,
  Gift,
} from "lucide-react";

// TODO: вставь свою ссылку на Stripe
const STRIPE_URL = "#stripe-payment-link";

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ====== ТАЙМЕР - 20 минут с момента захода на страницу ======
  const deadline = useMemo(() => Date.now() + 20 * 60 * 1000, []);
  const [remaining, setRemaining] = useState(deadline - Date.now());
  useEffect(() => {
    const t = setInterval(() => setRemaining((d) => Math.max(0, d - 1000)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor((remaining / 1000 / 60) % 60)).padStart(2, "0");
  const ss = String(Math.floor((remaining / 1000) % 60)).padStart(2, "0");

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">Beauty Scripts</div>
          <a
            href={STRIPE_URL}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Купить
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900">
                Скрипты, которые превращают сообщения{" "}
                <span className="text-blue-600">в деньги</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Проверенная система общения с клиентами для бьюти-мастеров.
                Результат: закрытые возражения, увеличенный средний чек,
                экономия времени на переписке.
              </p>
              <a
                href={STRIPE_URL}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5"
              >
                Купить
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div>
              <div className="relative">
                <img
                  src="/images/hero.jpg"
                  alt="Beauty Scripts Hero"
                  className="w-full h-auto rounded-2xl shadow-xl"
                />
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-gray-900">19€</div>
                  <div className="text-sm text-gray-500">Полный доступ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* КАК ИЗМЕНИТСЯ РАБОТА С КЛИЕНТАМИ */}
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Как изменится <span className="text-blue-600">работа с клиентами</span>
            </h2>
            <p className="text-gray-600 mt-3">
              Сравните результаты до и после внедрения скриптов
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* СЕЙЧАС (красная заливка) */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium text-sm">
                  <XCircle className="w-4 h-4" />
                  Сейчас
                </div>
              </div>
              <ul className="space-y-4 text-gray-800">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>«Сколько стоит?» → отвечаете только ценой и тишина.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>«Подумаю» → не знаете, что ответить — клиент уходит.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>«Переписка 30+ минут» → клиент остывает — теряете заявку.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>«10 заявок» → долгие диалоги — только 2–3 записи.</span>
                </li>
              </ul>
            </div>

            {/* ПОСЛЕ (зелёная заливка) */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full font-medium text-sm">
                  <CheckCircle className="w-4 h-4" />
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-800">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>«Сколько стоит?» → презентуете ценность → запись.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>«Подумаю» → мягкое возражение → возвращаете к записи.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>«Переписка 5 минут» → готовые фразы → быстрая запись.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>«10 заявок» → чёткие диалоги → 6–7 записей.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ ЭТО ВАЖНО */}
      <section id="why" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Почему это <span className="text-blue-600">важно</span>
            </h2>
            <p className="text-gray-600 mt-3">
              Каждая потерянная заявка — это упущенная прибыль
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <img src="/images/money.png" alt="" className="mx-auto h-12 w-12 mb-4" />
              <p className="font-semibold">Сливаются деньги на рекламу</p>
              <p className="text-gray-600 mt-2">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>
            <div className="text-center">
              <img src="/images/time.png" alt="" className="mx-auto h-12 w-12 mb-4" />
              <p className="font-semibold">Тратится время впустую</p>
              <p className="text-gray-600 mt-2">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>
            <div className="text-center">
              <img src="/images/leads.png" alt="" className="mx-auto h-12 w-12 mb-4" />
              <p className="font-semibold">Заявки уходят к конкуренту</p>
              <p className="text-gray-600 mt-2">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* КОМУ ПОДХОДЯТ СКРИПТЫ */}
      <section id="for" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Кому подходят <span className="text-blue-600">скрипты</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="rounded-2xl border p-8 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/salon.png" alt="" className="h-8 w-8" />
                <h3 className="text-xl font-semibold">Владельцам салонов и студий</h3>
              </div>
              <p className="text-gray-600">
                Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.
              </p>
            </div>

            <div className="rounded-2xl border p-8 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/medical.png" alt="" className="h-8 w-8" />
                <h3 className="text-xl font-semibold">Медицинским центрам</h3>
              </div>
              <p className="text-gray-600">
                Админы закрывают заявки, врачи работают с реальными пациентами.
              </p>
            </div>

            <div className="rounded-2xl border p-8 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/master.png" alt="" className="h-8 w-8" />
                <h3 className="text-xl font-semibold">Мастерам-универсалам</h3>
              </div>
              <p className="text-gray-600">
                Ответы на типовые ситуации → быстрее к записи, увереннее в чате.
              </p>
            </div>

            <div className="rounded-2xl border p-8 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/specialist.png" alt="" className="h-8 w-8" />
                <h3 className="text-xl font-semibold">Узким специалистам</h3>
              </div>
              <p className="text-gray-600">
                Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ЧТО ВХОДИТ В СИСТЕМУ СКРИПТОВ */}
      <section id="whats-included" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
            <p className="text-gray-600 mt-3">Полный набор инструментов для увеличения продаж</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <CardImage title="Готовые диалоги" img="/images/dialogs.png"
              desc="Контакты до оплаты: приветствия, презентация ценности, запись — всё пошагово." />
            <CardImage title="Закрытие возражений" img="/images/objections.png"
              desc="«Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления." />
            <CardImage title="Под каждую услугу" img="/images/per-service.png"
              desc="Маникюр, брови, ресницы, косметология, массаж — учтена специфика каждой ниши." />
            <CardImage title="Возврат клиентов" img="/images/return.png"
              desc="Сценарии повторных записей и реактивации «спящей» базы без рекламы." />
            <CardImage title="Гайд по внедрению" img="/images/guide.png"
              desc="Старт за один день: пошаговый план + стандарты для команды." />
            <CardImage title="Итог" img="/images/result.png"
              desc="Больше записей, выше средний чек, меньше времени в переписке." />
          </div>
        </div>
      </section>

      {/* БОНУСЫ ПРИ ПОКУПКЕ (празднично, но минималистично) */}
      <section id="bonuses" className="py-20 bg-gray-50 relative overflow-hidden">
        {/* лёгкие «блёстки» */}
        <div className="pointer-events-none absolute inset-0 opacity-40 animate-[float_8s_ease-in-out_infinite] bg-[radial-gradient(transparent_60%,rgba(255,255,255,0.7)_61%)]" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Бонусы при покупке</h2>
            <p className="text-gray-600 mt-3">
              Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Bonus color="orange" title="Гайд «Работа с клиентской базой»"
              desc="Повторные записи без рекламы → возвращайте старых клиентов." old="27€" />
            <Bonus color="green" title="Чек-лист «30+ источников клиентов»"
              desc="Платные и бесплатные способы → где взять заявки уже сегодня." old="32€" />
            <Bonus color="blue" title="Гайд «Продажи на консультации»"
              desc="5 этапов продаж → мягкий апсейл дополнительных услуг." old="20€" />
          </div>
        </div>
      </section>

      {/* ЧТО ИЗМЕНИТСЯ СРАЗУ (как было) */}
      <section id="immediate" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              <span className="text-blue-600">Что</span> изменится сразу
            </h2>
          </div>

          <div className="space-y-6 mt-12">
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-lg font-medium text-gray-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БЛОК ОПЛАТЫ / -70% С ТАЙМЕРОМ */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-blue-700 to-blue-500 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-5xl font-extrabold">Получите полную систему со скидкой 70%</h2>

          <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10">
            <span className="text-white/90">Скидка закончится через</span>
            <span className="font-mono text-xl tabular-nums px-3 py-1 rounded bg-black/20">{mm}:{ss}</span>
          </div>

          <div className="mt-12 mx-auto max-w-3xl rounded-3xl bg-white/10 backdrop-blur p-8">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold">Состав</h3>
                <ul className="mt-4 space-y-2 text-white/90">
                  <li>• Все скрипты + бонусы</li>
                  <li>• Полная система для увеличения продаж</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6">Что входит</h3>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✅</span> Готовые диалоги для всех ситуаций.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✅</span> Шаблоны под конкретную услугу.
                  </li>
                  <li className="flex items-start gap-2">
                    <img src="/images/gift.png" alt="" className="h-5 w-5 mt-1" />
                    Бонус: гайд по работе с базой (27€).
                  </li>
                  <li className="flex items-start gap-2">
                    <img src="/images/gift.png" alt="" className="h-5 w-5 mt-1" />
                    Бонус: 30+ источников клиентов (32€).
                  </li>
                  <li className="flex items-start gap-2">
                    <img src="/images/gift.png" alt="" className="h-5 w-5 mt-1" />
                    Бонус: продажи на консультации (20€).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✅</span> Пожизненный доступ и обновления.
                  </li>
                </ul>
              </div>

              <div className="md:text-right">
                <div className="text-white/80">Цена</div>
                <div className="text-2xl line-through">67€</div>
                <div className="text-6xl font-extrabold mt-2">19€</div>

                <a
                  href={STRIPE_URL}
                  className="mt-6 inline-block rounded-xl px-10 py-4 font-semibold bg-white text-blue-700 hover:opacity-90 transition shadow-lg animate-[pulse_2.2s_ease-in-out_infinite]"
                >
                  Получить со скидкой 70%
                </a>

                <div className="flex items-center justify-center md:justify-end gap-2 text-sm text-white/80 mt-4">
                  <span className="px-2 py-1 bg-black/40 rounded">Apple Pay</span>
                  <span className="px-2 py-1 bg-black/40 rounded">Google Pay</span>
                  <span className="px-2 py-1 bg-black/40 rounded">Visa</span>
                  <span className="px-2 py-1 bg-black/40 rounded">Mastercard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Отзывы клиентов</h2>
          </div>

          {/* 4 фото-отзыва из /public/images */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <img src="/images/rev1.jpg" alt="review" className="rounded-xl border" />
            <img src="/images/rev2.jpg" alt="review" className="rounded-xl border" />
            <img src="/images/rev3.jpg" alt="review" className="rounded-xl border" />
            <img src="/images/rev4.jpg" alt="review" className="rounded-xl border" />
          </div>

          {/* 6 ссылок на видео из Instagram */}
          <div className="grid md:grid-cols-3 gap-4 mt-8 text-blue-600">
            <a href="#" className="underline">Видео-отзыв 1</a>
            <a href="#" className="underline">Видео-отзыв 2</a>
            <a href="#" className="underline">Видео-отзыв 3</a>
            <a href="#" className="underline">Видео-отзыв 4</a>
            <a href="#" className="underline">Видео-отзыв 5</a>
            <a href="#" className="underline">Видео-отзыв 6</a>
          </div>
        </div>
      </section>

      {/* FAQ (оставила как было по смыслу) */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Частые вопросы</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Сработает в моей нише?",
                a: "Да. База универсальная + блоки под ногти/брови/ресницы/волосы/косметологию/перманент.",
              },
              {
                q: "Не будет ли звучать «по-скриптовому»?",
                a: "Нет. Формулировки живые, адаптируешь под свой тон. Главное — следовать алгоритму.",
              },
              {
                q: "Зачем это админам?",
                a: "Единый стандарт повышает конверсию, скорость и управляемость. Новички включаются быстрее.",
              },
              {
                q: "Когда будут результаты?",
                a: "Часто — в первые 24 часа: готовые фразы экономят время и быстрее ведут к записи.",
              },
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-8 py-6 text-left hover:bg-gray-50 flex justify-between items-center transition-colors"
                >
                  <span className="font-semibold text-lg text-gray-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER + мобильный CTA */}
      <footer className="py-12 bg-white border-t border-gray-200 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xl font-bold text-gray-900 mb-4">Beauty Scripts</div>
          <p className="text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 lg:hidden">
        <a
          href={STRIPE_URL}
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold text-center block hover:bg-gray-800 transition-colors"
        >
          Готовые скрипты — 19€ • Купить сейчас
        </a>
      </div>
    </div>
  );
}

/* ===== ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ===== */

function CardImage({
  title,
  desc,
  img,
}: {
  title: string;
  desc: string;
  img: string;
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6">
        <img src={img} alt="" className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function Bonus({
  color,
  title,
  desc,
  old,
}: {
  color: "orange" | "green" | "blue";
  title: string;
  desc: string;
  old: string;
}) {
  const colorMap = {
    orange: {
      wrap: "bg-orange-50",
      iconWrap: "bg-orange-100",
      icon: "text-orange-600",
      new: "text-orange-600",
    },
    green: {
      wrap: "bg-green-50",
      iconWrap: "bg-green-100",
      icon: "text-green-600",
      new: "text-green-600",
    },
    blue: {
      wrap: "bg-blue-50",
      iconWrap: "bg-blue-100",
      icon: "text-blue-600",
      new: "text-blue-600",
    },
  }[color];

  return (
    <div className={`${colorMap.wrap} rounded-2xl p-8 text-center`}>
      <div className={`w-16 h-16 ${colorMap.iconWrap} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
        <Gift className={`w-8 h-8 ${colorMap.icon}`} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-4">{desc}</p>
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg font-bold text-gray-400 line-through">{old}</span>
        <span className={`text-xl font-bold ${colorMap.new}`}>0€</span>
      </div>
    </div>
  );
}
