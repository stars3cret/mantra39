import { useState, useMemo } from 'react';
import './App.css';

const HYDRO_PROGRAMS = [
  {
    id: 'charcot',
    title: 'Душ Шарко',
    subtitle: 'Коррекция фигуры и тонус с помощью ударной струи воды',
    duration: 'Сеанс по регламенту',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=900&q=80',
    tiers: [
      { id: 'trial', label: 'Пробный сеанс', perSession: 1500, total: 1500, saving: 300 },
      { id: 'single', label: 'Разовый визит', perSession: 1800, total: 1800, saving: 0 },
      { id: 'pack5', label: 'Абонемент 5 сеансов', perSession: 1700, total: 8500, saving: 500 },
      { id: 'pack10', label: 'Абонемент 10 сеансов', perSession: 1600, total: 16000, saving: 2000 },
    ],
  },
  {
    id: 'underwater-30',
    title: 'Подводный массаж (30 мин)',
    subtitle: 'Глубокая проработка тела водным потоком в ванне',
    duration: '30 минут',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80',
    tiers: [
      { id: 'trial', label: 'Пробный сеанс', perSession: 2000, total: 2000, saving: 300 },
      { id: 'single', label: 'Разовый визит', perSession: 2300, total: 2300, saving: 0 },
      { id: 'pack5', label: 'Абонемент 5 сеансов', perSession: 2100, total: 10500, saving: 1000 },
      { id: 'pack10', label: 'Абонемент 10 сеансов', perSession: 2000, total: 20000, saving: 3000 },
    ],
  },
  {
    id: 'underwater-50',
    title: 'Подводный массаж (50 мин)',
    subtitle: 'Максимум лимфодренажа, коррекции фигуры и расслабления',
    duration: '50 минут',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    tiers: [
      { id: 'trial', label: 'Пробный сеанс', perSession: 2800, total: 2800, saving: 500 },
      { id: 'single', label: 'Разовый визит', perSession: 3300, total: 3300, saving: 0 },
      { id: 'pack5', label: 'Абонемент 5 сеансов', perSession: 3100, total: 15500, saving: 1000 },
      { id: 'pack10', label: 'Абонемент 10 сеансов', perSession: 3000, total: 30000, saving: 3000 },
    ],
  },
];

const SERVICES = [
  // - МАССАЖ -
  {
    id: 'body-custom',
    categories: ['Массаж'],
    category: 'Массаж',
    title: 'Ручной массаж тела',
    subtitle: 'Техника под ваш индивидуальный запрос (мужчинам +500 ₽)',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
    steps: ['Индивидуальный подбор техники', 'Глубокая проработка мышц или релакс'],
    options: [
      { label: '60 минут', price: '3 000 ₽' },
      { label: '90 минут', price: '4 000 ₽' },
      { label: '60 мин (Мужской)', price: '3 500 ₽' },
      { label: '90 мин (Мужской)', price: '4 500 ₽' },
    ],
  },
  {
    id: 'author-mix',
    categories: ['Массаж'],
    category: 'Массаж',
    title: 'Авторский микс массаж',
    subtitle: 'Направлен на глубокую релаксацию и снятие стресса',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80',
    steps: ['Сочетание лучших релакс-техник', 'Восстановление нервной системы'],
    options: [
      { label: '60 минут', price: '3 500 ₽' },
      { label: '90 минут', price: '4 500 ₽' },
    ],
  },
  {
    id: 'back-neck',
    categories: ['Массаж'],
    category: 'Массаж',
    title: 'Массаж спины и ШВЗ',
    subtitle: 'Снятие зажимов в спине и шейно-воротниковой зоне (мужчинам +500 ₽)',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    steps: ['Проработка ШВЗ', 'Снятие напряжения вдоль позвоночника'],
    options: [
      { label: '45 минут', price: '2 000 ₽' },
      { label: '60 минут', price: '2 500 ₽' },
      { label: '45 мин (Мужской)', price: '2 500 ₽' },
      { label: '60 мин (Мужской)', price: '3 000 ₽' },
    ],
  },
  {
    id: 'face-custom',
    categories: ['Массаж'],
    category: 'Массаж',
    title: 'Массаж лица',
    subtitle: 'Техника под запрос: лифтинг, лимфодренаж, скульптурирование',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    steps: ['Очищение и тонизация', 'Проработка мышц лица и декольте'],
    options: [{ label: 'Сеанс', price: '2 300 ₽' }],
  },
  {
    id: 'foot-massage',
    categories: ['Массаж'],
    category: 'Массаж',
    title: 'Массаж стоп',
    subtitle: 'Снятие усталости и проработка рефлекторных зон',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
    steps: ['Мягкое расслабление стоп', 'Снятие тяжести в ногах'],
    options: [{ label: '40 минут', price: '1 500 ₽' }],
  },
  {
    id: 'head-massage',
    categories: ['Массаж'],
    category: 'Массаж',
    title: 'Массаж головы',
    subtitle: 'Глубокое расслабление и снятие ментального напряжения',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80',
    steps: ['Проработка кожи головы', 'Улучшение кровообращения и сна'],
    options: [{ label: '30 минут', price: '1 500 ₽' }],
  },
  {
    id: 'pressotherapy',
    categories: ['Массаж'],
    category: 'Массаж',
    title: 'Прессотерапия',
    subtitle: 'Аппаратный лимфодренажный массаж для выведения жидкости',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=900&q=80',
    steps: ['Лимфодренажный эффект', 'Ощущение легкости'],
    options: [{ label: 'Сеанс', price: '1 000 ₽' }],
  },
  {
    id: 'cedar-barrel',
    categories: ['Массаж'],
    category: 'Массаж',
    title: 'Кедровая бочка',
    subtitle: 'Фитопарение в бочке из алтайского кедра',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    steps: ['Раскрытие пор и очищение', 'Глубокий прогрев мышц'],
    options: [{ label: 'Сеанс', price: '1 000 ₽' }],
  },

  // - СПА-РИТУАЛЫ -
  {
    id: 'nirvana',
    categories: ['Спа-ритуалы'],
    category: 'Спа-ритуалы',
    title: 'Нирвана',
    subtitle: 'Ритуал для восстановления гармонии, расслабления и сияния кожи. Погрузитесь в атмосферу уюта и заботы, отпустите напряжение и подарите себе полноценный отдых.',
    image: '/фото3.png',
    steps: [
      'Расслабляющий массаж головы',
      'Уход за волосами и скраб кожи головы',
      'Массаж лица и питательная маска',
      'Парафиновый уход и массаж рук',
      'Массаж стоп и стоунтерапия'
    ],
    options: [{ label: '1,5 часа', price: '5 500 ₽' }],
  },
  {
    id: 'unity-soul-body',
    categories: ['Спа-ритуалы'],
    category: 'Спа-ритуалы',
    title: 'Единение души и тела',
    subtitle: 'Полная перезагрузка, баланс энергии и расслабление',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    steps: ['Парение в кедровой бочке', 'Солевое выкатывание тела', 'Подводный ручной массаж', 'Релакс-массаж всего тела'],
    options: [{ label: '150 минут', price: '7 000 ₽' }],
  },
  {
    id: 'sea-euphoria',
    categories: ['Спа-ритуалы'],
    category: 'Спа-ритуалы',
    title: 'Морская эйфория',
    subtitle: 'Глубокое восстановление, детокс и увлажнение кожи',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80',
    steps: ['Кедровая бочка', 'Солевое выкатывание', 'Подводный массаж или Шарко', 'Обертывание ламинарией'],
    options: [{ label: '120 минут', price: '6 000 ₽' }],
  },
  {
    id: 'bliss',
    categories: ['Спа-ритуалы'],
    category: 'Спа-ритуалы',
    title: 'Блаженство',
    subtitle: 'Ритуал глубокого восстановления и бережного ухода',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    steps: ['Кедровая бочка', 'Подводный массаж или Шарко', 'Массаж лица', 'Парафин для рук'],
    options: [{ label: '120 минут', price: '5 500 ₽' }],
  },
  {
    id: 'revival',
    categories: ['Спа-ритуалы'],
    category: 'Спа-ритуалы',
    title: 'Возрождение',
    subtitle: 'Обновление тонуса тела с обёртыванием на выбор',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    steps: ['Кедровая бочка', 'Подводный массаж или Шарко', 'Обертывание (ламинария / шоколад / глина+фукус)'],
    options: [{ label: '90 минут', price: '4 500 ₽' }],
  },
  {
    id: 'water-energy',
    categories: ['Спа-ритуалы'],
    category: 'Спа-ритуалы',
    title: 'Энергия воды',
    subtitle: 'Баланс гидромассажа и ручного массажа тела',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=900&q=80',
    steps: ['Подводный массаж или Душ Шарко', 'Ручной массаж тела (1 час)'],
    options: [{ label: '90 минут', price: '4 800 ₽' }],
  },
  {
    id: 'harmonization',
    categories: ['Спа-ритуалы'],
    category: 'Спа-ритуалы',
    title: 'Гармонизация',
    subtitle: 'Очищение кожи, водная стихия и завершающее увлажнение',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    steps: ['Кедровая бочка', 'Пилинг-массаж', 'Подводный массаж или Шарко', 'Увлажнение'],
    options: [{ label: '90 минут', price: '4 000 ₽' }],
  },
  {
    id: 'ra-svet',
    categories: ['Спа-ритуалы'],
    category: 'Спа-ритуалы',
    title: 'Ра-Свет',
    subtitle: 'Авторский спа-ритуал для снятия усталости и ясного ума',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    steps: ['Проработка стоп', 'Массаж головы', 'Массаж лица'],
    options: [{ label: '90 минут', price: '3 800 ₽' }],
  },
  {
    id: 'grace',
    categories: ['Спа-ритуалы'],
    category: 'Спа-ритуалы',
    title: 'Благодать',
    subtitle: 'Сочетание водного массажа и проработки спины',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    steps: ['Подводный массаж или Шарко', 'Массаж спины и ШВЗ'],
    options: [{ label: '80 минут', price: '3 800 ₽' }],
  },
  {
    id: 'lightness',
    categories: ['Спа-ритуалы'],
    category: 'Спа-ритуалы',
    title: 'Легкость и Бодрость',
    subtitle: 'Экспресс-перезагрузка + комплимент от пространства',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80',
    steps: ['Кедровая бочка / прессотерапия + Подводный массаж', 'Комплимент в завершении'],
    options: [{ label: '60 минут', price: '3 000 ₽' }],
  },
  {
    id: 'breeze',
    categories: ['Спа-ритуалы'],
    category: 'Спа-ритуалы',
    title: 'Бриз',
    subtitle: 'Тонус с Душем Шарко + комплимент от Мантра Спа',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80',
    steps: ['Бочка / прессотерапия + Душ Шарко', 'Комплимент в завершении'],
    options: [{ label: '50-60 минут', price: '2 500 ₽' }],
  },

  // - ДЛЯ ДВОИХ -
  {
    id: 'he-and-she',
    categories: ['Спа-ритуалы', 'Для двоих'],
    category: 'Для двоих',
    title: 'Он & Она (Тандем для двоих)',
    subtitle: 'Весь СПА бронируется только для вас двоих. Уединение',
    image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=900&q=80',
    steps: ['Кедровая бочка', 'Подводный массаж или Шарко', 'Массаж лица, декольте и головы'],
    options: [{ label: '120 минут (за двоих)', price: '9 000 ₽' }],
  },
  {
    id: 'couples-massage',
    categories: ['Спа-ритуалы', 'Для двоих'],
    category: 'Для двоих',
    title: 'Парный массаж и Кедровый пар',
    subtitle: 'Синхронный сеанс для двоих по вашему запросу',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80',
    steps: ['Два параллельных массажа', 'Опционально: кедровые бочки'],
    options: [
      { label: '60 мин (2 массажа)', price: '5 500 ₽' },
      { label: '60 мин (2 бочки + 2 массажа)', price: '6 500 ₽' },
      { label: '90 мин (2 массажа)', price: '7 000 ₽' },
    ],
  },
  {
    id: 'couples-hydro',
    categories: ['Спа-ритуалы', 'Для двоих'],
    category: 'Для двоих',
    title: 'Гидромассаж и Релакс для двоих',
    subtitle: 'Водные процедуры и глубокая проработка для двоих',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80', 
    steps: ['Пакет «Спина + Гидромассаж» или Нейроседативный комплекс'],
    options: [
      { label: '110 мин (Спина + Гидромассаж)', price: '8 000 ₽' },
      { label: 'Полный нейроседативный комплекс', price: '9 000 ₽' },
    ],
  },

  // - ДЛЯ НЕГО -
  {
    id: 'men-complex',
    categories: ['Для него'],
    category: 'Для него',
    title: 'Комплексный мужской уход',
    subtitle: 'Хиромассаж лица, головы, ШВЗ + общий массаж тела',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    steps: ['Общий массаж тела', 'Проработка ШВЗ и головы', 'Хиромассаж лица'],
    options: [{ label: '120 минут', price: '5 000 ₽' }],
  },
  {
    id: 'men-water-back',
    categories: ['Для него'],
    category: 'Для него',
    title: 'Водный массаж и спина',
    subtitle: 'Мощный гидромассаж в сочетании с проработкой спины',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=900&q=80',
    steps: ['Подводный душ-массаж', 'Массаж спины'],
    options: [{ label: '90 минут', price: '4 500 ₽' }],
  },
  {
    id: 'men-cedar-charcot',
    categories: ['Для него'],
    category: 'Для него',
    title: 'Кедр, вода и массаж',
    subtitle: 'Мужская перезагрузка: пар, Шарко и общий массаж',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
    steps: ['Кедровая бочка', 'Душ Шарко', 'Общий массаж тела'],
    options: [{ label: '100 минут', price: '6 500 ₽' }],
  },
  {
    id: 'men-sport',
    categories: ['Для него'],
    category: 'Для него',
    title: 'Спортивный массаж тела',
    subtitle: 'Глубокое восстановление мышц после нагрузок',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80',
    steps: ['Интенсивная проработка триггерных точек'],
    options: [{ label: '90 минут', price: '4 000 ₽' }],
  },
];

const CATEGORIES = ['Массаж', 'Спа-ритуалы', 'Для двоих', 'Для него'];

function App() {
  const [activeCategory, setActiveCategory] = useState('Массаж');
  const [selectedTiers, setSelectedTiers] = useState({
    charcot: 'pack5',
    'underwater-30': 'pack5',
    'underwater-50': 'pack5',
  });
  const [selectedOptions, setSelectedOptions] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Подводный ручной массаж (50 мин)',
    option: 'Пробный сеанс',
    price: '2 800 ₽',
    date: '',
    timeSlot: '',
    comment: '',
  });

  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const todayISO = new Date().toISOString().split('T')[0];

  const setQuickDate = (daysToAdd) => {
    const d = new Date();
    d.setDate(d.getDate() + daysToAdd);
    setFormData((prev) => ({ ...prev, date: d.toISOString().split('T')[0] }));
  };

  const filteredServices = useMemo(() => {
    return SERVICES.filter((s) => s.categories.includes(activeCategory));
  }, [activeCategory]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSelectForBooking = (serviceTitle, optionLabel, priceText) => {
    setFormData((prev) => ({
      ...prev,
      service: serviceTitle,
      option: optionLabel,
      price: priceText,
    }));
    
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      const y = bookingEl.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Заявка успешно отправлена в Telegram! Администратор свяжется с вами.',
        });
        setFormData((prev) => ({ ...prev, name: '', phone: '', comment: '', timeSlot: '' }));
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Ошибка сервера.',
        });
      }
    } catch (err) {
      setSubmitStatus({
        type: 'error',
        message: 'Не удалось соединиться с сервером (убедитесь, что запущен node server.js).',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      {/* Шапка */}
      <header className="navbar">
        <div className="navbar-inner">
          <a href="#top" className="brand" onClick={(e) => scrollToSection(e, 'top')}>
            <div className="brand-logo-circle">
              <img src="/icon.png" alt="Mantra Spa" className="brand-logo-img" />
            </div>
            <div className="brand-text-group">
              <span className="brand-main-title">МАНТРА</span>
              <span className="brand-sub-title">Калининград</span>
            </div>
          </a>

          <ul className="nav-links">
            <li><a href="#hydro" onClick={(e) => scrollToSection(e, 'hydro')}>Водный массаж</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Услуги и цены</a></li>
            <li><a href="#interior" onClick={(e) => scrollToSection(e, 'interior')}>Атмосфера</a></li>
            <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>О пространстве</a></li>
            <li><a href="#contacts" onClick={(e) => scrollToSection(e, 'contacts')}>Контакты</a></li>
          </ul>

          <a href="#booking" className="btn-primary" onClick={(e) => scrollToSection(e, 'booking')}>Записаться</a>
        </div>
      </header>

      <main className="app-wrapper" id="top">
        {/* Hero */}
        <section className="hero">
          <div>
            <h1>
              Обрести стройность.<br />
              Почувствовать лёгкость.<br />
              Наполниться.
            </h1>
            <p className="hero-subtitle">
              Пространство эстетики тела «Mantra Spa 39» - водная стихия, парение в кедровой бочке и бережные спа-ритуалы в самом сердце Калининграда.
            </p>
            <div className="hero-actions">
              <a href="#services" className="btn-primary" onClick={(e) => scrollToSection(e, 'services')}>
                Выбрать массаж <span>→</span>
              </a>
              <a href="#hydro" className="btn-outline" onClick={(e) => scrollToSection(e, 'hydro')}>
                Абонементы на массаж
              </a>
            </div>
            <div className="hero-meta">
              <a 
                href="https://yandex.ru/maps/org/mantra_spa39/107311462072/?indoorLevel=1&ll=20.500543%2C54.728763&z=17.13" 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  color: '#1D352D', 
                  textDecoration: 'underline', 
                  fontWeight: 600, 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  backgroundColor: 'rgba(29, 53, 45, 0.06)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(29, 53, 45, 0.15)'
                }}
              >
                📍 Калининград, ул. Калужская, 10 ↗
              </a>
              <span style={{ fontSize: '14px' }}>
                📞 Мантра: +7 (929) 169-69-29 | Александра: +7 (911) 466-77-70
              </span>
            </div>
          </div>

          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=85"
              alt="Водная стихия Мантра Спа"
            />
            <div className="hero-image-overlay">
              <h3 className="serif">Вода возвращает к себе.</h3>
              <p style={{ fontSize: '13px', opacity: 0.85 }}>
                Подводный ручной массаж • Душ Шарко • Спа-ритуалы
              </p>
            </div>
          </div>
        </section>

        {/* Водный массаж */}
        <section className="section" id="hydro">
          <div className="section-header">
            <div>
              <h2 className="section-title">В основе - вода.</h2>
            </div>
            <p className="section-desc">
              Коррекция фигуры, лимфодренаж и снятие мышечного напряжения с помощью воды. Выберите пробный визит или абонемент.
            </p>
          </div>

          <div className="hydro-grid">
            {HYDRO_PROGRAMS.map((item) => {
              const activeTierId = selectedTiers[item.id];
              const currentTier = item.tiers.find((t) => t.id === activeTierId) || item.tiers[0];

              return (
                <div className="hydro-card" key={item.id}>
                  <div className="hydro-img-wrap">
                    <img src={item.image} alt={item.title} className="bw-photo" />
                    <span className="hydro-badge">{item.duration}</span>
                  </div>
                  <div className="hydro-body">
                    <h3 className="hydro-title">{item.title}</h3>
                    <p className="hydro-sub">{item.subtitle}</p>

                    <div className="tier-selector">
                      {item.tiers.map((tier) => (
                        <button
                          key={tier.id}
                          type="button"
                          className={`tier-btn ${activeTierId === tier.id ? 'active' : ''}`}
                          onClick={() =>
                            setSelectedTiers((prev) => ({ ...prev, [item.id]: tier.id }))
                          }
                        >
                          <span className="tier-btn-label">{tier.label}</span>
                          <span className="tier-btn-price">{tier.perSession} ₽ / сеанс</span>
                        </button>
                      ))}
                    </div>

                    <div className="hydro-footer">
                      <div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Итого к оплате:</div>
                        <div style={{ fontSize: '22px', fontWeight: 600 }}>
                          {currentTier.total.toLocaleString('ru-RU')} ₽
                        </div>
                        {currentTier.saving > 0 && (
                          <span className="saving-pill">Выгода {currentTier.saving} ₽</span>
                        )}
                      </div>

                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() =>
                          handleSelectForBooking(
                            item.title,
                            currentTier.label,
                            `${currentTier.total.toLocaleString('ru-RU')} ₽`
                          )
                        }
                      >
                        Записаться →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Каталог услуг */}
        <section className="section" id="services">
          <div className="section-header">
            <div>
              <h2 className="section-title">Время для вашего тела.</h2>
            </div>
            <p className="section-desc">
              Выберите интересующее направление.
            </p>
          </div>

          <div style={{ background: '#EFECE6', padding: '16px 24px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #DFDBD2' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#181818' }}>
              ✨ <strong>Вы также можете составить программу по вашему желанию</strong>, и цена будет меняться соответственно вашим пожеланиям. Итоговую цену уточняйте у менеджера.
            </p>
          </div>

          <div className="tabs-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`tab-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="catalog-grid">
            {filteredServices.map((service) => {
              const optIndex = selectedOptions[service.id] || 0;
              const currentOpt = service.options[optIndex] || service.options[0];

              return (
                <div className="service-card" key={service.id}>
                  <div className="service-img" onClick={() => handleSelectForBooking(service.title, currentOpt.label, currentOpt.price)}>
                    <img src={service.image} alt={service.title} />
                  </div>

                  <div className="service-content">
                    <div className="service-meta">
                      {service.category} • {currentOpt.label}
                    </div>
                    <h3 className="service-title serif" onClick={() => handleSelectForBooking(service.title, currentOpt.label, currentOpt.price)}>
                      {service.title}
                    </h3>
                    <p className="service-desc">{service.subtitle}</p>

                    <ul className="service-steps">
                      {service.steps.map((step, i) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>

                    {service.options.length > 1 && (
                      <div className="option-Selector">
                        {service.options.map((opt, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`opt-chip ${optIndex === idx ? 'active' : ''}`}
                            onClick={() =>
                              setSelectedOptions((prev) => ({ ...prev, [service.id]: idx }))
                            }
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="service-bottom">
                      <span className="service-price">{currentOpt.price}</span>
                      <button
                        type="button"
                        className="circle-btn"
                        title="Выбрать процедуру"
                        onClick={() =>
                          handleSelectForBooking(service.title, currentOpt.label, currentOpt.price)
                        }
                      >
                        ↗
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Галерея (Атмосфера) */}
        <section className="section" id="interior">
          <div className="section-header">
            <div>
              <h2 className="section-title">Атмосфера.</h2>
            </div>
            <p className="section-desc">
              Место, где время замедляет свой ход. Погрузитесь в эстетику и спокойствие нашего пространства.
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '24px', 
            justifyContent: 'center', 
            marginTop: '24px'
          }}>
            {/* Фото 1 */}
            <div style={{ flex: '1 1 280px', height: '460px' }}>
              <img 
                src="/фото1.png" 
                alt="Интерьер Мантра Спа 1" 
                className="color-photo"
                style={{ width: '100%', height: '100%', borderRadius: '16px', objectFit: 'cover', display: 'block' }} 
              />
            </div>
            
            {/* Вертикальное видео посередине (бесконечное, без элементов управления) */}
            <div style={{ flex: '0 0 auto', height: '460px' }}>
              <video 
                src="/video.mp4" 
                autoPlay
                loop
                muted
                playsInline
                style={{
                  height: '100%',
                  aspectRatio: '9 / 16',
                  borderRadius: '16px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  objectFit: 'cover',
                  backgroundColor: '#000',
                  display: 'block'
                }}
              />
            </div>

            {/* Фото 2 */}
            <div style={{ flex: '1 1 280px', height: '460px' }}>
              <img 
                src="/фото2.png" 
                alt="Интерьер Мантра Спа 2" 
                className="color-photo"
                style={{ width: '100%', height: '100%', borderRadius: '16px', objectFit: 'cover', display: 'block' }} 
              />
            </div>
          </div>
        </section>

        {/* О пространстве */}
        <section className="section" id="about">
          <div className="split-section">
            <div>
              <h2 className="section-title" style={{ marginBottom: '24px' }}>
                Пространство,<br />
                в котором<br />
                можно выдохнуть.
              </h2>
              <p style={{ color: '#555', marginBottom: '24px', fontSize: '16px' }}>
                Пространство эстетики тела «Mantra_spa39» - это место силы и красоты для храма вашей души.
              </p>
              <a href="#services" className="btn-primary" onClick={(e) => scrollToSection(e, 'services')}>Найти свой ритуал →</a>
            </div>

            <div className="hero-image-card" style={{ height: '460px' }}>
              <img
                src="/фото5.png"
                alt="Интерьер Мантра Спа"
              />
            </div>
          </div>
        </section>

        {/* Форма записи */}
        <section className="section" id="booking">
          <div className="booking-layout">
            <div>
              <h2 className="section-title" style={{ marginBottom: '20px' }}>
                Начните<br />
                с момента<br />
                для себя.
              </h2>
              <p style={{ color: '#555', marginBottom: '28px' }}>
                Оставьте заявку на сайте - она мгновенно прилетит администратору в Telegram. Мы свяжемся с вами для подтверждения.
              </p>
              <div style={{ height: '260px', overflow: 'hidden', borderRadius: '8px', boxShadow: 'var(--shadow-soft)' }}>
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
                  alt="Берег моря"
                  className="bw-photo"
                />
              </div>
            </div>

            <form className="booking-form-card" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Выбранная процедура</label>
                <input
                  type="text"
                  className="form-control"
                  value={`${formData.service} (${formData.option}) - ${formData.price}`}
                  readOnly
                  style={{ fontWeight: 600, color: '#1D352D' }}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Как к вам обращаться *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ваш телефон *</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+7 (999) 000-00-00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Желаемая дата</label>
                  <input
                    type="date"
                    className="form-control"
                    min={todayISO}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                  <div className="quick-dates">
                    <button type="button" className="quick-date-btn" onClick={() => setQuickDate(0)}>Сегодня</button>
                    <button type="button" className="quick-date-btn" onClick={() => setQuickDate(1)}>Завтра</button>
                    <button type="button" className="quick-date-btn" onClick={() => setQuickDate(2)}>Послезавтра</button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Удобное время (введите сами)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Например: в 14:30"
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Ваши пожелания (необязательно)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Например: хочу прийти вдвоём"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={isSending}
              >
                {isSending ? 'Отправляем в Telegram...' : 'Отправить заявку в Telegram →'}
              </button>

              {submitStatus.message && (
                <div className={`status-banner ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Контакты */}
        <section className="section" id="contacts">
          <div className="split-section">
            <div>
              <h2 className="serif" style={{ marginBottom: '32px', fontSize: '26px', lineHeight: '1.4', fontWeight: 'normal', color: '#181818' }}>
                Минус лишние сантиметры, плюс идеальная кожа и потрясающее настроение. Запишитесь на сеанс и почувствуйте сияние каждой клеточки вашего тела!
              </h2>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>Наш адрес</div>
                <div className="serif" style={{ fontSize: '32px' }}>Калининград, улица Калужская, 10</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Принимаем по предварительной записи</div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>Для связи</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '2px' }}>Мантра:</div>
                    <a
                      href="tel:+79291696929"
                      className="serif"
                      style={{ fontSize: '34px', color: '#181818', textDecoration: 'none', lineHeight: '1.1' }}
                    >
                      +7 (929) 169-69-29
                    </a>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '2px' }}>Александра:</div>
                    <a
                      href="tel:+79114667770"
                      className="serif"
                      style={{ fontSize: '34px', color: '#181818', textDecoration: 'none', lineHeight: '1.1' }}
                    >
                      +7 (911) 466-77-70
                    </a>
                  </div>
                </div>

                <div style={{ 
                  marginTop: '16px', 
                  padding: '12px', 
                  background: 'rgba(29, 53, 45, 0.05)', 
                  borderRadius: '8px', 
                  fontSize: '14px', 
                  color: '#1D352D', 
                  border: '1px solid rgba(29, 53, 45, 0.1)' 
                }}>
                  ✨ <strong>Администратора нет</strong> — отвечаем по мере возможности.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="https://vk.com/mantra_spa39" target="_blank" rel="noreferrer" className="btn-outline">VK: MANTRA_SPA39</a>
                <a href="https://wa.me/79291696929" target="_blank" rel="noreferrer" className="btn-outline">WhatsApp</a>
                <a href="https://t.me/Aleksandra_mantra" target="_blank" rel="noreferrer" className="btn-outline">Telegram</a>
              </div>
            </div>

            <div className="hero-image-card" style={{ height: '420px' }}>
              <img
                src="/фото6.png"
                alt="Атмосфера и расслабление в Mantra Spa"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Подвал */}
      <footer className="app-wrapper footer">
        <div>
          <div className="brand-title">мантра</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            Студия эстетики тела • Калининград
          </div>
        </div>
        <div>
          <div><span style={{ fontSize: '12px', color: '#999' }}>Мантра:</span> +7 (929) 169-69-29</div>
          <div style={{ marginTop: '4px' }}><span style={{ fontSize: '12px', color: '#999' }}>Александра:</span> +7 (911) 466-77-70</div>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <a 
              href="https://yandex.ru/maps/org/mantra_spa39/107311462072/reviews/" 
              target="_blank" 
              rel="noreferrer"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                background: '#fff',
                border: '1px solid #DFDBD2',
                borderRadius: '8px',
                color: '#1D352D', 
                textDecoration: 'none', 
                fontWeight: 600,
                fontSize: '13px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              ⭐ Яндекс.Карты
            </a>
            <a 
              href="https://2gis.ru/kaliningrad/search/Mantra%20Spa%2039" 
              target="_blank" 
              rel="noreferrer"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                background: '#fff',
                border: '1px solid #DFDBD2',
                borderRadius: '8px',
                color: '#1D352D', 
                textDecoration: 'none', 
                fontWeight: 600,
                fontSize: '13px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              📍 2ГИС
            </a>
          </div>
        </div>
        <div style={{ textAlign: 'right', color: '#666', fontSize: '13px' }}>
          © MANTRA_SPA39
        </div>
      </footer>
    </div>
  );
}

export default App;