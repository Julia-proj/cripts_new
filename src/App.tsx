import React, { useState, useEffect } from "react"; 
import InstaEmbed from "./components/InstaEmbed";

// TODO: вставь свою ссылку Stripe
const STRIPE_URL = "https://buy.stripe.com/5kQdRb8cbglMf7E7dSdQQ00";

/** публичные рилсы; важен завершающий слэш, без utm */
const INSTAGRAM_REELS: string[] = [
  "https://www.instagram.com/reel/DJjUiEnM-A_/",
  "https://www.instagram.com/reel/DJSHB73ogs1/",
  "https://www.instagram.com/reel/DJmUkiNsZe1/",
  "https://www.instagram.com/reel/DJoAXfKs6tu/",
  "https://www.instagram.com/reel/DFX57cQobmS/"
];

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

// Мелкая метка блока: цифра + тонкая линия (на десктопе слева)
function SectionMarker({ n }: { n: string }) {
  return (
    <div className="hidden lg:block section-marker" aria-hidden="true">
      <span className="marker-number">{n}</span>
      <span className="marker-line" />
      <style jsx>{`
        .section-marker{
          position:absolute; left:0; top:0.25rem;
          transform: translateX(-48px);
          display:flex; align-items:center; gap:10px;
        }
        .marker-number{
          font-weight:700; font-size:11px; letter-spacing:.12em;
          color: rgba(148, 163, 184, 0.6);
        }
        .marker-line{
          display:inline-block; width:32px; height:1px;
          background: linear-gradient(90deg, rgba(203, 213, 225, 0.5) 0%, transparent 100%);
        }
      `}</style>
    </div>
  );
}

// Lightbox для отзывов (фото)
function ReviewLightbox({ isOpen, onClose, imageSrc, reviewNumber }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="max-w-2xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
        >
          ✕
        </button>
        <img
          src={imageSrc}
          alt={`Отзыв ${reviewNumber}`}
          className="w-full h-auto rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}

// Полоска прогресса прокрутки
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

/** Хелпер: безопасная подсветка ключевых фраз внутри описаний */
function HighlightedDesc({
  text,
  primaryHighlight,
  extraPhrases = []
}: { text: string; primaryHighlight?: string; extraPhrases?: string[]; }) {
  // Экранируем HTML
  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  let html = escapeHtml(text);

  // Основной хайлайт (как раньше)
  if (primaryHighlight) {
    const ph = escapeHtml(primaryHighlight);
    html = html.replace(
      new RegExp(ph.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      `<span class="text-blue-600 font-semibold">${ph}</span>`
    );
  }

  // Доп. фразы: «без давления», «каждой ниши»
  for (const phrase of extraPhrases) {
    const p = escapeHtml(phrase);
    html = html.replace(
      new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      `<span class="text-blue-600 font-semibold">${p}</span>`
    );
  }

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [viewersCount, setViewersCount] = useState(8);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [lightboxReviewNumber, setLightboxReviewNumber] = useState(1);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);
  const { h, m, s, finished } = useCountdown(12);

  // Динамический счетчик посетителей (4-15 человек) — только визуальный
  useEffect(() => {
    const interval = setInterval(() => {
      setViewersCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(4, Math.min(15, newCount));
      });
    }, 12000 + Math.random() * 8000);
    return () => clearInterval(interval);
  }, []);

  const openLightbox = (imageSrc: string, reviewNumber: number) => {
    setLightboxImage(imageSrc);
    setLightboxReviewNumber(reviewNumber);
    setLightboxOpen(true);
  };

  // === Только анимация заголовков (h1/h2) — мягкая и гармоничная ===
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("head-in");
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll<HTMLElement>(".js-heading").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Lightbox */}
      <ReviewLightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={lightboxImage}
        reviewNumber={lightboxReviewNumber}
      />

      {/* Progress bar */}
      <ScrollProgress />

      <style jsx global>{`
        @media (max-width: 1023px) {
          .result-subtitle::before {
            width: 50px;
          }
        }
      `}</style>

      {/* Floating online counter — только на десктопе, слева внизу */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/90 backdrop-blur-md px-4 py-3 rounded-full shadow-lg border border-gray-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">{viewersCount} онлайн</span>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">Beauty Scripts</div>
          <div className="flex items-center gap-4">
            <a
              href={STRIPE_URL}
              target="_blank"
              rel="noopener"
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all hover:scale-105 transform hover:shadow-lg"
              aria-label="Купить скрипты"
              onClick={() => console.log("offer_cta_click")}
            >
              Купить
            </a>
          </div>
        </div>
      </header>

      {/* ===== HERO: фото фоном с адаптацией ===== */}
      <section
        className="relative min-h-[88vh] flex items-center pt-24 hero-bg"
      >
        {/* лёгкая подложка под текст только на мобиле, чтобы не «синить» фото */}
        <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-white/70 via-white/40 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl bg-white/0">
            <h1 className="js-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-5 text-gray-900">
              Скрипты, которые превращают <span className="text-blue-600">сообщения в деньги</span>
            </h1>
            {/* Подзаголовок с результатами выделен отдельно */}
            <div className="result-subtitle mb-6">
              <p className="text-lg lg:text-xl text-gray-800 font-semibold leading-relaxed">
               Проверенная система общения с клиентами для бьюти-мастеров 
            </div>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Результат: закрытые возражения, увеличенный средний чек, экономия времени
            </p>
            <div className="flex items-center gap-4">
              <a
                href={STRIPE_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-3 px-7 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Купить <span className="inline-block ml-1">→</span>
              </a>
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="px-2 py-1 bg-black text-white rounded">Apple Pay</span>
                <span className="px-2 py-1 bg-blue-600 text-white rounded">Google Pay</span>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .hero-bg{
            background-image: url('/images/IMG_6243.png');
            background-size: cover;
            background-position: center;
          }
          @media (min-width: 1024px){
            .hero-bg{
              background-position: right center;
            }
          }
          .result-subtitle {
            position: relative;
            padding-top: 12px;
            margin-top: 8px;
          }
          .result-subtitle::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, rgba(96, 165, 250, 0.6) 0%, transparent 100%);
          }
        `}</style>
      </section>

      {/* ===== 01 — СРАВНЕНИЕ ===== */}
      <section id="comparison" className="relative py-20 bg-gray-50">
        <SectionMarker n="01" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-2">
            <h2 className="js-heading text-3xl lg:text-4xl font-bold text-gray-900">
              Как изменится ваша <span className="text-blue-600">работа с клиентами</span>
            </h2>
            <p className="mt-3 text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>
              Сравните результаты до и после внедрения скриптов
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal-up">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium text-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Сейчас
                </div>
              </div>
              <ul className="space-y-4 text-gray-800">
                {[
                  "«Сколько стоит?» → Отвечаете только ценой и тишина.",
                  "«Подумаю» → Не знаете, что ответить: клиент уходит.",
                  "«Переписка 30+ минут» → Клиент остывает, теряете заявку.",
                  "«10 заявок» → Долгие диалоги приводят только к 2–3 записям.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 hover:bg-red-50 p-2 rounded-lg transition-colors">
                    <svg className="w-5 h-5 mt-1 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal-up" style={{animationDelay:"120ms"}}>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-50 text-green-600 rounded-full font-medium text-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-800">
                {[
                  "«Сколько стоит?» → Презентуете ценность, получаете запись.",
                  "«Подумаю» → Мягкое возражение возвращает к записи.",
                  "«Переписка 5 минут» → Готовые фразы ведут к быстрой записи.",
                  "«10 заявок» → Чёткие диалоги дают 6–7 записей.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 hover:bg-green-50 p-2 rounded-lg transition-colors">
                    <svg className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 02 — ПОЧЕМУ ЭТО ВАЖНО ===== */}
      <section id="why" className="relative py-20 bg-white">
        <SectionMarker n="02" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="js-heading text-3xl lg:text-4xl font-bold text-gray-900">
              Почему это <span className="text-blue-600">важно</span>
            </h2>
            <p className="mt-3 text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>
              Каждая потерянная заявка — это упущенная прибыль
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="rounded-2xl border p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal-up">
              <img
                src="/images/money.png"
                alt="Сливаются деньги"
                className="mx-auto mb-6 w-16 h-16 object-contain"
              />
              <h3 className="font-semibold text-base">Сливаются деньги на рекламу</h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>
            <div className="rounded-2xl border p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal-up" style={{animationDelay:"120ms"}}>
              <img
                src="/images/clock.png"
                alt="Тратится время"
                className="mx-auto mb-6 w-16 h-16 object-contain"
              />
              <h3 className="font-semibold text-base">Тратится время впустую</h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>
            <div className="rounded-2xl border p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal-up" style={{animationDelay:"200ms"}}>
              <img
                src="/images/door.png"
                alt="Уходят к конкуренту"
                className="mx-auto mb-6 w-16 h-16 object-contain"
              />
              <h3 className="font-semibold text-base">Заявки уходят к конкуренту</h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                Пока вы думаете, клиент записывается к тем, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 03 — КОМУ ПОДХОДИТ ===== */}
      <section id="for" className="relative py-20 bg-gray-50">
        <SectionMarker n="03" />
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="js-heading text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Кому подходят <span className="text-blue-600">скрипты</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
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
                text: "Ответы на типовые ситуации ведут быстрее к записи, увереннее в чате.",
              },
              {
                img: "/images/one.png",
                title: "Узким специалистам",
                text: "Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="who-card bg-white rounded-2xl p-6 border-2 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 reveal-up"
                style={{animationDelay: `${i*80}ms`}}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={c.img}
                    alt=""
                    className="w-12 h-12 object-contain"
                  />
                  <h3 className="text-lg font-bold text-gray-900">{c.title}</h3>
                </div>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 04 — ЧТО ВХОДИТ ===== */}
      <section id="whats-included" className="relative py-20 bg-white">
        <SectionMarker n="04" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="js-heading text-3xl lg:text-4xl font-bold text-gray-900">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
            <p className="mt-3 text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>Полный набор инструментов для увеличения продаж</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              {
                img: "/images/xmind.png",
                title: "Готовые диалоги",
                desc: "Контакты до оплаты: приветствия, презентация ценности, запись. Всё пошагово.",
                highlight: "презентация ценности"
              },
              {
                img: "/images/target.png",
                title: "Закрытие возражений",
                desc: "«Дорого», «Подумаю», «У другого дешевле». Мягкие ответы без давления.",
                highlight: "мягкие ответы без давления"
              },
              {
                img: "/images/salons.png",
                title: "Под каждую услугу",
                desc: "Маникюр, брови, ресницы, косметология, массаж. Учтена специфика каждой ниши.",
                highlight: "учтена специфика каждой ниши"
              },
              {
                img: "/images/bucle.png",
                title: "Возврат клиентов",
                desc: "Сценарии повторных записей и реактивации «спящей» базы без рекламы.",
                highlight: "реактивации «спящей» базы без рекламы"
              },
              {
                img: "/images/phone.png",
                title: "Гайд по внедрению",
                desc: "Старт за один день: пошаговый план и стандарты для команды.",
                highlight: "Старт за один день"
              },
              {
                img: "/images/rocket.png",
                title: "Итог",
                desc: "Больше записей, выше средний чек, меньше времени в переписке.",
                highlight: "выше средний чек"
              },
            ].map((item, k) => (
              <div key={k} className="rounded-2xl border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal-up" style={{animationDelay:`${k*80}ms`}}>
                <img src={item.img} alt="" className="w-10 h-10 object-contain mb-4" />
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  <HighlightedDesc
                    text={item.desc}
                    primaryHighlight={item.highlight}
                    extraPhrases={["без давления", "каждой ниши"]}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 05 — БОНУСЫ ===== */}
      <section id="bonuses" className="relative py-20 bg-gray-50 overflow-hidden">
        <SectionMarker n="05" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-50/30 via-rose-50/25 to-amber-50/30" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center">
            <h2 className="js-heading text-3xl lg:text-4xl font-bold text-gray-900">
              <span className="text-blue-600">Бонусы</span> при покупке
            </h2>
            <p className="mt-3 text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { image: "/images/bonus1.png", title: "Гайд «Работа с клиентской базой»", desc: "Повторные записи без рекламы → возвращайте старых клиентов.", old: "27€" },
              { image: "/images/bonus2.png", title: "Чек-лист «30+ источников клиентов»", desc: "Платные и бесплатные способы → где взять заявки уже сегодня.", old: "32€" },
              { image: "/images/bonus3.png", title: "Гайд «Продажи на консультации»", desc: "5 этапов продаж → мягкий апсейл дополнительных услуг.", old: "20€" },
            ].map((b, i) => (
              <div key={i} className="rounded-2xl p-6 text-center bg-white shadow-sm border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 reveal-up" style={{animationDelay:`${i*100}ms`}}>
                <div className="mb-4">
                  <img src={b.image} alt={`Бонус ${i + 1}`} className="w-28 h-36 mx-auto object-cover rounded-lg" />
                </div>
                <h3 className="text-base font-bold text-gray-900">{b.title}</h3>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">{b.desc}</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-base font-bold text-gray-400 line-through">{b.old}</span>
                  <span className="text-lg font-bold text-green-600">0€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 06 — ЧТО ИЗМЕНИТСЯ СРАЗУ ===== */}
      <section id="immediate" className="relative py-20 bg-white">
        <SectionMarker n="06" />
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="js-heading text-3xl lg:text-4xl font-bold text-center text-gray-900">
            <span className="text-blue-600">Что изменится сразу</span>
          </h2>

          <div className="space-y-6 mt-12">
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal-up" style={{animationDelay:`${i*80}ms`}}>
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg font-medium text-gray-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 07 — ОТЗЫВЫ (фото + Reels Instagram) ===== */}
      <section id="reviews" className="relative py-20 bg-gray-50">
        <SectionMarker n="07" />
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="js-heading text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
            Отзывы клиентов
          </h2>

          {/* 4 фото-отзыва (кликабельно в лайтбокс) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="group cursor-pointer reveal-up" style={{animationDelay:`${n*60}ms`}}>
                <img
                  src={`/images/reviews/review${n}.png`}
                  alt={`Отзыв ${n}`}
                  className="w-full h-64 object-cover rounded-2xl border hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] hover:border-blue-300"
                  onClick={() => openLightbox(`/images/reviews/review${n}.png`, n)}
                />
              </div>
            ))}
          </div>

          {/* Reels Instagram: карточки 9:16, без растяжения */}
          <div className="flex gap-4 justify-center items-start mb-8 overflow-x-auto pb-2 reels-row">
            {INSTAGRAM_REELS.map((url, idx) => (
              <div
                key={url}
                className="reel-card rounded-xl overflow-hidden border-2 border-gray-200 shadow-md flex-shrink-0 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                style={{animationDelay:`${idx*100}ms`}}
              >
                <InstaEmbed url={url} maxWidth={260} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 08 — ОФФЕР ===== */}
      <section id="offer" className="relative py-20 bg-white">
        <SectionMarker n="08" />
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="js-heading text-3xl lg:text-4xl font-extrabold text-gray-900">
              Полная система со скидкой <span className="text-blue-600">70%</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500 reveal-up" style={{animationDelay:"120ms"}}>
              Специальное предложение на этой неделе • Предложение действует ограниченное время
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="rounded-3xl p-8 bg-slate-800 text-white shadow-2xl relative overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 reveal-up">
              {/* Декор */}
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
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 hover:bg-orange-600 transition-colors">
                      <span className="text-white">⏰</span>
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

                  {/* CTA */}
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
                    Без скрытых платежей • Пожизненный доступ • Обновления включены
                  </div>

                  {/* Что входит */}
                  <div className="text-left mb-6">
                    <h3 className="text-lg font-bold text-white mb-3 text-center">Что входит:</h3>
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
                    <div className="px-2 py-1 bg-black text-white rounded">Apple Pay</div>
                    <div className="px-2 py-1 bg-white/20 text-white rounded">Google Pay</div>
                    <div className="px-2 py-1 bg-white/20 text-white rounded">Visa</div>
                    <div className="px-2 py-1 bg-white/20 text-white rounded">MasterCard</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 09 — FAQ ===== */}
      <section id="faq" className="relative py-20 bg-white">
        <SectionMarker n="09" />
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="js-heading text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Частые вопросы
          </h2>

          <div className="space-y-4 mt-12">
            {[
              { q: "Сработает в моей нише?", a: "Да. База универсальная и блоки под ногти/бровы/ресницы/волосы/косметологию/перманент." },
              { q: "Не будет ли звучать «по-скриптовому»?", a: "Нет. Формулировки живые, адаптируешь под свой тон. Главное — следовать алгоритму." },
              { q: "Зачем это админам?", a: "Единый стандарт повышает конверсию, скорость и управляемость. Новички включаются быстрее." },
              { q: "Когда будут результаты?", a: "Часто в первые 24 часа: готовые фразы экономят время и быстрее ведут к записи." },
            ].map((f, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 hover:shadow-lg transition-all duration-300 reveal-up" style={{animationDelay:`${i*80}ms`}}>
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-8 py-6 text-left hover:bg-gray-100 flex justify-between items-center transition-colors"
                >
                  <span className="font-semibold text-lg text-gray-900">{f.q}</span>
                  <span className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}>⌄</span>
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
          <div className="text-xl font-bold text-gray-900 mb-4">Beauty Scripts</div>
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

      {/* CSS: анимации, snap и Reels-карточки + ТОЛЬКО заголовки */}
      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-in-left { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slide-in-right { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes zoom-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

        /* Мягкая последовательная подача (уже была для контента) */
        .reveal-up { 
          opacity: 0; 
          animation: fade-in 0.8s ease-out forwards;
        }

        .reels-row { scroll-snap-type: x mandatory; }
        .reels-row > * { scroll-snap-align: center; }

        /* Современные компактные карточки для Reels без растягивания */
        .reel-card {
          width: 180px;
          height: 320px;
        }
        @media (min-width: 640px){
          .reel-card {
            width: 220px;
            height: 391px;
          }
        }
        @media (min-width: 1024px){
          .reel-card {
            width: 260px;
            height: 462px;
          }
        }
        .reel-card :global(iframe) {
          width: 100% !important;
          height: 100% !important;
          display: block;
          border: none;
        }
        .reel-card :global(img) {
          width: 100% !important;
          height: 100% !important;
          display: block;
          object-fit: cover;
        }

        /* === Только заголовки (h1/h2) — без подчёркиваний и доп. выделений === */
        .js-heading{
          opacity: 0;
          transform: translateY(14px);
          transition: opacity .7s ease, transform .7s ease;
          will-change: opacity, transform;
        }
        .js-heading.head-in{
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
