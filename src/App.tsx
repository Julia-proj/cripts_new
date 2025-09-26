// src/App.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  ChevronDown,
} from "lucide-react";

// ВСТАВЬ СЮДА СВОЮ ССЫЛКУ НА STRIPE
const STRIPE_URL = "#stripe-payment-link";

// ====== Вспомогательная логика таймера (минималистичный countdown) ======
function useCountdown(hours = 24) {
  // Роллинг-дедлайн: X часов с момента входа на страницу
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

  // Процент для тонкого прогресс-бара
  const percent = Math.max(0, Math.min(100, (left / (hours * 3600 * 1000)) * 100));

  return { hh, mm, ss, percent };
}

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { hh, mm, ss, percent } = useCountdown(24);

  const toggleFaq = (i: number) => setOpenFaq((p) => (p === i ? null : i));

  return (
    <div className="min-h-screen bg-white">
      {/* ======= Header ======= */}
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

      {/* ======= HERO ======= */}
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900 text-center lg:text-left">
                Скрипты, которые превращают сообщения{" "}
                <span className="text-blue-600">в деньги</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed text-center lg:text-left">
                Проверенная система общения с клиентами для бьюти-мастеров.
                Результат: закрытые возражения, увеличенный средний чек, экономия
                времени на переписке.
              </p>
              <div className="mb-6 flex justify-center lg:justify-start">
                <a
                  href={STRIPE_URL}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:-translate-y-0.5"
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
      </section>

      {/* ======= КАК ИЗМЕНИТСЯ РАБОТА С КЛИЕНТАМИ ======= */}
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Как изменится ваша <span className="underline decoration-blue-200">работа с клиентами</span>
            </h2>
          </div>
          <p className="text-center text-gray-600 mb-12">
            Сравните результаты до и после внедрения скриптов
          </p>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Сейчас (красная) */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium text-sm">
                  <XCircle className="w-4 h-4" />
                  Сейчас
                </div>
              </div>
              <ul className="space-y-4 text-gray-800">
                <li className="flex gap-3">
                  <XCircle className="mt-0.5 w-5 h-5 text-red-500 shrink-0" />
                  <span>«Сколько стоит?» → отвечаете только ценой — тишина.</span>
                </li>
                <li className="flex gap-3">
                  <XCircle className="mt-0.5 w-5 h-5 text-red-500 shrink-0" />
                  <span>«Подумаю» → не знаете, что ответить — клиент уходит.</span>
                </li>
                <li className="flex gap-3">
                  <XCircle className="mt-0.5 w-5 h-5 text-red-500 shrink-0" />
                  <span>«Переписка 30+ минут» → клиент остывает — теряете заявку.</span>
                </li>
                <li className="flex gap-3">
                  <XCircle className="mt-0.5 w-5 h-5 text-red-500 shrink-0" />
                  <span>«10 заявок» → долгие диалоги — только 2–3 записи.</span>
                </li>
              </ul>
            </div>

            {/* После (зелёная) */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full font-medium text-sm">
                  <CheckCircle className="w-4 h-4" />
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-800">
                <li className="flex gap-3">
                  <CheckCircle className="mt-0.5 w-5 h-5 text-green-600 shrink-0" />
                  <span>«Сколько стоит?» → презентуете ценность → запись.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="mt-0.5 w-5 h-5 text-green-600 shrink-0" />
                  <span>«Подумаю» → мягкое возражение → возвращаете к записи.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="mt-0.5 w-5 h-5 text-green-600 shrink-0" />
                  <span>«Переписка 5 минут» → готовые фразы → быстрая запись.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="mt-0.5 w-5 h-5 text-green-600 shrink-0" />
                  <span>«10 заявок» → чёткие диалоги → 6–7 записей.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ======= ПОЧЕМУ ЭТО ВАЖНО ======= */}
      <section id="why" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Почему это <span className="text-blue-600">важно</span>
          </h2>
          <p className="text-center text-gray-600 mt-3">
            Каждая потерянная заявка — это упущенная прибыль
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gray-50 flex items-center justify-center">
                <img src="/images/money.png" alt="" className="w-11 h-11" />
              </div>
              <div className="font-semibold text-gray-900">Сливаются деньги на рекламу</div>
              <p className="text-gray-600 mt-2">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gray-50 flex items-center justify-center">
                <img src="/images/time.png" alt="" className="w-11 h-11" />
              </div>
              <div className="font-semibold text-gray-900">Тратится время впустую</div>
              <p className="text-gray-600 mt-2">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gray-50 flex items-center justify-center">
                <img src="/images/competitor.png" alt="" className="w-11 h-11" />
              </div>
              <div className="font-semibold text-gray-900">Заявки уходят к конкуренту</div>
              <p className="text-gray-600 mt-2">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======= КОМУ ПОДХОДЯТ ======= */}
      <section id="for" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Кому подходят <span className="text-blue-600">скрипты</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {[
              {
                icon: "/images/owner.png",
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
                icon: "/images/universal.png",
                title: "Мастерам-универсалам",
                text:
                  "Ответы на типовые ситуации → быстрее к записи, увереннее в чате.",
              },
              {
                icon: "/images/niche.png",
                title: "Узким специалистам",
                text:
                  "Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center">
                    <img src={c.icon} alt="" className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{c.title}</h3>
                </div>
                <p className="text-gray-600 mt-4">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= ЧТО ВХОДИТ В СИСТЕМУ ======= */}
      <section id="whats-included" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Что входит в <span className="text-blue-600">систему скриптов</span>
          </h2>
          <p className="text-center text-gray-600 mt-3">
            Полный набор инструментов для увеличения продаж
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
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
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-md hover:-translate-y-0.5 transition"
              >
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-5">
                  <img src={c.icon} alt="" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{c.title}</h3>
                <p className="text-gray-600 mt-3">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= БОНУСЫ ======= */}
      <section id="bonuses" className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Лёгкий праздничный фон */}
        <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(closest-side,rgba(255,255,255,.7),transparent),radial-gradient(closest-side,rgba(248,250,252,.8),transparent)]" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Бонусы при покупке <span className="align-middle">🎉</span>
          </h2>
          <p className="text-center text-gray-600 mt-3">
            Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Гайд «Работа с клиентской базой»",
                text:
                  "Повторные записи без рекламы → возвращайте старых клиентов.",
                price: "27€",
              },
              {
                title: "Чек-лист «30+ источников клиентов»",
                text:
                  "Платные и бесплатные способы → где взять заявки уже сегодня.",
                price: "32€",
              },
              {
                title: "Гайд «Продажи на консультации»",
                text: "5 этапов продаж → мягкий апсейл дополнительных услуг.",
                price: "20€",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-sm"
              >
                <div className="text-xl font-bold text-gray-900">{b.title}</div>
                <p className="text-gray-600 mt-3 mb-5">{b.text}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-lg font-bold text-gray-400 line-through">
                    {b.price}
                  </span>
                  <span className="text-xl font-extrabold text-green-600">0€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= ЧТО ИЗМЕНИТСЯ СРАЗУ ======= */}
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
                <img
                  src="/images/check-green.png"
                  alt=""
                  className="w-6 h-6 mt-1"
                />
                <span className="text-lg font-medium text-gray-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= БЛОК «ПОЛУЧИТЕ ПОЛНУЮ СИСТЕМУ СО СКИДКОЙ 70%» ======= */}
      <section id="offer" className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-blue-600/10 to-purple-500/10" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-6">
            Получите полную систему со скидкой 70%
          </h2>

          {/* Таймер + тонкий прогресс */}
          <div className="mx-auto max-w-xl">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <span>Ограничение по времени</span>
              <span className="font-semibold text-white">
                {hh}:{mm}:{ss}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/60 rounded-full transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="mt-10 grid lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white/5 rounded-2xl p-8">
              <div className="text-lg font-semibold mb-3">Что входит</div>
              <ul className="space-y-3 text-gray-200">
                <li>Все скрипты + бонусы</li>
                <li>Полная система для увеличения продаж</li>
                <li>Готовые диалоги для всех ситуаций</li>
                <li>Шаблоны под конкретную услугу</li>
                <li>Бонус: гайд по работе с базой (27€)</li>
                <li>Бонус: 30+ источников клиентов (32€)</li>
                <li>Бонус: продажи на консультации (20€)</li>
                <li>Пожизненный доступ и обновления</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 text-gray-900">
              <div className="text-sm text-gray-500 line-through">67€</div>
              <div className="text-5xl font-extrabold tracking-tight">19€</div>
              <a
                href={STRIPE_URL}
                className="mt-6 inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
              >
                Получить со скидкой 70%
                <ArrowRight className="w-5 h-5" />
              </a>

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
                <span className="px-2 py-1 bg-black text-white rounded">Apple Pay</span>
                <span className="px-2 py-1 bg-blue-600 text-white rounded">Google Pay</span>
                <span className="px-2 py-1 bg-gray-200 rounded">Visa</span>
                <span className="px-2 py-1 bg-gray-200 rounded">MasterCard</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">Моментальный доступ после оплаты</div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= ОТЗЫВЫ ======= */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Отзывы клиентов
          </h2>

          {/* 4 фото-отзыва */}
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            {["review1.jpg", "review2.jpg", "review3.jpg", "review4.jpg"].map((f) => (
              <div key={f} className="rounded-2xl overflow-hidden border border-gray-100">
                <img src={`/images/${f}`} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* 6 ссылок на видео из Instagram */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "#insta-video-1",
              "#insta-video-2",
              "#insta-video-3",
              "#insta-video-4",
              "#insta-video-5",
              "#insta-video-6",
            ].map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition text-blue-600 underline"
              >
                Видео-отзыв #{i + 1}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ======= FAQ ======= */}
      <section id="faq" className="py-20 bg-gray-50">
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
                "Нет. Формулировки живые, адаптируете под свой тон. Главное — следовать алгоритму.",
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
          ].map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-8 py-6 text-left hover:bg-gray-50 flex justify-between items-center transition-colors duration-200"
              >
                <span className="font-semibold text-lg text-gray-900">
                  {faq.q}
                </span>
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

      {/* ======= Footer ======= */}
      <footer className="py-12 bg-white border-t border-gray-200 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xl font-bold text-gray-900 mb-4">Beauty Scripts</div>
          <p className="text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      {/* ======= Sticky CTA (Mobile) ======= */}
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

export default App;
