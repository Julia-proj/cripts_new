import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

// ЗДЕСЬ ВСТАВИШЬ СВОЮ ССЫЛКУ НА STRIPE
const STRIPE_URL = "#stripe-payment-link";

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Купить
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div id="hero-text" className={`transition-all duration-700 ${isVisible['hero-text'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900 text-center lg:text-left">
                Скрипты, которые превращают сообщения <span className="text-blue-600">в деньги</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed text-center lg:text-left">
                Проверенная система общения с клиентами для бьюти-мастеров. Результат: закрытые возражения, увеличенный средний чек, экономия времени на переписке.
              </p>
              <div className="mb-6 flex justify-center lg:justify-start">
                <a
                  href={STRIPE_URL}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5"
                >
                  Купить
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div id="hero-image" className={`transition-all duration-700 delay-150 ${isVisible['hero-image'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
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

      {/* СРАВНЕНИЕ: «Как изменится ваша работа с клиентами» */}
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Как изменится ваша <span className="underline decoration-blue-200 decoration-4 underline-offset-4">работа с клиентами</span>
            </h2>
            <p className="text-gray-600 mt-3">Сравните результаты до и после внедрения скриптов.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mt-10">
            {/* Сейчас */}
            <div className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-700 ${isVisible['comparison'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium text-sm">
                  <XCircle className="w-4 h-4" />
                  Сейчас
                </div>
              </div>
              <ul className="space-y-4 text-gray-800">
                {[
                  ['«Сколько стоит?»', 'Отвечаете только ценой и тишина.'],
                  ['«Подумаю»', 'Не знаете, что ответить — клиент уходит.'],
                  ['«Переписка 30+ минут»', 'Клиент остывает — теряете заявку.'],
                  ['«10 заявок»', 'Долгие диалоги — только 2–3 записи.'],
                ].map((row, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                    <span><strong>{row[0]}</strong> → {row[1]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* После */}
            <div className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-700 delay-150 ${isVisible['comparison'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-medium text-sm">
                  <CheckCircle className="w-4 h-4" />
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-800">
                {[
                  ['«Сколько стоит?»', 'Презентуете ценность → запись.'],
                  ['«Подумаю»', 'Мягкое возражение → возвращаете к записи.'],
                  ['«Переписка 5 минут»', 'Готовые фразы → быстрая запись.'],
                  ['«10 заявок»', 'Чёткие диалоги → 6–7 записей.'],
                ].map((row, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                    <span><strong>{row[0]}</strong> → {row[1]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Почему это важно */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Почему это <span className="underline decoration-blue-200 decoration-4 underline-offset-4">важно</span></h3>
            <p className="text-gray-600 mt-2">Каждая потерянная заявка — это упущенная прибыль</p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-10">
              {[
                {
                  icon: '/images/money.png',
                  title: 'Сливаются деньги на рекламу',
                  text: 'Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.',
                },
                {
                  icon: '/images/time.png',
                  title: 'Тратится время впустую',
                  text: 'По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.',
                },
                {
                  icon: '/images/leads.png',
                  title: 'Заявки уходят к конкуренту',
                  text: 'Пока вы думаете, клиент записывается к тому, кто отвечает быстро и уверенно.',
                },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100">
                  <img src={c.icon} alt="" className="w-12 h-12 mx-auto mb-5" />
                  <h4 className="font-bold text-gray-900">{c.title}</h4>
                  <p className="text-gray-600 mt-3">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Кому подходят скрипты (2x2) */}
      <section id="target-audience" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-gray-900">
            Кому подходят <span className="underline decoration-blue-200 decoration-4 underline-offset-4">скрипты</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: '/images/salon.png', title: 'Владельцам салонов и студий', text: 'Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.' },
              { icon: '/images/med.png', title: 'Медицинским центрам', text: 'Админы закрывают заявки, врачи работают с реальными пациентами.' },
              { icon: '/images/master.png', title: 'Мастерам-универсалам', text: 'Ответы на типовые ситуации → быстрее к записи, увереннее в чате.' },
              { icon: '/images/specialist.png', title: 'Узким специалистам', text: 'Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.' },
            ].map((c, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all">
                <img src={c.icon} alt="" className="w-12 h-12 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-gray-900">{c.title}</h3>
                <p className="text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Что входит в систему скриптов */}
      <section id="whats-included" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-center text-gray-900">
            Что входит в <span className="underline decoration-blue-200 decoration-4 underline-offset-4">систему скриптов</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">Полный набор инструментов для увеличения продаж.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '/images/dialogs.png', title: 'Готовые диалоги', text: 'Контакты до оплаты: приветствия, презентация ценности, запись — всё пошагово.' },
              { icon: '/images/objections.png', title: 'Закрытие возражений', text: '«Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления.' },
              { icon: '/images/services.png', title: 'Под каждую услугу', text: 'Маникюр, брови, ресницы, косметология, массаж — учтена специфика каждой ниши.' },
              { icon: '/images/return.png', title: 'Возврат клиентов', text: 'Сценарии повторных записей и реактивации «спящей» базы без рекламы.' },
              { icon: '/images/guide.png', title: 'Гайд по внедрению', text: 'Старт за один день: пошаговый план + стандарты для команды.' },
              { icon: '/images/result.png', title: 'Итог', text: 'Больше записей, выше средний чек, меньше времени в переписке.' },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all">
                <img src={c.icon} alt="" className="w-12 h-12 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-gray-900">{c.title}</h3>
                <p className="text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БОНУСЫ (празднично) */}
      <section id="bonuses" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50 via-purple-50 to-blue-50 pointer-events-none" />
        <div className="absolute inset-0 animate-confetti pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-center text-gray-900">Бонусы при покупке 🎉</h2>
          <p className="text-center text-gray-600 mb-12">Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Гайд «Работа с клиентской базой»',
                text: 'Повторные записи без рекламы → возвращайте старых клиентов.',
                old: '27€',
                colorBox: 'bg-orange-50',
                colorIcon: 'bg-orange-100',
                priceColor: 'text-orange-600',
              },
              {
                title: 'Чек-лист «30+ источников клиентов»',
                text: 'Платные и бесплатные способы → где взять заявки уже сегодня.',
                old: '32€',
                colorBox: 'bg-green-50',
                colorIcon: 'bg-green-100',
                priceColor: 'text-green-600',
              },
              {
                title: 'Гайд «Продажи на консультации»',
                text: '5 этапов продаж → мягкий апсейл дополнительных услуг.',
                old: '20€',
                colorBox: 'bg-blue-50',
                colorIcon: 'bg-blue-100',
                priceColor: 'text-blue-600',
              },
            ].map((b, i) => (
              <div key={i} className={`${b.colorBox} rounded-2xl p-8 text-center`}>
                <div className={`w-16 h-16 ${b.colorIcon} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  {/* простая «искра» */}
                  <div className="w-7 h-7 rounded-full animate-pulse-soft" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{b.title}</h3>
                <p className="text-gray-600 mb-4">{b.text}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-bold text-gray-400 line-through">{b.old}</span>
                  <span className={`text-xl font-bold ${b.priceColor}`}>0€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* «Получите полную систему со скидкой 70%» */}
      <section id="pricing70" className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 mb-5 shimmer">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping-slow" />
            Лимитированное время
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Получите полную систему со скидкой 70%</h2>
          <p className="text-gray-300 mb-10">Все скрипты + бонусы. Полная система для увеличения продаж.</p>

          <div className="bg-white/5 rounded-3xl p-10 backdrop-blur">
            <div className="text-5xl font-extrabold tracking-tight mb-6">
              <span className="text-gray-400 line-through mr-3">67€</span>
              <span>19€</span>
            </div>

            <ul className="text-left max-w-3xl mx-auto space-y-3 text-gray-200">
              {[
                'Готовые диалоги для всех ситуаций',
                'Шаблоны под конкретную услугу',
                'Бонус: гайд по работе с базой (27€)',
                'Бонус: 30+ источников клиентов (32€)',
                'Бонус: продажи на консультации (20€)',
                'Пожизненный доступ и обновления',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <a
              href={STRIPE_URL}
              className="mt-8 inline-flex items-center gap-3 px-10 py-4 bg-white text-gray-900 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all hover:-translate-y-0.5"
            >
              Получить со скидкой 70%
              <ArrowRight className="w-5 h-5" />
            </a>

            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-gray-300 opacity-80">
              <span className="px-2 py-1 bg-black/60 rounded">Apple Pay</span>
              <span className="px-2 py-1 bg-blue-600/70 rounded">Google Pay</span>
              <span className="px-2 py-1 bg-white/10 rounded">Visa</span>
              <span className="px-2 py-1 bg-white/10 rounded">MasterCard</span>
            </div>
          </div>
        </div>
      </section>

      {/* Что изменится сразу (оставил как было по сути) */}
      <section id="immediate-changes" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-gray-900">Что изменится <span className="underline decoration-blue-200 decoration-4 underline-offset-4">сразу</span></h2>
          <div className="space-y-6">
            {[
              'Перестанешь терять заявки из-за слабых ответов.',
              'Начнёшь закрывать больше записей уже с первого дня.',
              'Повысишь средний чек через правильные предложения.',
              'Станешь увереннее — на всё есть готовый ответ.',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm transition-all">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-lg font-medium text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-gray-900">Отзывы клиентов</h2>

          {/* Простая «галерея-лента» — положи PNG/JPG в /public/images */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
            {[
              { img: '/images/rev1.jpg', name: 'Мария', link: 'https://instagram.com/...' },
              { img: '/images/rev2.jpg', name: 'Анна', link: 'https://instagram.com/...' },
              { img: '/images/rev3.jpg', name: 'Елена', link: 'https://instagram.com/...' },
            ].map((r, i) => (
              <a key={i} href={r.link} target="_blank" rel="noreferrer" className="min-w-[260px] snap-start">
                <div className="rounded-2xl border bg-white overflow-hidden hover:shadow-lg transition">
                  <img src={r.img} alt={r.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-sm text-gray-500">Видео/подтверждение в Instagram</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (оставлено как было по стилю) */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-gray-900">Частые вопросы</h2>

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
                  className="w-full px-8 py-6 text-left hover:bg-gray-50 flex justify-between items-center transition-colors"
                >
                  <span className="font-semibold text-lg text-gray-900">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
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

      {/* Footer + мобильный CTA */}
      <footer className="py-12 bg-white border-t border-gray-200 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xl font-bold text-gray-900 mb-4">Beauty Scripts</div>
          <p className="text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 lg:hidden">
        <a
          href={STRIPE_URL}
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-semibold text-center block hover:bg-gray-800 transition-colors"
        >
          Готовые скрипты — 19€ • Купить сейчас
        </a>
      </div>

      {/* CSS-анимации через style-тэг (локально к компоненту) */}
      <style>{`
        .animate-pulse-soft {
          animation: pulseSoft 2.2s ease-in-out infinite;
          background: radial-gradient(closest-side, rgba(255,255,255,.9), rgba(255,255,255,.3));
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); opacity: .9; }
          50% { transform: scale(1.06); opacity: 1; }
        }
        .animate-ping-slow {
          animation: pingSlow 1.8s cubic-bezier(0,0,.2,1) infinite;
        }
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
          animation: shimmer 2.2s infinite;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        /* Конфетти — очень лёгкий фон */
        .animate-confetti {
          background-image:
            radial-gradient(2px 2px at 20% 30%, rgba(0,0,0,.06) 50%, transparent 51%),
            radial-gradient(2px 2px at 60% 70%, rgba(0,0,0,.06) 50%, transparent 51%),
            radial-gradient(2px 2px at 80% 40%, rgba(0,0,0,.06) 50%, transparent 51%),
            radial-gradient(2px 2px at 35% 80%, rgba(0,0,0,.06) 50%, transparent 51%);
          background-size: 180px 180px;
        }
      `}</style>
    </div>
  );
}

export default App;
