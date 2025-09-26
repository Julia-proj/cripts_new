// src/App.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

// TODO: вставь ссылку на оплату Stripe
const STRIPE_URL = "https://buy.stripe.com/...";

// простой таймер «ограниченного времени» (считает от загрузки страницы, напр. 48 часов)
const useCountdown = (hours = 48) => {
  const target = useMemo(() => Date.now() + hours * 60 * 60 * 1000, [hours]);
  const [remain, setRemain] = useState(target - Date.now());

  useEffect(() => {
    const id = setInterval(() => setRemain(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);

  const total = Math.max(0, remain);
  const hh = Math.floor(total / 1000 / 60 / 60);
  const mm = Math.floor((total / 1000 / 60) % 60);
  const ss = Math.floor((total / 1000) % 60);
  return { hh, mm, ss, done: total <= 0 };
};

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { hh, mm, ss } = useCountdown(48);

  const toggleFaq = (i: number) => setOpenFaq((p) => (p === i ? null : i));

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900 text-center lg:text-left">
                Скрипты, которые превращают сообщения{" "}
                <span className="text-blue-600">в деньги</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed text-center lg:text-left">
                Проверенная система общения с клиентами для бьюти-мастеров. Результат: закрытые возражения, увеличенный средний чек, экономия времени на переписке.
              </p>
              <div className="mb-6 flex justify-center lg:justify-start">
                <a
                  href={STRIPE_URL}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5"
                >
                  Купить
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500 justify-center lg:justify-start">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
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

      {/* КАК ИЗМЕНИТСЯ РАБОТА С КЛИЕНТАМИ */}
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Как изменится ваша <span className="text-blue-600">работа с клиентами</span>
            </h2>
          </div>
          <p className="text-center text-gray-600 mb-12">
            Сравните результаты до и после внедрения скриптов.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Сейчас */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium text-sm">
                  <XCircle className="w-4 h-4" />
                  Сейчас
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                {[
                  "«Сколько стоит?» → Отвечаете только ценой и тишина.",
                  "«Подумаю» → Не знаете, что ответить — клиент уходит.",
                  "«Переписка 30+ минут» → Клиент остывает — теряете заявку.",
                  "«10 заявок» → Долгие диалоги — только 2–3 записи.",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 mt-1 text-red-500 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* После */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full font-medium text-sm">
                  <CheckCircle className="w-4 h-4" />
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                {[
                  "«Сколько стоит?» → Презентуете ценность → запись.",
                  "«Подумаю» → Мягкое возражение → возвращаете к записи.",
                  "«Переписка 5 минут» → Готовые фразы → быстрая запись.",
                  "«10 заявок» → Чёткие диалоги → 6–7 записей.",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 text-green-600 shrink-0" />
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
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Почему это <span className="text-blue-600">важно</span>
            </h2>
          </div>
          <p className="text-center text-gray-600 mb-12">
            Каждая потерянная заявка — это упущенная прибыль.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border text-center">
              <img
                src="/images/money.png"
                alt="Сливаются деньги"
                className="h-10 w-10 mx-auto mb-4"
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                Сливаются деньги на рекламу
              </h3>
              <p className="text-gray-600">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border text-center">
              <img
                src="/images/time.png"
                alt="Тратится время"
                className="h-10 w-10 mx-auto mb-4"
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                Тратится время впустую
              </h3>
              <p className="text-gray-600">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border text-center">
              <img
                src="/images/competitor.png"
                alt="Заявки уходят к конкуренту"
                className="h-10 w-10 mx-auto mb-4"
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                Заявки уходят к конкуренту
              </h3>
              <p className="text-gray-600">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* КОМУ ПОДХОДЯТ СКРИПТЫ */}
      <section id="for" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Кому подходят <span className="text-blue-600">скрипты</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "/images/salon.png",
                title: "Владельцам салонов и студий",
                text:
                  "Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.",
              },
              {
                icon: "/images/medical.png",
                title: "Медицинским центрам",
                text:
                  "Админы закрывают заявки, врачи работают с реальными пациентами.",
              },
              {
                icon: "/images/master.png",
                title: "Мастерам-универсалам",
                text:
                  "Ответы на типовые ситуации → быстрее к записи, увереннее в чате.",
              },
              {
                icon: "/images/specialist.png",
                title: "Узким специалистам",
                text:
                  "Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border hover:shadow-lg hover:-translate-y-1 transition"
              >
                <div className="flex items-start gap-4">
                  <img src={c.icon} alt="" className="h-10 w-10 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{c.title}</h3>
                    <p className="text-gray-600 mt-3">{c.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ВХОДИТ В СИСТЕМУ СКРИПТОВ */}
      <section id="whats-included" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
          </div>
          <p className="text-center text-gray-600 mb-12">
            Полный набор инструментов для увеличения продаж.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "/images/dialogs.png",
                title: "Готовые диалоги",
                desc:
                  "Контакты до оплаты: приветствия, презентация ценности, запись — всё пошагово.",
              },
              {
                icon: "/images/objections.png",
                title: "Закрытие возражений",
                desc:
                  "«Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления.",
              },
              {
                icon: "/images/services.png",
                title: "Под каждую услугу",
                desc:
                  "Маникюр, брови, ресницы, косметология, массаж — учтена специфика каждой ниши.",
              },
              {
                icon: "/images/return.png",
                title: "Возврат клиентов",
                desc:
                  "Сценарии повторных записей и реактивации «спящей» базы без рекламы.",
              },
              {
                icon: "/images/guide.png",
                title: "Гайд по внедрению",
                desc:
                  "Старт за один день: пошаговый план + стандарты для команды.",
              },
              {
                icon: "/images/result.png",
                title: "Итог",
                desc:
                  "Больше записей, выше средний чек, меньше времени в переписке.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition"
              >
                <img src={c.icon} alt="" className="h-10 w-10 mb-5" />
                <h3 className="text-xl font-bold text-gray-900">{c.title}</h3>
                <p className="text-gray-600 mt-3">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БОНУСЫ (празднично, но минималистично) */}
      <section id="bonuses" className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10"
             style={{backgroundImage:"radial-gradient(circle at 20% 10%, #60a5fa 0, transparent 30%), radial-gradient(circle at 80% 30%, #34d399 0, transparent 30%), radial-gradient(circle at 50% 90%, #f59e0b 0, transparent 30%)"}}/>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Бонусы при покупке 🎉</h2>
          </div>
          <p className="text-center text-gray-600 mb-12">
            Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                color: "bg-orange-50",
                iconColor: "text-orange-600",
                title: "Гайд «Работа с клиентской базой»",
                text:
                  "Повторные записи без рекламы → возвращайте старых клиентов.",
                old: "27€",
              },
              {
                color: "bg-green-50",
                iconColor: "text-green-600",
                title: "Чек-лист «30+ источников клиентов»",
                text:
                  "Платные и бесплатные способы → где взять заявки уже сегодня.",
                old: "32€",
              },
              {
                color: "bg-blue-50",
                iconColor: "text-blue-600",
                title: "Гайд «Продажи на консультации»",
                text: "5 этапов продаж → мягкий апсейл дополнительных услуг.",
                old: "20€",
              },
            ].map((b, i) => (
              <div key={i} className={`${b.color} rounded-2xl p-8 text-center shadow-sm`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-white`}>
                  {/* «иконки подарков» разного цвета */}
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-10 h-10 ${b.iconColor}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
                    <path d="M4 8h16v4H4z" />
                    <path d="M12 22V8" />
                    <path d="M12 8c-1.5-3-6-3-6 0 0 1.1.9 2 2 2h4" />
                    <path d="M12 8c1.5-3 6-3 6 0 0 1.1-.9 2-2 2h-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{b.title}</h3>
                <p className="text-gray-600 mt-3 mb-4">{b.text}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-bold text-gray-400 line-through">
                    {b.old}
                  </span>
                  <span className={`text-xl font-bold ${b.iconColor.replace("text-", "text-")}`}>0€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ИЗМЕНИТСЯ СРАЗУ (оставляем по смыслу как было) */}
      <section id="immediate" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              <span className="text-blue-600">Что</span> изменится сразу
            </h2>
          </div>
          <div className="space-y-6">
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl">
                <span className="w-6 h-6 rounded-full flex items-center justify-center mt-1 bg-green-100">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </span>
                <span className="text-lg text-gray-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ОФФЕР – скидка 70% + таймер + платежные иконки */}
      <section id="offer" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Получите полную систему со скидкой <span className="text-blue-600">70%</span>
            </h2>
          </div>
          <p className="text-center text-sm text-gray-500 mb-10">
            <span className="inline-block rounded-full border px-3 py-1">
              Специальное предложение на этой неделе • Предложение действует ограниченное время
            </span>
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* PriceCard */}
            <div className="bg-white rounded-2xl p-8 border">
              <div className="text-sm text-gray-500">Цена</div>
              <div className="flex items-end gap-3 mt-3">
                <span className="text-2xl text-gray-400 line-through">67€</span>
                <span className="text-5xl font-extrabold text-blue-600">19€</span>
              </div>

              <div className="mt-6">
                <div className="text-xs uppercase text-gray-500">Ограниченное время</div>
                <div className="mt-1 inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-blue-700 font-semibold">
                  ⏳ {String(hh).padStart(2, "0")}:{String(mm).padStart(2, "0")}:
                  {String(ss).padStart(2, "0")}
                </div>
              </div>

              <a
                href={STRIPE_URL}
                target="_blank"
                rel="noopener"
                aria-label="Купить полную систему со скидкой 70% — 19 евро"
                className="mt-8 block w-full rounded-xl bg-blue-600 py-4 text-white font-semibold text-center hover:opacity-90 transition"
              >
                Получить со скидкой 70%
              </a>

              <div className="mt-4 flex items-center gap-3 justify-center opacity-70">
                {/* монохромные иконки оплат */}
                <span className="text-xs border rounded px-2 py-1">Apple Pay</span>
                <span className="text-xs border rounded px-2 py-1">Google Pay</span>
                <span className="text-xs border rounded px-2 py-1">Visa</span>
                <span className="text-xs border rounded px-2 py-1">MasterCard</span>
              </div>

              <div className="mt-3 text-center text-xs text-gray-500">
                Без скрытых платежей · Пожизненный доступ · Обновления включены
              </div>
            </div>

            {/* WhatYouGet */}
            <div className="bg-white rounded-2xl p-8 border">
              <div className="text-sm text-gray-500 mb-3">Что входит</div>
              <ul className="space-y-3">
                {[
                  "Готовые диалоги для всех ситуаций",
                  "Шаблоны под конкретную услугу",
                  "Бонус: гайд по работе с базой (27€)",
                  "Бонус: 30+ источников клиентов (32€)",
                  "Бонус: продажи на консультации (20€)",
                  "Пожизненный доступ и обновления",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 text-green-600 shrink-0" />
                    <span className="text-gray-800">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Composition */}
            <div className="bg-white rounded-2xl p-8 border">
              <div className="text-sm text-gray-500 mb-3">Состав</div>
              <div className="space-y-3">
                <div className="rounded-md bg-gray-50 px-3 py-2">Все скрипты + бонусы</div>
                <div className="rounded-md bg-gray-50 px-3 py-2">Полная система для увеличения продаж</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Отзывы клиентов</h2>
          </div>

          {/* 4 фото-отзыва */}
          <div className="grid md:grid-cols-4 gap-4 mb-10">
            {["review1.jpg", "review2.jpg", "review3.jpg", "review4.jpg"].map((f) => (
              <img
                key={f}
                src={`/images/${f}`}
                alt="Отзыв"
                className="rounded-xl border object-cover w-full h-56"
              />
            ))}
          </div>

          {/* 6 видео-ссылок из Instagram */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-blue-600 underline">
            {[
              "https://www.instagram.com/p/xxxxxxxxx/",
              "https://www.instagram.com/p/xxxxxxxxx/",
              "https://www.instagram.com/p/xxxxxxxxx/",
              "https://www.instagram.com/p/xxxxxxxxx/",
              "https://www.instagram.com/p/xxxxxxxxx/",
              "https://www.instagram.com/p/xxxxxxxxx/",
            ].map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener" className="truncate">
                Видео-отзыв {i + 1}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (оставляем как было по структуре) */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Частые вопросы</h2>
          </div>

          {[
            {
              q: "Сработает в моей нише?",
              a:
                "Да. База универсальная + блоки под ногти/брови/ресницы/волосы/косметологию/перманент.",
            },
            {
              q: "Не будет ли звучать «по-скриптовому»?",
              a:
                "Нет. Формулировки живые, адаптируешь под свой тон. Главное — следовать алгоритму.",
            },
            {
              q: "Зачем это админам?",
              a:
                "Единый стандарт повышает конверсию, скорость и управляемость. Новички включаются быстрее.",
            },
            {
              q: "Когда будут результаты?",
              a:
                "Часто — в первые 24 часа: готовые фразы экономят время и быстрее ведут к записи.",
            },
          ].map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden bg-white mb-4">
              <button
                onClick={() => toggleFaq(i)}
                className="w-full px-8 py-6 text-left hover:bg-gray-50 flex justify-between items-center"
              >
                <span className="font-semibold text-lg text-gray-900">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
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
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-200 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xl font-bold text-gray-900 mb-2">Beauty Scripts</div>
          <p className="text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      {/* Sticky CTA (мобилка) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 lg:hidden">
        <a
          href={STRIPE_URL}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-center block hover:opacity-90 transition"
        >
          Получить со скидкой 70% — 19€
        </a>
      </div>
    </div>
  );
}

export default App;
