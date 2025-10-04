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
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
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
      `<span class="accent-strong">${ph}</span>`
    );
  }

  for (const phrase of extraPhrases) {
    const p = escapeHtml(phrase);
    html = html.replace(
      new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      `<span class="accent-strong">${p}</span>`
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
    <div className="min-h-screen" data-theme="updated">
      {/* Global styles specific to requested changes */}
      <style jsx global>{`
        :root {
          --offwhite: #FAFAFA;
          --card-shadow: 0 8px 30px rgba(0,0,0,0.05);
          --text-color: #0b1220;
          --accent-blue: #2563eb; /* use sparingly */
        }
        html, body, #__next { height: 100%; }
        body {
          margin: 0;
          background: var(--offwhite);
          color: var(--text-color);
          font-family: Inter, system-ui, -apple-system, "Helvetica Neue", Arial;
          font-weight: 300; /* lighter body text */
          -webkit-font-smoothing:antialiased;
          -moz-osx-font-smoothing:grayscale;
        }
        h1,h2,h3 { font-weight: 700; } /* bold headings */
        /* line accent under important words */
        .line-accent { position: relative; display: inline-block; font-weight:700; }
        .line-accent::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          height: 6px;
          background: rgba(37,99,235,0.18);
          border-radius: 6px;
          transform: translateY(0);
        }
        /* accent strong — single-word blue bold (use sparingly) */
        .accent-strong { color: var(--accent-blue); font-weight: 800; }
        /* glassmorphism panel for hero text */
        .hero-glass {
          background: rgba(8,10,12,0.36);
          color: #fff;
          padding: 18px;
          border-radius: 12px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        /* cards and CTA use soft shadows */
        .soft-card {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: var(--card-shadow);
          border: 1px solid rgba(11,17,28,0.04);
        }
        /* slightly larger spacing for premium feel */
        section { padding-top: 56px; padding-bottom: 56px; }
        @media (min-width: 768px) {
          section { padding-top: 80px; padding-bottom: 80px; }
        }
        /* hero text block adjustments on mobile (more padding to avoid face) */
        .hero-content {
          padding-top: 48px;
          padding-left: 12px;
        }
        @media (max-width: 768px) {
          .hero-content {
            padding-top: 110px; /* увеличенный padding-top на мобилке */
            padding-left: 18px; /* сместить вбок */
          }
          .hero-bg {
            background-position: 55% center !important; /* mobile background shift */
          }
        }
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
          <div className="text-lg sm:text-xl font-bold text-gray-900">Beauty Scripts</div>
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
      <section className="relative min-h-[88vh] flex items-center pt-24 hero-bg">
        {/* dark overlay 30% to 50% for readability (per requirement) */}
        <div style={{
          position:'absolute', inset:0, background: 'rgba(0,0,0,0.36)', pointerEvents:'none'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full hero-content">
          {/* glassmorphism panel around heading/subtitle */}
          <div className="hero-glass" style={{maxWidth: 720}}>
            <h1 className="js-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-4 sm:mb-5" style={{color:'#fff', lineHeight:1.02}}>
              Скрипты, которые превращают <span className="accent-strong">сообщения</span> в <span className="line-accent">деньги</span>
            </h1>

            <div className="result-subtitle mb-4 sm:mb-5">
              <p className="text-base sm:text-lg lg:text-xl font-semibold leading-relaxed" style={{color:'#f3f4f6'}}>
                Проверенная система общения с клиентами для бьюти-мастеров
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed" style={{color:'#e6e7e9'}}>
              <span className="font-medium">Результат:</span> закрытые возражения, увеличенный средний чек, экономия времени
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
          </div>
        </div>

        {/* background image as CSS to allow mobile object-position control */}
        <div className="absolute inset-0 hero-bg-image" style={{
          zIndex: 0,
          backgroundImage: `url('/images/IMG_6243.png')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }} />

        <style jsx>{`
          .hero-bg { position: relative; overflow: hidden; }
          .hero-bg-image { will-change: background-position; }
          /* mobile shift to 55% center per your requirement */
          @media (max-width: 768px) {
            .hero-bg-image { background-position: 55% center !important; }
            /* ensure hero content gets more top padding and left shift (already set in global css) */
          }
        `}</style>
      </section>

      {/* 01 — Comparison */}
      <section id="comparison" className="relative" style={{background:'#FFFDFD'}}>
        <SectionMarker n="01" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold" style={{color: '#0b1220'}}>
              Как изменится ваша <span className="line-accent">работа с клиентами</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>
              Сравните результаты до и после внедрения скриптов
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto mt-8">
            <div className="soft-card reveal-up">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-full font-medium text-xs sm:text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Сейчас
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-sm text-gray-800">
                {[
                  "«Сколько стоит?» → Отвечаете только ценой и тишина.",
                  "«Подумаю» → Не знаете, что ответить: клиент уходит.",
                  "«Переписка 30+ минут» → Клиент остывает, теряете заявку.",
                  "«10 заявок» → Долгие диалоги приводят только к 2–3 записям.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 p-2 rounded-lg transition-colors">
                    <svg className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="soft-card reveal-up" style={{animationDelay:"120ms"}}>
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full font-medium text-xs sm:text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  После
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-sm text-gray-800">
                {[
                  "«Сколько стоит?» → Презентуете ценность, получаете запись.",
                  "«Подумаю» → Мягкое возражение возвращает к записи.",
                  "«Переписка 5 минут» → Готовые фразы ведут к быстрой записи.",
                  "«10 заявок» → Чёткие диалоги дают 6–7 записей.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 p-2 rounded-lg transition-colors">
                    <svg className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* why */}
      <section id="why" className="relative" style={{background:'#F8F8FF'}}>
        <SectionMarker n="02" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold" style={{color:'#0b1220'}}>
              Почему это <span className="line-accent">важно</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>
              Каждая потерянная заявка — это упущенная прибыль
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="soft-card text-center reveal-up">
              <img src="/images/money.svg" alt="Сливаются деньги" className="mx-auto mb-3 w-12 h-12 object-contain" loading="lazy" />
              <h3 className="font-semibold text-base">Сливаются деньги на рекламу</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>
            <div className="soft-card text-center reveal-up" style={{animationDelay:"120ms"}}>
              <img src="/images/clock.svg" alt="Тратится время" className="mx-auto mb-3 w-12 h-12 object-contain" loading="lazy" />
              <h3 className="font-semibold text-base">Тратится время впустую</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>
            <div className="soft-card text-center reveal-up" style={{animationDelay:"200ms"}}>
              <img src="/images/door.svg" alt="Уходят к конкуренту" className="mx-auto mb-3 w-12 h-12 object-contain" loading="lazy" />
              <h3 className="font-semibold text-base">Заявки уходят к конкуренту</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Пока вы думаете, клиент записывается к тем, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* for */}
      <section id="for" className="relative" style={{background:'#FAFAFA'}}>
        <SectionMarker n="03" />
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-center" style={{color:'#0b1220'}}>
            Кому подходят <span className="accent-strong">скрипты</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
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
                className="bg-white rounded-xl p-5 soft-card reveal-up"
                style={{animationDelay: `${i*80}ms`}}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={c.img}
                    alt=""
                    className="w-12 h-12 object-contain"
                    loading="lazy"
                  />
                  <h3 className="text-base font-bold" style={{color:'#0b1220'}}>{c.title}</h3>
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* whats-included */}
      <section id="whats-included" className="relative" style={{background:'#FFFDFD'}}>
        <SectionMarker n="04" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold" style={{color:'#0b1220'}}>
              Что входит в <span className="line-accent">систему скриптов</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>Полный набор инструментов для увеличения продаж</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              { img: "/images/xmind.svg", title: "Готовые диалоги", desc: "Контакты до оплаты: приветствия, презентация ценности, запись. Всё пошагово.", highlight: "презентация ценности" },
              { img: "/images/target.svg", title: "Закрытие возражений", desc: "«Дорого», «Подумаю», «У другого дешевле». Мягкие ответы без давления.", highlight: "мягкие ответы без давления" },
              { img: "/images/salons.svg", title: "Под каждую услугу", desc: "Маникюр, брови, ресницы, косметология, массаж. Учтена специфика каждой ниши.", highlight: "учтена специфика каждой ниши" },
              { img: "/images/bucle.svg", title: "Возврат клиентов", desc: "Сценарии повторных записей и реактивации «спящей» базы без рекламы.", highlight: "реактивации «спящей» базы без рекламы" },
              { img: "/images/phone.svg", title: "Гайд по внедрению", desc: "Старт за один день: пошаговый план и стандарты для команды.", highlight: "Старт за один день" },
              { img: "/images/rocket.svg", title: "Итог", desc: "Больше записей, выше средний чек, меньше времени в переписке.", highlight: "выше средний чек" },
            ].map((item, k) => (
              <div key={k} className="rounded-xl border p-4 reveal-up soft-card" style={{animationDelay:`${k*80}ms`}}>
                <img src={item.img} alt="" className="w-10 h-10 mb-3 object-contain" loading="lazy" />
                <h3 className="text-base font-bold" style={{color:'#0b1220'}}>{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  <HighlightedDesc text={item.desc} primaryHighlight={item.highlight} extraPhrases={["без давления", "каждой ниши"]} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* bonuses */}
      <section id="bonuses" className="relative" style={{background:'#F8FBFF'}}>
        <SectionMarker n="05" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold" style={{color:'#0b1220'}}>
              Бонусы при покупке
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {[
              { image: "/images/bonus1.svg", title: "Гайд «Работа с клиентской базой»", desc: "Повторные записи без рекламы → возвращайте старых клиентов.", old: "27€" },
              { image: "/images/bonus2.svg", title: "Чек-лист «30+ источников клиентов»", desc: "Платные и бесплатные способы → где взять заявки уже сегодня.", old: "32€" },
              { image: "/images/bonus3.svg", title: "Гайд «Продажи на консультации»", desc: "5 этапов продаж → мягкий апсейл дополнительных услуг.", old: "20€" },
            ].map((b, i) => (
              <div key={i} className="rounded-xl p-4 text-center soft-card reveal-up" style={{animationDelay:`${i*100}ms`}}>
                <div className="mb-3">
                  <img src={b.image} alt={`Бонус ${i + 1}`} className="w-28 h-36 mx-auto object-cover rounded-lg" loading="lazy" />
                </div>
                <h3 className="text-sm sm:text-base font-bold" style={{color:'#0b1220'}}>{b.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{b.desc}</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-sm font-bold text-gray-400 line-through">{b.old}</span>
                  <span className="text-base sm:text-lg font-bold" style={{color:'#2e6b4f'}}>0€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* immediate */}
      <section id="immediate" className="relative" style={{background:'#FFFDFD'}}>
        <SectionMarker n="06" />
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-center" style={{color:'#0b1220'}}>
            Что изменится сразу
          </h2>

          <div className="space-y-4 mt-8">
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl soft-card reveal-up" style={{animationDelay:`${i*80}ms`}}>
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#2e6b4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-sm sm:text-base font-medium" style={{color:'#0b1220'}}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* reviews */}
      <section id="reviews" className="relative" style={{background:'#F8F8FF'}}>
        <SectionMarker n="07" />
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8">
            Отзывы клиентов
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="group cursor-pointer reveal-up" style={{animationDelay:`${n*60}ms`}}>
                <img
                  src={`/images/reviews/review${n}.png`}
                  alt={`Отзыв ${n}`}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-xl sm:rounded-2xl border transition-all duration-300 group-hover:scale-[1.02]"
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
                className="reel-card rounded-xl overflow-hidden border-2 border-gray-200 shadow-md flex-shrink-0 reveal-up"
                style={{animationDelay:`${idx*100}ms`}}
              >
                <InstaEmbed url={url} maxWidth={260} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* offer */}
      <section id="offer" className="relative" style={{background:'#FAFAFA'}}>
        <SectionMarker n="08" />
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold" style={{color:'#0b1220'}}>
              Полная система со скидкой <span className="accent-strong">70%</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 reveal-up" style={{animationDelay:"120ms"}}>
              Специальное предложение на этой неделе • Предложение действует ограниченное время
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="rounded-2xl p-6 sm:p-8 bg-gray-900 text-white soft-card reveal-up" style={{overflow:'hidden'}}>
              <div className="relative z-10 text-center">
                <div className="text-xs sm:text-sm uppercase tracking-wide text-gray-300 mb-2 sm:mb-3">
                  Полный доступ
                </div>
                
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <span className="text-gray-400 line-through text-xl sm:text-2xl">67€</span>
                  <span className="text-4xl sm:text-5xl font-extrabold">19€</span>
                </div>

                <div className="mb-4 sm:mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 sm:px-4 py-1.5 sm:py-2">
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
                  className="block w-full text-center rounded-xl bg-blue-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg mb-3 sm:mb-4 min-h-[48px]"
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
                        <span className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0">✓</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs flex-wrap">
                  <div className="px-2 py-1 bg-black text-white rounded">Apple Pay</div>
                  <div className="px-2 py-1 bg-white/20 text-white rounded">Google Pay</div>
                  <div className="px-2 py-1 bg-white/20 text-white rounded">Visa</div>
                  <div className="px-2 py-1 bg-white/20 text-white rounded">MasterCard</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative" style={{background:'#FFFDFD'}}>
        <SectionMarker n="09" />
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Частые вопросы
          </h2>

          <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
            {[
              { q: "Сработает в моей нише?", a: "Да. База универсальная и блоки под ногти/бровы/ресницы/волосы/косметологию/перманент." },
              { q: "Не будет ли звучать «по-скриптовому»?", a: "Нет. Формулировки живые, адаптируешь под свой тон. Главное — следовать алгоритму." },
              { q: "Зачем это админам?", a: "Единый стандарт повышает конверсию, скорость и управляемость. Новички включаются быстрее." },
              { q: "Когда будут результаты?", a: "Часто в первые 24 часа: готовые фразы экономят время и быстрее ведут к записи." },
            ].map((f, i) => (
              <div key={i} className="soft-card reveal-up" style={{animationDelay:`${i*80}ms`}}>
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-5 py-4 text-left hover:bg-gray-100 flex justify-between items-center transition-colors min-h-[48px]"
                  aria-label={`Вопрос: ${f.q}`}
                >
                  <span className="font-semibold text-base text-gray-900 pr-4">{f.q}</span>
                  <span className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`}>⌄</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 py-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 bg-white border-t border-gray-200 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Beauty Scripts</div>
          <p className="text-sm sm:text-base text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50 lg:hidden shadow-2xl">
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
