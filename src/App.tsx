import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronDown,
  Gift,
} from "lucide-react";

// TODO: вставь свою ссылку Stripe
const STRIPE_URL = "#stripe-payment-link";

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  // ==== Таймер -70% (24 часа с момента захода) ====
  const DEADLINE_TS = useMemo(() => {
    const key = "bs_deadline_ts";
    const saved = localStorage.getItem(key);
    if (saved) return Number(saved);
    const ts = Date.now() + 24 * 60 * 60 * 1000; // +24ч
    localStorage.setItem(key, String(ts));
    return ts;
  }, []);
  const [left, setLeft] = useState(DEADLINE_TS - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(DEADLINE_TS - Date.now()), 1000);
    return () => clearInterval(t);
  }, [DEADLINE_TS]);
  const hh = Math.max(0, Math.floor(left / 3600000));
  const mm = Math.max(0, Math.floor((left % 3600000) / 60000));
  const ss = Math.max(0, Math.floor((left % 60000) / 1000));

  // Плавные появления секций
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((p) => ({ ...p, [entry.target.id]: true }));
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal='1']").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Вспомогательные стили (анимации/блески) */}
      <style>{`
        @keyframes pulse-soft { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
        .animate-pulse-soft{animation:pulse-soft 2.2s ease-in-out infinite}
        @keyframes shimmer {
          0% { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
        .btn-gradient {
          background: linear-gradient(90deg, #ffffff 0, #f4f7ff 50%, #ffffff 100%);
          background-size: 300% 100%;
          animation: shimmer 3.5s linear infinite;
        }
        .sparkles:before, .sparkles:after{
          content:"";
          position:absolute; inset:0; pointer-events:none;
          background:
           radial-gradient(rgba(255,255,255,.9),transparent 40%) -10px -10px/120px 120px,
           radial-gradient(rgba(255,255,255,.7),transparent 40%) 60% 30%/160px 160px,
           radial-gradient(rgba(255,255,255,.6),transparent 40%) 80% 70%/140px 140px;
          mix-blend-mode:screen; opacity:.4;
        }
      `}</style>

      {/* Шапка */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold">Beauty Scripts</div>
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
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div data-reveal="1" id="hero-text" className={`${isVisible["hero-text"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} transition-all duration-700`}>
            <h1 className="mb-6 text-4xl font-bold leading-tight lg:text-5xl xl:text-6xl text-center lg:text-left">
              Скрипты, которые превращают сообщения{" "}
              <span className="text-blue-600">в деньги</span>
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-gray-700 text-center lg:text-left">
              Проверенная система общения с клиентами для бьюти-мастеров.
              Результат: закрытые возражения, увеличенный средний чек,
              экономия времени на переписке.
            </p>
            <div className="mb-2 flex justify-center lg:justify-start">
              <a
                href={STRIPE_URL}
                className="inline-flex items-center gap-3 rounded-xl bg-gray-900 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800"
              >
                Купить
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 lg:justify-start">
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

          <div data-reveal="1" id="hero-image" className={`${isVisible["hero-image"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} relative transition-all duration-700 delay-100`}>
            <img
              src="/images/hero.jpg"
              alt="Beauty Scripts Hero"
              className="h-auto w-full rounded-2xl shadow-xl object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800";
              }}
            />
            <div className="absolute -right-4 -top-4 rounded-xl bg-white p-4 shadow-lg">
              <div className="text-2xl font-bold">19€</div>
              <div className="text-sm text-gray-500">Полный доступ</div>
            </div>
          </div>
        </div>
      </section>

      {/* СРАВНЕНИЕ: Как изменится ваша работа с клиентами */}
      <section id="comparison" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-4 text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">
              Как изменится ваша{" "}
              <span className="text-blue-600">работа с клиентами</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Сравните результаты до и после внедрения скриптов
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2" data-reveal="1" id="compare-cards">
            {/* СЕЙЧАС */}
            <div className={`${isVisible["compare-cards"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-700`}>
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                  <XCircle className="h-4 w-4" />
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
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="mt-1 h-5 w-5 shrink-0 text-red-500" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ПОСЛЕ */}
            <div className={`${isVisible["compare-cards"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-700 delay-100`}>
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
                  <CheckCircle className="h-4 w-4" />
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
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ ЭТО ВАЖНО */}
      <section id="why" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">
              Почему это <span className="text-blue-600">важно</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Каждая потерянная заявка — это упущенная прибыль
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-8 md:grid-cols-3">
            {/* ВАЖНО: иконки с GitHub → public/images/*.png, без фона, крупнее */}
            <div className="rounded-2xl border p-6 text-center">
              <img src="/images/money.png" alt="" className="mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 font-semibold">Сливаются деньги на рекламу</h3>
              <p className="text-gray-600">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>
            <div className="rounded-2xl border p-6 text-center">
              <img src="/images/time.png" alt="" className="mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 font-semibold">Тратится время впустую</h3>
              <p className="text-gray-600">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>
            <div className="rounded-2xl border p-6 text-center">
              <img src="/images/leads.png" alt="" className="mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 font-semibold">Заявки уходят к конкуренту</h3>
              <p className="text-gray-600">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* КОМУ ПОДХОДЯТ */}
      <section id="audience" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold lg:text-4xl">
            Кому подходят <span className="text-blue-600">скрипты</span>
          </h2>

          <div className="mx-auto mt-10 grid max-w-5xl gap-8 md:grid-cols-2">
            {[
              {
                icon: "/images/salon.png",
                title: "Владельцам салонов и студий",
                text: "Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.",
              },
              {
                icon: "/images/clinic.png",
                title: "Медицинским центрам",
                text: "Админы закрывают заявки, врачи работают с реальными пациентами.",
              },
              {
                icon: "/images/master.png",
                title: "Мастерам-универсалам",
                text: "Ответы на типовые ситуации → быстрее к записи, увереннее в чате.",
              },
              {
                icon: "/images/specialist.png",
                title: "Узким специалистам",
                text: "Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.",
              },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex items-center gap-3">
                  <img src={c.icon} alt="" className="h-10 w-10" />
                  <h3 className="text-xl font-bold">{c.title}</h3>
                </div>
                <p className="text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ВХОДИТ В СИСТЕМУ СКРИПТОВ */}
      <section id="whats-included" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Полный набор инструментов для увеличения продаж
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "/images/dialogues.png",
                title: "Готовые диалоги",
                text: "Контакты до оплаты: приветствия, презентация ценности, запись — всё пошагово.",
              },
              {
                icon: "/images/objections.png",
                title: "Закрытие возражений",
                text: "«Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления.",
              },
              {
                icon: "/images/per-service.png",
                title: "Под каждую услугу",
                text: "Маникюр, брови, ресницы, косметология, массаж — учтена специфика каждой ниши.",
              },
              {
                icon: "/images/return.png",
                title: "Возврат клиентов",
                text: "Сценарии повторных записей и реактивации «спящей» базы без рекламы.",
              },
              {
                icon: "/images/guide.png",
                title: "Гайд по внедрению",
                text: "Старт за один день: пошаговый план + стандарты для команды.",
              },
              {
                icon: "/images/result.png",
                title: "Итог",
                text: "Больше записей, выше средний чек, меньше времени в переписке.",
              },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border p-8">
                <img src={c.icon} alt="" className="mb-6 h-10 w-10" />
                <h3 className="mb-3 text-xl font-bold">{c.title}</h3>
                <p className="text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БОНУСЫ (празднично) */}
      <section id="bonuses" className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="sparkles absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">Бонусы при покупке</h2>
            <p className="mt-3 text-gray-700">
              Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              {
                title: "Гайд «Работа с клиентской базой»",
                text: "Повторные записи без рекламы → возвращайте старых клиентов.",
                old: "27€",
              },
              {
                title: "Чек-лист «30+ источников клиентов»",
                text: "Платные и бесплатные способы → где взять заявки уже сегодня.",
                old: "32€",
              },
              {
                title: "Гайд «Продажи на консультации»",
                text: "5 этапов продаж → мягкий апсейл дополнительных услуг.",
                old: "20€",
              },
            ].map((b, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50">
                  <Gift className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{b.title}</h3>
                <p className="mb-4 text-gray-600">{b.text}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-bold text-gray-400 line-through">
                    {b.old}
                  </span>
                  <span className="text-xl font-extrabold text-blue-600">0€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ИЗМЕНИТСЯ СРАЗУ */}
      <section id="immediate" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold lg:text-4xl">
            Что <span className="text-green-600">изменится сразу</span>
          </h2>
          <div className="space-y-6">
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-lg font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -70% СДЕЛКА + ТАЙМЕР */}
      <section id="deal" className="relative overflow-hidden bg-blue-700 py-20 text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(white,transparent 60%)" }} />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-extrabold lg:text-5xl">
            Получите полную систему со скидкой <span className="animate-pulse-soft">70%</span>
          </h2>

          {/* Таймер */}
          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-3 rounded-2xl bg-white/10 p-3">
            {[
              { label: "час", val: hh },
              { label: "мин", val: mm },
              { label: "сек", val: ss },
            ].map((b, i) => (
              <div key={i} className="w-24 rounded-xl bg-black/20 px-3 py-2">
                <div className="text-3xl font-extrabold tabular-nums">{String(b.val).padStart(2, "0")}</div>
                <div className="text-xs opacity-80">{b.label}</div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-lg text-blue-100">
            Все скрипты + бонусы. Полная система для увеличения продаж.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-6 rounded-3xl bg-white/5 p-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white/0 p-6">
              <div className="text-5xl font-extrabold tracking-tight">
                <span className="opacity-70 line-through mr-3">67€</span>
                <span className="">19€</span>
              </div>
              <ul className="mt-6 space-y-3 text-left text-blue-50">
                <li>Готовые диалоги для всех ситуаций</li>
                <li>Шаблоны под конкретную услугу</li>
                <li className="flex items-center gap-2">
                  <Gift className="h-5 w-5" /> Бонус: гайд по работе с базой (27€)
                </li>
                <li className="flex items-center gap-2">
                  <Gift className="h-5 w-5" /> Бонус: 30+ источников клиентов (32€)
                </li>
                <li className="flex items-center gap-2">
                  <Gift className="h-5 w-5" /> Бонус: продажи на консультации (20€)
                </li>
                <li>Пожизненный доступ и обновления</li>
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/0 p-6">
              <a
                href={STRIPE_URL}
                className="btn-gradient inline-block w-full rounded-2xl px-8 py-4 text-lg font-bold text-blue-900 transition hover:opacity-90"
              >
                Получить со скидкой 70%
              </a>
              <div className="mt-1 flex items-center justify-center gap-2 text-xs text-blue-100">
                <span className="rounded bg-black px-2 py-1 text-white">Apple Pay</span>
                <span className="rounded bg-blue-600 px-2 py-1 text-white">Google Pay</span>
                <span className="rounded bg-white/20 px-2 py-1">Visa</span>
                <span className="rounded bg-white/20 px-2 py-1">MasterCard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="reviews" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold lg:text-4xl">Отзывы клиентов</h2>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-4">
            {["rev1.jpg", "rev2.jpg", "rev3.jpg", "rev4.jpg"].map((f) => (
              <img key={f} src={`/images/${f}`} alt="" className="h-64 w-full rounded-2xl object-cover" />
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <p className="text-sm text-gray-600">Видео-отзывы в Instagram:</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {[
                "https://instagram.com/your_video_1",
                "https://instagram.com/your_video_2",
                "https://instagram.com/your_video_3",
                "https://instagram.com/your_video_4",
                "https://instagram.com/your_video_5",
                "https://instagram.com/your_video_6",
              ].map((u, i) => (
                <a key={i} href={u} className="truncate rounded border px-3 py-2 text-sm text-blue-600 hover:bg-blue-50">
                  {u}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (оставила как было по смыслу) */}
      <section id="faq" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold lg:text-4xl">Частые вопросы</h2>

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
              <div key={i} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <button
                  onClick={() => toggleFaq(i)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left transition-colors duration-200 hover:bg-gray-50"
                >
                  <span className="text-lg font-semibold">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t border-gray-200 bg-gray-50 px-8 py-6">
                    <p className="leading-relaxed text-gray-700">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Подвал */}
      <footer className="border-t border-gray-200 py-12 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-4 text-xl font-bold">Beauty Scripts</div>
          <p className="text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      {/* Мобильная липкая кнопка */}
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
