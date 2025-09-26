// src/App.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const STRIPE_URL = "#stripe-payment-link"; // вставишь свою ссылку Stripe

export default function App() {
  // ===== FAQ =====
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  // ===== Плавное появление секций =====
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.isIntersecting &&
          setIsVisible((p) => ({ ...p, [e.target.id]: true }))
        ),
      { threshold: 0.1 }
    );
    document.querySelectorAll<HTMLElement>("[id]").forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  // ===== Таймер (блок скидки) =====
  // Берём дедлайн из localStorage, чтобы не «скакал» при перезагрузке.
  // По умолчанию – 24 часа с момента первого визита.
  const DEADLINE_KEY = "bsale_deadline";
  const [deadline, setDeadline] = useState<number>(() => {
    const saved = localStorage.getItem(DEADLINE_KEY);
    if (saved) return +saved;
    const d = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(DEADLINE_KEY, String(d));
    return d;
  });
  const [now, setNow] = useState<number>(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remaining = Math.max(0, deadline - now);
  const hh = Math.floor(remaining / 1000 / 60 / 60);
  const mm = Math.floor((remaining / 1000 / 60) % 60);
  const ss = Math.floor((remaining / 1000) % 60);
  const progress = useMemo(() => {
    const total = 24 * 60 * 60 * 1000;
    return 100 - Math.min(100, Math.round((remaining / total) * 100));
  }, [remaining]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">Beauty Scripts</div>
          <a
            href={STRIPE_URL}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Купить
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div
            id="hero-text"
            className={`transition-all duration-1000 ${
              isVisible["hero-text"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900">
              Скрипты, которые превращают{" "}
              <span className="text-blue-600">сообщения в деньги</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Проверенная система общения с клиентами для бьюти-мастеров.
              Результат: закрытые возражения, увеличенный средний чек, экономия
              времени на переписке.
            </p>
            <div className="mb-6">
              <a
                href={STRIPE_URL}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:-translate-y-0.5"
              >
                Купить
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
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

          <div
            id="hero-image"
            className={`transition-all duration-1000 delay-300 ${
              isVisible["hero-image"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              <img
                src="/images/hero.jpg"
                alt="Beauty Scripts Hero"
                className="w-full h-auto rounded-2xl shadow-xl"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.src =
                    "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800";
                }}
              />
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-gray-900">19€</div>
                <div className="text-sm text-gray-500">Полный доступ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* КАК ИЗМЕНИТСЯ РАБОТА С КЛИЕНТАМИ */}
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Как изменится <span className="text-blue-600">работа с клиентами</span>
            </h2>
            <p className="text-lg text-gray-600 mt-3">
              Сравните результаты до и после внедрения скриптов
            </p>
          </div>

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
                <li className="flex gap-2">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  «Сколько стоит?» → Отвечаете только ценой и тишина.
                </li>
                <li className="flex gap-2">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  «Подумаю» → Не знаете, что ответить — клиент уходит.
                </li>
                <li className="flex gap-2">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  «Переписка 30+ минут» → Клиент остывает — теряете заявку.
                </li>
                <li className="flex gap-2">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  «10 заявок» → Долгие диалоги — только 2–3 записи.
                </li>
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
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                  «Сколько стоит?» → Презентуете ценность → запись.
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                  «Подумаю» → Мягкое возражение → возвращаете к записи.
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                  «Переписка 5 минут» → Готовые фразы → быстрая запись.
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                  «10 заявок» → Чёткие диалоги → 6–7 записей.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ ЭТО ВАЖНО */}
      <section id="why" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Почему это <span className="text-blue-600">важно</span>
            </h2>
            <p className="text-lg text-gray-600 mt-3">
              Каждая потерянная заявка — это упущенная прибыль
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <img
                src="/images/money.png"
                alt=""
                className="w-14 h-14 mx-auto mb-4"
              />
              <p className="font-semibold text-gray-900">
                Сливаются деньги на рекламу
              </p>
              <p className="text-gray-600 mt-2">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные —
                выброшенный бюджет.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/images/time.png"
                alt=""
                className="w-14 h-14 mx-auto mb-4"
              />
              <p className="font-semibold text-gray-900">Тратится время впустую</p>
              <p className="text-gray-600 mt-2">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/images/leads.png"
                alt=""
                className="w-14 h-14 mx-auto mb-4"
              />
              <p className="font-semibold text-gray-900">
                Заявки уходят к конкуренту
              </p>
              <p className="text-gray-600 mt-2">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро
                и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* КОМУ ПОДХОДЯТ СКРИПТЫ (2x2) */}
      <section id="for" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
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
                icon: "/images/med.png",
                title: "Медицинским центрам",
                text:
                  "Админы закрывают заявки, врачи работают с реальными пациентами.",
              },
              {
                icon: "/images/multi.png",
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
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img src={c.icon} alt="" className="w-12 h-12" />
                  <h3 className="text-xl font-bold text-gray-900">{c.title}</h3>
                </div>
                <p className="text-gray-600 mt-4">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ВХОДИТ В СИСТЕМУ СКРИПТОВ (3+3) */}
      <section id="included" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
            <p className="text-lg text-gray-600 mt-3">
              Полный набор инструментов для увеличения продаж
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "/images/dialogs.png",
                title: "Готовые диалоги",
                text:
                  "Контакты до оплаты: приветствия, презентация ценности, запись — всё пошагово.",
              },
              {
                icon: "/images/objections.png",
                title: "Закрытие возражений",
                text:
                  "«Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления.",
              },
              {
                icon: "/images/services.png",
                title: "Под каждую услугу",
                text:
                  "Маникюр, брови, ресницы, косметология, массаж — учтена специфика каждой ниши.",
              },
              {
                icon: "/images/return.png",
                title: "Возврат клиентов",
                text:
                  "Сценарии повторных записей и реактивации «спящей» базы без рекламы.",
              },
              {
                icon: "/images/guide.png",
                title: "Гайд по внедрению",
                text:
                  "Старт за один день: пошаговый план + стандарты для команды.",
              },
              {
                icon: "/images/result.png",
                title: "Итог",
                text:
                  "Больше записей, выше средний чек, меньше времени в переписке.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img src={c.icon} alt="" className="w-12 h-12" />
                  <h3 className="text-xl font-bold text-gray-900">{c.title}</h3>
                </div>
                <p className="text-gray-600 mt-4">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БОНУСЫ (празднично, но аккуратно) */}
      <section id="bonuses" className="py-20 bg-gradient-to-b from-white to-purple-50/40 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 animate-[sparkle_6s_linear_infinite] opacity-40" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Бонусы при покупке
            </h2>
            <p className="text-lg text-gray-600 mt-3">
              Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Гайд «Работа с клиентской базой»",
                text:
                  "Повторные записи без рекламы → возвращайте старых клиентов.",
                old: "27€",
              },
              {
                title: "Чек-лист «30+ источников клиентов»",
                text:
                  "Платные и бесплатные способы → где взять заявки уже сегодня.",
                old: "32€",
              },
              {
                title: "Гайд «Продажи на консультации»",
                text: "5 этапов продаж → мягкий апсейл дополнительных услуг.",
                old: "20€",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 text-center border border-purple-100 bg-white/70 backdrop-blur-sm shadow-sm"
              >
                <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-purple-100 flex items-center justify-center animate-[pop_600ms_ease]">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{b.title}</h3>
                <p className="text-gray-600 mt-3 mb-4">{b.text}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-bold text-gray-400 line-through">
                    {b.old}
                  </span>
                  <span className="text-xl font-extrabold text-purple-700">
                    0€
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ИЗМЕНИТСЯ СРАЗУ */}
      <section id="immediate" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
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
              <div
                key={i}
                className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm"
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

      {/* СКИДКА 70% + ТАЙМЕР */}
      <section id="pricing" className="py-20 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-3">
              Получите полную систему со скидкой 70%
            </h2>
            <p className="text-gray-300">
              Все скрипты + бонусы · Полная система для увеличения продаж
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-8 items-stretch">
            {/* Карточка цены */}
            <div className="rounded-3xl p-8 bg-white/5 border border-white/10">
              <div className="text-5xl font-extrabold tracking-tight">19€</div>
              <div className="mt-2 text-gray-300">
                <span className="opacity-70 line-through mr-2">67€</span>
                Ваша цена сегодня
              </div>

              <ul className="mt-6 space-y-3 text-gray-200">
                <li>Готовые диалоги для всех ситуаций</li>
                <li>Шаблоны под конкретную услугу</li>
                <li>Бонус: гайд по работе с базой (27€)</li>
                <li>Бонус: 30+ источников клиентов (32€)</li>
                <li>Бонус: продажи на консультации (20€)</li>
                <li>Пожизненный доступ и обновления</li>
              </ul>

              <a
                href={STRIPE_URL}
                className="mt-8 inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-white text-neutral-900 rounded-xl text-lg font-semibold hover:bg-neutral-100 transition-all duration-200 hover:-translate-y-0.5"
              >
                Получить со скидкой 70%
                <ArrowRight className="w-5 h-5" />
              </a>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mt-4">
                <div className="px-2 py-1 bg-black text-white rounded text-xs font-medium">
                  Apple Pay
                </div>
                <div className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium">
                  Google Pay
                </div>
                <span className="text-xs opacity-80">Visa · MasterCard</span>
              </div>
            </div>

            {/* Таймер */}
            <div className="rounded-3xl p-8 bg-white/5 border border-white/10 flex flex-col items-center justify-center">
              <div
                className="relative h-44 w-44 rounded-full"
                style={{
                  background: `conic-gradient(#ffffff ${progress}%, rgba(255,255,255,0.12) 0)`,
                }}
              >
                <div className="absolute inset-3 rounded-full bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm uppercase tracking-widest text-gray-300">
                      Осталось
                    </div>
                    <div className="mt-2 text-3xl font-extrabold">
                      {String(hh).padStart(2, "0")}:
                      {String(mm).padStart(2, "0")}:
                      {String(ss).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-gray-300 text-center">
                Цена и бонусы действуют ограниченное время
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Отзывы клиентов
            </h2>
          </div>

          {/* 4 фото-отзыва из /public/images/ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["review1.jpg", "review2.jpg", "review3.jpg", "review4.jpg"].map(
              (n) => (
                <img
                  key={n}
                  src={`/images/${n}`}
                  alt="Отзыв клиента"
                  className="rounded-xl border border-gray-100 object-cover w-full h-48"
                />
              )
            )}
          </div>

          {/* 6 ссылок на инстаграм-видео */}
          <div className="mt-8 grid md:grid-cols-3 gap-3 text-blue-600 underline">
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
                rel="noreferrer"
                className="truncate"
              >
                Ссылка на видео {i + 1}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (оставила как было с лёгким тюнингом) */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Частые вопросы
            </h2>
          </div>
          <div className="space-y-4">
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
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-8 py-6 text-left hover:bg-gray-50 flex justify-between items-center transition-colors"
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
                  <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{f.a}</p>
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
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold text-center block hover:bg-gray-800 transition-colors"
        >
          Готовые скрипты — 19€ • Купить сейчас
        </a>
      </div>

      {/* Доп. CSS для «праздничности» */}
      <style>{`
        @keyframes sparkle {
          0%{background-position:0 0}
          100%{background-position:1000px 1000px}
        }
        @keyframes pop {
          0%{transform:scale(.9); opacity:0}
          100%{transform:scale(1); opacity:1}
        }
      `}</style>
    </div>
  );
}
