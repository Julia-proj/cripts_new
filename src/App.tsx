// src/App.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  XCircle,
} from "lucide-react";

// === ВСТАВЬ СЮДА СВОЮ ССЫЛКУ НА STRIPE ===
const STRIPE_URL = "#stripe-payment-link";

// ====== Утилита таймера (ограниченное время) ======
function useCountdown(hours = 24) {
  const deadline = useMemo(() => Date.now() + hours * 60 * 60 * 1000, [hours]);
  const [left, setLeft] = useState(deadline - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, deadline - Date.now())), 1000);
    return () => clearInterval(t);
  }, [deadline]);
  const s = Math.floor(left / 1000);
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return { hh, mm, ss, done: left <= 0 };
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const { hh, mm, ss } = useCountdown(24);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.isIntersecting &&
          setIsVisible((p) => ({ ...p, [e.target.id]: true }))
        ),
      { threshold: 0.1 }
    );
    document.querySelectorAll<HTMLElement>("[id]").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (i: number) => setOpenFaq((v) => (v === i ? null : i));

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold text-gray-900">Beauty Scripts</div>
          <a
            href={STRIPE_URL}
            className="rounded-lg bg-gray-900 px-6 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-gray-800"
          >
            Купить
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-white pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div
              id="hero-text"
              className={`transition-all duration-1000 ${
                isVisible["hero-text"]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 lg:text-5xl xl:text-6xl">
                Скрипты, которые превращают сообщения{" "}
                <span className="text-blue-600">в деньги</span>
              </h1>
              <p className="mb-8 text-xl leading-relaxed text-gray-600">
                Проверенная система общения с клиентами для бьюти-мастеров.
                Результат: закрытые возражения, увеличенный средний чек,
                экономия времени на переписке.
              </p>

              <div className="mb-6">
                <a
                  href={STRIPE_URL}
                  className="inline-flex items-center gap-3 rounded-xl bg-gray-900 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800"
                >
                  Купить
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Доступ сразу
                </span>
                <div className="flex items-center gap-2">
                  <div className="rounded bg-black px-2 py-1 text-xs font-medium text-white">
                    Apple Pay
                  </div>
                  <div className="rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                    Google Pay
                  </div>
                </div>
              </div>
            </div>

            <div
              id="hero-image"
              className={`delay-300 transition-all duration-1000 ${
                isVisible["hero-image"]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="relative">
                <img
                  src="/images/hero.jpg"
                  alt="Beauty Scripts Hero"
                  className="h-auto w-full rounded-2xl shadow-xl"
                />
                <div className="absolute -right-4 -top-4 rounded-xl bg-white p-4 shadow-lg">
                  <div className="text-2xl font-bold text-gray-900">19€</div>
                  <div className="text-sm text-gray-500">Полный доступ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* КАК ИЗМЕНИТСЯ РАБОТА */}
      <section id="comparison" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-2 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl">
              Как изменится <span className="text-blue-600">работа с клиентами</span>
            </h2>
            <p className="text-lg text-gray-600">
              Сравните результаты до и после внедрения скриптов
            </p>
          </div>

          <div
            className={`mx-auto mb-4 grid max-w-5xl gap-8 lg:grid-cols-2 ${
              isVisible["comparison"] ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* СЕЙЧАС (красная) */}
            <div
              className={`rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-1000 ${
                isVisible["comparison"]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                  <XCircle className="h-4 w-4" />
                  Сейчас
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 text-red-500" />
                  <span>«Сколько стоит?» → отвечаете только ценой и тишина.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 text-red-500" />
                  <span>«Подумаю» → не знаете, что ответить — клиент уходит.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 text-red-500" />
                  <span>«Переписка 30+ минут» → клиент остывает — теряете заявку.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 text-red-500" />
                  <span>«10 заявок» → долгие диалоги — только 2–3 записи.</span>
                </li>
              </ul>
            </div>

            {/* ПОСЛЕ (зелёная) */}
            <div
              className={`rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-1000 delay-200 ${
                isVisible["comparison"]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                  <span>«Сколько стоит?» → презентуете ценность → запись.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                  <span>«Подумаю» → мягкое возражение → возвращаете к записи.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                  <span>«Переписка 5 минут» → готовые фразы → быстрая запись.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                  <span>«10 заявок» → чёткие диалоги → 6–7 записей.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ ЭТО ВАЖНО */}
      <section id="why" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl">
              Почему это <span className="text-blue-600">важно</span>
            </h2>
            <p className="text-lg text-gray-600">
              Каждая потерянная заявка — это упущенная прибыль
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border p-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                <img src="/images/money.png" alt="" className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-center text-lg font-semibold">
                Сливаются деньги на рекламу
              </h3>
              <p className="text-center text-gray-600">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные —
                выброшенный бюджет.
              </p>
            </div>

            <div className="rounded-2xl border p-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                <img src="/images/clock.png" alt="" className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-center text-lg font-semibold">
                Тратится время впустую
              </h3>
              <p className="text-center text-gray-600">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>

            <div className="rounded-2xl border p-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                <img src="/images/door.png" alt="" className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-center text-lg font-semibold">
                Заявки уходят к конкуренту
              </h3>
              <p className="text-center text-gray-600">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро
                и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* КОМУ ПОДХОДЯТ */}
      <section id="for" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            Кому подходят <span className="text-blue-600">скрипты</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                img: "/images/owner.png",
                title: "Владельцам салонов и студий",
                text:
                  "Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.",
              },
              {
                img: "/images/clinic.png",
                title: "Медицинским центрам",
                text:
                  "Админы закрывают заявки, врачи работают с реальными пациентами.",
              },
              {
                img: "/images/universal.png",
                title: "Мастерам-универсалам",
                text:
                  "Ответы на типовые ситуации → быстрее к записи, увереннее в чате.",
              },
              {
                img: "/images/specialist.png",
                title: "Узким специалистам",
                text:
                  "Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
                  <img src={c.img} alt="" className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{c.title}</h3>
                <p className="text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ВХОДИТ В СИСТЕМУ */}
      <section id="whats-included" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-2 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
            <p className="text-lg text-gray-600">
              Полный набор инструментов для увеличения продаж
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                img: "/images/dialogs.png",
                title: "Готовые диалоги",
                desc:
                  "Контакты до оплаты: приветствия, презентация ценности, запись — всё пошагово.",
              },
              {
                img: "/images/objections.png",
                title: "Закрытие возражений",
                desc:
                  "«Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления.",
              },
              {
                img: "/images/services.png",
                title: "Под каждую услугу",
                desc:
                  "Маникюр, брови, ресницы, косметология, массаж — учтена специфика каждой ниши.",
              },
              {
                img: "/images/return.png",
                title: "Возврат клиентов",
                desc:
                  "Сценарии повторных записей и реактивации «спящей» базы без рекламы.",
              },
              {
                img: "/images/guide.png",
                title: "Гайд по внедрению",
                desc:
                  "Старт за один день: пошаговый план + стандарты для команды.",
              },
              {
                img: "/images/result.png",
                title: "Итог",
                desc:
                  "Больше записей, выше средний чек, меньше времени в переписке.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
                  <img src={c.img} alt="" className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{c.title}</h3>
                <p className="text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БОНУСЫ */}
      <section id="bonuses" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
              Бонусы при покупке 🎉
            </h2>
            <p className="text-lg text-gray-600">
              Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Гайд «Работа с клиентской базой»",
                desc:
                  "Повторные записи без рекламы → возвращайте старых клиентов.",
                was: "27€",
                now: "0€",
              },
              {
                title: "Чек-лист «30+ источников клиентов»",
                desc:
                  "Платные и бесплатные способы → где взять заявки уже сегодня.",
                was: "32€",
                now: "0€",
              },
              {
                title: "Гайд «Продажи на консультации»",
                desc: "5 этапов продаж → мягкий апсейл дополнительных услуг.",
                was: "20€",
                now: "0€",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="group rounded-2xl border bg-white p-8 text-center shadow-[0_0_0_0_rgba(0,0,0,0)] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto mb-6 h-16 w-16 animate-[sparkle_3s_ease_infinite] rounded-2xl bg-gradient-to-br from-pink-50 to-violet-50" />
                <h3 className="mb-3 text-xl font-bold text-gray-900">{b.title}</h3>
                <p className="mb-4 text-gray-600">{b.desc}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-bold text-gray-400 line-through">
                    {b.was}
                  </span>
                  <span className="text-xl font-bold text-blue-600">{b.now}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Festive tiny sparkles (CSS only) */}
        <style>{`
          @keyframes sparkle {
            0%,100%{filter:brightness(1)}
            50%{filter:brightness(1.15)}
          }
        `}</style>
      </section>

      {/* ЧТО ИЗМЕНИТСЯ СРАЗУ (оставляем как было по сути) */}
      <section id="immediate" className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            <span className="text-blue-600">Что</span> изменится сразу
          </h2>
          <div className="space-y-6">
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ.",
            ].map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl bg-gray-50 p-6 shadow-sm"
              >
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-lg font-medium text-gray-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОЛУЧИТЕ ПОЛНУЮ СИСТЕМУ СО СКИДКОЙ 70% */}
      <section id="pricing" className="relative overflow-hidden bg-gray-900 py-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold lg:text-5xl">
            Получите полную систему со скидкой 70%
          </h2>

          {/* Таймер */}
          <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">
            <span className="opacity-80">Осталось:</span>
            <span className="tabular-nums font-semibold">
              {hh}:{mm}:{ss}
            </span>
          </div>

          <p className="mx-auto mb-10 max-w-2xl text-gray-300">
            Все скрипты + бонусы. Полная система для увеличения продаж.
          </p>

          <div className="mx-auto max-w-2xl rounded-3xl bg-white/5 p-8">
            <div className="mb-6 flex items-center justify-center gap-4">
              <span className="text-3xl font-extrabold text-white/80 line-through">
                67€
              </span>
              <span className="text-5xl font-extrabold tracking-tight">19€</span>
            </div>

            <ul className="mx-auto mb-8 grid max-w-xl gap-3 text-left text-white/90">
              {[
                "Готовые диалоги для всех ситуаций.",
                "Шаблоны под конкретную услугу.",
                "Бонус: гайд по работе с базой (27€).",
                "Бонус: 30+ источников клиентов (32€).",
                "Бонус: продажи на консультации (20€).",
                "Пожизненный доступ и обновления.",
              ].map((i, k) => (
                <li key={k} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-400" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>

            <a
              href={STRIPE_URL}
              className="inline-block rounded-xl bg-white px-8 py-4 font-semibold text-gray-900 transition hover:brightness-95"
            >
              Получить со скидкой 70%
            </a>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/80">
              <span className="rounded bg-black px-2 py-1">Apple Pay</span>
              <span className="rounded bg-blue-600 px-2 py-1">Google Pay</span>
              <span className="rounded bg-white/20 px-2 py-1">Visa</span>
              <span className="rounded bg-white/20 px-2 py-1">Mastercard</span>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="reviews" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            Отзывы клиентов
          </h2>

          {/* Слайдер 4 фото-отзыва */}
          <ReviewsCarousel />

          {/* 6 ссылок на Instagram-видео */}
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 text-center text-blue-600 underline md:grid-cols-2">
            {/* ПОДСТАВЬ свои ссылки */}
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              Видео-отзыв 1
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              Видео-отзыв 2
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              Видео-отзыв 3
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              Видео-отзыв 4
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              Видео-отзыв 5
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              Видео-отзыв 6
            </a>
          </div>
        </div>
      </section>

      {/* FAQ (оставили как было по духу) */}
      <section id="faq" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            Частые вопросы
          </h2>

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
          <div key={i} className="mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <button
              onClick={() => toggleFaq(i)}
              className="flex w-full items-center justify-between px-8 py-6 text-left transition-colors duration-200 hover:bg-gray-50"
            >
              <span className="text-lg font-semibold text-gray-900">{faq.q}</span>
              <ChevronDown
                className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                  openFaq === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openFaq === i && (
              <div className="border-t border-gray-200 bg-gray-50 px-8 py-6">
                <p className="leading-relaxed text-gray-600">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
        </div>
      </section>

      {/* Footer + Sticky CTA */}
      <footer className="border-t border-gray-200 bg-white py-12 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-4 text-xl font-bold text-gray-900">
            Beauty Scripts
          </div>
          <p className="text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 lg:hidden">
        <a
          href={STRIPE_URL}
          className="block w-full rounded-xl bg-gray-900 py-4 px-6 text-center font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
        >
          Готовые скрипты — 19€ • Купить сейчас
        </a>
      </div>
    </div>
  );
}

/* ---- Компонент карусели отзывов ---- */
function ReviewsCarousel() {
  const imgs = [
    "/images/review1.jpg",
    "/images/review2.jpg",
    "/images/review3.jpg",
    "/images/review4.jpg",
  ];
  const [i, setI] = useState(0);

  return (
    <div className="mx-auto flex max-w-3xl items-center gap-4">
      <button
        className="hidden rounded-lg border px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 md:block"
        onClick={() => setI((p) => (p - 1 + imgs.length) % imgs.length)}
      >
        ←
      </button>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border bg-white">
        <img
          key={i}
          src={imgs[i]}
          alt={`Отзыв ${i + 1}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {imgs.map((_, k) => (
            <span
              key={k}
              className={`h-1.5 w-6 rounded-full ${
                k === i ? "bg-gray-900" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        className="hidden rounded-lg border px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 md:block"
        onClick={() => setI((p) => (p + 1) % imgs.length)}
      >
        →
      </button>
    </div>
  );
}
