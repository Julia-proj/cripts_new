import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Clock, 
  ArrowRight,
  ChevronDown,
  Users,
  Building,
  User,
  Sparkles,
  MessageCircle,
  Shield,
  Rocket,
  RotateCcw,
  BookOpen,
  Gift
} from 'lucide-react';

// Stripe URL - will be configured later
const STRIPE_URL = "#stripe-payment-link";

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

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
          <div className="text-xl font-bold text-gray-900">
            Beauty Scripts
          </div>
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
            <div id="hero-text" className={`transition-all duration-1000 ${isVisible['hero-text'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900">
                Скрипты, которые превращают{' '}
                <span className="text-blue-600">сообщения в деньги</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Готовые диалоги: от первого сообщения до записи, апсейла и закрытия возражений. Результат — больше записей, выше средний чек, меньше времени на переписку.
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
                  <div className="px-2 py-1 bg-black text-white rounded text-xs font-medium">Apple Pay</div>
                  <div className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium">Google Pay</div>
                </div>
              </div>
            </div>
            <div id="hero-image" className={`transition-all duration-1000 delay-300 ${isVisible['hero-image'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative">
                <img 
                  src="/images/hero.jpg" 
                  alt="Beauty Scripts Hero" 
                  className="w-full h-auto rounded-2xl shadow-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800";
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

      {/* Comparison Section */}
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Сейчас</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <div className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-1000 ${isVisible['comparison'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium text-sm">
                  <XCircle className="w-4 h-4" />
                  Без скриптов
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li>Клиент пишет «Сколько стоит?» — отвечаете цену — тишина</li>
                <li>На «я подумаю» нет следующего шага</li>
                <li>Переписка тянется, клиент остывает</li>
                <li>Из 10 заявок записывается 2–3</li>
              </ul>
            </div>
            
            <div className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-1000 delay-200 ${isVisible['comparison'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full font-medium text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Со скриптами
                </div>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li>На любой вопрос — готовый ответ</li>
                <li>Возражения закрываются мягко и без давления</li>
                <li>До записи — за 3–5 сообщений</li>
                <li>Из 10 заявок записывается 6–7</li>
              </ul>
            </div>
          </div>

          {/* Why It Matters */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible['comparison'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-2xl font-bold text-center mb-12 text-gray-900">Почему это важно</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-red-50 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-red-500" />
                </div>
                <p className="font-medium text-gray-800">Сливаются деньги на рекламу</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <p className="font-medium text-gray-800">Тратится время впустую</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-50 rounded-xl flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-purple-500" />
                </div>
                <p className="font-medium text-gray-800">Заявки уходят к конкуренту и теряется прибыль</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section id="target-audience" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Кому подходят скрипты</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`bg-gray-50 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${isVisible['target-audience'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Владельцам салонов и студий</h3>
              <p className="text-gray-600">Стандарт ответов, скорость и контроль: все отвечают одинаково сильно.</p>
            </div>
            
            <div className={`bg-gray-50 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 delay-100 ${isVisible['target-audience'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Медицинским центрам</h3>
              <p className="text-gray-600">Админы закрывают заявки, врачи работают с реальными пациентами.</p>
            </div>
            
            <div className={`bg-gray-50 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 delay-200 ${isVisible['target-audience'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Мастерам-универсалам</h3>
              <p className="text-gray-600">Ответы на все типовые ситуации — быстрее к записи, увереннее в чате.</p>
            </div>
            
            <div className={`bg-gray-50 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 delay-300 ${isVisible['target-audience'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Узким специалистам</h3>
              <p className="text-gray-600">Ногти, брови, ресницы, волосы, косметология, перманент — готовые блоки под услугу.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section id="whats-included" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Что получаете в системе</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: MessageCircle, 
                title: "Готовые диалоги", 
                desc: "Приветствие, цены, запись, напоминания, апсейл — копируй и вставляй.",
                color: "blue"
              },
              { 
                icon: Shield, 
                title: "Ответы на возражения", 
                desc: "«Дорого», «далеко», «подумаю» — живые формулировки без давления.",
                color: "green"
              },
              { 
                icon: Rocket, 
                title: "Под услуги", 
                desc: "Ногти, брови, ресницы, волосы, косметология, перманент — готовые блоки.",
                color: "purple"
              },
              { 
                icon: RotateCcw, 
                title: "Возврат «молчунов»", 
                desc: "Сценарии для повторных записей и возврата «остывших» лидов.",
                color: "orange"
              },
              { 
                icon: BookOpen, 
                title: "Гайд внедрения", 
                desc: "Старт за 1 день — пошаговый план + стандарты для команды.",
                color: "red"
              },
              { 
                icon: CheckCircle, 
                title: "Итог", 
                desc: "Больше записей, выше средний чек, меньше времени в переписке.",
                color: "gray"
              }
            ].map((item, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`} style={{transitionDelay: `${index * 100}ms`}}>
                <div className={`w-12 h-12 bg-${item.color}-50 rounded-xl flex items-center justify-center mb-6`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Block */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8">
            Хватит терять деньги из-за неправильных слов
          </h2>
          <p className="text-xl mb-12 text-gray-300">
            Внедри скрипты моментально и начни получать больше записей уже сегодня
          </p>
          <div className="mb-6">
            <a 
              href={STRIPE_URL} 
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5"
            >
              Купить
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Доступ сразу
            </span>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 bg-black text-white rounded text-xs font-medium">Apple Pay</div>
              <div className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium">Google Pay</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonuses */}
      <section id="bonuses" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Бонусы при покупке 🎉</h2>
            <p className="text-lg text-gray-600">Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-orange-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Gift className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Гайд 1</h3>
              <p className="text-gray-600 mb-4">Работа с клиентской базой — повторные записи без рекламы.</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-bold text-gray-400 line-through">27€</span>
                <span className="text-xl font-bold text-orange-600">0€</span>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Чек-лист</h3>
              <p className="text-gray-600 mb-4">Платные и бесплатные способы — где взять заявки сегодня.</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-bold text-gray-400 line-through">32€</span>
                <span className="text-xl font-bold text-green-600">0€</span>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Gift className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Гайд 2</h3>
              <p className="text-gray-600 mb-4">5 этапов продаж на консультации — мягкий апсейл доп.услуг.</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-bold text-gray-400 line-through">20€</span>
                <span className="text-xl font-bold text-blue-600">0€</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Changes Immediately */}
      <section id="immediate-changes" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Что изменится сразу</h2>
          </div>
          
          <div className="space-y-6">
            {[
              "Перестанешь терять заявки из-за слабых ответов.",
              "Начнёшь закрывать больше записей уже с первого дня.",
              "Повысишь средний чек через правильные предложения.",
              "Станешь увереннее — на всё есть готовый ответ."
            ].map((item, index) => (
              <div key={index} className={`flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm transition-all duration-500`} style={{transitionDelay: `${index * 100}ms`}}>
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-lg font-medium text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Полный пакет</h2>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-3xl p-12 text-center">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Полный пакет + 3 бонуса</h3>
              <p className="text-gray-600 mb-8">Все скрипты + персонализация + бонусы</p>
              
              <div className="text-5xl font-bold text-gray-900 mb-8">19€</div>
              
              <div className="mb-6">
                <a 
                  href={STRIPE_URL} 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Купить
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Доступ сразу
                </span>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-black text-white rounded text-xs font-medium">Apple Pay</div>
                  <div className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium">Google Pay</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                Доступ к материалам моментально после оплаты
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Частые вопросы</h2>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: "Сработает в моей нише?",
                a: "Да. База универсальная + блоки под ногти/брови/ресницы/волосы/косметологию/перманент."
              },
              {
                q: "Не будет ли звучать «по-скриптовому»?",
                a: "Нет. Формулировки живые, адаптируешь под свой тон. Главное — следовать алгоритму."
              },
              {
                q: "Зачем это админам?",
                a: "Единый стандарт повышает конверсию, скорость и управляемость. Новички включаются быстрее."
              },
              {
                q: "Когда будут результаты?",
                a: "Часто — в первые 24 часа: готовые фразы экономят время и быстрее ведут к записи."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left hover:bg-gray-50 flex justify-between items-center transition-colors duration-200"
                >
                  <span className="font-semibold text-lg text-gray-900">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`} />
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
          <p className="text-gray-500">© 2024 Все права защищены</p>
        </div>
      </footer>

      {/* Sticky CTA */}
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
