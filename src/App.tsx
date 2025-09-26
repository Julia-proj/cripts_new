// src/App.tsx
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  CheckCircle, // используем только после блока "Бонусы"
} from "lucide-react";

// ================================
// 1) Настрой: ссылка Stripe
// ================================
const STRIPE_URL = "#stripe-payment-link"; // TODO: вставь ссылку вида https://buy.stripe.com/...

// ================================
// 2) Вспомогательный Countdown для 70% блока
// ================================
function useCountdown(targetISO?: string) {
  const [left, setLeft] = useState<{ h: number; m: number; s: number }>({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    // По умолчанию — дедлайн сегодня в 23:59:59
    const target = targetISO ? new Date(targetISO) : (() => {
      const d = new Date();
      d.setHours(23, 59, 59, 999);
      return d;
    })();

    const tick = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target.getTime() - now);
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setLeft({ h, m, s });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  return left;
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const countdown = useCountdown(); // дедлайн на конец текущего дня

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll("[id]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className="min-h-screen bg-white">
      {/* ================= Header ================= */}
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

      {/* ================= Hero ================= */}
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              id="hero-text"
              className={`transition-all duration-1000 ${
                isVisible["hero-text"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900">
                Скрипты, которые превращают сообщения{" "}
                <span className="text-blue-600">в деньги</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Проверенная система общения с клиентами для бьюти-мастеров. Результат: закрытые возражения, увеличенный
                средний чек, экономия времени на переписке.
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
                  <img src="/images/check-mini.png" alt="" className="h-4 w-4" /> {/* TODO: маленькая галочка */}
                  Доступ сразу
                </span>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-black text-white rounded text-xs font-medium">Apple Pay</div>
                  <div className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium">Google Pay</div>
                </div>
              </div>
            </div>

            <div
              id="hero-image"
              className={`transition-all duration-1000 delay-300 ${
                isVisible["hero-image"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative">
                <img
                  src="/images/hero.jpg" // TODO: положи файл hero.jpg в public/images
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

      {/* ========== Как изменится работа с клиентами (2 колонки) ========== */}
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Как изменится ваша <span className="text-blue-600">работа с клиентами</span>
            </h2>
          </div>
          <p className="text-center text-gray-600 mb-12">Сравните результаты до и после внедрения скриптов.</p>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* СЕЙЧАС / без скриптов */}
            <div
              className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-1000 ${
                isVisible["comparison"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium text-sm">
                  <img src="/images/cross-red.png" alt="" className="h-4 w-4" /> {/* TODO: красный крест */}
                  Сейчас
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <img src="/images/cross-red.png" alt="" className="h-5 w-5 mt-1" />
                  <span>«Сколько стоит?» → отвечаете только ценой и тишина.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/cross-red.png" alt="" className="h-5 w-5 mt-1" />
                  <span>«Подумаю» → не знаете, что ответить — клиент уходит.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/cross-red.png" alt="" className="h-5 w-5 mt-1" />
                  <span>«Переписка 30+ минут» → клиент остывает — теряете заявку.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/cross-red.png" alt="" className="h-5 w-5 mt-1" />
                  <span>«10 заявок» → долгие диалоги — только 2–3 записи.</span>
                </li>
              </ul>
            </div>

            {/* ПОСЛЕ / со скриптами */}
            <div
              className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-1000 delay-150 ${
                isVisible["comparison"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full font-medium text-sm">
                  <img src="/images/check-green.png" alt="" className="h-4 w-4" /> {/* TODO: зелёная галочка */}
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <img src="/images/check-green.png" alt="" className="h-5 w-5 mt-1" />
                  <span>«Сколько стоит?» → презентуете ценность → запись.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/check-green.png" alt="" className="h-5 w-5 mt-1" />
                  <span>«Подумаю» → мягкое возражение → возвращаете к записи.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/check-green.png" alt="" className="h-5 w-5 mt-1" />
                  <span>«Переписка 5 минут» → готовые фразы → быстрая запись.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/check-green.png" alt="" className="h-5 w-5 mt-1" />
                  <span>«10 заявок» → чёткие диалоги → 6–7 записей.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Почему это важно ================= */}
      <section id="why" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Почему это <span className="text-blue-600">важно</span>
            </h2>
          </div>
          <p className="text-center text-gray-600 mb-12">Каждая потерянная заявка — это упущенная прибыль.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl p-8 bg-gray-50">
              <div className="w-12 h-12 mb-5">
                <img src="/images/money.png" alt="" className="w-12 h-12" /> {/* TODO: money.png */}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Сливаются деньги на рекламу</h3>
              <p className="text-gray-600">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>

            <div className="rounded-2xl p-8 bg-gray-50">
              <div className="w-12 h-12 mb-5">
                <img src="/images/time.png" alt="" className="w-12 h-12" /> {/* TODO: time.png */}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Тратится время впустую</h3>
              <p className="text-gray-600">По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.</p>
            </div>

            <div className="rounded-2xl p-8 bg-gray-50">
              <div className="w-12 h-12 mb-5">
                <img src="/images/competitor.png" alt="" className="w-12 h-12" /> {/* TODO: competitor.png */}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Заявки уходят к конкуренту</h3>
              <p className="text-gray-600">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Кому подходят скрипты (2x2) ================= */}
      <section id="target" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Кому подходят <span className="text-blue-600">скрипты</span>
            </h2>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "/images/salon.png",
                title: "Владельцам салонов и студий",
                text: "Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.",
              },
              {
                icon: "/images/med.png",
                title: "Медицинским центрам",
                text: "Админы закрывают заявки, врачи работают с реальными пациентами.",
              },
              {
                icon: "/images/master.png",
                title: "Мастерам-универсалам",
                text: "Ответы на типовые ситуации → быстрее к записи, увереннее в чате.",
              },
              {
                icon: "/images/pro.png",
                title: "Узким специалистам",
                text: "Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.",
              },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 hover:shadow-lg transition">
                <div className="w-12 h-12 mb-6">
                  <img src={c.icon} alt="" className="w-12 h-12" /> {/* TODO: добавь файлы в /public/images */}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{c.title}</h3>
                <p className="text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Что входит в систему скриптов (3+3) ========== */}
      <section id="included" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
          </div>
          <p className="text-center text-gray-600 mb-12">Полный набор инструментов для увеличения продаж.</p>

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
                desc: "«Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления.",
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
                desc: "Старт за один день: пошаговый план + стандарты для команды.",
              },
              {
                icon: "/images/result.png",
                title: "Итог",
                desc: "Больше записей, выше средний чек, меньше времени в переписке.",
              },
            ].map((it, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition">
                <div className="w-12 h-12 mb-6">
                  <img src={it.icon} alt="" className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{it.title}</h3>
                <p className="text-gray-600">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Бонусы (праздничный блок с лёгкой анимацией) ================= */}
      <section id="bonuses" className="py-20 relative overflow-hidden">
        {/* лёгкие «блёстки» */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,221,239,0.35),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(205,226,255,0.35),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(216,255,219,0.35),transparent_40%)] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-900">Бонусы при покупке 🎉</h2>
            <p className="text-lg text-gray-600">Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              {
                title: "Гайд «Работа с клиентской базой»",
                desc: "Повторные записи без рекламы → возвращайте старых клиентов.",
                was: "27€",
                color: "from-orange-50 to-white",
              },
              {
                title: "Чек-лист «30+ источников клиентов»",
                desc: "Платные и бесплатные способы → где взять заявки уже сегодня.",
                was: "32€",
                color: "from-green-50 to-white",
              },
              {
                title: "Гайд «Продажи на консультации»",
                desc: "5 этапов продаж → мягкий апсейл дополнительных услуг.",
                was: "20€",
                color: "from-blue-50 to-white",
              },
            ].map((b, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 text-center bg-gradient-to-b ${b.color} border`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-5">
                  <img src="/images/gift.png" alt="" className="w-16 h-16" /> {/* TODO: gift.png */}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{b.title}</h3>
                <p className="text-gray-600 mb-4">{b.desc}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-bold text-gray-400 line-through">{b.was}</span>
                  <span className="text-xl font-bold text-green-600">0€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Что изменится сразу (оставили как было по смыслу) ================= */}
      <section id="immediate" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Что изменится <span className="text-blue-600">сразу</span></h2>
          </div>
          <div className="space-y-6">
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-lg font-medium text-gray-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 70% скидка + таймер + состав пакета ================= */}
      <section id="pricing-70" className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-5xl font-bold">Получите полную систему со скидкой 70%</h2>
          </div>

          {/* Таймер */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="rounded-xl bg-white/10 px-4 py-2 font-semibold">{String(countdown.h).padStart(2, "0")}ч</div>
            <div className="rounded-xl bg-white/10 px-4 py-2 font-semibold">{String(countdown.m).padStart(2, "0")}м</div>
            <div className="rounded-xl bg-white/10 px-4 py-2 font-semibold">{String(countdown.s).padStart(2, "0")}с</div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-white/5 p-8">
              <h3 className="text-xl font-bold mb-4">Состав</h3>
              <ul className="space-y-3 text-gray-200">
                <li>• Все скрипты + бонусы</li>
                <li>• Полная система для увеличения продаж</li>
              </ul>

              <h3 className="text-xl font-bold mt-8 mb-4">Что входит</h3>
              <ul className="space-y-3 text-gray-200">
                <li>• Готовые диалоги для всех ситуаций</li>
                <li>• Шаблоны под конкретную услугу</li>
                <li>• Бонус: гайд по работе с базой (27€)</li>
                <li>• Бонус: 30+ источников клиентов (32€)</li>
                <li>• Бонус: продажи на консультации (20€)</li>
                <li>• Пожизненный доступ и обновления</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 text-gray-900">
              <div className="text-sm text-gray-500 mb-2">~67€~</div>
              <div className="text-5xl font-extrabold mb-6">19€</div>
              <a
                href={STRIPE_URL}
                className="inline-flex items-center gap-3 w-full justify-center px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-500 transition"
              >
                Получить со скидкой 70%
                <ArrowRight className="w-5 h-5" />
              </a>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                <img src="/images/pay-apple.png" alt="Apple Pay" className="h-6" /> {/* опционально: логотипы */}
                <img src="/images/pay-google.png" alt="Google Pay" className="h-6" />
                <img src="/images/pay-visa.png" alt="Visa" className="h-6" />
                <img src="/images/pay-mastercard.png" alt="MasterCard" className="h-6" />
              </div>
              <p className="mt-3 text-center text-sm text-gray-500">Моментальный доступ после оплаты</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Отзывы (простая галерея/слайдер) ================= */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Отзывы клиентов</h2>
          </div>

          {/* Горизонтальная прокрутка изображений */}
          <div className="overflow-x-auto whitespace-nowrap no-scrollbar">
            {/* TODO: подставь свои PNG/JPG и (опц.) ссылки на Instagram */}
            {[
              { img: "/images/rev1.jpg", link: "https://instagram.com/..." },
              { img: "/images/rev2.jpg", link: "https://instagram.com/..." },
              { img: "/images/rev3.jpg", link: "https://instagram.com/..." },
              { img: "/images/rev4.jpg", link: "https://instagram.com/..." },
            ].map((r, i) => (
              <a
                key={i}
                className="inline-block mr-4 align-top"
                href={r.link}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={r.img}
                  alt={`Отзыв ${i + 1}`}
                  className="h-64 w-auto rounded-2xl border hover:shadow-xl transition"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ (оставлен) ================= */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Частые вопросы</h2>
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
                a: "Нет. Формулировки живые, адаптируешь под свой тон. Главное — следовать алгоритму.",
              },
              {
                q: "Зачем это админам?",
                a:
                  "Единый стандарт повышает конверсию, скорость и управляемость. Новички включаются быстрее.",
              },
              {
                q: "Когда будут результаты?",
                a: "Часто — в первые 24 часа: готовые фразы экономят время и быстрее ведут к записи.",
              },
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left hover:bg-gray-50 flex justify-between items-center transition-colors duration-200"
                >
                  <span className="font-semibold text-lg text-gray-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Footer ================= */}
      <footer className="py-12 bg-white border-t border-gray-200 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xl font-bold text-gray-900 mb-4">Beauty Scripts</div>
          <p className="text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      {/* ================= Sticky CTA (мобила) ================= */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 lg:hidden">
        <a
          href={STRIPE_URL}
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold text-center block hover:bg-gray-800 transition-colors duration-200"
        >
          Готовые скрипты — 19€ • Купить сейчас
        </a>
      </div>
    </div>
  );
}
