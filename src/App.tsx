// src/App.tsx
import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronDown,
  Gift,
} from "lucide-react";

// TODO: вставь свою ссылку Stripe
const STRIPE_URL = "https://buy.stripe.com/...";

// Простой таймер «ограниченного времени» (по умолчанию ~72 часа)
function useCountdown(hours = 72) {
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
  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);
  const { h, m, s, finished } = useCountdown(72);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">Beauty Scripts</div>
          <a
            href={STRIPE_URL}
            target="_blank"
            rel="noopener"
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            aria-label="Купить скрипты"
            onClick={() => console.log("offer_cta_click")}
          >
            Купить
          </a>
        </div>
      </header>

      {/* HERO — шрифты/стили оставлены, тексты обновлены */}
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900 text-center lg:text-left">
                Скрипты, которые превращают{" "}
                <span className="text-blue-600">сообщения в деньги</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed text-center lg:text-left">
                Проверенная система общения с клиентами для бьюти-мастеров.
                Результат: закрытые возражения, увеличенный средний чек,
                экономия времени на переписке.
              </p>
              <div className="mb-6 text-center lg:text-left">
                <a
                  href={STRIPE_URL}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5"
                >
                  Купить <ArrowRight className="w-5 h-5" />
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

      {/* СРАВНЕНИЕ: «Как изменится работа с клиентами» */}
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
            {/* Сейчас (красная заливка) */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium text-sm">
                  <XCircle className="w-4 h-4" />
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
                    <XCircle className="w-5 h-5 mt-1 text-red-500" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* После (зелёная заливка) */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full font-medium text-sm">
                  <CheckCircle className="w-4 h-4" />
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-800">
                {[
                  "«Сколько стоит?» → Презентуете ценность → запись.",
                  "«Подумаю» → Мягкое возражение → возвращаете к записи.",
                  "«Переписка 5 минут» → Готовые фразы → быстрая запись.",
                  "«10 заявок» → Чёткие диалоги → 6–7 записей.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 text-green-600" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ ЭТО ВАЖНО — 3 карточки, иконки из /public/images */}
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
            {/* Иконки: положи файлы в /public/images */}
            <div className="rounded-2xl border p-8 text-center">
              <img
                src="/images/money.png"
                alt="Сливаются деньги"
                className="mx-auto mb-6 w-16 h-16 object-contain"
              />
              <h3 className="font-semibold text-lg">Сливаются деньги на рекламу</h3>
              <p className="mt-2 text-gray-600">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные —
                выброшенный бюджет.
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
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
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
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро
                и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* КОМУ ПОДХОДЯТ СКРИПТЫ — 2х2, иконки из /public/images */}
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
                text:
                  "Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.",
              },
              {
                img: "/images/med.png",
                title: "Медицинским центрам",
                text:
                  "Админы закрывают заявки, врачи работают с реальными пациентами.",
              },
              {
                img: "/images/team.png",
                title: "Мастерам-универсалам",
                text:
                  "Ответы на типовые ситуации → быстрее к записи, увереннее в чате.",
              },
              {
                img: "/images/one.png",
                title: "Узким специалистам",
                text:
                  "Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.",
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

      {/* ЧТО ВХОДИТ В СИСТЕМУ — 3x2, иконки из /public/images */}
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
                desc:
                  "Контакты до оплаты: приветствия, презентация ценности, запись — всё пошагово.",
              },
              {
                img: "/images/target.png",
                title: "Закрытие возражений",
                desc:
                  "«Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления.",
              },
              {
                img: "/images/salons.png",
                title: "Под каждую услугу",
                desc:
                  "Маникюр, брови, ресницы, косметология, массаж — учтена специфика каждой ниши.",
              },
              {
                img: "/images/bucle.png",
                title: "Возврат клиентов",
                desc:
                  "Сценарии повторных записей и реактивации «спящей» базы без рекламы.",
              },
              {
                img: "/images/phone.png",
                title: "Гайд по внедрению",
                desc:
                  "Старт за один день: пошаговый план + стандарты для команды.",
              },
              {
                img: "/images/rocket",
                title: "Итог",
                desc:
                  "Больше записей, выше средний чек, меньше времени в переписке.",
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

      {/* БОНУСЫ — празднично, но минималистично; иконки не из GitHub */}
      <section id="bonuses" className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-50/40 via-pink-50/40 to-purple-50/40" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Бонусы при покупке <span className="align-middle">🎉</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                color: "orange",
                title: "Гайд «Работа с клиентской базой»",
                desc:
                  "Повторные записи без рекламы → возвращайте старых клиентов.",
                old: "27€",
              },
              {
                color: "green",
                title: "Чек-лист «30+ источников клиентов»",
                desc:
                  "Платные и бесплатные способы → где взять заявки уже сегодня.",
                old: "32€",
              },
              {
                color: "blue",
                title: "Гайд «Продажи на консультации»",
                desc: "5 этапов продаж → мягкий апсейл дополнительных услуг.",
                old: "20€",
              },
            ].map((b, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 text-center bg-white shadow-sm border`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-${b.color}-50`}
                >
                  <Gift className={`w-8 h-8 text-${b.color}-600`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{b.title}</h3>
                <p className="mt-2 text-gray-600">{b.desc}</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-lg font-bold text-gray-400 line-through">
                    {b.old}
                  </span>
                  <span className={`text-xl font-bold text-${b.color}-600`}>
                    0€
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ИЗМЕНИТСЯ СРАЗУ — оставляем как было по смыслу */}
      <section id="immediate" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Что <span className="text-blue-600">изменится</span> сразу
          </h2>

          <div className="space-y-6 mt-12">
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ.",
            ].map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl"
              >
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-lg font-medium text-gray-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ОФФЕР -70% + таймер, акценты */}
      <section id="offer" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
              Получите полную систему со скидкой{" "}
              <span className="text-blue-600">70%</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Специальное предложение на этой неделе · Предложение действует
              ограниченное время
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {/* PriceCard */}
            <div className="rounded-3xl p-8 bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-lg">
              <div className="text-sm uppercase tracking-wide opacity-90">
                Полный доступ
              </div>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-gray-300 line-through text-2xl">67€</span>
                <span className="text-5xl font-extrabold">19€</span>
              </div>

              {/* Таймер */}
              <div className="mt-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                  {!finished ? (
                    <>
                      <span className="text-white/80 text-sm">⏳ До конца:</span>
                      <span className="font-semibold tabular-nums">
                        {String(h).padStart(2, "0")}:
                        {String(m).padStart(2, "0")}:
                        {String(s).padStart(2, "0")}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold">Время истекло</span>
                  )}
                </div>
              </div>

              <a
                href={STRIPE_URL}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-block w-full text-center rounded-xl bg-white text-blue-700 font-semibold py-4 hover:opacity-90 transition"
                aria-label="Купить полную систему со скидкой 70% — 19 евро"
                onClick={() => console.log("offer_cta_click")}
              >
                Получить со скидкой 70%
              </a>

              <div className="mt-3 text-xs text-white/90">
                Без скрытых платежей · Пожизненный доступ · Обновления включены
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs opacity-90">
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

            {/* WhatYouGet */}
            <div className="rounded-3xl p-8 border">
              <h3 className="text-lg font-bold text-gray-900">
                Что входит
              </h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                {[
                  "Готовые диалоги для всех ситуаций",
                  "Шаблоны под конкретную услугу",
                  "Бонус: гайд по работе с базой (27€)",
                  "Бонус: 30+ источников клиентов (32€)",
                  "Бонус: продажи на консультации (20€)",
                  "Пожизненный доступ и обновления",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 text-green-600" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Composition */}
            <div className="rounded-3xl p-8 border">
              <h3 className="text-lg font-bold text-gray-900">
                Состав предложения
              </h3>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-gray-400" />
                  <span>Все скрипты + бонусы</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-gray-400" />
                  <span>Полная система для увеличения продаж</span>
                </li>
              </ul>

              <a
                href={STRIPE_URL}
                target="_blank"
                rel="noopener"
                className="mt-8 inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline"
                onClick={() => console.log("offer_cta_click")}
              >
                Перейти к оплате <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ — 4 фото + 6 ссылок на Instagram */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Отзывы клиентов
          </h2>

          {/* 4 фото-отзыва из /public/images/reviews/… */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[1, 2, 3, 4].map((n) => (
              <img
                key={n}
                src={`/images/reviews/${n}.jpg`}
                alt={`Отзыв ${n}`}
                className="w-full h-64 object-cover rounded-2xl border"
              />
            ))}
          </div>

          {/* 6 ссылок на видео из Instagram */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              "#insta-video-1",
              "#insta-video-2",
              "#insta-video-3",
              "#insta-video-4",
              "#insta-video-5",
              "#insta-video-6",
            ].map((href, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener"
                className="rounded-xl border p-4 hover:bg-gray-50"
              >
                Видео-отзыв #{i + 1}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — оставлено близко к твоей версии */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Частые вопросы
          </h2>

          <div className="space-y-4 mt-12">
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
            ].map((f, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-8 py-6 text-left hover:bg-gray-100 flex justify-between items-center transition-colors"
                >
                  <span className="font-semibold text-lg text-gray-900">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
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
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold text-center block hover:bg-gray-800 transition-colors"
        >
          Готовые скрипты — 19€ • Купить сейчас
        </a>
      </div>
    </div>
  );
}
