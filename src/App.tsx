// src/App.tsx
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

const STRIPE_URL = "#stripe-payment-link"; // вставишь свою ссылку

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsVisible((p) => ({ ...p, [e.target.id]: true }));
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-obs]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  // ------------ отзывы (замени пути к картинкам и ссылки) ------------
  const reviews = [
    {
      img: "/images/rev1.jpg",
      text:
        "За неделю с шаблонами ушли «подумаю» и тишина. Записей стало ощутимо больше.",
      name: "Мария, бровист",
      link: "https://instagram.com/your_profile",
    },
    {
      img: "/images/rev2.jpg",
      text:
        "Админ наконец-то отвечает понятно и быстро. Конверсия из заявок выросла.",
      name: "Салон «Glow»",
      link: "https://instagram.com/your_profile",
    },
    {
      img: "/images/rev3.jpg",
      text:
        "Закрываю возражения без давления. Клиенты сами пишут «когда свободно?»",
      name: "Алина, косметолог",
      link: "https://instagram.com/your_profile",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold">Beauty Scripts</div>
          <a
            href={STRIPE_URL}
            className="rounded-lg bg-gray-900 px-6 py-2.5 font-medium text-white transition hover:bg-gray-800"
          >
            Купить
          </a>
        </div>
      </header>

      {/* HERO — ФОН НА ВЕСЬ ЭКРАН */}
      <section
        data-obs
        id="hero"
        className={`relative flex min-h-[100svh] items-center`}
      >
        <div
          className="absolute inset-0 -z-10 bg-black/20"
          style={{
            backgroundImage: "url('/images/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-white/10" />
        <div
          className={`mx-auto grid w-full max-w-7xl gap-8 px-6 py-28 transition-all duration-1000 ${
            isVisible["hero"] ? "opacity-100" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)] md:text-6xl">
              Скрипты, которые превращают сообщения{" "}
              <span className="text-blue-600">в деньги</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-gray-800 md:text-xl">
              Проверенная система общения с клиентами для бьюти-мастеров.
            </p>

            <div className="mt-6 inline-block rounded-md bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
              Результат: закрытые возражения, увеличенный средний чек, экономия
              времени на переписке.
            </div>

            <div className="mt-8">
              <a
                href={STRIPE_URL}
                className="inline-flex items-center gap-3 rounded-xl bg-gray-900 px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800"
              >
                Купить
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. КАК ИЗМЕНИТСЯ РАБОТА С КЛИЕНТАМИ */}
      <section data-obs id="comparison" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Как изменится{" "}
              <span className="text-blue-600">работа с клиентами</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Сравните результаты до и после внедрения скриптов
            </p>
          </div>

          <div
            className={`mx-auto mt-12 grid max-w-5xl gap-6 transition-all duration-700 md:grid-cols-2 ${
              isVisible["comparison"]
                ? "opacity-100"
                : "opacity-0 translate-y-2"
            }`}
          >
            {/* Сейчас */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="mb-6 text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                  Сейчас
                </span>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li>
                  «Сколько стоит?» → Отвечаете только ценой и тишина.
                </li>
                <li>«Подумаю» → Не знаете, что ответить — клиент уходит.</li>
                <li>
                  «Переписка 30+ минут» → Клиент остывает — теряете заявку.
                </li>
                <li>«10 заявок» → Долгие диалоги — только 2–3 записи.</li>
              </ul>
            </div>

            {/* После */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="mb-6 text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
                  После
                </span>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li>«Сколько стоит?» → Презентуете ценность → запись.</li>
                <li>
                  «Подумаю» → Мягкое возражение → возвращаете к записи.
                </li>
                <li>«Переписка 5 минут» → Готовые фразы → быстрая запись.</li>
                <li>«10 заявок» → Чёткие диалоги → 6–7 записей.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ПОЧЕМУ ЭТО ВАЖНО */}
      <section data-obs id="why" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Почему это <span className="text-blue-600">важно</span>
          </h2>
          <p className="mt-3 text-gray-600">
            Каждая потерянная заявка — это упущенная прибыль
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* 1 */}
            <div className="rounded-2xl border p-6">
              <div className="mb-4 flex items-center gap-3">
                <img
                  src="/images/money.png"
                  alt=""
                  className="h-7 w-7 shrink-0"
                />
                <h3 className="font-semibold">Сливаются деньги на рекламу</h3>
              </div>
              <p className="text-gray-600">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные —
                выброшенный бюджет.
              </p>
            </div>

            {/* 2 */}
            <div className="rounded-2xl border p-6">
              <div className="mb-4 flex items-center gap-3">
                <img src="/images/time.png" alt="" className="h-7 w-7" />
                <h3 className="font-semibold">Тратится время впустую</h3>
              </div>
              <p className="text-gray-600">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>

            {/* 3 */}
            <div className="rounded-2xl border p-6">
              <div className="mb-4 flex items-center gap-3">
                <img src="/images/leads.png" alt="" className="h-7 w-7" />
                <h3 className="font-semibold">Заявки уходят к конкуренту</h3>
              </div>
              <p className="text-gray-600">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро
                и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. КОМУ ПОДХОДЯТ */}
      <section data-obs id="for" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Кому подходят <span className="text-blue-600">скрипты</span>
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "/images/salon.png",
                title: "Владельцам салонов и студий",
                desc:
                  "Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.",
              },
              {
                icon: "/images/med.png",
                title: "Медицинским центрам",
                desc:
                  "Админы закрывают заявки, врачи работают с реальными пациентами.",
              },
              {
                icon: "/images/master.png",
                title: "Мастерам-универсалам",
                desc:
                  "Ответы на типовые ситуации → быстрее к записи, увереннее в чате.",
              },
              {
                icon: "/images/specialist.png",
                title: "Узким специалистам",
                desc:
                  "Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3">
                  <img src={c.icon} alt="" className="h-7 w-7" />
                  <h3 className="font-semibold">{c.title}</h3>
                </div>
                <p className="text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ЧТО ВХОДИТ В СИСТЕМУ СКРИПТОВ */}
      <section data-obs id="whats-included" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Что входит в <span className="text-blue-600">систему скриптов</span>
          </h2>
          <p className="mt-3 text-gray-600">
            Полный набор инструментов для увеличения продаж
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                desc:
                  "«Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления.",
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
                desc:
                  "Старт за один день: пошаговый план + стандарты для команды.",
              },
              {
                icon: "/images/result.png",
                title: "Итог",
                desc:
                  "Больше записей, выше средний чек, меньше времени в переписке.",
              },
            ].map((i, idx) => (
              <div
                key={idx}
                className="rounded-2xl border bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 h-12 w-12 rounded-xl bg-gray-50 p-2">
                  <img src={i.icon} alt="" className="h-full w-full object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{i.title}</h3>
                <p className="mt-3 text-gray-600">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. БОНУСЫ (празднично, минималистично) */}
      <section
        data-obs
        id="bonuses"
        className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-violet-50 to-blue-50 py-20"
      >
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_10%_10%,white_0,transparent_30%),radial-gradient(circle_at_90%_20%,white_0,transparent_30%),radial-gradient(circle_at_20%_90%,white_0,transparent_30%)]" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Бонусы при покупке 🎉
            </h2>
            <p className="mt-3 text-gray-700">
              Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Работа с клиентской базой",
                desc:
                  "Повторные записи без рекламы → возвращайте старых клиентов.",
                old: "27€",
                color: "from-orange-100 to-amber-50",
              },
              {
                title: "30+ источников клиентов",
                desc:
                  "Платные и бесплатные способы → где взять заявки уже сегодня.",
                old: "32€",
                color: "from-emerald-100 to-green-50",
              },
              {
                title: "Продажи на консультации",
                desc:
                  "5 этапов продаж → мягкий апсейл дополнительных услуг.",
                old: "20€",
                color: "from-sky-100 to-blue-50",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="relative rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`absolute -top-6 right-6 animate-pulse rounded-full bg-gradient-to-br ${b.color} px-3 py-1 text-xs font-semibold text-gray-800`}
                >
                  Подарок
                </div>
                <h3 className="text-xl font-bold text-gray-900">{b.title}</h3>
                <p className="mt-3 text-gray-600">{b.desc}</p>
                <div className="mt-5 flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-400 line-through">
                    {b.old}
                  </span>
                  <span className="text-xl font-bold text-emerald-600">0€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ЧТО ИЗМЕНИТСЯ СРАЗУ — оставлено как было по смыслу */}
      <section data-obs id="immediate" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Что изменится <span className="text-emerald-600">сразу</span>
            </h2>
          </div>

          <div className="mt-10 space-y-6">
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ.",
            ].map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm"
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

      {/* 8. ПОЛНАЯ СИСТЕМА -70% */}
      <section data-obs id="pricing" className="relative overflow-hidden bg-gray-900 py-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            Получите полную систему со скидкой 70%
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-300">
            Специальное предложение на этой неделе
          </p>
          <div className="mt-2 inline-block rounded-md bg-white/10 px-3 py-1 text-sm font-semibold text-white">
            Предложение действует ограниченное время
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white/5 p-8">
            <div className="text-left text-gray-200">
              <ul className="list-disc space-y-2 pl-5">
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

            <div className="mt-8 flex items-end justify-center gap-3">
              <span className="text-3xl font-bold text-gray-400 line-through">
                67€
              </span>
              <span className="text-5xl font-extrabold text-white">19€</span>
            </div>

            <a
              href={STRIPE_URL}
              className="mt-6 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:bg-gray-100"
            >
              Получить со скидкой 70%
              <ArrowRight className="h-5 w-5" />
            </a>

            <div className="mt-4 flex items-center justify-center gap-3">
              <img src="/images/applepay.svg" alt="Apple Pay" className="h-6" />
              <img src="/images/googlepay.svg" alt="Google Pay" className="h-6" />
              <img src="/images/visa.svg" alt="Visa" className="h-6" />
              <img src="/images/mastercard.svg" alt="Mastercard" className="h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* 9. ОТЗЫВЫ */}
      <section data-obs id="reviews" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Отзывы клиентов
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <a
                key={i}
                href={r.link}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src={r.img}
                    alt=""
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-gray-800">{r.text}</p>
                <div className="mt-2 text-sm text-gray-500">{r.name}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ (оставляем как было по логике) */}
      <section id="faq" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Частые вопросы
            </h2>
          </div>

          <div className="mt-8 space-y-4">
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
            ].map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border bg-white"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-gray-50"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="border-t bg-gray-50 px-6 py-5">
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER + MOBILE CTA */}
      <footer className="border-t py-12 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-xl font-bold text-gray-900">Beauty Scripts</div>
          <p className="mt-2 text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 lg:hidden">
        <a
          href={STRIPE_URL}
          className="block w-full rounded-xl bg-gray-900 py-4 text-center font-semibold text-white transition hover:bg-gray-800"
        >
          Готовые скрипты — 19€ • Купить сейчас
        </a>
      </div>
    </div>
  );
}
