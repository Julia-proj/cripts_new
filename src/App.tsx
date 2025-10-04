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
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.4) 0%, transparent 100%); /* Changed line color to Blue for consistency */
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

// Новый компонент для выделения слов в заголовках
function HighlightedSpan({ text }: { text: string }) {
  return (
    <span className="highlight-text-blue">
      {text}
      <style jsx>{`
        .highlight-text-blue {
          color: #3b82f6; /* text-blue-500/600 */
          position: relative;
          display: inline-block;
        }
        /* Улучшенное выделение: слегка сдвинутое подчеркивание */
        .highlight-text-blue::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 2px; /* Сдвиг вниз */
          width: 100%;
          height: 3px; /* Толщина */
          background: rgba(59, 130, 246, 0.15); /* Очень светлый синий фон */
          z-index: -1;
          border-radius: 2px;
        }
      `}</style>
    </span>
  );
}


function ReviewLightbox({ isOpen, onClose, imageSrc, reviewNumber }) {
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
    // Используем более светлый синий (text-blue-400) для контраста
    html = html.replace(
      new RegExp(ph.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      `<span class="text-blue-500 font-semibold">${ph}</span>`
    );
  }

  for (const phrase of extraPhrases) {
    const p = escapeHtml(phrase);
    html = html.replace(
      new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
      `<span class="text-blue-500 font-semibold">${p}</span>`
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
    <div className="min-h-screen bg-white">
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

      {/* 1. ИЗМЕНЕНИЯ В HERO-СЕКЦИИ */}
      <section className="relative min-h-[88vh] flex items-center pt-24 hero-bg">
        {/* Увеличен оверлей для лучшей читаемости текста */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-black/20 via-black/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          {/* Сдвиг текста вниз и вправо на мобильных устройствах */}
          <div className="max-w-2xl pt-10 sm:pt-0 pb-10 sm:pb-0 sm:max-w-xl md:max-w-2xl ml-auto lg:ml-0">
            {/* Текст стал белым для контраста */}
            <h1 className="js-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 sm:mb-5 text-white" style={{textShadow: '0 1px 4px rgba(0,0,0,0.4)'}}>
              Скрипты, которые превращают <span className="text-blue-400">сообщения в деньги</span>
            </h1>

            <div className="result-subtitle mb-4 sm:mb-5">
              <p className="text-base sm:text-lg lg:text-xl font-semibold leading-relaxed text-gray-100">
                Проверенная система общения с клиентами для бьюти-мастеров
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-200 mb-6 sm:mb-8 leading-relaxed">
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
                <span className="px-2 py-1 bg-blue-600 text-white rounded">Google Pay</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-200">
              {/* Фон для плашек сделан более темным/контрастным */}
              <span className="px-2 py-1 bg-black/40 rounded border border-gray-600">🔒 Безопасная оплата</span>
              <span className="px-2 py-1 bg-black/40 rounded border border-gray-600">✓ Stripe</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          .hero-bg{
            background-image: url('/images/IMG_6243.png');
            background-size: cover;
            /* Смещение фокуса фото для мобильных устройств (60% x-axis) */
            background-position: 60% center; 
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
            background: linear-gradient(90deg, rgba(59, 130, 246, 0.5) 0%, transparent 100%);
          }
          @media (max-width: 640px) {
            .result-subtitle::before {
              width: 50px;
            }
          }
        `}</style>
      </section>
      
      {/* 2. ИЗМЕНЕНИЯ В СЕКЦИЯХ НА БЕЛОМ ФОНЕ */}

      <section id="comparison" className="relative py-12 sm:py-14 lg:py-16 bg-gray-50/50"> {/* Легкий оттенок */}
        <SectionMarker n="01" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-2">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Как изменится ваша <HighlightedSpan text="работа с клиентами" /> {/* Использован новый компонент */}
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>
              Сравните результаты до и после внедрения скриптов
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto mt-6 sm:mt-8">
            {/* Добавлена тень (shadow-sm) и более легкая граница (border-gray-100) */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal-up">
              <div className="text-center mb-3 sm:mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-full font-medium text-xs sm:text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Сейчас
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-gray-800">
                {/* ... (список элементов) ... */}
                {["«Сколько стоит?» → Отвечаете только ценой и тишина.", "«Подумаю» → Не знаете, что ответить: клиент уходит.", "«Переписка 30+ минут» → Клиент остывает, теряете заявку.", "«10 заявок» → Долгие диалоги приводят только к 2–3 записям."].map((t, i) => (
                  <li key={i} className="flex gap-2 hover:bg-red-50 p-1.5 sm:p-2 rounded-lg transition-colors">
                    <svg className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Добавлена тень (shadow-sm) и более легкая граница (border-gray-100) */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal-up" style={{animationDelay:"120ms"}}>
              <div className="text-center mb-3 sm:mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-full font-medium text-xs sm:text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  После
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-gray-800">
                {/* ... (список элементов) ... */}
                {["«Сколько стоит?» → Презентуете ценность, получаете запись.", "«Подумаю» → Мягкое возражение возвращает к записи.", "«Переписка 5 минут» → Готовые фразы ведут к быстрой записи.", "«10 заявок» → Чёткие диалоги дают 6–7 записей."].map((t, i) => (
                  <li key={i} className="flex gap-2 hover:bg-green-50 p-1.5 sm:p-2 rounded-lg transition-colors">
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

      <section id="why" className="relative py-12 sm:py-14 lg:py-16 bg-white">
        <SectionMarker n="02" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Почему это <HighlightedSpan text="важно" />
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>
              Каждая потерянная заявка — это упущенная прибыль
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-6 sm:mt-8">
            {/* Добавлена тень (shadow-sm) и более легкая граница (border-gray-100) */}
            <div className="rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal-up">
              {/* ... (содержимое) ... */}
              <img
                src="/images/money.png"
                alt="Сливаются деньги"
                className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 object-contain"
                loading="lazy"
              />
              <h3 className="font-semibold text-sm sm:text-base">Сливаются деньги на рекламу</h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>
            {/* Добавлена тень (shadow-sm) и более легкая граница (border-gray-100) */}
            <div className="rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal-up" style={{animationDelay:"120ms"}}>
              {/* ... (содержимое) ... */}
              <img
                src="/images/clock.png"
                alt="Тратится время"
                className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 object-contain"
                loading="lazy"
              />
              <h3 className="font-semibold text-sm sm:text-base">Тратится время впустую</h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>
            {/* Добавлена тень (shadow-sm) и более легкая граница (border-gray-100) */}
            <div className="rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-11 reveal-up" style={{animationDelay:"200ms"}}>
              {/* ... (содержимое) ... */}
              <img
                src="/images/door.png"
                alt="Уходят к конкуренту"
                className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-14 sm:h-14 object-contain"
                loading="lazy"
              />
              <h3 className="font-semibold text-sm sm:text-base">Заявки уходят к конкуренту</h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                Пока вы думаете, клиент записывается к тем, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="for" className="relative py-12 sm:py-14 lg:py-16 bg-gradient-to-br from-emerald-50/30 via-teal-50/30 to-cyan-50/30">
        <SectionMarker n="03" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Кому подходят <HighlightedSpan text="скрипты" />
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-6 sm:mt-8">
            {/* ... (карточки) ... */}
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
                className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-gray-100 shadow-sm hover:border-emerald-300/60 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 hover:-translate-y-0.5 reveal-up"
                style={{animationDelay: `${i*80}ms`}}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={c.img}
                    alt=""
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    loading="lazy"
                  />
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">{c.title}</h3>
                </div>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="whats-included" className="relative py-12 sm:py-14 lg:py-16 bg-white">
        <SectionMarker n="04" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Что входит в <HighlightedSpan text="систему скриптов" />
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>Полный набор инструментов для увеличения продаж</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mt-6 sm:mt-8">
            {/* ... (карточки) ... */}
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
              <div key={k} className="rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 lg:p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal-up" style={{animationDelay:`${k*80}ms`}}>
                <img src={item.img} alt="" className="w-8 h-8 sm:w-10 sm:h-10 object-contain mb-2 sm:mb-3" loading="lazy" />
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
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

      <section id="bonuses" className="relative py-12 sm:py-14 lg:py-16 bg-gradient-to-br from-blue-50/30 via-rose-50/25 to-amber-50/30 overflow-hidden">
        <SectionMarker n="05" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              <HighlightedSpan text="Бонусы" /> при покупке
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 reveal-up" style={{animationDelay:"120ms"}}>Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами</p>
          </div>
          {/* ... (карточки бонусов) ... */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-6 sm:mt-8">
            {[
              { image: "/images/bonus1.png", title: "Гайд «Работа с клиентской базой»", desc: "Повторные записи без рекламы → возвращайте старых клиентов.", old: "27€" },
              { image: "/images/bonus2.png", title: "Чек-лист «30+ источников клиентов»", desc: "Платные и бесплатные способы → где взять заявки уже сегодня.", old: "32€" },
              { image: "/images/bonus3.png", title: "Гайд «Продажи на консультации»", desc: "5 этапов продаж → мягкий апсейл дополнительных услуг.", old: "20€" },
            ].map((b, i) => (
              <div key={i} className="rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 reveal-up" style={{animationDelay:`${i*100}ms`}}>
                <div className="mb-3 sm:mb-4">
                  <img src={b.image} alt={`Бонус ${i + 1}`} className="w-24 h-32 sm:w-28 sm:h-36 mx-auto object-cover rounded-lg" loading="lazy" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">{b.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">{b.desc}</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-sm sm:text-base font-bold text-gray-400 line-through">{b.old}</span>
                  <span className="text-base sm:text-lg font-bold text-green-600">0€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="immediate" className="relative py-12 sm:py-14 lg:py-16 bg-white">
        <SectionMarker n="06" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Что изменится <HighlightedSpan text="сразу" />
          </h2>

          <div className="space-y-4 sm:space-y-5 mt-6 sm:mt-8">
            {/* Добавлена тень (shadow-sm) и более легкая граница (border-gray-100) */}
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3 sm:gap-4 bg-gray-50/50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 reveal-up" style={{animationDelay:`${i*80}ms`}}>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="relative py-12 sm:py-14 lg:py-16 bg-gray-50/50"> {/* Легкий оттенок */}
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
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] hover:border-blue-300"
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
                style={{animationDelay:`${idx*100}ms`}}
              >
                <InstaEmbed url={url} maxWidth={260} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="offer" className="relative py-12 sm:py-14 lg:py-16 bg-white">
        <SectionMarker n="08" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="js-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
              Полная система со скидкой <HighlightedSpan text="70%" />
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 reveal-up" style={{animationDelay:"120ms"}}>
              Специальное предложение на этой неделе • Предложение действует ограниченное время
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-slate-800 text-white shadow-2xl relative overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 reveal-up">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-400/10 rounded-full translate-y-12 -translate-x-12"></div>
              
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
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-orange-600 transition-colors">
                      <span className="text-white">⏰</span>
                      {!finished ? (
                        <>
                          <span className="text-white text-xs sm:text-sm font-medium">До конца:</span>
                          <span className="font-bold tabular-nums text-white text-sm sm:text-base">
                            {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
                          </span>
                        </>
                      ) : (
                        <span className="text-white text-sm sm:text-base font-medium">Срок предложения истёк</span>
                      )}
                    </div>
                  </div>

                  <a
                    href={STRIPE_URL}
                    target="_blank"
                    rel="noopener"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-blue-500 text-white rounded-xl text-base sm:text-lg font-bold hover:bg-blue-600 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Забрать систему за 19€ →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer, Sticky CTA и т.д. опущены для краткости, так как они не были предметом изменений */}
      
      {showStickyCTA && (
        <a
          href={STRIPE_URL}
          target="_blank"
          rel="noopener"
          className="fixed bottom-0 left-0 right-0 z-40 block lg:hidden px-4 py-3 bg-gray-900 text-white text-center text-base font-semibold hover:bg-gray-800 transition-all shadow-2xl"
        >
          Купить систему за 19€
        </a>
      )}
      
      <footer className="py-8 sm:py-10 bg-gray-900 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Beauty Scripts. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
