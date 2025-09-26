// src/App.tsx
import React, { useEffect, useMemo, useState } from "react";
import "./index.css";

// 👉 ВСТАВЬ ССЫЛКУ STRIPE
const STRIPE_URL = "https://buy.stripe.com/your-link";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path className="text-green-600" strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
    </svg>
  );
}
function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path className="text-red-600" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default function App() {
  // наблюдатель появления секций
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setVisible((p) => ({ ...p, [e.target.id]: true }))),
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-observe]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // минималистичный таймер (отсчёт до ближайших «23:59:59» локального дня)
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const deadline = useMemo(() => {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    return +d;
  }, []);
  const ms = Math.max(0, deadline - now);
  const hours = String(Math.floor(ms / 3_600_000)).padStart(2, "0");
  const minutes = String(Math.floor((ms % 3_600_000) / 60_000)).padStart(2, "0");
  const seconds = String(Math.floor((ms % 60_000) / 1000)).padStart(2, "0");

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">Beauty Scripts</div>
          <a
            href={STRIPE_URL}
            className="rounded-xl bg-gray-900 px-6 py-2.5 font-semibold text-white hover:bg-gray-800 transition"
          >
            Купить
          </a>
        </div>
      </header>

      {/* HERO (шрифты/стили не меняем визуально) */}
      <section className="pt-24 pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div data-observe id="hero" className={`transition duration-700 ${visible["hero"] ? "opacity-100" : "opacity-0"}`}>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              Скрипты, которые превращают сообщения <span className="text-blue-600">в деньги</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Проверенная система общения с клиентами для бьюти-мастеров. Результат: закрытые возражения, увеличенный
              средний чек, экономия времени на переписке.
            </p>
            <a
              href={STRIPE_URL}
              className="inline-flex items-center gap-3 rounded-xl bg-gray-900 px-8 py-4 text-lg font-semibold text-white hover:bg-gray-800 transition"
            >
              Купить
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
            <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <CheckIcon /> Доступ сразу
              </span>
              <div className="flex items-center gap-2">
                <span className="rounded px-2 py-1 bg-black text-white text-xs font-medium">Apple Pay</span>
                <span className="rounded px-2 py-1 bg-blue-600 text-white text-xs font-medium">Google Pay</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/hero.jpg"
              alt="Hero"
              className="w-full h-auto rounded-2xl shadow-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800";
              }}
            />
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">19€</div>
              <div className="text-sm text-gray-500">Полный доступ</div>
            </div>
          </div>
        </div>
      </section>

      {/* КАК ИЗМЕНИТСЯ РАБОТА С КЛИЕНТАМИ */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Как изменится ваша <span className="text-blue-600">работа с клиентами</span>
            </h2>
            <p className="mt-3 text-gray-600">Сравните результаты до и после внедрения скриптов</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Сейчас */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-red-600 font-medium text-sm">
                  <CrossIcon /> Сейчас
                </span>
              </div>
              <ul className="space-y-4 text-gray-800">
                {[
                  "«Сколько стоит?» → Отвечаете только ценой и тишина.",
                  "«Подумаю» → Не знаете, что ответить — клиент уходит.",
                  "«Переписка 30+ минут» → Клиент остывает — теряете заявку.",
                  "«10 заявок» → Долгие диалоги — только 2–3 записи.",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1"><CrossIcon /></span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* После */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-green-600 font-medium text-sm">
                  <CheckIcon /> После
                </span>
              </div>
              <ul className="space-y-4 text-gray-800">
                {[
                  "«Сколько стоит?» → Презентуете ценность → запись.",
                  "«Подумаю» → Мягкое возражение → возвращаете к записи.",
                  "«Переписка 5 минут» → Готовые фразы → быстрая запись.",
                  "«10 заявок» → Чёткие диалоги → 6–7 записей.",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1"><CheckIcon /></span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ ЭТО ВАЖНО (иконки с GitHub, без цветного фона, крупнее) */}
      <section className="py-20 bg-white" id="why">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Почему это <span className="text-blue-600">важно</span>
            </h2>
            <p className="mt-3 text-gray-600">Каждая потерянная заявка — это упущенная прибыль</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img src="/images/money.png" alt="" className="mx-auto w-14 h-14 object-contain" />
              <h3 className="mt-4 font-semibold">Сливаются деньги на рекламу</h3>
              <p className="mt-2 text-gray-600">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>
            <div className="text-center">
              <img src="/images/time.png" alt="" className="mx-auto w-14 h-14 object-contain" />
              <h3 className="mt-4 font-semibold">Тратится время впустую</h3>
              <p className="mt-2 text-gray-600">По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.</p>
            </div>
            <div className="text-center">
              <img src="/images/competitor.png" alt="" className="mx-auto w-14 h-14 object-contain" />
              <h3 className="mt-4 font-semibold">Заявки уходят к конкуренту</h3>
              <p className="mt-2 text-gray-600">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* КОМУ ПОДХОДЯТ (2x2, иконки из GitHub) */}
      <section className="py-20 bg-gray-50" id="for">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Кому подходят <span className="text-blue-600">скрипты</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "owners.png",
                title: "Владельцам салонов и студий",
                text: "Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.",
              },
              {
                icon: "med.png",
                title: "Медицинским центрам",
                text: "Админы закрывают заявки, врачи работают с реальными пациентами.",
              },
              {
                icon: "universal.png",
                title: "Мастерам-универсалам",
                text: "Ответы на типовые ситуации → быстрее к записи, увереннее в чате.",
              },
              {
                icon: "niche.png",
                title: "Узким специалистам",
                text: "Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.",
              },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 border hover:shadow-lg transition">
                <div className="flex items-center gap-4">
                  <img src={`/images/${c.icon}`} className="w-12 h-12 object-contain" alt="" />
                  <h3 className="text-xl font-bold">{c.title}</h3>
                </div>
                <p className="mt-4 text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ВХОДИТ (3x2, иконки из GitHub) */}
      <section className="py-20 bg-white" id="whats-included">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
            <p className="mt-3 text-gray-600">Полный набор инструментов для увеличения продаж</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "dialogs.png",
                title: "Готовые диалоги",
                desc: "Контакты до оплаты: приветствия, презентация ценности, запись — всё пошагово.",
              },
              {
                icon: "objections.png",
                title: "Закрытие возражений",
                desc: "«Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления.",
              },
              {
                icon: "per-service.png",
                title: "Под каждую услугу",
                desc: "Маникюр, брови, ресницы, косметология, массаж — учтена специфика каждой ниши.",
              },
              {
                icon: "retention.png",
                title: "Возврат клиентов",
                desc: "Сценарии повторных записей и реактивации «спящей» базы без рекламы.",
              },
              {
                icon: "guide.png",
                title: "Гайд по внедрению",
                desc: "Старт за один день: пошаговый план + стандарты для команды.",
              },
              {
                icon: "result.png",
                title: "Итог",
                desc: "Больше записей, выше средний чек, меньше времени в переписке.",
              },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl bg-gray-50 p-8 border">
                <img src={`/images/${c.icon}`} className="w-12 h-12 object-contain" alt="" />
                <h3 className="mt-4 text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БОНУСЫ (празднично: лёгкий градиент + «искра») */}
      <section className="py-20 relative overflow-hidden" id="bonuses">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50" />
        <div className="pointer-events-none absolute inset-0 animate-[sparkle_6s_linear_infinite] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.7)_0,transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,.6)_0,transparent_35%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,.5)_0,transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Бонусы при покупке</h2>
            <p className="mt-3 text-gray-700">Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "bonus-base.png",
                title: "Гайд «Работа с клиентской базой»",
                desc: "Повторные записи без рекламы → возвращайте старых клиентов.",
                priceFrom: "27€",
              },
              {
                icon: "bonus-sources.png",
                title: "Чек-лист «30+ источников клиентов»",
                desc: "Платные и бесплатные способы → где взять заявки уже сегодня.",
                priceFrom: "32€",
              },
              {
                icon: "bonus-consult.png",
                title: "Гайд «Продажи на консультации»",
                desc: "5 этапов продаж → мягкий апсейл дополнительных услуг.",
                priceFrom: "20€",
              },
            ].map((b, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 border text-center shadow-sm">
                <img src={`/images/${b.icon}`} className="mx-auto w-16 h-16 object-contain" alt="" />
                <h3 className="mt-4 text-xl font-bold">{b.title}</h3>
                <p className="mt-2 text-gray-600">{b.desc}</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-gray-400 line-through font-semibold">{b.priceFrom}</span>
                  <span className="font-extrabold">0€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ИЗМЕНИТСЯ СРАЗУ (оставили) */}
      <section className="py-20 bg-gray-50" id="immediate">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Что <span className="text-blue-600">изменится сразу</span>
            </h2>
          </div>
          <div className="space-y-6">
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <span className="mt-1"><CheckIcon /></span>
                <span className="text-lg font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БЛОК ОПЛАТЫ (-70%) + ТАЙМЕР */}
      <section className="py-20 bg-white" id="pricing">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Получите полную систему со скидкой 70%</h2>
          </div>

          <div className="rounded-3xl border bg-gradient-to-br from-neutral-50 to-neutral-100 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Левый: состав/подробности */}
              <div>
                <div className="inline-flex items-center gap-3 rounded-xl bg-white px-4 py-2 shadow-sm border">
                  <span className="text-sm font-semibold tracking-tight">Осталось до конца дня</span>
                  <span className="text-lg font-extrabold tabular-nums tracking-wide">
                    {hours}:{minutes}:{seconds}
                  </span>
                </div>

                <ul className="mt-6 space-y-3 text-gray-800">
                  {[
                    "Все скрипты + бонусы",
                    "Полная система для увеличения продаж",
                    "Готовые диалоги для всех ситуаций",
                    "Шаблоны под конкретную услугу",
                    "Бонус: гайд по работе с базой (27€)",
                    "Бонус: 30+ источников клиентов (32€)",
                    "Бонус: продажи на консультации (20€)",
                    "Пожизненный доступ и обновления",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1"><CheckIcon /></span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Правый: цена + CTA */}
              <div className="rounded-2xl bg-white p-8 shadow-sm border">
                <div className="text-sm text-gray-500">Цена сегодня</div>
                <div className="mt-2 flex items-end gap-4">
                  <span className="text-3xl text-gray-400 line-through">67€</span>
                  <span className="text-5xl font-extrabold tracking-tight">19€</span>
                </div>
                <a
                  href={STRIPE_URL}
                  className="mt-6 block w-full rounded-xl bg-gray-900 py-4 text-center text-white text-lg font-semibold hover:bg-gray-800 transition"
                >
                  Получить со скидкой 70%
                </a>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <span className="rounded bg-black px-2 py-1 text-white">Apple Pay</span>
                  <span className="rounded bg-blue-600 px-2 py-1 text-white">Google Pay</span>
                  <span className="rounded border px-2 py-1">Visa</span>
                  <span className="rounded border px-2 py-1">MasterCard</span>
                </div>
                <p className="mt-3 text-center text-gray-500 text-sm">Моментальный доступ после оплаты</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ: 4 фото + 6 ссылок на инстаграм */}
      <section className="py-20 bg-gray-50" id="reviews">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Отзывы клиентов</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {["review1.jpg", "review2.jpg", "review3.jpg", "review4.jpg"].map((f, i) => (
              <img key={i} src={`/images/${f}`} alt="" className="w-full h-56 object-cover rounded-xl border bg-white" />
            ))}
          </div>

          <div className="mt-10">
            <h3 className="text-center font-semibold mb-4">Видео-отзывы (Instagram)</h3>
            <div className="grid md:grid-cols-3 gap-4 text-blue-600 underline">
              {[
                "https://instagram.com/your-video-1",
                "https://instagram.com/your-video-2",
                "https://instagram.com/your-video-3",
                "https://instagram.com/your-video-4",
                "https://instagram.com/your-video-5",
                "https://instagram.com/your-video-6",
              ].map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noreferrer" className="truncate">
                  {url}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — как было */}
      <section id="faq" className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Частые вопросы</h2>
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
              <details key={i} className="rounded-2xl border bg-gray-50 p-4 open:bg-white open:shadow-sm">
                <summary className="cursor-pointer list-none font-semibold text-lg">{faq.q}</summary>
                <p className="mt-2 text-gray-700">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Beauty Scripts
        </div>
      </footer>

      {/* Мобильный липкий CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 lg:hidden">
        <a
          href={STRIPE_URL}
          className="block w-full rounded-xl bg-gray-900 py-4 text-center font-semibold text-white hover:bg-gray-800 transition"
        >
          Готовые скрипты — 19€ • Купить сейчас
        </a>
      </div>

      {/* CSS для «искр» в бонусах */}
      <style>{`
        @keyframes sparkle {
          0% { transform: translateY(0); opacity: .6 }
          50% { opacity: .9 }
          100% { transform: translateY(-10px); opacity: .6 }
        }
      `}</style>
    </div>
  );
}
