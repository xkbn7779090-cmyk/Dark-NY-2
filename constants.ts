
export const COLORS = {
  obsidian: '#020617',
  crimson: '#7f1d1d',
  emerald: '#059669',
  gold: '#fbbf24',
  neonCyan: '#00ffea',
  warmGold: '#ffd700',
};

export const BREAKPOINTS = {
  mobile: 360,
  tablet: 768,
  desktop: 1024,
};

export const SOURCES = {
  crime: [
    { name: 'WHO (World Health Organization)', url: 'https://www.who.int' },
    { name: 'Eurostat', url: 'https://ec.europa.eu/eurostat' },
    { name: 'Politie.nl', url: 'https://www.politie.nl' },
    { name: 'CIS Stat Committee', url: 'http://www.cisstat.com' }
  ],
  ecology: [
    { name: 'Environmental Protection Agency (EPA)', url: 'https://www.epa.gov' },
    { name: 'National Geographic: Ecology of Xmas', url: 'https://www.nationalgeographic.com' }
  ]
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
    tagline: 'Праздник держится на страхе.',
    accent: '#ef4444',
    fact: 'В ночь на 5 декабря Крампус сопровождает Св. Николая, наказывая непослушных детей розгами. Это тень праздника, которую мы пытаемся забыть.',
    legend: 'Рогатый демон с цепями. Он забирает "плохих" в мешок. Метафора подавленной агрессии праздничного периода.',
    interpretation: 'Мы боимся не монстра, а осуждения. "Был ли ты хорошим мальчиком?" — это первый социальный кредит.',
    importance: 'Напоминание о том, что у даров есть цена.',
    image: './assets/krampus.png', 
    prompt: 'Krampus, dark horned demon, realistic fur texture, menacing expression, cinematic lighting, photorealistic 8k, scary, winter forest background.'
  },
  {
    id: 'perchta',
    name: 'ПЕРХТА',
    region: 'Австрия',
    tagline: 'Чистота дома или вспоротый живот.',
    accent: '#94a3b8',
    fact: 'Языческая богиня, ставшая ведьмой. Проверяла, закончена ли пряжа к Крещению. Если нет — могла наказать физически.',
    legend: 'Двуликая: прекрасная дева в белом или старуха. В современной трактовке — бледная женщина с венком из хвои и темным макияжем.',
    interpretation: 'Перхта — это дедлайн. Невроз "успеть всё до Нового года" имеет древние корни.',
    importance: 'Символ хаоса, который нужно упорядочить.',
    image: './assets/perchta.png',
    prompt: 'Perchta, pale woman with dark eye makeup, pine wreath on head, winter forest, gothic style, mysterious, cinematic portrait.'
  },
  {
    id: 'mari_lwyd',
    name: 'МАРИ ЛУИД',
    region: 'Уэльс',
    tagline: 'Смерть приходит колядовать.',
    accent: '#fbbf24',
    fact: 'Обряд с черепом лошади на палке. Группа ходит по домам, вступая в стихотворные перепалки с хозяевами ради еды и выпивки.',
    legend: 'Скелет лошади, украшенный лентами. Она требует войти, и ты должен переспорить её в рифмах.',
    interpretation: 'Это легализованное вторжение. Социальная обязанность быть гостеприимным, даже когда на пороге сама смерть.',
    importance: 'Право сказать "нет" непрошеным гостям.',
    image: './assets/mari_lwyd.png',
    prompt: 'Mari Lwyd, painted horse skull with colorful floral patterns and ribbons, red pompom, person in red hood, folklore photography, cinematic.'
  },
  {
    id: 'yule_cat',
    name: 'ЙОЛЬСКИЙ КОТ',
    region: 'Исландия',
    tagline: 'Дресс-код или смерть.',
    accent: '#059669',
    fact: 'Гигантский кот, который съедает тех, кто не обзавелся новой шерстяной одеждой к Рождеству.',
    legend: 'Он бродит по заснеженным деревням. Иногда изображается как белый пушистый дух зимы с красным носом, обманчиво милый.',
    interpretation: 'Жесточайшая метафора социального расслоения. Если ты беден и без обновки — ты еда. Идеальный символ праздничного консьюмеризма.',
    importance: 'Почему нам стыдно быть без "нового платья".',
    image: './assets/yule_cat.png',
    prompt: 'White furry winter creature with small antlers and a red nose, wearing a red and white scarf, cute but uncanny, winter forest background, cinematic.'
  }
];

export const BASE_URL = '';

export const resolvePath = (path: string) => {
  if (!path) return '';
  if (path.startsWith('data:') || path.startsWith('http')) return path;
  return `${BASE_URL}${path}`;
};

export const AI_STYLE_GUIDE = 'Cinematic noir, dark academic aesthetic, muted colors with glowing neon highlights, surrealism, high contrast, ultra-detailed 4k render.';

export const PLANNER_CATEGORIES = {
  identities: ['Женщина', 'Мужчина', 'Небинарный'],
  company: ['Один', 'С партнером', 'С друзьями', 'С семьей', 'С детьми'],
  conditions: ['Дома', 'В другой стране', 'В дороге', 'На работе', 'Без денег']
};

export const POSTER_THEMES = [
  'Осознанность',
  'Минимализм',
  'Экология',
  'Ментальное здоровье',
  'Правда праздника'
];

export const SLOGANS = [
  'Меньше мишуры — больше смысла',
  'Праздник без долгов',
  'Твой уют — твои правила',
  'Один — не значит одинок',
  'Статистика важнее магии'
];

export const STYLES = [
  'Cyberpunk Noir',
  'Minimalist Vector',
  'Dark Academic',
  'Glitch Art',
  'Expressionism'
];

export const MOTIVES = [
  'Одинокая елка',
  'Разбитая игрушка',
  'Городской туман',
  'Неоновый мандарин',
  'Звездное небо'
];
