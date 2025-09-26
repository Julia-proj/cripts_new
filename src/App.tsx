import React, { useState, useEffect } from "react";
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
  MessageCircle,
  Shield,
  Rocket,
  RotateCcw,
  BookOpen,
  Gift,
} from "lucide-react";

// TODO: вставь свою ссылку Stripe
const STRIPE_URL = "#stripe-payment-link";

// Простая «подсветка» появления секций
function useReveal() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsVisible((p) => ({ ...p, [e.target.id]: true }));
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll<HTMLElement>("[id]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return isVisible;
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const isVisible = useReveal();

  return (
    <div className="min-h-screen bg-white">
      {/* Шапка */}
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

      {/* HERO — фоновое фото на весь экран */}
      <section
        id="hero"
        className={`relative min-h-screen flex items-center justify-center text-center pt-24`}
      >
        {/* фон */}
        <img
          src="/images/hero.jpg"
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1600";
          }}
        />
        {/* затемнение для читаемости */}
        <div className="absolute inset-0 bg-white/50 md:bg-white/40"></div>

        <div
          id="hero-box"
          className={`relative max-w-4xl px-6 transition-all duration-1000 ${
            isVisible["hero-box"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Скрипты, которые превращают сообщения{" "}
            <span className="text-blue-600">в деньги</span>
          </h1>
          <p className="mt-5 text-lg md:text-2xl text-gray-700">
            Проверенная система общения с клиентами для бьюти-мастеров.
          </p>

          <p className="mt-4 inline-block rounded-xl bg-blue-50 px-4 py-2 text-blue-700 font-medium">
            Результат: закрытые возражения, увеличенный средний чек, экономия времени на переписке.
          </p>

          <div className="mt-8">
            <a
              href={STRIPE_URL}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:-translate-y-0.5"
            >
              Купить
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600">
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
      </section>

      {/* 2. Как изменится ваша работа с клиентами */}
      <section id="comparison" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Как изменится{" "}
              <span className="underline decoration-blue-200 underline-offset-8">
                работа с клиентами
              </span>
            </h2>
            <p className="mt-2 text-gray-600">
              Сравните результаты до и после внедрения скриптов
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            {/* Сейчас (красная) */}
            <div
              id="now"
              className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-700 ${
                isVisible["now"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-medium text-sm">
                  <XCircle className="w-4 h-4" />
                  Сейчас
                </div>
              </div>
              <ul className="space-y-4 text-gray-800">
                <li className="flex gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>«Сколько стоит?» → отвечаете только ценой — тишина</span>
                </li>
                <li className="flex gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>«Подумаю» → не знаете, что ответить — клиент уходит</span>
                </li>
                <li className="flex gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>«Переписка 30+ минут» → клиент остывает — теряете заявку</span>
                </li>
                <li className="flex gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>«10 заявок» → долгие диалоги — лишь 2–3 записи</span>
                </li>
              </ul>
            </div>

            {/* После (зелёная) */}
            <div
              id="after"
              className={`bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-700 delay-200 ${
                isVisible["after"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full font-medium text-sm">
                  <CheckCircle className="w-4 h-4" />
                  После
                </div>
              </div>
              <ul className="space-y-4 text-gray-800">
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>«Сколько стоит?» → презентуете ценность → запись</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>«Подумаю» → мягкое возражение → возвращаете к записи</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>«Переписка 5 минут» → готовые фразы → быстрая запись</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>«10 заявок» → чёткие диалоги → 6–7 записей</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Почему это важно */}
      <section id="why" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Почему это <span className="text-blue-600">важно</span>
            </h2>
            <p className="mt-2 text-gray-600">
              Каждая потерянная заявка — это упущенная прибыль
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-red-50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-red-500" />
              </div>
              <p className="font-semibold text-gray-900">Сливаются деньги на рекламу</p>
              <p className="mt-2 text-sm text-gray-600">
                Платите за заявки, но конвертируете лишь 20–30%. Остальные — выброшенный бюджет.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-orange-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <p className="font-semibold text-gray-900">Тратится время впустую</p>
              <p className="mt-2 text-sm text-gray-600">
                По 30–40 минут на переписку с каждым. Уходит 3–4 часа в день.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-50 rounded-xl flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-purple-500" />
              </div>
              <p className="font-semibold text-gray-900">Заявки уходят к конкуренту</p>
              <p className="mt-2 text-sm text-gray-600">
                Пока вы думаете, клиент записывается к тому, кто отвечает быстро и уверенно.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Кому подходят скрипты (2x2) */}
      <section id="for-whom" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
            Кому подходят <span className="text-blue-600">скрипты</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card icon={<Building className="w-6 h-6 text-blue-600" />} title="Владельцам салонов и студий"
                  text="Стандарт ответов, скорость и контроль: все отвечают одинаково сильно." />
            <Card icon={<Rocket className="w-6 h-6 text-red-500" />} title="Медицинским центрам"
                  text="Админы закрывают заявки, врачи работают с реальными пациентами." />
            <Card icon={<Users className="w-6 h-6 text-green-600" />} title="Мастерам-универсалам"
                  text="Ответы на типовые ситуации → быстрее к записи, увереннее в чате." />
            <Card icon={<User className="w-6 h-6 text-purple-600" />} title="Узким специалистам"
                  text="Ногти, брови, ресницы, волосы, косметология, перманент. Блоки под услугу." />
          </div>
        </div>
      </section>

      {/* 5. Что входит в систему скриптов (3x2) */}
      <section id="whats-included" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Что входит в <span className="text-blue-600">систему скриптов</span>
            </h2>
            <p className="mt-2 text-gray-600">Полный набор инструментов для увеличения продаж</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <Feat icon={<MessageCircle className="w-6 h-6 text-blue-600" />}
                  title="Готовые диалоги"
                  desc="Контакты до оплаты: приветствия, презентация ценности, запись — всё пошагово." />
            <Feat icon={<Shield className="w-6 h-6 text-green-600" />}
                  title="Закрытие возражений"
                  desc="«Дорого», «Подумаю», «У другого дешевле» — мягкие ответы без давления." />
            <Feat icon={<Rocket className="w-6 h-6 text-purple-600" />}
                  title="Под каждую услугу"
                  desc="Маникюр, брови, ресницы, косметология, массаж — учтена специфика каждой ниши." />
            <Feat icon={<RotateCcw className="w-6 h-6 text-orange-600" />}
                  title="Возврат клиентов"
                  desc="Сценарии повторных записей и реактивации «спящей» базы без рекламы." />
            <Feat icon={<BookOpen className="w-6 h-6 text-red-500" />}
                  title="Гайд по внедрению"
                  desc="Старт за один день: пошаговый план + стандарты для команды." />
            <Feat icon={<CheckCircle className="w-6 h-6 text-gray-700" />}
                  title="Итог"
                  desc="Больше записей, выше средний чек, меньше времени в переписке." />
          </div>
        </div>
      </section>

      {/* 6. Бонусы — праздничный блок с лёгкой анимацией */}
      <section id="bonuses" className="relative py-20 bg-gray-50 overflow-hidden">
        {/* «конфетти»-фон (лёгкий, без библиотек) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-pink-200/30 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-200/30 blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Бонусы при покупке 🎉</h2>
            <p className="mt-2 text-gray-600">Суммарная ценность — 79€. Сегодня идут бесплатно со скриптами.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Bonus
              color="orange"
              title="Гайд «Работа с клиентской базой»"
              desc="Повторные записи без рекламы → возвращайте старых клиентов."
              old="27€"
            />
            <Bonus
              color="green"
              title="Чек-лист «30+ источников клиентов»"
              desc="Платные и бесплатные способы → где взять заявки уже сегодня."
              old="32€"
            />
            <Bonus
              color="blue"
              title="Гайд «Продажи на консультации»"
              desc="5 этапов продаж → мягкий апсейл дополнительных услуг."
              old="20€"
            />
          </div>
        </div>
      </section>

      {/* 7. Что изменится сразу (оставляем по смыслу как было) */}
      <section id="immediate" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
            Что изменится <span className="text-green-600">сразу</span>
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
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-lg font-medium text-gray-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Получите полную систему со скидкой 70% — с «лимит-анимацией» */}
      <section id="pricing" className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold">
            Получите полную систему со скидкой 70%
          </h2>

          {/* таймер-имитация (визуальная анимация без логики времени) */}
          <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-red-400 animate-pulse" />
            <span className="opacity-90">Ограниченное предложение</span>
          </div>

          <p className="mt-6 text-gray-300">
            Все скрипты + бонусы. Полная система для увеличения продаж.
          </p>

          <div className="mt-10 rounded-3xl bg-white/5 p-8">
            <div className="text-4xl font-extrabold tracking-tight">
              <span className="mr-3 align-middle text-gray-400 line-through">67€</span>
              <span className="align-middle text-white">19€</span>
            </div>

            <ul className="mt-6 text-left space-y-3 max-w-xl mx-auto text-gray-200">
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                Готовые диалоги для всех ситуаций
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                Шаблоны под конкретную услугу
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                Бонус: гайд по работе с базой (27€)
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                Бонус: 30+ источников клиентов (32€)
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                Бонус: продажи на консультации (20€)
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                Пожизненный доступ и обновления
              </li>
            </ul>

            <div className="mt-8">
              <a
                href={STRIPE_URL}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5"
              >
                Получить со скидкой 70%
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-300">
              <span className="px-2 py-1 bg-black/60 rounded">Apple Pay</span>
              <span className="px-2 py-1 bg-blue-600/80 rounded">Google Pay</span>
              <span className="px-2 py-1 bg-gray-700/80 rounded">Visa</span>
              <span className="px-2 py-1 bg-gray-700/80 rounded">Mastercard</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Отзывы (простой слайдер) */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
            Отзывы клиентов
          </h2>

          {/* Слайдер-карусель: просто пролистываем картинки */}
          <ReviewsCarousel
            items={[
              { img: "/images/rev1.jpg", text: "Записи выросли с 2 до 6 из 10 заявок за неделю." },
              { img: "/images/rev2.jpg", text: "Перестали сливать переписки. Чёткие ответы = быстрые записи." },
              { img: "/images/rev3.jpg", text: "Админы стали уверенными, «подумаю» закрываем мягко." },
            ]}
          />

          <p className="text-center text-sm text-gray-500 mt-6">
            Можно прикладывать скриншоты (PNG/JPG) из GitHub и ссылки на Instagram-видео.
          </p>
        </div>
      </section>

      {/* 10. FAQ — оставлено по смыслу */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">Частые вопросы</h2>

          <div className="space-y-4 mt-12">
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
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 text-left hover:bg-gray-50 flex justify-between items-center transition-colors duration-200"
                >
                  <span className="font-semibold text-lg text-gray-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="py-12 bg-white border-t border-gray-200 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xl font-bold text-gray-900 mb-1">Beauty Scripts</div>
          <p className="text-gray-500">© {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>

      {/* Мобильный «липкий» CTA */}
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

/* ---------- Вспомогательные компоненты ---------- */

function Card({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

function Feat({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function Bonus({
  color,
  title,
  desc,
  old,
}: {
  color: "orange" | "green" | "blue";
  title: string;
  desc: string;
  old: string;
}) {
  const map = {
    orange: {
      wrap: "bg-orange-50",
      iconWrap: "bg-orange-100",
      icon: "text-orange-600",
      price: "text-orange-600",
    },
    green: {
      wrap: "bg-green-50",
      iconWrap: "bg-green-100",
      icon: "text-green-600",
      price: "text-green-600",
    },
    blue: {
      wrap: "bg-blue-50",
      iconWrap: "bg-blue-100",
      icon: "text-blue-600",
      price: "text-blue-600",
    },
  }[color];

  return (
    <div className={`${map.wrap} rounded-2xl p-8 text-center`}>
      <div className={`w-16 h-16 ${map.iconWrap} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
        <Gift className={`w-8 h-8 ${map.icon}`} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-4">{desc}</p>
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg font-bold text-gray-400 line-through">{old}</span>
        <span className={`text-xl font-bold ${map.price}`}>0€</span>
      </div>
    </div>
  );
}

function ReviewsCarousel({
  items,
}: {
  items: { img: string; text?: string; link?: string }[];
}) {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % items.length);
  const prev = () => setI((v) => (v - 1 + items.length) % items.length);

  return (
    <div className="mt-10 max-w-3xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl border bg-gray-50">
        <img
          src={items[i].img}
          alt={`review-${i}`}
          className="w-full h-72 object-cover"
        />
        {items[i].text && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-sm">
            {items[i].text}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={prev}
          className="px-3 py-1.5 rounded-md border hover:bg-gray-50"
        >
          ←
        </button>
        <div className="text-sm text-gray-500">
          {i + 1} / {items.length}
        </div>
        <button
          onClick={next}
          className="px-3 py-1.5 rounded-md border hover:bg-gray-50"
        >
          →
        </button>
      </div>
    </div>
  );
}
