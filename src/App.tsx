import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

// !!! ВСТАВЬ свою ссылку на Stripe
const STRIPE_URL = "#stripe-payment-link";

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto flex items-center justify-between max-w-7xl px-6 py-4">
          <div className="text-xl font-bold text-gray-900">Beauty Scripts</div>
          <a
            href={STRIPE_URL}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Купить
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div id="hero-text" className={`transition-all duration-1000 ${isVisible["hero-text"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 lg:text-5xl xl:text-6xl">
                Скрипты, которые превращают сообщения{" "}
                <span className="text-blue-600">в деньги</span>
              </h1>
              <p className="mb-8 text-xl leading-relaxed text-gray-600">
                Проверенная система общения с клиентами для бьюти-мастеров.
                Результат: закрытые возражения, увеличенный средний чек, экономия времени на переписке.
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
                  <div className="rounded bg-black px-2 py-1 text-xs font-medium text-white">Apple Pay</div>
                  <div className="rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white">Google Pay</div>
                </div>
              </div>
            </div>

            <div id="hero-image" className={`transition-all duration-1000 delay-300 ${isVisible["hero-image"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="relative">
                <img
                  src="/images/hero.jpg"
                  alt="Beauty Scripts Hero"
                  className="h-auto w-full rounded-2xl shadow-xl object-cover"
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

      {/* КАК ИЗМЕНИТСЯ РАБОТА С КЛИЕНТАМИ (СЕЙЧАС / ПОСЛЕ) */}
      <section id="comparison" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-2 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl">
              Как изменится ваша <span className="text-blue-600">работа с клиентами</span>
            </h2>
            <p className="text-gray-600">Сравните результаты до и после внедрения скриптов.</p>
          </div>

          <div className="mx-auto mb-2 grid max-w-5xl gap-8 lg:grid-cols-2">
            {/* СЕЙЧАС (красная) */}
            <div className={`rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-1000 ${isVisible["comparison"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                  <img src="/images/cross-red.png" alt="" className="h-4 w-4" />
                  Сейчас
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <img src="/images/cross-red.png" alt="" className="mt-1 h-5 w-5 shrink-0" />
                  <span>«Сколько стоит?» → отвечаете только ценой и тишина.</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/images/cross-red.png" alt="" className="mt-1 h-5 w-5 shrink-0" />
                  <span>«Подумаю» → не знаете, что ответить — клиент уходит.</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/images/cross-red.png" alt="" className="mt-1 h-5 w-5 shrink-0" />
                  <span>«Переписка 30+ минут» → клиент остывает — теряете заявку.</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/images/cross-red.png" alt="" className="mt-1 h-5 w-5 shrink-0" />
                  <span>«10 заявок» → долгие диалоги — только 2–3 записи.</span>
                </li>
              </ul>
            </div>

            {/* ПОСЛЕ (зелёная) */}
            <div className={`rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-1000 delay-200 ${isVisible["comparison"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
                  <img src="/images/check-green.png" alt="" className="h-4 w-4" />
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <img src="/images/check-green.png" alt="" className="mt-1 h-5 w-5 shrink-0" />
                  <span>«Сколько стоит?» → презентуете ценность → запись.</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/images/check-green.png" alt="" className="mt-1 h-5 w-5 shrink-0" />
                  <span>«Подумаю» → мягкое возражение → возвращаете к записи.</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/images/check-green.png" alt="" className="mt-1 h-5 w-5 shrink-0" />
                  <span>«Переписка 5 минут» → готовые фразы → быстрая запись.</span>
                </li>
                <li className="flex items-start gap-3">
                  <img src="/images/check-green.png" alt="" className="mt-1 h-5 w-5 shrink-0" />
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
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl">
              Почему это <span className="text-blue-600">важно</span>
            </h2>
            <p className="text-lg text-gray-600">Каждая потерянная заявка — это упущенная прибыль</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border p-8">
              <div className="mb-4 flex items-center justify-center">
                <img src="/images/why-ads.png" alt="" className="h-12 w-12" />
              </div>
              <h3 className="mb-2 text-center text-lg font-semibold text-gray-900">
                Сливаются деньги на рекламу
              </h3>
              <p className="text-center text-gray-600">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>
            <div className="rounded-2xl border p-8">
              <div className="mb-4 flex items-center justify-center">
                <img src="/images/why-time.png" alt="" className="h-12 w-12" />
              </div>
              <h3 className="mb-2 text-center text-lg font-semibold text-gray-900">
                Тратится время впустую
              </h3>
              <p className="text-center text-gray-600">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>
            <div className="rounded-2xl border p-8">
              <div className="mb-4 flex items-center justify-center">
                <img src="/images/why-competitor.png" alt="" className="h-12 w-12" />
              </div>
              <h3 className="mb-2 text-center text-lg font-semibold text-gray-900">
                Заявки уходят к конкуренту
              </h3>
              <p className="text-center text-gray-600">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* КОМУ ПОДХОДЯТ СКРИПТЫ */}
      <section id="audience" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="mb-12 text-3xl font-bold text-gray-900 lg:text-4xl">
              Кому подходят <span className="text-blue-600">скрипты</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                icon: "/images/a-salon.png",
                title: "Владельцам салонов и студий",
                text: "Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.",
              },
              {
                icon: "/images/a-med.png",
                title: "Медицинским центрам",
                text: "Админы закрывают заявки, врачи работают с реальными пациентами.",
              },
              {
                icon: "/images/a-master.png",
                title: "Мастерам-универсалам",
                text: "Ответы на типовые ситуации → быстрее к записи, увереннее в чате.",
              },
              {
                icon: "/images/a-pro.png",
                title: "Узким специалистам",
                text: "Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.",
              },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex items-center gap-3">
                  <img src={c.icon} alt="" className="h-7 w-7" />
                  <h3 className="text-xl font-bold text-gray-900">{c.title}</h3>
                </div>
                <p className="text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ВХОДИТ В СИСТЕМУ СКРИПТОВ */}
      <section id="included" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
            <p className="mb-12 text-lg text-gray-600">Полный набор инструментов для увеличения продаж.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "/images/i-dialogs.png",
                title: "Готовые диалоги",
                desc: "Контакты до оплаты: приветствия, презентация ценности, запись — всё пошагово.",
              },
              {
                icon: "/images/i-objections.png",
                title: "Закрытие возражений",
                desc: "«Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления.",
              },
              {
                icon: "/images/i-services.png",
                title: "Под каждую услугу",
                desc: "Маникюр, брови, ресницы, косметология, массаж — учтена специфика каждой ниши.",
              },
              {
                icon: "/images/i-return.png",
                title: "Возврат клиентов",
                desc: "Сценарии повторных записей и реактивации «спящей» базы без рекламы.",
              },
              {
                icon: "/images/i-guide.png",
                title: "Гайд по внедрению",
                desc: "Старт за один день: пошаговый план + стандарты для команды.",
              },
              {
                icon: "/images/i-result.png",
                title: "Итог",
                desc: "Больше записей, выше средний чек, меньше времени в переписке.",
              },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
                  <img src={c.icon} alt="" className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{c.title}</h3>
                <p className="text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БОНУСЫ */}
      <section id="bonuses" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl">Бонусы при покупке 🎉</h2>
            <p className="text-lg text-gray-600">Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами.</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "/images/b-guide-base.png",
                title: "Гайд «Работа с клиентской базой»",
                priceOld: "27€",
                priceNew: "0€",
                desc: "Повторные записи без рекламы → возвращайте старых клиентов.",
              },
              {
                icon: "/images/b-checklist.png",
                title: "Чек-Лист «30+ источников клиентов»",
                priceOld: "32€",
                priceNew: "0€",
                desc: "Платные и бесплатные способы → где взять заявки уже сегодня.",
              },
              {
                icon: "/images/b-guide-sales.png",
                title: "Гайд «Продажи на консультации»",
                priceOld: "20€",
                priceNew: "0€",
                desc: "5 этапов продаж → мягкий апсейл дополнительных услуг.",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50">
                  <img src={b.icon} alt="" className="h-9 w-9" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{b.title}</h3>
                <p className="mb-4 text-gray-600">{b.desc}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-bold text-gray-400 line-through">{b.priceOld}</span>
                  <span className="text-xl font-bold text-green-600">{b.priceNew}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ИЗМЕНИТСЯ СРАЗУ (оставляем по сути как было) */}
      <section id="immediate" className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="mb-12 text-3xl font-bold text-gray-900 lg:text-4xl">
              Что <span className="text-blue-600">изменится</span> сразу
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
                className="flex items-start gap-4 rounded-2xl bg-gray-50 p-6 shadow-sm transition-all duration-500"
                style={{ transitionDelay: `${i * 100}ms` }}
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

      {/* ПРЕДЛОЖЕНИЕ / -70% + ЛЕГКАЯ АНИМАЦИЯ */}
      <section id="pricing" className="relative overflow-hidden bg-gray-900 py-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium">
            <span className="animate-pulse">⏳</span> Ограниченное время
          </div>
          <h2 className="mb-4 text-3xl font-bold lg:text-5xl">
            Получите полную систему со скидкой <span className="text-blue-400">70%</span>
          </h2>

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white/5 p-8">
            <div className="mb-6 text-4xl font-extrabold tracking-tight">
              <span className="mr-3 align-middle text-2xl text-gray-400 line-through">67€</span>
              <span className="align-middle text-white">19€</span>
            </div>

            <ul className="mx-auto mb-8 grid gap-3 text-left text-gray-200 md:grid-cols-2">
              {[
                "Все скрипты + бонусы",
                "Полная система для увеличения продаж",
                "Готовые диалоги для всех ситуаций",
                "Шаблоны под конкретную услугу",
                "Бонус: гайд по работе с базой (27€)",
                "Бонус: 30+ источников клиентов (32€)",
                "Бонус: продажи на консультации (20€)",
                "Пожизненный доступ и обновления",
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/70" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <a
              href={STRIPE_URL}
              className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-transform hover:-translate-y-0.5"
            >
              Получить со скидкой 70%
              <ArrowRight className="h-5 w-5" />
            </a>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-300">
              <span className="rounded bg-black px-2 py-1 text-xs font-medium text-white">Apple Pay</span>
              <span className="rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white">Google Pay</span>
              <span className="rounded bg-white/10 px-2 py-1 text-xs font-medium">Visa</span>
              <span className="rounded bg-white/10 px-2 py-1 text-xs font-medium">MasterCard</span>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="reviews" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="mb-12 text-3xl font-bold text-gray-900 lg:text-4xl">Отзывы клиентов</h2>
          </div>

          {/* Простая «галерея»: положи файлы в /public/images/reviews/ */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { img: "/images/reviews/r1.jpg", ig: "https://instagram.com/..." },
              { img: "/images/reviews/r2.jpg", ig: "https://instagram.com/..." },
              { img: "/images/reviews/r3.jpg", ig: "https://instagram.com/..." },
            ].map((r, i) => (
              <a
                key={i}
                href={r.ig}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-2xl border"
              >
                <img src={r.img} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (оставляем логику аккордеона) */}
      <section id="faq" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="mb-12 text-3xl font-bold text-gray-900 lg:text-4xl">Частые вопросы</h2>
          </div>

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
            ].map((f, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border bg-white">
                <button
                  onClick={() => toggleFaq(i)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="text-lg font-semibold text-gray-900">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t bg-gray-50 px-8 py-6">
                    <p className="leading-relaxed text-gray-600">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white py-12 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-4 text-xl font-bold text-gray-900">Beauty Scripts</div>
          <p className="text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      {/* STICKY CTA (мобилка) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 lg:hidden">
        <a
          href={STRIPE_URL}
          className="block w-full rounded-xl bg-gray-900 py-4 px-6 text-center font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Готовые скрипты — 19€ • Купить сейчас
        </a>
      </div>
    </div>
  );
}
