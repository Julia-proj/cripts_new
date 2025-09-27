import React, { useState, useEffect } from "react";

// TODO: вставь свою ссылку Stripe
const STRIPE_URL = "https://buy.stripe.com/...";

// Простой таймер «ограниченного времени» (по умолчанию ~12 часов)
function useCountdown(hours = 12) {
  const [end] = useState(() => Date.now() + hours * 3600 * 1000);
  const [left, setLeft] = useState(end - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, end - Date.now())), 1000);
    return () => clearInterval(id);
  }, [end]);
  const total = Math.max(0, left);
  const h = Math.floor(total / 3600000);
  const m = Math.floor((total % 3600000) / 60000);
  const s = Math.floor((total % 60000) / 1000);
  return { h, m, s, finished: total <= 0 };
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [viewersCount, setViewersCount] = useState(23);
  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);
  const { h, m, s, finished } = useCountdown(12);

  // Анимация счетчика посетителей
  useEffect(() => {
    const interval = setInterval(() => {
      const randomChange = Math.random() > 0.7;
      if (randomChange) {
        const delta = Math.random() > 0.5 ? 1 : -1;
        setViewersCount(prev => Math.max(15, Math.min(35, prev + delta)));
      }
    }, 8000 + Math.random() * 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">Beauty Scripts</div>
          <div className="flex items-center gap-4">
            {/* Счетчик посетителей */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border animate-pulse">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <span className="font-medium">{viewersCount} человек на сайте</span>
            </div>
            <a
              href={STRIPE_URL}
              target="_blank"
              rel="noopener"
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all hover:scale-105"
              aria-label="Купить скрипты"
              onClick={() => console.log("offer_cta_click")}
            >
              Купить
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900 text-center lg:text-left">
                Скрипты, которые превращают{" "}
                <span className="text-blue-600 font-extrabold">сообщения в деньги</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed text-center lg:text-left">
                Проверенная система общения с клиентами для бьюти-мастеров.
                Результат: <span className="text-blue-600 font-semibold">закрытые возражения</span>, <span className="text-blue-600 font-semibold">увеличенный средний чек</span>,
                экономия времени на переписке.
              </p>
              <div className="mb-6 text-center lg:text-left">
                <a
                  href={STRIPE_URL}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg"
                >
                  Купить <span className="inline-block ml-2">→</span>
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500 justify-center lg:justify-start">
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 text-green-500">✓</span>
                  Доступ сразу
                </span>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-black text-white rounded text-xs font-medium">
                    Apple Pay
                  </div>
                  <div className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium">
                    Google Pay
                  </div>
                </div>
              </div>
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

      {/* СРАВНЕНИЕ */}
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Как изменится ваша{" "}
              <span className="text-blue-600">работа с клиентами</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Сравните результаты до и после внедрения скриптов
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium text-sm">
                  <img src="/images/red.png" alt="Cross" className="w-4 h-4" />
                  Сейчас
                </div>
              </div>
              <ul className="space-y-4 text-gray-800">
                {[
                  "«Сколько стоит?» → Отвечаете только ценой и тишина.",
                  "«Подумаю» → Не знаете, что ответить — клиент уходит.",
                  "«Переписка 30+ минут» → Клиент остывает — теряете заявку.",
                  "«10 заявок» → Долгие диалоги — только 2–3 записи.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <img src="/images/red.png" alt="Cross" className="w-5 h-5 mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full font-medium text-sm">
                  <img src="/images/green.png" alt="Check" className="w-4 h-4" />
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-800">
                {[
                  <>«Сколько стоит?» → Презентуете ценность → запись.</>,
                  <>«Подумаю» → Мягкое возражение → возвращаете к записи.</>,
                  <>«Переписка 5 минут» → Готовые фразы → быстрая запись.</>,
                  <>«10 заявок» → Чёткие диалоги → 6–7 записей.</>,
                ].map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <img src="/images/green.png" alt="Check" className="w-5 h-5 mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
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
            <p className="mt-3 text-gray-600">
              Каждая потерянная заявка — это упущенная прибыль
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="rounded-2xl border p-8 text-center">
              <img
                src="/images/money.png"
                alt="Сливаются деньги"
                className="mx-auto mb-6 w-16 h-16 object-contain"
              />
              <h3 className="font-semibold text-lg">Сливаются деньги на рекламу</h3>
              <p className="mt-2 text-gray-600">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные —
                <span className="text-red-800 font-semibold"> выброшенный бюджет</span>.
              </p>
            </div>
            <div className="rounded-2xl border p-8 text-center">
              <img
                src="/images/clock.png"
                alt="Тратится время"
                className="mx-auto mb-6 w-16 h-16 object-contain"
              />
              <h3 className="font-semibold text-lg">Тратится время впустую</h3>
              <p className="mt-2 text-gray-600">
                По 30–40 минут на переписку с каждым. Уходит <span className="text-red-800 font-semibold">3–4 часа в день</span>.
              </p>
            </div>
            <div className="rounded-2xl border p-8 text-center">
              <img
                src="/images/door.png"
                alt="Уходят к конкуренту"
                className="mx-auto mb-6 w-16 h-16 object-contain"
              />
              <h3 className="font-semibold text-lg">Заявки уходят к конкуренту</h3>
              <p className="mt-2 text-gray-600">
                Пока вы думаете, клиент записывается <span className="text-red-800 font-semibold">к тому, кто отвечает быстро и уверенно</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* КОМУ ПОДХОДЯТ СКРИПТЫ */}
      <section id="for" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Кому подходят <span className="text-blue-600">скрипты</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {[
              {
                img: "/images/salon.png",
                title: "Владельцам салонов и студий",
                text: "Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.",
              },
              {
                img: "/images/med.png",
                title: "Медицинским центрам",
                text: "Админы закрывают заявки, врачи работают с реальными пациентами.",
              },
              {
                img: "/images/team.png",
                title: "Мастерам-универсалам",
                text: "Ответы на типовые ситуации → быстрее к записи, увереннее в чате.",
              },
              {
                img: "/images/one.png",
                title: "Узким специалистам",
                text: "Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={c.img}
                    alt=""
                    className="w-12 h-12 object-contain"
                  />
                  <h3 className="text-xl font-bold text-gray-900">{c.title}</h3>
                </div>
                <p className="mt-4 text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ВХОДИТ В СИСТЕМУ */}
      <section id="whats-included" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Полный набор инструментов для увеличения продаж
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                img: "/images/xmind.png",
                title: "Готовые диалоги",
                desc: (
                  <>Контакты до оплаты: приветствия, <span className="text-blue-900 font-semibold">презентация ценности</span>, запись — всё пошагово.</>
                ),
              },
              {
                img: "/images/target.png",
                title: "Закрытие возражений",
                desc: (
                  <>«Дорого», «Подумаю», «У другого дешевле» — <span className="text-blue-900 font-semibold">мягкие ответы без давления</span>.</>
                ),
              },
              {
                img: "/images/salons.png",
                title: "Под каждую услугу",
                desc: (
                  <>Маникюр, брови, ресницы, косметология, массаж — <span className="text-blue-900 font-semibold">учтена специфика каждой ниши</span>.</>
                ),
              },
              {
                img: "/images/bucle.png",
                title: "Возврат клиентов",
                desc: (
                  <>Сценарии повторных записей и <span className="text-blue-900 font-semibold">реактивации «спящей» базы без рекламы</span>.</>
                ),
              },
              {
                img: "/images/phone.png",
                title: "Гайд по внедрению",
                desc: (
                  <><span className="text-blue-900 font-semibold">Старт за один день</span>: пошаговый план + стандарты для команды.</>
                ),
              },
              {
                img: "/images/rocket.png",
                title: "Итог",
                desc: (
                  <>Больше записей, <span className="text-blue-900 font-semibold">выше средний чек</span>, меньше времени в переписке.</>
                ),
              },
            ].map((i, k) => (
              <div key={k} className="rounded-2xl border p-8">
                <img
                  src={i.img}
                  alt=""
                  className="w-12 h-12 object-contain mb-6"
                />
                <h3 className="text-xl font-bold text-gray-900">{i.title}</h3>
                <p className="mt-2 text-gray-600">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БОНУСЫ */}
      <section id="bonuses" className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-50/40 via-pink-50/40 to-purple-50/40" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Бонусы при покупке <span className="text-2xl">🎁</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                image: "/images/bonus1.png",
                title: "Гайд «Работа с клиентской базой»",
                desc: "Повторные записи без рекламы → возвращайте старых клиентов.",
                old: "27€",
              },
              {
                image: "/images/bonus2.png",
                title: "Чек-лист «30+ источников клиентов»",
                desc: "Платные и бесплатные способы → где взять заявки уже сегодня.",
                old: "32€",
              },
              {
                image: "/images/bonus3.png",
                title: "Гайд «Продажи на консультации»",
                desc: "5 этапов продаж → мягкий апсейл дополнительных услуг.",
                old: "20€",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 text-center bg-white shadow-sm border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-6">
                  <img
                    src={b.image}
                    alt={`Бонус ${i + 1}`}
                    className="w-32 h-40 mx-auto object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{b.title}</h3>
                <p className="mt-2 text-gray-600">{b.desc}</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-lg font-bold text-gray-400 line-through">
                    {b.old}
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    0€
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ИЗМЕНИТСЯ СРАЗУ */}
      <section id="immediate" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Что изменится сразу
          </h2>

          <div className="space-y-6 mt-12">
            {[
              <>Перестанешь терять заявки из-за <span className="text-green-600 font-semibold">слабых ответов</span>.</>,
              <>Начнёшь <span className="text-green-600 font-semibold">закрывать больше записей</span> уже с первого дня.</>,
              <>Повысишь средний чек через <span className="text-green-600 font-semibold">правильные предложения</span>.</>,
              <>Станешь увереннее — <span className="text-green-600 font-semibold">на всё есть готовый ответ</span>.</>,
            ].map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl"
              >
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-4 h-4 text-green-600">✓</span>
                </div>
                <span className="text-lg font-medium text-gray-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ОФФЕР */}
      <section id="offer" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
              Полная система со скидкой{" "}
              <span className="text-blue-600">70%</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Специальное предложение на этой неделе · Предложение действует
              ограниченное время
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="rounded-3xl p-8 bg-slate-800 text-white shadow-2xl relative overflow-hidden">
              {/* Декоративные элементы */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-400/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="text-center">
                  <div className="text-sm uppercase tracking-wide text-gray-300 mb-3">
                    Полный доступ
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="text-gray-400 line-through text-2xl">67€</span>
                    <span className="text-5xl font-extrabold text-white">19€</span>
                  </div>

                  {/* Таймер */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2">
                      <span className="w-4 h-4 text-white">🕐</span>
                      {!finished ? (
                        <>
                          <span className="text-white text-sm font-medium">До конца:</span>
                          <span className="font-bold tabular-nums text-white">
                            {String(h).padStart(2, "0")}:
                            {String(m).padStart(2, "0")}:
                            {String(s).padStart(2, "0")}
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold text-white">Время истекло</span>
                      )}
                    </div>
                  </div>

                  {/* CTA кнопка */}
                  <a
                    href={STRIPE_URL}
                    target="_blank"
                    rel="noopener"
                    className="block w-full text-center rounded-xl bg-blue-500 text-white font-bold py-4 px-6 hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl mb-4"
                    aria-label="Купить полную систему со скидкой 70% — 19 евро"
                    onClick={() => console.log("offer_cta_click")}
                  >
                    Получить со скидкой 70%
                  </a>

                  <div className="text-xs text-gray-300 mb-6">
                    Без скрытых платежей · Пожизненный доступ · Обновления включены
                  </div>

                  {/* Что входит */}
                  <div className="text-left mb-6">
                    <h3 className="text-lg font-bold text-white mb-3 text-center">
                      Что входит:
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-200">
                      {[
                        "Готовые диалоги для всех ситуаций",
                        "Шаблоны под конкретную услугу",
                        "Бонус: гайд по работе с базой (27€)",
                        "Бонус: 30+ источников клиентов (32€)",
                        "Бонус: продажи на консультации (20€)",
                        "Пожизненный доступ и обновления",
                      ].map((t, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0">✓</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Способы оплаты */}
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <div className="px-2 py-1 bg-black text-white rounded">
                      Apple Pay
                    </div>
                    <div className="px-2 py-1 bg-white/20 text-white rounded">
                      Google Pay
                    </div>
                    <div className="px-2 py-1 bg-white/20 text-white rounded">
                      Visa
                    </div>
                    <div className="px-2 py-1 bg-white/20 text-white rounded">
                      MasterCard
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Отзывы клиентов
          </h2>

          {/* Главный видео-отзыв (прогрев скриптов) */}
          <div className="mt-12 text-center">
            <div className="max-w-md mx-auto mb-8">
              <div className="rounded-2xl border-2 border-blue-500 p-4 bg-white hover:shadow-lg transition-all duration-300">
                <div className="text-lg font-bold text-blue-600 mb-3">
                  🎥 Прогрев скриптов
                </div>
                <div className="relative bg-black rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.instagram.com/reel/DJjUiEnM-A_/embed"
                    width="100%"
                    height="400"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                    className="w-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* 4 фото-отзыва */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[1, 2, 3, 4].map((reviewNum) => (
              <div 
                key={reviewNum}
                className="rounded-2xl overflow-hidden border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={`/images/reviews/review${reviewNum}.jpg`}
                  alt={`Отзыв ${reviewNum}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>

          {/* Остальные видео-отзывы */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
            {[
              "https://www.instagram.com/reel/DJmUkiNsZe1",
              "https://www.instagram.com/reel/DFX57cQobmS",
              "https://www.instagram.com/reel/DJoAXfKs6tu",
              "https://www.instagram.com/reel/DNG1lAPoCF7",
              "https://www.instagram.com/reel/DGmY70NIwz7"
            ].map((href, i) => (
              <div
                key={i}
                className="rounded-xl border p-4 hover:bg-blue-50 transition-all duration-300 bg-white hover:shadow-md hover:-translate-y-1"
              >
                <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <iframe
                    src={`${href}/embed`}
                    width="100%"
                    height="200"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                    className="w-full"
                  ></iframe>
                </div>
                <div className="text-sm font-medium text-gray-800 text-center">
                  Видео-отзыв #{i + 2}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Частые вопросы
          </h2>

          <div className="space-y-4 mt-12">
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
            ].map((f, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-8 py-6 text-left hover:bg-gray-100 flex justify-between items-center transition-all duration-300 hover:shadow-sm"
                >
                  <span className="font-semibold text-lg text-gray-900">
                    {f.q}
                  </span>
                  <span className={`w-5 h-5 text-gray-400 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}>⌄</span>
                </button>
                {openFaq === i && (
                  <div className="px-8 py-6 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-200 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xl font-bold text-gray-900 mb-4">
            Beauty Scripts
          </div>
          <p className="text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      {/* Sticky CTA (мобилка) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 lg:hidden">
        <a
          href={STRIPE_URL}
          target="_blank"
          rel="noopener"
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold text-center block hover:bg-gray-800 transition-all hover:scale-105"
        >
          Готовые скрипты — 19€ • Купить сейчас
        </a>
      </div>
    </div>
  );
}
