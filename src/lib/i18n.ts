export type Lang = 'zh' | 'en';

export const content = {
  nav: {
    home: { zh: '首页', en: 'Home' },
    products: { zh: '产品与方案', en: 'Products & Solutions' },
    faq: { zh: '常见问题', en: 'FAQ' },
    about: { zh: '关于我们', en: 'About Us' },
  },
  hero: {
    tagline: { zh: '专业饮品云顶解决方案', en: 'Professional Cloud Foam Solutions' },
    subtitle: { zh: '咖啡 / 茶饮 / 甜品全场景应用', en: 'Coffee · Tea · Dessert — All Scenarios' },
    brandName: { zh: '闪蝶浮云', en: 'MORPHO CLOUD FOAM' },
    brandSub: { zh: '闪蝶 Morpho Foam', en: 'MORPHO FOAM' },
    description: {
      zh: '「MORPHO 闪蝶」系列喷罐产品，以专利技术为核心，赋能咖啡、茶饮、甜品门店实现快速标准化出品。',
      en: '"MORPHO" series spray products, powered by patented technology, enabling coffee, tea, and dessert stores to achieve rapid standardized production.',
    },
    cta: { zh: '了解更多', en: 'Learn More' },
    ctaPrimary: { zh: '查看产品', en: 'View Products' },
    ctaSecondary: { zh: '核心价值', en: 'Core Values' },
  },
  values: {
    title: { zh: '核心价值', en: 'Core Values' },
    items: [
      {
        icon: 'patent',
        title: { zh: '专利技术', en: 'Patented Technology' },
        desc: { zh: '30 分钟稳定造型', en: '30-min stable shape retention' },
      },
      {
        icon: 'easy',
        title: { zh: '操作便捷', en: 'Easy Operation' },
        desc: { zh: '即喷即用无需打发', en: 'Spray & serve, no whipping needed' },
      },
      {
        icon: 'wide',
        title: { zh: '适配广泛', en: 'Wide Compatibility' },
        desc: { zh: '茶底 / 咖啡 / 甜品全覆盖', en: 'Tea / Coffee / Dessert coverage' },
      },
      {
        icon: 'visual',
        title: { zh: '视觉溢价', en: 'Visual Premium' },
        desc: { zh: '提升出餐打卡传播力', en: 'Boost social sharing appeal' },
      },
    ],
  },
  products: {
    title: { zh: '产品介绍', en: 'Product Portfolio' },
    subtitle: { zh: '专业云顶 · 无限应用', en: 'Professional Cloud Foam · Infinite Applications' },
    items: [
      {
        name: { zh: '闪蝶浮云', en: 'MORPHO CLOUD FOAM' },
        tag: { zh: '经典款', en: 'Classic' },
        overview: {
          zh: '采用特殊配方研制，口感轻盈绵密，可广泛应用于各类现制饮品。专利稳定技术确保产品在出餐后 30 分钟内保持饱满圆拱造型，显著提升饮品视觉价值与顾客体验。',
          en: 'Specially formulated for a light and dense texture, widely applicable to various freshly made beverages. Patented stability technology ensures a full dome shape for 30 minutes after serving, significantly enhancing visual value and customer experience.',
        },
        highlights: [
          { zh: '适配广泛', en: 'Wide Compatibility' },
          { zh: '绿茶 / 花茶 / 红茶 / 水果茶均适用', en: 'Green tea / Flower tea / Black tea / Fruit tea' },
          { zh: '稳定出品', en: 'Stable Output' },
          { zh: '30 分钟造型保持，适配外卖与堂食', en: '30-min shape retention for delivery & dine-in' },
          { zh: '饮品艺术', en: 'Beverage Art' },
          { zh: '圆拱形浮云顶，提升视觉呈现与传播力', en: 'Dome cloud top for visual appeal & sharing' },
        ],
        specs: {
          name: { zh: '产品名称', en: 'Product Name' },
          nameValue: { zh: '闪蝶浮云 / MORPHO CLOUD FOAM', en: 'MORPHO CLOUD FOAM' },
          spec: { zh: '产品规格', en: 'Specification' },
          specValue: '12 × 470ml',
          shelfLife: { zh: '保质期', en: 'Shelf Life' },
          shelfLifeValue: { zh: '9 个月', en: '9 months' },
          storage: { zh: '储存条件', en: 'Storage' },
          storageValue: { zh: '2-7℃ 冷藏', en: '2-7°C Refrigerated' },
          usage: { zh: '使用方式', en: 'Usage' },
          usageValue: { zh: '即喷即用，可放置于冰桶中随时取用', en: 'Spray & serve, keep in ice bucket for anytime use' },
          note: { zh: '注意事项', en: 'Note' },
          noteValue: { zh: '开封后请尽快使用完毕', en: 'Use promptly after opening' },
        },
        applications: [
          { zh: '奶茶系列', en: 'Milk Tea Series' },
          { zh: '咖啡系列', en: 'Coffee Series' },
          { zh: '甜品系列', en: 'Dessert Series' },
          { zh: '果茶系列', en: 'Fruit Tea Series' },
        ],
      },
      {
        name: { zh: '闪蝶芝云', en: 'MORPHO CHEESE FOAM' },
        tag: { zh: '芝士款', en: 'Cheese' },
        overview: {
          zh: '以健康芝士配方为核心，专为咖啡及拿铁类饮品设计。在呈现芝香口感的同时不压咖啡本味，口感层次丰富、轻盈绵密，帮助门店打造差异化艺术咖啡。',
          en: 'Core healthy cheese formula, designed for coffee and latte beverages. Delivers rich cheese flavor without overpowering coffee essence, with layered, light and dense texture, helping stores create differentiated artisan coffee.',
        },
        highlights: [
          { zh: '健康芝士', en: 'Healthy Cheese' },
          { zh: '芝香浓郁，不腻口，适配拿铁', en: 'Rich cheese aroma, not greasy, perfect for latte' },
          { zh: '稳定出品', en: 'Stable Output' },
          { zh: '30 分钟造型保持，助力网络传播', en: '30-min shape retention for social sharing' },
          { zh: '艺术咖啡', en: 'Artisan Coffee' },
          { zh: '圆拱造型饱满，提升产品溢价与颜值', en: 'Full dome shape for premium look & value' },
        ],
        specs: {
          name: { zh: '产品名称', en: 'Product Name' },
          nameValue: { zh: '闪蝶芝云 / MORPHO CHEESE FOAM', en: 'MORPHO CHEESE FOAM' },
          spec: { zh: '产品规格', en: 'Specification' },
          specValue: '12 × 470ml',
          shelfLife: { zh: '保质期', en: 'Shelf Life' },
          shelfLifeValue: { zh: '6 个月', en: '6 months' },
          storage: { zh: '储存条件', en: 'Storage' },
          storageValue: { zh: '2-7℃ 冷藏', en: '2-7°C Refrigerated' },
          usage: { zh: '使用方式', en: 'Usage' },
          usageValue: { zh: '即喷即用，可放置于冰桶中随时取用', en: 'Spray & serve, keep in ice bucket for anytime use' },
          note: { zh: '注意事项', en: 'Note' },
          noteValue: { zh: '开封后请尽快使用完毕', en: 'Use promptly after opening' },
        },
        applications: [
          { zh: '抹茶系列', en: 'Matcha Series' },
          { zh: '咖啡系列', en: 'Coffee Series' },
          { zh: '甜品系列', en: 'Dessert Series' },
          { zh: '果茶系列', en: 'Fruit Tea Series' },
        ],
      },
    ],
    specTitle: { zh: '产品规格', en: 'Specifications' },
    appTitle: { zh: '应用场景', en: 'Application Scenarios' },
    appScenarios: { zh: '全场景应用', en: 'All Scenarios' },
  },
  faq: {
    title: { zh: '常见问题', en: 'FAQ' },
    subtitle: { zh: '关于产品的常见疑问解答', en: 'Answers to common questions about our products' },
    items: [
      {
        q: { zh: '闪蝶产品的保质期是多久？', en: 'What is the shelf life of MORPHO products?' },
        a: {
          zh: '闪蝶浮云保质期为 9 个月，闪蝶芝云保质期为 6 个月。均需 2-7°C 冷藏储存，开封后请尽快使用完毕。',
          en: 'MORPHO Cloud Foam has a 9-month shelf life, and MORPHO Cheese Foam has a 6-month shelf life. Both require refrigerated storage at 2-7°C and should be used promptly after opening.',
        },
      },
      {
        q: { zh: '产品是否需要专业设备才能使用？', en: 'Do the products require professional equipment?' },
        a: {
          zh: '不需要。闪蝶系列产品即喷即用，无需打发设备，可直接放置于冰桶中随时取用，操作极其简便。',
          en: 'No. MORPHO products are spray-and-serve, requiring no whipping equipment. They can be kept in an ice bucket for随时 use, making operation extremely simple.',
        },
      },
      {
        q: { zh: '喷出的泡沫能保持多久不塌陷？', en: 'How long does the foam maintain its shape?' },
        a: {
          zh: '得益于专利技术，闪蝶产品喷出的圆拱造型可在出餐后 30 分钟内保持稳定，完全满足外卖与堂食场景需求。',
          en: 'Thanks to patented technology, the dome shape can remain stable for 30 minutes after serving, fully meeting both delivery and dine-in requirements.',
        },
      },
      {
        q: { zh: '产品可以适配哪些饮品类型？', en: 'What types of beverages are compatible?' },
        a: {
          zh: '闪蝶浮云适配绿茶、花茶、红茶及水果茶等茶底饮品；闪蝶芝云专为咖啡及拿铁类饮品设计，也可用于抹茶、甜品和果茶。',
          en: 'MORPHO Cloud Foam works with green tea, flower tea, black tea, and fruit tea bases. MORPHO Cheese Foam is designed for coffee and lattes, and can also be used for matcha, desserts, and fruit tea.',
        },
      },
      {
        q: { zh: '如何订购或联系合作？', en: 'How to order or contact for partnership?' },
        a: {
          zh: '请通过邮箱 contact@amandalab.org 联系我们，或访问公司地址：上海市闵行区七莘路765弄东苑新天地广场12号楼101室。',
          en: 'Please contact us at contact@amandalab.org, or visit us at Room 101, Building 12, Xintiandi Plaza, Lane 765, Qixin Road, Minhang District, Shanghai.',
        },
      },
    ],
  },
  about: {
    title: { zh: '关于我们', en: 'About Us' },
    brandName: { zh: '闪蝶 Morpho Foam', en: 'Morpho Foam' },
    description: {
      zh: '拾贰萃（上海）科技有限公司于 2020 年创立，是国内唯一一家具备自主研发能力、生产一体化喷罐的高科技企业。「MORPHO 闪蝶」系列由 AMANDA LAB 阿曼达食研所出品。',
      en: 'Shi\'er Foams (Shanghai) Technology Co., Ltd. was founded in 2020 as the only high-tech enterprise in China with independent R&D capability and integrated spray can production. The "MORPHO" series is produced by AMANDA LAB.',
    },
    milestones: [
      { year: '2020', text: { zh: '公司创立，首款产品闪蝶浮云面市，成为全球第一家 Cloud Foam 生产商', en: 'Company founded, first product MORPHO Cloud Foam launched — world\'s first Cloud Foam producer' } },
      { year: '2022', text: { zh: '与贵茶集团共同推出国内第一款手打抹茶慕斯', en: 'Launched China\'s first hand-whipped matcha mousse with Guicha Group' } },
      { year: '2023', text: { zh: '与曾味集团共同推出松露拿铁，将国产松露推向世界舞台', en: 'Launched truffle latte with Zengwei Group, bringing Chinese truffles to the world stage' } },
      { year: '2024', text: { zh: '创新研发闪蝶雪椰、闪蝶椰云，成为全球第一家素食喷射奶油生产商', en: 'Developed MORPHO Coconut products — world\'s first vegetarian spray cream producer' } },
      { year: '2025', text: { zh: '采用自主研发制酪工艺，推出首款闪蝶芝云', en: 'Launched first MORPHO Cheese Foam with proprietary cheese-making technology' } },
    ],
    certifications: [
      { zh: 'FSSC 22000 食品安全体系认证', en: 'FSSC 22000 Food Safety System Certification' },
      { zh: 'HACCP 危害分析与关键控制点体系认证', en: 'HACCP Hazard Analysis & Critical Control Points Certification' },
      { zh: 'GMP 生产车间标准', en: 'GMP Production Workshop Standard' },
      { zh: 'ISO 22000 安全认证', en: 'ISO 22000 Safety Certification' },
    ],
    advantages: [
      {
        title: { zh: '专利认证包装', en: 'Patented Packaging' },
        desc: { zh: '专利包装设计，一体化瓶身，特殊阀门保证出品造型和食品安全。30 分钟稳定出品满足门店外卖需求。', en: 'Patented design with integrated bottle and special valve ensuring shape and food safety. 30-min stability meets delivery needs.' },
      },
      {
        title: { zh: '浮云品类开创者', en: 'Category Pioneer' },
        desc: { zh: '独特配方设计，优质天然原料，不采用浮云粉、胶体、氢化植物油等，满足消费者健康需求。', en: 'Unique formula with premium natural ingredients — no foam powder, colloids, or hydrogenated oils, meeting health-conscious demands.' },
      },
      {
        title: { zh: '现代化产线', en: 'Modern Production Line' },
        desc: { zh: '比利时、西班牙全进口设备产线，西门子电子数控设备，万级标准车间，全自动化流水线生产。', en: 'Fully imported equipment from Belgium & Spain, Siemens CNC systems, Class 10K workshop, fully automated production line.' },
      },
      {
        title: { zh: '品质保证', en: 'Quality Assurance' },
        desc: { zh: '专属质量部门检验检测，第三方监督生产，确保每一批次产品合法、合规、标准化。', en: 'Dedicated quality department with third-party supervision, ensuring every batch is legal, compliant, and standardized.' },
      },
    ],
    contact: {
      email: { zh: '电子邮箱', en: 'Email' },
      emailValue: 'contact@amandalab.org',
      address: { zh: '公司地址', en: 'Address' },
      addressValue: {
        zh: '上海市闵行区七莘路765弄东苑新天地广场12号楼101室',
        en: 'Room 101, Building 12, Xintiandi Plaza, Lane 765, Qixin Road, Minhang District, Shanghai',
      },
    },
  },
  footer: {
    rights: { zh: '版权所有', en: 'All rights reserved' },
    tagline: { zh: '期待与您携手，共创饮品新体验', en: 'Looking forward to creating new beverage experiences together' },
    brandDesc: {
      zh: '专业饮品云顶解决方案供应商，以专利技术赋能咖啡、茶饮、甜品门店实现快速标准化出品。',
      en: 'Professional cloud foam solution provider, empowering coffee, tea, and dessert stores with patented technology for rapid standardized production.',
    },
    contactTitle: { zh: '联系我们', en: 'Contact Us' },
    emailLabel: { zh: '邮箱', en: 'Email' },
    addressLabel: { zh: '地址', en: 'Address' },
    address: {
      zh: '上海市闵行区七莘路765弄东苑新天地广场12号楼101室',
      en: 'Room 101, Bldg 12, Xintiandi Plaza, Lane 765, Qixin Rd, Minhang, Shanghai',
    },
    quickLinksTitle: { zh: '快速链接', en: 'Quick Links' },
    linkProducts: { zh: '产品与方案', en: 'Products & Solutions' },
    linkFaq: { zh: '常见问题', en: 'FAQ' },
    linkAbout: { zh: '关于我们', en: 'About Us' },
  },
} as const;

export type Content = typeof content;
