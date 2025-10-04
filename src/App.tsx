import React, { useState, useEffect } from "react";
import InstaEmbed from "./components/InstaEmbed";

const STRIPE_URL = "https://buy.stripe.com/5kQdRb8cbglMf7E7dSdQQ00";

const INSTAGRAM_REELS: string[] = [
  "https://www.instagram.com/reel/DJjUiEnM-A_/",
  "https://www.instagram.com/reel/DJSHB73ogs1/",
  "https://www.instagram.com/reel/DJmUkiNsZe1/",
  "https://www.instagram.com/reel/DJoAXfKs6tu/",
  "https://www.instagram.com/reel/DFX57cQobmS/"
];

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

function SectionMarker({ n }: { n: string }) {
  return (
    <div className="section-marker" aria-hidden="true">
      <span className="marker-number">{n}</span>
      <span className="marker-line" />
      <style jsx>{`
        .section-marker{
          position:absolute;
          left: 1rem;
          top: 1.5rem;
          display:flex;
          align-items:center;
          gap:8px;
          z-index: 10;
        }
        @media (min-width: 1024px){
          .section-marker{
            left:0;
            top:0.25rem;
            transform: translateX(-56px);
            gap:10px;
          }
        }
        .marker-number{
          font-weight:700;
          font-size:11px;
          letter-spacing:.12em;
          color: rgba(168, 181, 192, 0.7);
        }
        @media (min-width: 1024px){
          .marker-number{
            font-size:12px;
          }
        }
        .marker-line{
          display:inline-block;
          width:24px;
          height:1px;
          background: linear-gradient(90deg, rgba(212, 175, 122, 0.4) 0%, transparent 100%);
        }
        @media (min-width: 1024px){
          .marker-line{
            width:36px;
          }
        }
      `}</style>
    </div>
  );
}

function ReviewLightbox({ isOpen, onClose, imageSrc, reviewNumber }: { isOpen: boolean; onClose: () => void; imageSrc: string; reviewNumber: number; }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="max-w-2xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
          aria-label="Закрыть"
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
    <div className="fixed top-0 left-0 w-full h-1 z-50 progress-wrap">
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
      <style jsx>{`
        .progress-wrap { background: rgba(15,23,42,0.04); }
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-good), var(--accent-warn));
          transition: width .25s linear;
        }
      `}</style>
    </div>
  );
}

function HighlightedDesc({
  text,
  primaryHighlight,
  extraPhrases = []
}: { text: string; primaryHighlight?: string; extraPhrases?: string[]; }) {
  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  let html = escapeHtml(text);

  if (primaryHighlight) {
    const ph = escapeHtml(primaryHighlight);
    html = html.replace(
      new RegExp(ph.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      `<span class="highlight-warn">${ph}</span>`
    );
  }

  for (const phrase of extraPhrases) {
    const p = escapeHtml(phrase);
    html = html.replace(
      new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      `<span class="highlight-good">${p}</span>`
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
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);
  const { h, m, s, finished } = useCountdown(12);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = (window.scrollY / document.documentElement.scrollHeight) * 100;
      setShowStickyCTA(scrolled > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = (imageSrc: string, reviewNumber: number) => {
    setLightboxImage(imageSrc);
    setLightboxReviewNumber(reviewNumber);
    setLightboxOpen(true);
  };

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
    <div className="min-h-screen" data-theme="premium">
      <style jsx global>{`
        :root {
          --accent-warn: #7a2f3d; /* тёмно-пудровый бордовый */
          --accent-good: #2e6b4f; /* тёмно-пудровый зелёный */
          --bg-soft: #fafafc; /* чуть не чистый белый */
          --muted: #64748b;
          --text: #0b1220;
        }
        html, body, #__next { height: 100%; }
        body {
          margin: 0;
          font-family: Inter, system-ui, -apple-system, "Helvetica Neue", Arial;
          background: var(--bg-soft);
          color: var(--text);
          -webkit-font-smoothing:antialiased;
          -moz-osx-font-smoothing:grayscale;
        }

        /* icon defaults for inline svgs */
        .icon { width: 34px; height: 34px; stroke: var(--accent-good); fill: none; }
        .icon-muted { stroke: rgba(15,23,42,0.25); }

        .highlight-warn { color: var(--accent-warn); font-weight:700; }
        .highlight-good { color: var(--accent-good); font-weight:700; }

        /* compact card style used across site */
        .card-compact {
          background: #fff;
          border-radius: 12px;
          padding: 12px;
          box-shadow: 0 8px 30px rgba(12,15,20,0.04);
          border: 1px solid rgba(15,23,42,0.04);
        }

        /* more compact grid for mobile */
        .compact-grid {
          display:grid;
          gap:10px;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        }

        /* section number big and subtle */
        .sec-num {
          position:absolute;
          left:0;
          top:8px;
          font-weight:700;
          font-size:56px;
          color: rgba(11,17,28,0.06);
        }
        @media (max-width: 768px) { .sec-num { display:none; } }

        /* headings animation */
        .js-heading{ opacity:0; transform: translateY(14px); transition: opacity .7s ease, transform .7s ease; will-change: opacity, transform;}
        .js-heading.head-in{ opacity:1; transform: translateY(0); }

        /* subtle underline accent style */
        .underline-accent { position: relative; display:inline-block; }
        .underline-accent::after {
          content: ""; position:absolute; left:0; right:0; bottom:-6px; height:6px;
          background: linear-gradient(90deg, rgba(46,107,79,0.12), rgba(122,47,61,0.08));
          border-radius: 6px; transform: skewX(-6deg);
        }

        /* pill style */
        .hero-pill { display:inline-block; background: rgba(255,255,255,0.94); color: var(--text); padding:6px 12px; border-radius:999px; font-weight:600; }

        /* reels responsive sizes */
        .reel-card { width:180px; height:320px; }
        @media(min-width:640px){ .reel-card { width:220px; height:391px; } }
        @media(min-width:1024px){ .reel-card { width:260px; height:462px; } }

        /* small helpers */
        .muted-pill { background: rgba(255,255,255,0.8); padding:6px 8px; border-radius:8px; border:1px solid rgba(15,23,42,0.04); }

        /* compact list items */
        .compact-list-item { padding:6px; border-radius:8px; }

      `}</style>

      <ReviewLightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={lightboxImage}
        reviewNumber={lightboxReviewNumber}
      />

      <ScrollProgress />

      <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/90 backdrop-blur-md px-4 py-3 rounded-full shadow-lg border border-gray-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">{viewersCount} онлайн</span>
        </div>
      </div>

      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="text-lg sm:text-xl font-bold">Beauty Scripts</div>
          <a
            href={STRIPE_URL}
            target="_blank"
            rel="noopener"
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-900 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 transition-all hover:scale-105 transform hover:shadow-lg min-h-[44px] flex items-center justify-center"
            aria-label="Купить скрипты"
          >
            Купить
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center pt-24" style={{overflow: 'hidden'}}>
        {/* overlay to improve readability; small dark tint */}
        <div style={{
          position:'absolute', inset:0, background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(0,0,0,0.18) 100%)', pointerEvents:'none'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl">
            <h1 className="js-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 sm:mb-5" style={{color:'#0B0B0C', textShadow:'0 1px 2px rgba(0,0,0,0.06)'}}>
              Скрипты, которые превращают <span className="hero-pill">сообщения в деньги</span>
            </h1>

            <div className="result-subtitle mb-4 sm:mb-5" style={{position:'relative', paddingTop:12}}>
              <p className="text-base sm:text-lg lg:text-xl font-semibold leading-relaxed" style={{color:'#1a202c'}}>
                Проверенная система общения с клиентами для бьюти-мастеров
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              <span className="font-medium">Результат:</span>{" "}
              <span className="highlight-warn">закрытые возражения</span>,{" "}
              <span className="highlight-good">увеличенный средний чек</span>,{" "}
              <span className="muted-pill" style={{padding:'4px 8px', fontWeight:600}}>экономия времени</span>
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
              <a
                href={STRIPE_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 lg:px-7 py-3 sm:py-3.5 lg:py-4 bg-gray-900 text-white rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5 hover:shadow-xl min-h-[48px]"
                aria-label="Купить скрипты за 19 евро"
              >
                Купить <span className="inline-block ml-1">→</span>
              </a>
              <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm">
                <span className="px-2 py-1 bg-black text-white rounded">Apple Pay</span>
                <span className="px-2 py-1 bg-white/5 text-black rounded border border-gray-200">Google Pay</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
              <span className="px-2 py-1 muted-pill">Безопасная оплата</span>
              <span className="px-2 py-1 muted-pill">Stripe</span>
            </div>
          </div>
        </div>

        {/* background image as CSS to allow object-position control (mobile shift) */}
        <div style={{
          position:'absolute',
          inset:0,
          backgroundImage: `url('/images/IMG_6243.png')`,
          backgroundSize:'cover',
          backgroundRepeat:'no-repeat',
          backgroundPosition: '65% center',
          zIndex: 0,
          transform: 'translateZ(0)'
        }} />

        <style jsx>{`
          @media (max-width: 768px) {
            section[role="banner"] { }
          }
          /* mobile adjustment for hero image: shift so text doesn't cover eyes */
          @media (max-width: 768px) {
            div[style*="/images/IMG_6243.png"] {
              background-position: 35% 62% !important;
            }
          }

        `}</style>
      </section>

      {/* 01 — Comparison */}
      <section id="comparison" className="relative py-12 sm:py-14 lg:py-16" style={{background:'#f7faf9'}}>
        <SectionMarker n="01" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-2">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Как изменится ваша <span className="underline-accent">работа с клиентами</span>
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>
              Сравните результаты до и после внедрения скриптов
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto mt-6 sm:mt-8">
            <div className="card-compact reveal-up">
              <div className="text-center mb-3 sm:mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-full font-medium text-xs sm:text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 icon-muted" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Сейчас
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-gray-800">
                {[
                  "«Сколько стоит?» → Отвечаете только ценой и тишина.",
                  "«Подумаю» → Не знаете, что ответить: клиент уходит.",
                  "«Переписка 30+ минут» → Клиент остывает, теряете заявку.",
                  "«10 заявок» → Долгие диалоги приводят только к 2–3 записям.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-2 compact-list-item transition-colors">
                    <svg className="w-4 h-4 mt-0.5 icon-muted flex-shrink-0" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-compact reveal-up" style={{animationDelay:"120ms"}}>
              <div className="text-center mb-3 sm:mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full font-medium text-xs sm:text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 icon" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  После
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-gray-800">
                {[
                  "«Сколько стоит?» → Презентуете ценность, получаете запись.",
                  "«Подумаю» → Мягкое возражение возвращает к записи.",
                  "«Переписка 5 минут» → Готовые фразы ведут к быстрой записи.",
                  "«10 заявок» → Чёткие диалоги дают 6–7 записей.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-2 compact-list-item">
                    <svg className="w-4 h-4 mt-0.5 icon flex-shrink-0" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Why */}
      <section id="why" className="relative py-12 sm:py-14 lg:py-16 bg-white">
        <SectionMarker n="02" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Почему это <span className="underline-accent">важно</span>
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>
              Каждая потерянная заявка — это упущенная прибыль
            </p>
          </div>

          <div className="compact-grid mt-6 sm:mt-8">
            <div className="card-compact text-center reveal-up">
              <img src="/images/money.svg" alt="Сливаются деньги" className="mx-auto mb-3 w-10 h-10 object-contain" loading="lazy" />
              <h3 className="font-semibold text-sm sm:text-base">Сливаются деньги на рекламу</h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>
            <div className="card-compact text-center reveal-up" style={{animationDelay:"120ms"}}>
              <img src="/images/clock.svg" alt="Тратится время" className="mx-auto mb-3 w-10 h-10 object-contain" loading="lazy" />
              <h3 className="font-semibold text-sm sm:text-base">Тратится время впустую</h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>
            <div className="card-compact text-center reveal-up" style={{animationDelay:"200ms"}}>
              <img src="/images/door.svg" alt="Уходят к конкуренту" className="mx-auto mb-3 w-10 h-10 object-contain" loading="lazy" />
              <h3 className="font-semibold text-sm sm:text-base">Заявки уходят к конкуренту</h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                Пока вы думаете, клиент записывается к тем, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — For */}
      <section id="for" className="relative py-12 sm:py-14 lg:py-16" style={{background:'linear-gradient(135deg, rgba(46,107,79,0.03), rgba(122,47,61,0.02))'}}>
        <SectionMarker n="03" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Кому подходят <span className="underline-accent">скрипты</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6 sm:mt-8">
            {[
              {
                img: "/images/salon.svg",
                title: "Владельцам салонов и студий",
                text: "Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.",
              },
              {
                img: "/images/med.svg",
                title: "Медицинским центрам",
                text: "Админы закрывают заявки, врачи работают с реальными пациентами.",
              },
              {
                img: "/images/team.svg",
                title: "Мастерам-универсалам",
                text: "Ответы на типовые ситуации ведут быстрее к записи, увереннее в чате.",
              },
              {
                img: "/images/one.svg",
                title: "Узким специалистам",
                text: "Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border transition-all duration-300 reveal-up"
                style={{animationDelay: `${i*60}ms`, borderColor:'rgba(46,107,79,0.08)'}}
              >
                <div className="flex items-center gap-3">
                  <img src={c.img} alt="" className="w-10 h-10 object-contain" loading="lazy" />
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">{c.title}</h3>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Whats included */}
      <section id="whats-included" className="relative py-12 sm:py-14 lg:py-16 bg-white">
        <SectionMarker n="04" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Что входит в <span className="underline-accent">систему скриптов</span>
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>Полный набор инструментов для увеличения продаж</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mt-6 sm:mt-8">
            {[ // images changed to .svg paths
              { img: "/images/xmind.svg", title:"Готовые диалоги", desc:"Контакты до оплаты: приветствия, презентация ценности, запись. Всё пошагово.", highlight:"презентация ценности" },
              { img: "/images/target.svg", title:"Закрытие возражений", desc:"«Дорого», «Подумаю», «У другого дешевле». Мягкие ответы без давления.", highlight:"мягкие ответы без давления" },
              { img: "/images/salons.svg", title:"Под каждую услугу", desc:"Маникюр, брови, ресницы, косметология, массаж. Учтена специфика каждой ниши.", highlight:"учтена специфика каждой ниши" },
              { img: "/images/bucle.svg", title:"Возврат клиентов", desc:"Сценарии повторных записей и реактивации «спящей» базы без рекламы.", highlight:"реактивации «спящей» базы без рекламы" },
              { img: "/images/phone.svg", title:"Гайд по внедрению", desc:"Старт за один день: пошаговый план и стандарты для команды.", highlight:"Старт за один день" },
              { img: "/images/rocket.svg", title:"Итог", desc:"Больше записей, выше средний чек, меньше времени в переписке.", highlight:"выше средний чек" },
            ].map((item, k) => (
              <div key={k} className="rounded-xl border p-3 sm:p-4 lg:p-5 reveal-up card-compact" style={{animationDelay:`${k*80}ms`}}>
                <img src={item.img} alt="" className="w-8 h-8 sm:w-10 sm:h-10 object-contain mb-2 sm:mb-3" loading="lazy" />
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <HighlightedDesc text={item.desc} primaryHighlight={item.highlight} extraPhrases={["без давления", "каждой ниши"]} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Bonuses */}
      <section id="bonuses" className="relative py-12 sm:py-14 lg:py-16" style={{background:'linear-gradient(135deg, rgba(250,250,250,1), rgba(246,250,247,1))'}}>
        <SectionMarker n="05" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Бонусы при покупке
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-6 sm:mt-8">
            {[
              { image: "/images/bonus1.svg", title: "Гайд «Работа с клиентской базой»", desc: "Повторные записи без рекламы → возвращайте старых клиентов.", old: "27€" },
              { image: "/images/bonus2.svg", title: "Чек-лист «30+ источников клиентов»", desc: "Платные и бесплатные способы → где взять заявки уже сегодня.", old: "32€" },
              { image: "/images/bonus3.svg", title: "Гайд «Продажи на консультации»", desc: "5 этапов продаж → мягкий апсейл дополнительных услуг.", old: "20€" },
            ].map((b, i) => (
              <div key={i} className="rounded-xl p-4 sm:p-5 text-center bg-white shadow-sm border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 reveal-up card-compact" style={{animationDelay:`${i*100}ms`}}>
                <div className="mb-3 sm:mb-4">
                  <img src={b.image} alt={`Бонус ${i + 1}`} className="w-24 h-32 sm:w-28 sm:h-36 mx-auto object-cover rounded-lg" loading="lazy" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">{b.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">{b.desc}</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-sm sm:text-base font-bold text-gray-400 line-through">{b.old}</span>
                  <span className="text-base sm:text-lg font-bold" style={{color:'var(--accent-good)'}}>0€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Immediate */}
      <section id="immediate" className="relative py-12 sm:py-14 lg:py-16 bg-white">
        <SectionMarker n="06" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Что изменится сразу
          </h2>

          <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 p-3 sm:p-4 rounded-xl hover:shadow-lg transition-all duration-300 reveal-up" style={{animationDelay:`${i*80}ms`}}>
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="var(--accent-good)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Reviews */}
      <section id="reviews" className="relative py-12 sm:py-14 lg:py-16 bg-gray-50">
        <SectionMarker n="07" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-10">
            Отзывы клиентов
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="group cursor-pointer reveal-up" style={{animationDelay:`${n*60}ms`}}>
                <img
                  src={`/images/reviews/review${n}.png`}
                  alt={`Отзыв ${n}`}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-xl sm:rounded-2xl border transition-all duration-300 group-hover:scale-[1.02] hover:border-[rgba(46,107,79,0.14)]"
                  onClick={() => openLightbox(`/images/reviews/review${n}.png`, n)}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 sm:gap-4 justify-center items-start mb-8 overflow-x-auto pb-2 reels-row">
            {INSTAGRAM_REELS.map((url, idx) => (
              <div
                key={url}
                className="reel-card rounded-xl overflow-hidden border-2 border-gray-200 shadow-md flex-shrink-0 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                style={{animationDelay:`${idx*100}ms`}
              }>
                <InstaEmbed url={url} maxWidth={260} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Offer */}
      <section id="offer" className="relative py-12 sm:py-14 lg:py-16 bg-white">
        <SectionMarker n="08" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
              Полная система со скидкой <span className="highlight-warn">70%</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 reveal-up" style={{animationDelay:"120ms"}}>
              Специальное предложение на этой неделе • Предложение действует ограниченное время
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-slate-800 text-white shadow-2xl relative overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 reveal-up">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(255,255,255,0.03)] rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[rgba(255,255,255,0.02)] rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="text-center">
                  <div className="text-xs sm:text-sm uppercase tracking-wide text-gray-300 mb-2 sm:mb-3">
                    Полный доступ
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <span className="text-gray-400 line-through text-xl sm:text-2xl">67€</span>
                    <span className="text-4xl sm:text-5xl font-extrabold text-white">19€</span>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-warn)]/80 px-3 sm:px-4 py-1.5 sm:py-2 transition-colors">
                      {!finished ? (
                        <>
                          <span className="text-white text-xs sm:text-sm font-medium">До конца:</span>
                          <span className="font-bold tabular-nums text-white text-sm sm:text-base">
                            {String(h).padStart(2, "0")}:
                            {String(m).padStart(2, "0")}:
                            {String(s).padStart(2, "0")}
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold text-white text-sm">Время истекло</span>
                      )}
                    </div>
                  </div>

                  <a
                    href={STRIPE_URL}
                    target="_blank"
                    rel="noopener"
                    className="block w-full text-center rounded-xl bg-[var(--accent-good)] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 hover:bg-[color-mix(in srgb, var(--accent-good) 85%, black 15%)] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl mb-3 sm:mb-4 min-h-[48px]"
                    aria-label="Купить полную систему со скидкой 70% — 19 евро"
                  >
                    Получить со скидкой 70%
                  </a>

                  <div className="text-xs text-gray-300 mb-4 sm:mb-6">
                    Без скрытых платежей • Пожизненный доступ • Обновления включены
                  </div>

                  <div className="text-left mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 text-center">Что входит:</h3>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-200">
                      {[
                        "Готовые диалоги для всех ситуаций",
                        "Шаблоны под конкретную услугу",
                        "Бонус: гайд по работе с базой (27€)",
                        "Бонус: 30+ источников клиентов (32€)",
                        "Бонус: продажи на консультации (20€)",
                        "Пожизненный доступ и обновления",
                      ].map((t, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="w-4 h-4 mt-0.5 text-[var(--accent-good)] flex-shrink-0">✓</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs flex-wrap">
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

      {/* FAQ */}
      <section id="faq" className="relative py-12 sm:py-14 lg:py-16 bg-white">
        <SectionMarker n="09" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Частые вопросы
          </h2>

          <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
            {[
              { q: "Сработает в моей нише?", a: "Да. База универсальная и блоки под ногти/брови/ресницы/волосы/косметологию/перманент." },
              { q: "Не будет ли звучать «по-скриптовому»?", a: "Нет. Формулировки живые, адаптируешь под свой тон. Главное — следовать алгоритму." },
              { q: "Зачем это админам?", a: "Единый стандарт повышает конверсию, скорость и управляемость. Новички включаются быстрее." },
              { q: "Когда будут результаты?", a: "Часто в первые 24 часа: готовые фразы экономят время и быстрее ведут к записи." },
            ].map((f, i) => (
              <div key={i} className="border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 hover:shadow-lg transition-all duration-300 reveal-up" style={{animationDelay:`${i*80}ms`}}>
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-5 sm:px-6 lg:px-8 py-4 sm:py-5 text-left hover:bg-gray-100 flex justify-between items-center transition-colors min-h-[48px]"
                  aria-label={`Вопрос: ${f.q}`}
                >
                  <span className="font-semibold text-sm sm:text-base lg:text-lg text-gray-900 pr-4">{f.q}</span>
                  <span className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`}>⌄</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 lg:px-8 py-4 sm:py-5 border-t border-gray-200">
                    <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 sm:py-10 lg:py-12 bg-white border-t border-gray-200 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Beauty Scripts</div>
          <p className="text-sm sm:text-base text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50 lg:hidden shadow-2xl animate-slide-up">
          <a
            href={STRIPE_URL}
            target="_blank"
            rel="noopener"
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl font-semibold text-sm text-center block hover:bg-gray-800 transition-all flex items-center justify-between min-h-[48px]"
            aria-label="Купить скрипты за 19 евро"
          >
            <span>Скрипты — 19€</span>
            <span>Купить →</span>
          </a>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        
        .reveal-up { 
          opacity: 0; 
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .reels-row { scroll-snap-type: x mandatory; }
        .reels-row > * { scroll-snap-align: center; }

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

        /* small responsive tweaks for hero background control */
        @media (max-width: 768px) {
          /* ensure hero image shift works */
        }
      `}</style>
    </div>
  );
}
