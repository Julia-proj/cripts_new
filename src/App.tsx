import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

// TODO: вставь ссылку на Stripe
const STRIPE_URL = "https://buy.stripe.com/...";

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ===== Countdown до конца дня (анимация лимита) =====
  const [countdown, setCountdown] = useState<string>('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 999); // конец сегодняшнего дня
      const diff = end.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown('00:00:00');
        return;
      }
      const h = Math.floor(diff / 1000 / 60 / 60).toString().padStart(2, '0');
      const m = Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, '0');
      const s = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
      setCountdown(`${h}:${m}:${s}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900">
                Скрипты, которые превращают сообщения{' '}
                <span className="text-blue-600">в деньги</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Проверенная система общения с клиентами для бьюти-мастеров. Результат: закрытые
                возражения, увеличенный средний чек, экономия времени на переписке.
              </p>
              <a
                href={STRIPE_URL}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:-translate-y-0.5"
              >
                Купить
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div>
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

      {/* КАК ИЗМЕНИТСЯ РАБОТА С КЛИЕНТАМИ (СЕЙЧАС / ПОСЛЕ) */}
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Как изменится ваша <span className="text-blue-600">работа с клиентами</span>
            </h2>
          </div>
          <p className="text-center text-gray-600 mb-12">
            Сравните результаты до и после внедрения скриптов.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* СЕЙЧАС */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium text-sm">
                  <img src="/images/icon-x-red.png" alt="" className="w-4 h-4" />
                  Сейчас
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <img src="/images/icon-x-red.png" alt="" className="w-5 h-5 mt-1" />
                  <span>«Сколько стоит?» → отвечаете только ценой и тишина.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/icon-x-red.png" alt="" className="w-5 h-5 mt-1" />
                  <span>«Подумаю» → не знаете, что ответить — клиент уходит.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/icon-x-red.png" alt="" className="w-5 h-5 mt-1" />
                  <span>«Переписка 30+ минут» → клиент остывает — теряете заявку.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/icon-x-red.png" alt="" className="w-5 h-5 mt-1" />
                  <span>«10 заявок» → долгие диалоги — только 2–3 записи.</span>
                </li>
              </ul>
            </div>

            {/* ПОСЛЕ */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full font-medium text-sm">
                  <img src="/images/icon-check-green.png" alt="" className="w-4 h-4" />
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <img src="/images/icon-check-green.png" alt="" className="w-5 h-5 mt-1" />
                  <span>«Сколько стоит?» → презентуете ценность → запись.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/icon-check-green.png" alt="" className="w-5 h-5 mt-1" />
                  <span>«Подумаю» → мягкое возражение → возвращаете к записи.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/icon-check-green.png" alt="" className="w-5 h-5 mt-1" />
                  <span>«Переписка 5 минут» → готовые фразы → быстрая запись.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/icon-check-green.png" alt="" className="w-5 h-5 mt-1" />
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
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Почему это <span className="text-blue-600">важно</span>
            </h2>
          </div>
          <p className="text-center text-gray-600 mb-12">
            Каждая потерянная заявка — это упущенная прибыль.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <img src="/images/why-money.png" alt="" className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Сливаются деньги на рекламу</h3>
              <p className="text-gray-600">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>
            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <img src="/images/why-time.png" alt="" className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Тратится время впустую</h3>
              <p className="text-gray-600">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>
            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <img src="/images/why-competitor.png" alt="" className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Заявки уходят к конкуренту</h3>
              <p className="text-gray-600">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* КОМУ ПОДХОДЯТ СКРИПТЫ (4 карточки 2x2) */}
      <section id="audience" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Кому подходят <span className="text-blue-600">скрипты</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="rounded-2xl p-8 border bg-white hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/a-salon.png" alt="" className="w-7 h-7" />
                <h3 className="text-xl font-bold text-gray-900">Владельцам салонов и студий</h3>
              </div>
              <p className="text-gray-600">
                Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.
              </p>
            </div>

            <div className="rounded-2xl p-8 border bg-white hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/a-med.png" alt="" className="w-7 h-7" />
                <h3 className="text-xl font-bold text-gray-900">Медицинским центрам</h3>
              </div>
              <p className="text-gray-600">
                Админы закрывают заявки, врачи работают с реальными пациентами.
              </p>
            </div>

            <div className="rounded-2xl p-8 border bg-white hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/a-universal.png" alt="" className="w-7 h-7" />
                <h3 className="text-xl font-bold text-gray-900">Мастерам-универсалам</h3>
              </div>
              <p className="text-gray-600">
                Ответы на типовые ситуации → быстрее к записи, увереннее в чате.
              </p>
            </div>

            <div className="rounded-2xl p-8 border bg-white hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/a-niche.png" alt="" className="w-7 h-7" />
                <h3 className="text-xl font-bold text-gray-900">Узким специалистам</h3>
              </div>
              <p className="text-gray-600">
                Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ЧТО ВХОДИТ В СИСТЕМУ СКРИПТОВ */}
      <section id="whats-included" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
          </div>
          <p className="text-center text-gray-600 mb-12">
            Полный набор инструментов для увеличения продаж.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '/images/included-dialogs.png',
                title: 'Готовые диалоги',
                desc:
                  'Контакты до оплаты: приветствия, презентация ценности, запись — всё пошагово.',
              },
              {
                icon: '/images/included-objections.png',
                title: 'Закрытие возражений',
                desc:
                  '«Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления.',
              },
              {
                icon: '/images/included-services.png',
                title: 'Под каждую услугу',
                desc:
                  'Маникюр, брови, ресницы, косметология, массаж — учтена специфика каждой ниши.',
              },
              {
                icon: '/images/included-return.png',
                title: 'Возврат клиентов',
                desc:
                  'Сценарии повторных записей и реактивации «спящей» базы без рекламы.',
              },
              {
                icon: '/images/included-guide.png',
                title: 'Гайд по внедрению',
                desc:
                  'Старт за один день: пошаговый план + стандарты для команды.',
              },
              {
                icon: '/images/included-result.png',
                title: 'Итог',
                desc:
                  'Больше записей, выше средний чек, меньше времени в переписке.',
              },
            ].map((card, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition">
                <img src={card.icon} alt="" className="w-12 h-12 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-gray-900">{card.title}</h3>
                <p className="text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БОНУСЫ (празднично) */}
      <section id="bonuses" className="py-20 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Бонусы при покупке</h2>
          </div>
          <p className="text-center text-gray-600 mb-12">
            Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl p-8 bg-white shadow-sm ring-1 ring-white/60">
              <img src="/images/bonus-base.png" alt="" className="w-14 h-14 mb-5" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Гайд «Работа с клиентской базой»</h3>
              <p className="text-gray-600">Повторные записи без рекламы → возвращайте старых клиентов.</p>
            </div>
            <div className="rounded-2xl p-8 bg-white shadow-sm ring-1 ring-white/60">
              <img src="/images/bonus-sources.png" alt="" className="w-14 h-14 mb-5" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Чек-лист «30+ источников клиентов»</h3>
              <p className="text-gray-600">Платные и бесплатные способы → где взять заявки уже сегодня.</p>
            </div>
            <div className="rounded-2xl p-8 bg-white shadow-sm ring-1 ring-white/60">
              <img src="/images/bonus-consult.png" alt="" className="w-14 h-14 mb-5" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Гайд «Продажи на консультации»</h3>
              <p className="text-gray-600">5 этапов продаж → мягкий апсейл дополнительных услуг.</p>
            </div>
          </div>
        </div>

        {/* лёгкая «праздничная» пульсация */}
        <div className="pointer-events-none absolute inset-0 animate-pulse opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_30%,white,transparent_35%),radial-gradient(circle_at_50%_80%,white,transparent_40%)]" />
      </section>

      {/* ЧТО ИЗМЕНИТСЯ СРАЗУ (оставили как было) */}
      <section id="immediate" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Что изменится сразу</h2>
          </div>
          <div className="space-y-6">
            {[
              'Перестанешь терять заявки из-за слабых ответов.',
              'Начнёшь закрывать больше записей уже с первого дня.',
              'Повысишь средний чек через правильные предложения.',
              'Станешь увереннее — на всё есть готовый ответ.',
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm">
                <img src="/images/icon-check-green.png" alt="" className="w-6 h-6 mt-1" />
                <span className="text-lg font-medium text-gray-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОЛУЧИТЕ ПОЛНУЮ СИСТЕМУ СО СКИДКОЙ 70% */}
      <section id="pricing" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Получите полную систему со скидкой 70%
            </h2>
          </div>

          {/* Лимит времени */}
          <div className="mx-auto mb-8 w-fit rounded-full bg-red-50 px-4 py-2 text-red-700 font-semibold animate-[pulse_2.2s_ease-in-out_infinite]">
            Успейте до конца дня · {countdown}
          </div>

          <div className="bg-gray-50 rounded-3xl p-10 text-center">
            <div className="text-gray-700 mb-6">Все скрипты + бонусы · Полная система для увеличения продаж</div>

            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-3xl font-extrabold text-gray-400 line-through">67€</span>
              <span className="text-5xl font-extrabold text-gray-900">19€</span>
            </div>

            <ul className="text-left max-w-xl mx-auto space-y-3 text-gray-700 mb-8">
              <li className="flex gap-3">
                <img src="/images/icon-check-green.png" alt="" className="w-5 h-5 mt-1" />
                Готовые диалоги для всех ситуаций.
              </li>
              <li className="flex gap-3">
                <img src="/images/icon-check-green.png" alt="" className="w-5 h-5 mt-1" />
                Шаблоны под конкретную услугу.
              </li>
              <li className="flex gap-3">
                <img src="/images/icon-check-green.png" alt="" className="w-5 h-5 mt-1" />
                Бонус: гайд по работе с базой (27€).
              </li>
              <li className="flex gap-3">
                <img src="/images/icon-check-green.png" alt="" className="w-5 h-5 mt-1" />
                Бонус: 30+ источников клиентов (32€).
              </li>
              <li className="flex gap-3">
                <img src="/images/icon-check-green.png" alt="" className="w-5 h-5 mt-1" />
                Бонус: продажи на консультации (20€).
              </li>
              <li className="flex gap-3">
                <img src="/images/icon-check-green.png" alt="" className="w-5 h-5 mt-1" />
                Пожизненный доступ и обновления.
              </li>
            </ul>

            <a
              href={STRIPE_URL}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
            >
              Получить со скидкой 70%
              <ArrowRight className="w-5 h-5" />
            </a>

            <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mt-6">
              <img src="/images/pay-applepay.png" alt="Apple Pay" className="h-6" />
              <img src="/images/pay-googlepay.png" alt="Google Pay" className="h-6" />
              <img src="/images/pay-visa.png" alt="Visa" className="h-6" />
              <img src="/images/pay-mastercard.png" alt="MasterCard" className="h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Отзывы клиентов</h2>
          </div>

          {/* Лёгкий «слайдер»: просто горизонтальный скролл */}
          <div className="flex gap-6 overflow-x-auto snap-x pb-2">
            {[
              { img: '/images/reviews/1.jpg', ig: 'https://instagram.com/...' },
              { img: '/images/reviews/2.jpg', ig: 'https://instagram.com/...' },
              { img: '/images/reviews/3.jpg', ig: 'https://instagram.com/...' },
            ].map((r, i) => (
              <a
                key={i}
                href={r.ig}
                target="_blank"
                rel="noreferrer"
                className="min-w-[260px] snap-start"
              >
                <img
                  src={r.img}
                  alt="Отзыв"
                  className="w-64 h-64 object-cover rounded-2xl shadow"
                />
                <div className="text-center text-sm text-gray-500 mt-2">Видео в Instagram</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (оставляем как было по сути) */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Частые вопросы</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Сработает в моей нише?',
                a: 'Да. База универсальная + блоки под ногти/брови/ресницы/волосы/косметологию/перманент.',
              },
              {
                q: 'Не будет ли звучать «по-скриптовому»?',
                a: 'Нет. Формулировки живые, адаптируешь под свой тон. Главное — следовать алгоритму.',
              },
              {
                q: 'Зачем это админам?',
                a: 'Единый стандарт повышает конверсию, скорость и управляемость. Новички включаются быстрее.',
              },
              {
                q: 'Когда будут результаты?',
                a: 'Часто — в первые 24 часа: готовые фразы экономят время и быстрее ведут к записи.',
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
                      openFaq === index ? 'rotate-180' : ''
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
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold text-center block hover:bg-gray-800 transition-colors duration-200"
        >
          Готовые скрипты — 19€ • Купить сейчас
        </a>
      </div>
    </div>
  );
}

export default App;
