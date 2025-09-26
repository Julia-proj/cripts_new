import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
} from "lucide-react";

// ВСТАВЬ сюда свою ссылку на Stripe
const STRIPE_URL = "#stripe-payment-link";

function App() {
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
    document.querySelectorAll<HTMLElement>("[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

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
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              id="hero-text"
              className={`transition-all duration-1000 ${
                isVisible["hero-text"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900 text-center lg:text-left">
                Скрипты, которые превращают сообщения{" "}
                <span className="text-blue-600">в деньги</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed text-center lg:text-left">
                Проверенная система общения с клиентами для бьюти-мастеров. Результат: закрытые
                возражения, увеличенный средний чек, экономия времени на переписке.
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
              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <img src="/images/check.png" alt="" className="w-4 h-4" />
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
        </div>
      </section>

      {/* КАК ИЗМЕНИТСЯ РАБОТА С КЛИЕНТАМИ (2 колонки) */}
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Как изменится ваша <span className="text-blue-600">работа с клиентами</span>
            </h2>
            <p className="text-gray-600 mt-2">Сравните результаты до и после внедрения скриптов.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mt-10">
            {/* СЕЙЧАС */}
            <div
              className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-1000 ${
                isVisible["comparison"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium text-sm">
                  <img src="/images/cross.png" className="w-4 h-4" alt="" />
                  Сейчас
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <img src="/images/cross.png" className="w-5 h-5 mt-1" alt="" />
                  <span>«Сколько стоит?» → отвечаете только ценой и тишина.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/cross.png" className="w-5 h-5 mt-1" alt="" />
                  <span>«Подумаю» → не знаете, что ответить — клиент уходит.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/cross.png" className="w-5 h-5 mt-1" alt="" />
                  <span>«Переписка 30+ минут» → клиент остывает — теряете заявку.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/cross.png" className="w-5 h-5 mt-1" alt="" />
                  <span>«10 заявок» → долгие диалоги — только 2–3 записи.</span>
                </li>
              </ul>
            </div>

            {/* ПОСЛЕ */}
            <div
              className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-1000 delay-200 ${
                isVisible["comparison"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full font-medium text-sm">
                  <img src="/images/check.png" className="w-4 h-4" alt="" />
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <img src="/images/check.png" className="w-5 h-5 mt-1" alt="" />
                  <span>«Сколько стоит?» → презентуете ценность → запись.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/check.png" className="w-5 h-5 mt-1" alt="" />
                  <span>«Подумаю» → мягкое возражение → возвращаете к записи.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/check.png" className="w-5 h-5 mt-1" alt="" />
                  <span>«Переписка 5 минут» → готовые фразы → быстрая запись.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/check.png" className="w-5 h-5 mt-1" alt="" />
                  <span>«10 заявок» → чёткие диалоги → 6–7 записей.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ ЭТО ВАЖНО */}
      <section id="why" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Почему это <span className="text-blue-600">важно</span>
            </h2>
            <p className="text-gray-600 mt-2">Каждая потерянная заявка — это упущенная прибыль</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <img src="/images/money.png" alt="" className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Сливаются деньги на рекламу</h3>
              <p className="text-gray-600">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <img src="/images/time.png" alt="" className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Тратится время впустую</h3>
              <p className="text-gray-600">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <img src="/images/competitor.png" alt="" className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Заявки уходят к конкуренту</h3>
              <p className="text-gray-600">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* КОМУ ПОДХОДЯТ (2x2) */}
      <section id="for-whom" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Кому подходят <span className="text-blue-600">скрипты</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
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
                icon: "/images/universal.png",
                title: "Мастерам-универсалам",
                text: "Ответы на типовые ситуации → быстрее к записи, увереннее в чате.",
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
                className="bg-white rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
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

      {/* ЧТО ВХОДИТ В СИСТЕМУ СКРИПТОВ */}
      <section id="whats-included" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
            <p className="text-gray-600 mt-2">Полный набор инструментов для увеличения продаж</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
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
                icon: "/images/per-service.png",
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
                desc:
                  "Больше записей, выше средний чек, меньше времени в переписке.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <img src={item.icon} alt="" className="w-12 h-12 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БОНУСЫ (праздничный блок, лёгкая анимация) */}
      <section id="bonuses" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none confetti"></div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Бонусы при покупке 🎉</h2>
            <p className="text-lg text-gray-600">
              Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              {
                title: "Гайд «Работа с клиентской базой»",
                desc: "Повторные записи без рекламы → возвращайте старых клиентов.",
                was: "27€",
              },
              {
                title: "Чек-лист «30+ источников клиентов»",
                desc:
                  "Платные и бесплатные способы → где взять заявки уже сегодня.",
                was: "32€",
              },
              {
                title: "Гайд «Продажи на консультации»",
                desc: "5 этапов продаж → мягкий апсейл дополнительных услуг.",
                was: "20€",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 text-center bonus-card"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bonus-icon">🎁</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{b.title}</h3>
                <p className="text-gray-600 mb-4">{b.desc}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-bold text-gray-400 line-through">{b.was}</span>
                  <span className="text-xl font-bold text-emerald-600">0€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО ИЗМЕНИТСЯ СРАЗУ — оставляем по смыслу */}
      <section id="immediate-changes" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
              Что <span className="text-blue-600">изменится сразу</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ.",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img src="/images/check-green.png" alt="" className="w-6 h-6 mt-1" />
                <span className="text-lg font-medium text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРЕДЛОЖЕНИЕ -70% + индикация лимита времени */}
      <section id="offer" className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-6">
            Получите полную систему со скидкой 70%
          </h2>

          {/* Лента-таймер (условная анимация лимита) */}
          <div className="mx-auto max-w-md h-2 rounded-full bg-white/20 overflow-hidden mb-8">
            <div className="h-full bg-white/70 animate-deadline" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <ul className="space-y-3 text-gray-200">
              {[
                "Все скрипты + бонусы",
                "Полная система для увеличения продаж",
                "Готовые диалоги для всех ситуаций",
                "Шаблоны под конкретную услугу",
                "Бонус: гайд по работе с базой (27€)",
                "Бонус: 30+ источников клиентов (32€)",
                "Бонус: продажи на консультации (20€)",
                "Пожизненный доступ и обновления",
              ].map((t, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <img src="/images/check-white.png" alt="" className="w-5 h-5 mt-1" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl bg-white/5 p-8 text-center">
              <div className="text-5xl font-extrabold tracking-tight mb-2">
                <span className="line-through opacity-60 mr-3">67€</span>
                <span>19€</span>
              </div>
              <a
                href={STRIPE_URL}
                className="mt-4 inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5"
              >
                Получить со скидкой 70%
                <ArrowRight className="w-5 h-5" />
              </a>

              <div className="mt-4 flex items-center justify-center gap-3 opacity-90">
                <img src="/images/payments/applepay.png" className="h-6" alt="Apple Pay" />
                <img src="/images/payments/googlepay.png" className="h-6" alt="Google Pay" />
                <img src="/images/payments/visa.png" className="h-6" alt="Visa" />
                <img src="/images/payments/mastercard.png" className="h-6" alt="Mastercard" />
              </div>
              <div className="mt-2 text-sm text-gray-300">Моментальный доступ после оплаты</div>
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Отзывы клиентов
          </h2>

          {/* Простой слайдер на CSS (перелистывание пальцем), положи изображения в /images/reviews/1.jpg ... */}
          <div className="mt-10 overflow-x-auto no-scrollbar">
            <div className="flex gap-6 w-max">
              {[1, 2, 3, 4, 5].map((n) => (
                <a
                  key={n}
                  href="https://instagram.com/" // сюда можно ставить ссылку на видео в Instagram
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <img
                    src={`/images/reviews/${n}.jpg`}
                    alt={`Отзыв ${n}`}
                    className="h-72 w-56 object-cover rounded-2xl shadow-md hover:-translate-y-1 transition"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (оставляем как есть по смыслу) */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Частые вопросы</h2>
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

      {/* Footer */}
      <footer className="py-12 bg-white border-top border-gray-200 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xl font-bold text-gray-900 mb-4">Beauty Scripts</div>
          <p className="text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      {/* Sticky CTA (мобайл) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 lg:hidden">
        <a
          href={STRIPE_URL}
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold text-center block hover:bg-gray-800 transition-colors duration-200"
        >
          Готовые скрипты — 19€ • Купить сейчас
        </a>
      </div>

      {/* Стили для праздничных бонусов и «лимита времени» */}
      <style>{`
        .bonus-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95));
          border: 1px solid rgba(0,0,0,0.04);
          animation: pop-in .6s ease both;
        }
        .bonus-icon {
          background: radial-gradient(circle at 30% 30%, #fff7ed, #ffe7ba);
          box-shadow: 0 8px 20px rgba(255, 186, 73, 0.25);
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: translateY(8px) scale(.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .confetti {
          background-image:
            radial-gradient(#ffd166 2px, transparent 2px),
            radial-gradient(#06d6a0 2px, transparent 2px),
            radial-gradient(#118ab2 2px, transparent 2px),
            radial-gradient(#ef476f 2px, transparent 2px);
          background-size: 18px 18px, 22px 22px, 20px 20px, 16px 16px;
          background-position: 0 0, 10px 8px, 6px 14px, 12px 4px;
          opacity: .18;
          animation: confetti-move 12s linear infinite;
        }
        @keyframes confetti-move {
          0% { background-position: 0 0, 10px 8px, 6px 14px, 12px 4px; }
          100% { background-position: 0 600px, 10px 608px, 6px 614px, 12px 604px; }
        }
        @keyframes deadline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
        .animate-deadline {
          width: 100%;
          animation: deadline 9s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default App;
