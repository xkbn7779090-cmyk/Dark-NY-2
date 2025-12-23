export const COLORS = {
  obsidian: '#020617',
  crimson: '#7f1d1d',
  emerald: '#059669',
  gold: '#fbbf24',
  neonCyan: '#00ffea',
  warmGold: '#ffd700',
};

export const CRIMES_DATA = [
  { name: '28 Дек', crime: 100, accidents: 50 },
  { name: '29 Дек', crime: 120, accidents: 60 },
  { name: '30 Дек', crime: 150, accidents: 80 },
  { name: '31 Дек', crime: 450, accidents: 300 },
  { name: '01 Янв', crime: 380, accidents: 250 },
  { name: '02 Янв', crime: 180, accidents: 100 },
];

export const HISTORY_CHARACTERS = [
  {
    id: 'krampus',
    name: 'КРАМПУС',
    region: 'Альпы',
    tagline: 'Праздник держится на дисциплине — и на страхе.',
    accent: '#ef4444',
    fact: 'В традициях Центральной Европы давно существует дуэт "благой даритель" и "строгий спутник" — социальный механизм контроля поведения в общине зимой, когда порядок важнее комфорта.',
    legend: 'Рогатый, звенящий цепями, приходит в самую тёмную часть сезона, чтобы напомнить: последствия существуют, даже когда "все празднуют".',
    interpretation: 'Мы унаследовали не только огни и сладости, но и скрытую логику: "будь правильным — заслужишь тепло". Когда праздник становится витриной успеха, этот слой возвращается в виде стыда: "я не дотягиваю".',
    importance: 'Крампус — метафора внутреннего контролёра, который просыпается именно в декабре.',
    image: 'https://images.unsplash.com/photo-1511210086820-f9479e009477?auto=format&fit=crop&q=80&w=1200',
    prompt: 'Krampus — alpine folkloric horned figure, subtle bells and worn chains, winter night atmosphere.'
  },
  {
    id: 'ruprecht',
    name: 'КНЕХТ РУПРЕХТ',
    region: 'Германия',
    tagline: 'Помощник святого: награда и наказание в одном пакете.',
    accent: '#f8fafc',
    fact: 'В ряде региональных европейских традиций рядом с "светлым" персонажем появляется "служитель порядка" — роль, поддерживающая социальные нормы.',
    legend: 'Он задаёт вопросы, он "видит", он фиксирует: кто соблюдал правила, кто — нет. Иногда ему приписывают мешок и символические атрибуты дороги.',
    interpretation: 'Это про власть ритуала: общество делегирует одному образу право быть строгим, чтобы большинству было комфортно "быть добрыми".',
    importance: 'Когда ты в новой стране, социальные сравнения болезненнее. Рупрехт — маска нормы, под которую легко провалиться.',
    image: 'https://images.unsplash.com/photo-1543336337-1249b2c3ec7c?auto=format&fit=crop&q=80&w=1200',
    prompt: 'Knecht Ruprecht — austere German winter companion, heavy dark cloak and wooden staff, soft lantern glow in a snowy village.'
  },
  {
    id: 'perchta',
    name: 'ПЕРХТА',
    region: 'Альпы',
    tagline: 'Суд зимы: порядок дома и порядок в голове.',
    accent: '#fbbf24',
    fact: 'В фольклорных слоях Альп встречаются персонажи, связанные with зимними обходами, домашним укладом и моральным балансом общины.',
    legend: 'Её приход связывают with оценкой труда, чистоты, правильности ритуалов — как будто сама зима смотрит на дом и решает, есть ли в нём место теплу.',
    interpretation: 'Перхта — не "пугалка", а зеркало. Она напоминает: праздник начинался как договор с хаосом.',
    importance: 'Перхта попадает в нерв: ты не обязан закрывать год идеально — достаточно сделать его честно.',
    image: 'https://images.unsplash.com/photo-1544273677-277914cba40a?auto=format&fit=crop&q=80&w=1200',
    prompt: 'Perchta (Berchta) — sacred strict winter guardian, traditional alpine folk costume motifs, dual nature visage.'
  },
  {
    id: 'karachun',
    name: 'КАРАЧУН',
    region: 'СНГ / Славяне',
    tagline: 'Точка года, где ночь сильнее дня.',
    accent: '#818cf8',
    fact: 'В славянских регионах существует множество зимних персонажей, связанных with морозом и темнотой — фольклор часто фиксирует именно ощущение угрозы.',
    legend: 'Он "укорочивает день", напоминает о конце и о том, что природа не обязана быть доброй. Его власть — не злость, а холодная неизбежность.',
    interpretation: 'Карачун — про честность: зима не улыбается. Если праздник превращают в обязательное счастье, психика начинает врать.',
    importance: 'Карачун — язык, на котором можно признать темноту, не превращая её в "поражение".',
    image: 'https://images.unsplash.com/photo-1547492167-735914c6e917?auto=format&fit=crop&q=80&w=1200',
    prompt: 'Karachun — Slavic winter darkness deity, heavy embroidered fur cloak, icy forest twilight, mystical presence.'
  },
  {
    id: 'goat',
    name: 'ЙОЛЬСКИЙ КОЗЁЛ',
    region: 'Скандинавия',
    tagline: 'Жертвенный символ, ставший милым декором.',
    accent: '#10b981',
    fact: 'В скандинавском культурном поле "йольские" образы — это наследие дохристианских зимних практик, переплетенных with городскими традициями.',
    legend: 'Козёл как страж зимнего порога: знак силы, урожая, выживания и цены, которую платят за тепло.',
    interpretation: 'Это метафора потребления: то, что было символом договора with природой, стало товаром на полке.',
    importance: 'В Европе декор легко превращается в финансовую ловушку. Йольский козёл предлагает иной ход: меньше вещей — больше смысла.',
    image: 'https://images.unsplash.com/photo-1607335614551-3062bf90f30e?auto=format&fit=crop&q=80&w=1200',
    prompt: 'Yule Goat (Julbock) — ceremonial straw-goat symbol brought to life as a guardian protector, hyper-detailed organic straw texture.'
  },
  {
    id: 'mari',
    name: 'МАРИ ЛВИД',
    region: 'Уэльс',
    tagline: 'Песня-поединок: ритуал, который пережил маркетинг.',
    accent: '#22d3ee',
    fact: 'В британских региональных традициях существовали зимние обходы и состязательные песенные форматы — коллективные практики связи в тёмный сезон.',
    legend: 'Она приходит как испытание: пустишь ли ты праздник внутрь? Готов ли ты отвечать — не кошельком, а голосом и присутствием?',
    interpretation: 'Мари Лвид — антитеза маркетингу. Здесь ценность не в покупке, а в участии.',
    importance: 'Мари Лвид подсказывает практику: маленькая группа, игра, песня, ритуал — и ты снова чувствуешь опору.',
    image: 'https://images.unsplash.com/photo-1512351737369-09726754402a?auto=format&fit=crop&q=80&w=1200',
    prompt: 'Mari Lwyd — Welsh ritual horse-skull figure presented respectfully as a cultural artifact, ribbons, white cloak, candlelit night.'
  }
];

export const AI_STYLE_GUIDE = "museum-grade folkloric portrait, cinematic rim light, subtle fog, low-key lighting, textured background with faint parchment + noise grain, shallow depth of field, centered composition, 4:5 portrait aspect, ultra-detailed, consistent color grading. ABSOLUTELY NO TEXT, no logos, no gore, no children, no explicit violence.";

export const PLANNER_CATEGORIES = {
  identities: ["Женщина", "Мужчина", "Небинарная персона", "Квир", "Агендер", "Предпочитаю не указывать"],
  company: ["В одиночестве", "С партнером", "С семьей", "С детьми", "С друзьями", "С питомцем", "Онлайн-тусовка"],
  vibes: ["Спокойствие и дзен", "Творчество", "Активность и спорт", "Мистика и Таро", "Бунт / Панк", "Ретро / Ностальгия", "Романтика"],
  conditions: ["Без алкоголя", "Нулевой бюджет", "Цифровой детокс", "Zero Waste", "Веганское меню", "Без подарков", "Ранний отбой"]
};

export const POSTER_THEMES = [
  "Социум: Одиночество",
  "Экология: Смерть деревьев",
  "Долги: Кредитная мишура",
  "Здоровье: 4 утра",
  "История: Крампус вернулся"
];

export const SLOGANS = [
  "Ты не один в этой тишине",
  "Праздник внутри тебя",
  "Честность важнее мишуры",
  "Мандарины и тишина",
  "Без фейерверков — с душой"
];

export const STYLES = ["Сюрреализм", "Киберпанк", "Минимализм", "Дарк Академи", "Глитч-арт"];
export const MOTIVES = ["Шокирующая правда", "Уютная меланхолия", "Анти-потребление", "Футуристичный нуар"];

// Use process.env for environment variables to ensure compatibility with the project's variable handling and fix TS error
export const BASE_URL = (typeof process !== 'undefined' && process.env.BASE_URL) || '/';