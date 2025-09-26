import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronDown,
  Gift,
  // можно использовать lucide только там, где не требуются PNG из /images
} from 'lucide-react';

// ВСТАВЬ свою ссылку на Stripe сюда:
const STRIPE_URL = "#stripe-payment-link";

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
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
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Купить
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              id="hero-text"
              className={`transition-all duration-1000 ${
                isVisible['hero-text'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900 text-left lg:text-left">
                Скрипты, которые превращают сообщения{' '}
                <span className="text-blue-600">в деньги</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Проверенная система общения с клиентами для бьюти-мастеров. Результат: закрытые
                возражения, увеличенный средний чек, экономия времени на переписке.
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
                isVisible['hero-image'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative">
                <img
                  src="/images/hero.jpg"
                  alt="Beauty Scripts Hero"
                  className="w-full h-auto rounded-2xl shadow-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
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

      {/* Как изменится работа с клиентами (2 колонки) */}
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Как изменится <span className="text-blue-600">работа с клиентами</span>
            </h2>
            <p className="mt-3 text-gray-600">Сравните результаты до и после внедрения скриптов.</p>
          </div>

          <div
            className={`grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12 ${
              isVisible['comparison'] ? '' : ''
            }`}
          >
            {/* Сейчас (красная заливка) */}
            <div
              className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-1000 ${
                isVisible['comparison'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium text-sm">
                  <XCircle className="w-4 h-4" />
                  Сейчас
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <img src="/images/red-x.png" alt="" className="h-6 w-6 mt-0.5" />
                  <span>«Сколько стоит?» → Отвечаете только ценой и тишина.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/red-x.png" alt="" className="h-6 w-6 mt-0.5" />
                  <span>«Подумаю» → Не знаете, что ответить — клиент уходит.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/red-x.png" alt="" className="h-6 w-6 mt-0.5" />
                  <span>«Переписка 30+ минут» → Клиент остывает — теряете заявку.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/red-x.png" alt="" className="h-6 w-6 mt-0.5" />
                  <span>«10 заявок» → Долгие диалоги — только 2–3 записи.</span>
                </li>
              </ul>
            </div>

            {/* После (зелёная заливка) */}
            <div
              className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-1000 delay-200 ${
                isVisible['comparison'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full font-medium text-sm">
                  <CheckCircle className="w-4 h-4" />
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <img src="/images/green-check.png" alt="" className="h-6 w-6 mt-0.5" />
                  <span>«Сколько стоит?» → Презентуете ценность → запись.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/green-check.png" alt="" className="h-6 w-6 mt-0.5" />
                  <span>«Подумаю» → Мягкое возражение → возвращаете к записи.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/green-check.png" alt="" className="h-6 w-6 mt-0.5" />
                  <span>«Переписка 5 минут» → Готовые фразы → быстрая запись.</span>
                </li>
                <li className="flex gap-3">
                  <img src="/images/green-check.png" alt="" className="h-6 w-6 mt-0.5" />
                  <span>«10 заявок» → Чёткие диалоги → 6–7 записей.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Почему это важно (PNG-иконки из /images) */}
      <section id="why" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Почему это <span className="text-blue-600">важно</span>
            </h2>
            <p className="mt-3 text-gray-600">Каждая потерянная заявка — это упущенная прибыль</p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl border p-6 text-left">
              <img src="/images/money.png" alt="" className="h-10 w-10 mb-4" />
              <p className="font-semibold text-gray-900 mb-1">Сливаются деньги на рекламу</p>
              <p className="text-gray-600">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>
            <div className="rounded-2xl border p-6 text-left">
              <img src="/images/time.png" alt="" className="h-10 w-10 mb-4" />
              <p className="font-semibold text-gray-900 mb-1">Тратится время впустую</p>
              <p className="text-gray-600">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>
            <div className="rounded-2xl border p-6 text-left">
              <img src="/images/leads.png" alt="" className="h-10 w-10 mb-4" />
              <p className="font-semibold text-gray-900 mb-1">Заявки уходят к конкуренту</p>
              <p className="text-gray-600">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Кому подходят скрипты (2x2) */}
      <section id="target-audience" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">
            Кому подходят <span className="text-blue-600">скрипты</span>
          </h2>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <img src="/images/salon.png" alt="" className="h-10 w-10" />
                <h3 className="text-xl font-bold text-gray-900">Владельцам салонов и студий</h3>
              </div>
              <p className="text-gray-600">
                Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <img src="/images/clinic.png" alt="" className="h-10 w-10" />
                <h3 className="text-xl font-bold text-gray-900">Медицинским центрам</h3>
              </div>
              <p className="text-gray-600">
                Админы закрывают заявки, врачи работают с реальными пациентами.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <img src="/images/master.png" alt="" className="h-10 w-10" />
                <h3 className="text-xl font-bold text-gray-900">Мастерам-универсалам</h3>
              </div>
              <p className="text-gray-600">
                Ответы на типовые ситуации → быстрее к записи, увереннее в чате.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <img src="/images/niche.png" alt="" className="h-10 w-10" />
                <h3 className="text-xl font-bold text-gray-900">Узким специалистам</h3>
              </div>
              <p className="text-gray-600">
                Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Что входит в систему скриптов (3+3) */}
      <section id="whats-included" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
            <p className="mt-3 text-gray-600">Полный набор инструментов для увеличения продаж.</p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <img src="/images/dialogs.png" alt="" className="h-10 w-10 mb-5" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Готовые диалоги</h3>
              <p className="text-gray-600">
                Контакты до оплаты: приветствия, презентация ценности, запись — всё пошагово.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <img src="/images/objections.png" alt="" className="h-10 w-10 mb-5" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Закрытие возражений</h3>
              <p className="text-gray-600">
                «Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <img src="/images/services.png" alt="" className="h-10 w-10 mb-5" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Под каждую услугу</h3>
              <p className="text-gray-600">
                Маникюр, брови, ресницы, косметология, массаж — учтена специфика каждой ниши.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <img src="/images/return.png" alt="" className="h-10 w-10 mb-5" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Возврат клиентов</h3>
              <p className="text-gray-600">
                Сценарии повторных записей и реактивации «спящей» базы без рекламы.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <img src="/images/guide.png" alt="" className="h-10 w-10 mb-5" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Гайд по внедрению</h3>
              <p className="text-gray-600">
                Старт за один день: пошаговый план + стандарты для команды.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <img src="/images/result.png" alt="" className="h-10 w-10 mb-5" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Итог</h3>
              <p className="text-gray-600">
                Больше записей, выше средний чек, меньше времени в переписке.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Что изменится сразу – оставить без изменений текста, только стилистически согласовано */}
      <section id="immediate-changes" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Что изменится сразу</h2>
          </div>

          <div className="space-y-6">
            {[
              'Перестанешь терять заявки из-за слабых ответов.',
              'Начнёшь закрывать больше записей уже с первого дня.',
              'Повысишь средний чек через правильные предложения.',
              'Станешь увереннее — на всё есть готовый ответ.',
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-lg font-medium text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Бонусы при покупке (празднично) */}
      <section id="bonuses" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-pink-50/60 via-purple-50/60 to-blue-50/60" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-900">Бонусы при покупке</h2>
            <p className="text-lg text-gray-600">Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-orange-50 animate-pulse">
                <Gift className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Гайд «Работа с клиентской базой»</h3>
              <p className="text-gray-600 mb-4">Повторные записи без рекламы → возвращайте старых клиентов.</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-bold text-gray-300 line-through">27€</span>
                <span className="text-xl font-bold text-orange-600">0€</span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-green-50 animate-pulse">
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Чек-лист «30+ источников клиентов»</h3>
              <p className="text-gray-600 mb-4">Платные и бесплатные способы → где взять заявки уже сегодня.</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-bold text-gray-300 line-through">32€</span>
                <span className="text-xl font-bold text-green-600">0€</span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-blue-50 animate-pulse">
                <Gift className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Гайд «Продажи на консультации»</h3>
              <p className="text-gray-600 mb-4">5 этапов продаж → мягкий апсейл дополнительных услуг.</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-bold text-gray-300 line-through">20€</span>
                <span className="text-xl font-bold text-blue-600">0€</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Получите полную систему со скидкой 70% */}
      <section id="pricing" className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold mb-3">Получите полную систему со скидкой 70%</h2>

          {/* Бейдж ограничения (простая анимация) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 text-red-300 text-sm font-semibold animate-pulse mb-8">
            Лимитированное предложение
          </div>

          <div className="bg-white/5 rounded-3xl p-8 md:p-10">
            <p className="text-lg text-gray-300">Все скрипты + бонусы • Полная система для увеличения продаж</p>

            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="text-3xl font-extrabold text-gray-400 line-through">67€</span>
              <span className="text-5xl font-extrabold text-white">19€</span>
            </div>

            <ul className="mt-6 text-left text-gray-300 max-w-xl mx-auto space-y-2">
              <li>• Готовые диалоги для всех ситуаций</li>
              <li>• Шаблоны под конкретную услугу</li>
              <li>• Бонус: гайд по работе с базой (27€)</li>
              <li>• Бонус: 30+ источников клиентов (32€)</li>
              <li>• Бонус: продажи на консультации (20€)</li>
              <li>• Пожизненный доступ и обновления</li>
            </ul>

            <a
              href={STRIPE_URL}
              className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5"
            >
              Получить со скидкой 70%
              <ArrowRight className="w-5 h-5" />
            </a>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
              <div className="px-2 py-1 bg-black text-white rounded text-xs font-medium">Apple Pay</div>
              <div className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium">Google Pay</div>
              <div className="px-2 py-1 bg-white/10 rounded text-xs font-medium">Visa</div>
              <div className="px-2 py-1 bg-white/10 rounded text-xs font-medium">MasterCard</div>
            </div>
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900">Отзывы клиентов</h2>

          {/* Пример галереи — замени src на свои PNG/JPG в /public/images и/или ссылки на Instagram */}
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="block">
              <img src="/images/rev1.jpg" alt="review 1" className="w-full rounded-2xl shadow-sm" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="block">
              <img src="/images/rev2.jpg" alt="review 2" className="w-full rounded-2xl shadow-sm" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="block">
              <img src="/images/rev3.jpg" alt="review 3" className="w-full rounded-2xl shadow-sm" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ — оставляем как было */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Частые вопросы</h2>
          </div>

        {/* оригинальные вопросы из твоего файла */}
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
                  <div className="px-8 py-6 bg-gray-50 border-top border-gray-200">
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

      {/* Sticky CTA (mobile) */}
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
