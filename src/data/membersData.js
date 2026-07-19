import { programLabels, gradeLabel, positionLabels } from '../i18n/translations';

function classDetail(room, programKey) {
  const prog = programLabels[programKey];
  return {
    th: `${gradeLabel.th}${room} | ${prog.th}`,
    en: `${gradeLabel.en}${room} | ${prog.en}`,
    zh: `${gradeLabel.zh}${room} | ${prog.zh}`,
  };
}

function classLabel(room) {
  return {
    th: `${gradeLabel.th}${room}`,
    en: `${gradeLabel.en}${room}`,
    zh: `${gradeLabel.zh}${room}`,
  };
}

function name(th, en = '', zh = '') {
  return { th, en, zh };
}

export const membersData = {
  president: {
    name: name('กัลยาณี โลหะทิน', 'Kanlayanee Lohathin', 'Kanlayanee Lohathin'),
    nickname: name('บิว', 'Biw', 'Biw'),
    image: 'img/president/kanlayanee.jpg',
    highlights: [
      {
        th: 'มีทักษะการพูด',
        en: 'Strong public-speaking skills',
        zh: '具备良好的演讲能力',
      },
      {
        th: 'แก้ไขปัญหาเฉพาะหน้าได้ดี',
        en: 'Handles unexpected situations well',
        zh: '善于应对突发问题',
      },
      {
        th: 'มีทักษะด้านศิลปะ งานประดิษฐ์',
        en: 'Skilled in art and handicrafts',
        zh: '擅长美术与手工制作',
      },
    ],
    class: classLabel('5/1'),
    program: programLabels['sci-math'],
  },
  vice1: {
    name: name('ชินณพัฒน์ นุชอนงค์', 'Chinnapat Nuchanong', 'Chinnapat Nuchanong'),
    nickname: name('เกอร์', 'Ger', 'Ger'),
    image: 'img/manager/chinnapat.jpg',
    highlights: [
      {
        th: 'มีทักษะการเขียนโปรแกรม',
        en: 'Skilled in computer programming',
        zh: '具备编程技能',
      },
      {
        th: 'มีประสบการณ์ทำโปรเจกต์เกี่ยวกับเทคโนโลยีและการเขียนโปรแกรม',
        en: 'Experienced in technology and programming projects',
        zh: '拥有科技与编程项目经验',
      },
      {
        th: 'เรียนรู้เทคโนโลยีใหม่ได้เร็ว และนำไปประยุกต์ใช้ต่อได้',
        en: 'Learns new technologies quickly and applies them effectively',
        zh: '能快速学习新技术并加以应用',
      },
    ],
    class: classLabel('5/1'),
    program: programLabels['sci-math'],
  },
  vice2: {
    name: name('คุณานนต์ ยอดเกวียน', 'Kunanon Yodkwean', 'Kunanon Yodkwean'),
    nickname: name('เซน', 'Zen', 'Zen'),
    image: 'img/manager/kunanon.jpg',
    highlights: [
      {
        th: 'มีความสามารถในการวิเคราะห์และแก้ปัญหาเฉพาะหน้าได้ดี',
        en: 'Strong analytical and on-the-spot problem-solving skills',
        zh: '具备出色的分析与临场解决问题能力',
      },
      {
        th: 'มีความรับผิดชอบและตรงต่อเวลา',
        en: 'Responsible and punctual',
        zh: '富有责任心且守时',
      },
      {
        th: 'เป็นผู้ฟังที่ตั้งใจ',
        en: 'An attentive listener',
        zh: '是一位用心的倾听者',
      },
    ],
    class: classLabel('5/1'),
    program: programLabels['sci-math'],
  },
  secretary: {
    name: name('วริศรา ดรุณกรพงษ์', 'Warisara Darunkornpong', 'Warisara Darunkornpong'),
    nickname: name('เกม', 'Game', 'Game'),
    image: 'img/manager/warisara.jpg',
    highlights: [
      {
        th: 'รับฟังได้ดี',
        en: 'A good listener',
        zh: '善于倾听',
      },
      {
        th: 'สามารถจดจ่ออะไรได้นานๆ',
        en: 'Able to stay focused for long periods',
        zh: '能够长时间保持专注',
      },
      {
        th: 'มีทักษะด้านศิลปะ',
        en: 'Skilled in art',
        zh: '擅长美术',
      },
    ],
    class: classLabel('5/1'),
    program: programLabels['sci-math'],
  },
  'assistant-secretary': {
    name: name('อรอุมา ทะนามศรี', 'Aonuma Thanamsri', 'Aonuma Thanamsri'),
    nickname: name('เป้อ', 'Per', 'Per'),
    image: 'img/manager/aonauma.jpg',
    highlights: [
      {
        th: 'ตรงต่อเวลา',
        en: 'Punctual',
        zh: '守时',
      },
      {
        th: 'มีความรับผิดชอบต่อหน้าที่',
        en: 'Responsible toward her duties',
        zh: '对职责认真负责',
      },
      {
        th: 'เรียนรู้ไวพัฒนาตัวเองอยู่เสมอ',
        en: 'Learns quickly and constantly improves herself',
        zh: '学习能力强，不断自我提升',
      },
    ],
    class: classLabel('5/1'),
    program: programLabels['sci-math'],
  },
  spokesperson: {
    name: name('ฉัตรชัย', 'Chatchai', 'Chatchai'),
    nickname: name('หล่อ', 'Lor', 'Lor'),
    image: 'img/manager/chatchai.jpg',
    highlights: [
      {
        th: 'มีทักษะการพูดและการนำเสนอที่โดดเด่น',
        en: 'Outstanding speaking and presentation skills',
        zh: '具备出色的演讲与表达能力',
      },
      {
        th: 'มีความรู้ทางการเงินพร้อมถ่ายทอดให้กับคนอื่น',
        en: 'Financially knowledgeable and ready to share it with others',
        zh: '具备财务知识并乐于与他人分享',
      },
      {
        th: 'มี mindset แข็งแรง ไม่ยอมแพ้ปัญหา มีวินัยสูง',
        en: 'A strong mindset, never gives up, and highly disciplined',
        zh: '心态坚定、不向困难低头、自律性强',
      },
      {
        th: 'คิดใหญ่ไม่คิดเล็ก มีพลังงานแง่บวกสูง',
        en: 'Thinks big, not small, with abundant positive energy',
        zh: '志存高远，充满正能量',
      },
    ],
    class: classLabel('5/1'),
    program: programLabels['sci-math'],
  },
};

export const executives = [
  {
    id: 'vice2',
    image: 'img/manager/kunanon.jpg',
    name: membersData.vice2.name,
    details: classDetail('5/1', 'sci-math'),
    badge: {
      class: 'vice-badge',
      icon: 'fa-star',
      label: positionLabels['vice-leader'],
    },
  },
  {
    id: 'vice1',
    image: 'img/manager/chinnapat.jpg',
    name: membersData.vice1.name,
    details: classDetail('5/1', 'sci-math'),
    badge: {
      class: 'vice-badge',
      icon: 'fa-star',
      label: positionLabels['vice-leader'],
    },
  },
  {
    id: 'secretary',
    image: 'img/manager/warisara.jpg',
    name: membersData.secretary.name,
    details: classDetail('5/1', 'sci-math'),
    badge: {
      class: 'secretary-badge',
      icon: 'fa-file-alt',
      label: positionLabels['secretary'],
    },
  },
  {
    id: 'assistant-secretary',
    image: 'img/manager/aonauma.jpg',
    name: membersData['assistant-secretary'].name,
    details: classDetail('5/1', 'sci-math'),
    badge: {
      class: 'secretary-badge',
      icon: 'fa-file-alt',
      label: positionLabels['assistant-secretary'],
    },
  },
  {
    id: 'spokesperson',
    image: 'img/manager/chatchai.jpg',
    name: membersData.spokesperson.name,
    details: classDetail('5/1', 'sci-math'),
    badge: {
      class: 'spokesperson-badge',
      icon: 'fa-bullhorn',
      label: positionLabels['spokesperson'],
    },
  },
];

export const committeeMembers = [
  {
    id: 'committee-1',
    image: 'img/member/kamonthat.jpg',
    name: name('กมนทัต กาญจนรัตน์วารี', 'Kamonthat Kanchanaratwari', 'Kamonthat Kanchanaratwari'),
    details: classDetail('5/1', 'sci-math'),
  },
  {
    id: 'committee-2',
    image: 'img/member/danaya.jpg',
    name: name('ดนยา ชวนะศิลป์', 'Danaya Chawanasin', 'Danaya Chawanasin'),
    details: classDetail('5/1', 'sci-math'),
  },
  {
    id: 'committee-3',
    image: 'img/member/pronyanee.jpg',
    name: name('พรญาณี นามทอง', 'Pornyanee Namthong', 'Pornyanee Namthong'),
    details: classDetail('5/2', 'sci-math'),
  },
  {
    id: 'committee-4',
    image: 'img/member/pareploy.jpg',
    name: name('แพรพลอย พิลึก', 'Praeploy Philuek', 'Praeploy Philuek'),
    details: classDetail('5/2', 'sci-math'),
  },
  {
    id: 'committee-5',
    image: 'img/member/nattakrit.jpg',
    name: name('ณัฐกฤษฏิ์ สุขสมกิจ', 'Nattakrit Suksomkit', 'Nattakrit Suksomkit'),
    details: classDetail('5/2', 'sci-math'),
  },
  {
    id: 'committee-6',
    image: 'img/member/nattamont.jpg',
    name: name('ณัฐมน ศุภกาญจน์', 'Nattamon Suphakan', 'Nattamon Suphakan'),
    details: classDetail('5/2', 'sci-math'),
  },
  {
    id: 'committee-7',
    image: 'img/member/phopeang.jpg',
    name: name('พอเพียง เสนีวงศ์ ณ อยุธยา', 'Phophiang Seniwong Na Ayutthaya', 'Phophiang Seniwong Na Ayutthaya'),
    details: classDetail('5/3', 'sci-math'),
  },
  {
    id: 'committee-8',
    image: 'img/member/kanyapron.jpg',
    name: name('กัญญาพร กาญจนวาส', 'Kanyaporn Kanchanawat', 'Kanyaporn Kanchanawat'),
    details: classDetail('5/3', 'sci-math'),
  },
  {
    id: 'committee-9',
    image: 'img/member/puyapron.jpg',
    name: name('ปุณยาพร มดแสง', 'Punyaporn Modsaeng', 'Punyaporn Modsaeng'),
    details: classDetail('5/3', 'sci-math'),
  },
  {
    id: 'committee-10',
    image: 'img/member/suthida.jpg',
    name: name('สุธิดา เพ็ชรเสือ', 'Suthida Phetsuea', 'Suthida Phetsuea'),
    details: classDetail('5/3', 'sci-math'),
  },
  {
    id: 'committee-11',
    image: 'img/member/pronanek.jpg',
    name: name('พรเอนก เจริญดี', 'Pornanek Charoendi', 'Pornanek Charoendi'),
    details: classDetail('5/3', 'sci-math'),
  },
  {
    id: 'committee-12',
    image: 'img/member/nammont.jpg',
    name: name('น้ำมนต์ สาลารัตน์', 'Nammon Salarat', 'Nammon Salarat'),
    details: classDetail('5/3', 'sci-math'),
  },
  {
    id: 'committee-13',
    image: 'img/member/ploypran.jpg',
    name: name('พลอยพรรณเพชร เส็งเอี่ยม', 'Ployphanphet Saeng-iam', 'Ployphanphet Saeng-iam'),
    details: classDetail('5/3', 'sci-math'),
  },
  {
    id: 'committee-14',
    image: 'img/member/panatha.jpg',
    name: name('ปณัฎฎา ซ่อนกลิ่น', 'Panatda Sonklin', 'Panatda Sonklin'),
    details: classDetail('5/6', 'arch'),
  },
  {
    id: 'committee-15',
    image: 'img/member/sirinrat.jpg',
    name: name('ศิรินทร์รัตน์ บุญสุภาพ', 'Sirinrat Bunsuphap', 'Sirinrat Bunsuphap'),
    details: classDetail('5/6', 'arch'),
  },
  {
    id: 'committee-16',
    image: 'img/member/kanyapak.jpg',
    name: name('กัญญาภัค ฤกษ์ทิพย์ศรี', 'Kanyaphak Roekthipsri', 'Kanyaphak Roekthipsri'),
    details: classDetail('5/6', 'arch'),
  },
  {
    id: 'committee-17',
    image: 'img/member/supanthisa.jpg',
    name: name('สุพันธิสา ชูแสง', 'Supanthisa Chusaeng', 'Supanthisa Chusaeng'),
    details: classDetail('5/6', 'arch'),
  },
];

export const policies = [
  {
    icon: 'fa-hands-wash',
    title: {
      th: '1. สภาช่วยเช็ค',
      en: '1. The Council Checks',
      zh: '1. 学生会督查',
    },
    description: {
      th: 'ช่วยดูแลโรงเรียนในเรื่องการทิ้งขยะไม่ถูกที่ โดยจัดเวรสภาวันละ 5 คน แบ่งเป็น 2 ทีม ตรวจตึกใหม่ 2 คน ตึกเก่า 3 คน มีใบกระดาษติดแต่ละห้องเพื่อบอกว่าแต่ละวันพอใช้-ดีมาก โดยจะให้รางวัลห้องที่สะอาดที่สุดภาคเรียนละ1ครั้ง',
      en: 'Helps keep the school clean by tackling improper waste disposal. Five council members are assigned daily, split into two teams \u2014 two for the new building and three for the old building.',
      zh: '协助维护校园整洁，解决乱丢垃圾问题。每天安排5名学生会成员值班，分为两队：2人负责新楼，3人负责旧楼。',
    },
  },
  {
    icon: 'fa-toilet',
    title: {
      th: '2. กลิ่นดี สุขาเด่น',
      en: '2. Fresh & Clean Restrooms',
      zh: '2. 清香整洁的洗手间',
    },
    description: {
      th: 'จัดเวรชายและหญิง ทีมละ 4 คน เพื่อดูแลกลิ่นห้องน้ำ โดยใช้เจลดับกลิ่นโถสัปดาห์ละ 1 ครั้ง โดยนำเงินจากค่าเช่าที่และกำไรที่ขายของได้มาต่อยอดซื้อเจลดับกลิ่นเพื่อให้ห้องน้ำมีกลิ่นหอมสะอาดอยู่เสมอ',
      en: 'Assigns male and female teams of four to look after restroom odors, applying deodorizing gel once a week so the restrooms always smell fresh and clean.',
      zh: '安排男女各4人的小组负责洗手间气味，每周使用一次除味凝胶，让洗手间始终保持清新整洁。',
    },
  },
  {
    icon: 'fa-gamepad',
    title: {
      th: '3. โหวตแล้วลุย คุยกันเอง',
      en: '3. Vote, Then Decide Together',
      zh: '3. 投票后共同决定',
    },
    description: {
      th: 'เปิดโหวตเลือกเกมการแข่งขันเพื่อนำไปจัดการแข่งขัน โดยสามารถเลือกกีฬาหรือเกมส์ที่สนใจในช่วงกีฬาสีมาจัดการแข่งขัน โดยจะนำสามอันกับแรกมาจัดการแข่งขัน ให้นักเรียนมีส่วนร่วมในการตัดสินใจและสนุกกับกิจกรรมที่ตนชื่นชอบ',
      en: 'Opens a vote to choose competition games to be held, letting students take part in the decision and enjoy activities they love.',
      zh: '开放投票选择比赛项目并据此举办比赛，让学生参与决策，享受自己喜爱的活动。',
    },
  },
  {
    icon: 'fa-calendar-day',
    title: {
      th: '4. One Day Game',
      en: '4. One Day Game',
      zh: '4. One Day Game 一日活动',
    },
    description: {
      th: 'ต่อยอดจากนโยบาย "โหวตแล้วลุย คุยกันเอง" โดยรวมกิจกรรมทั้งหมดไว้ในวันเดียว โดยช่วงเช้าจะเป็นการแข่งขันเต้นและเกมเพื่อส่งเสริมการกล้าแสดงออกและสนับสนุนความหลากหลายทางเพศ (LGBTQ+) ส่วนช่วงบ่ายจะเป็นการแข่งขันกีฬา และมีตลาดตั้งอยู่ตามทางเดินตลอดทั้งวัน',
      en: 'Building on the "Vote and Go" policy, this initiative brings all activities together in a single day, The morning features dance and game competitions to encourage self-expression and support the LGBTQ+ community, while the afternoon focuses on sports competitions. A market will also be set up along the walkways throughout the day.',
      zh: '在“投票后共同执行”政策的基础上，本活动将所有项目集中在一天内进行，并分为上午和下午两个时段。上午安排舞蹈与游戏比赛，以鼓励学生表达自我并支持 LGBTQ+ 群体；下午则进行体育比赛。同时，校园走廊沿线全天设有市集。'
    },
  },
  {
    icon: 'fa-comments',
    title: {
      th: '5. สภา Speak',
      en: '5. Council Speak',
      zh: '5. Speak学生会',
    },
    description: {
      th: 'เปิดพื้นที่รับฟังความคิดเห็นและปัญหาผ่าน NGL เว็บไซต์ และ Instagram ของพรรคก้าวใกล้ แบบไม่เปิดเผยตัวตน เพื่อให้ทุกคนกล้าแสดงความเห็น',
      en: 'Opens a space to listen to opinions and problems through NGL, the website, and ก้าวใกล้ Party\u2019s Instagram, anonymously, so everyone feels free to speak up.',
      zh: '通过 NGL、网站以及 ก้าวใกล้ 党的 Instagram 开设匿名渠道，倾听意见与问题，让每个人都敢于表达。',
    },
  },
  {
    icon: 'fa-venus',
    title: {
      th: '6. เพื่อนแท้พลังหญิง',
      en: '6. True Friends \u2014 Girl Power',
      zh: '6. 女生贴心伙伴',
    },
    description: {
      th: 'นำกระดาษกลับมาใช้ประโยชน์อีกครั้ง โดยพับเป็นที่ใส่ผ้าอนามัยและจัดวางในห้องน้ำหญิง เพื่อความสะดวกและความเป็นส่วนตัว',
      en: 'Reuses paper by folding it into sanitary-pad holders placed in the girls\u2019 restrooms, offering convenience and privacy.',
      zh: '将纸张回收再利用，折叠成卫生巾收纳盒放置在女生洗手间，方便又保护隐私。',
    },
  },
  {
    icon: 'fa-chalkboard-teacher',
    title: {
      th: '7. สภาช่วยสอน',
      en: '7. The Council Tutors',
      zh: '7. 学生会助教',
    },
    description: {
      th: 'จัดทำคลิปวิดีโอให้ความรู้เกี่ยวกับเนื้อหาที่เรียน สรุปเนื้อหายากให้เข้าใจง่ายในสไตล์เพื่อนสอนเพื่อน เผยแพร่ผ่านแพลตฟอร์มของพรรค',
      en: 'Produces educational videos on lesson content, summarizing difficult topics in an easy, peer-to-peer style, shared through the party\u2019s platforms.',
      zh: '制作课程内容讲解视频，以同学互教的方式把难点化繁为简，并通过本党平台发布。',
    },
  },
  {
    icon: 'fa-flag',
    title: {
      th: '8. รักชาติไม่ต้องบังคับ แค่ซึมซับเหมือนน้ำ',
      en: '8. Patriotism Absorbed, Not Forced',
      zh: '8. 爱国无需强迫，如水般润物无声',
    },
    description: {
      th: 'รณรงค์เรื่องความรักชาติ โดยให้ความรู้ผ่านช่องทางออนไลน์และบนเวทีเดือนละ 1 ครั้ง เพื่อปลูกฝังความรักชาติในหัวใจของนักเรียน',
      en: 'Promotes patriotism by sharing knowledge online and on stage once a month, nurturing love for the nation in students\u2019 hearts.',
      zh: '通过线上渠道和每月一次的舞台活动宣传爱国教育，将爱国情怀植入学生心中。',
    },
  },
  {
    icon: 'fa-recycle',
    title: {
      th: '9. แยกก่อนทิ้ง เท่กว่าเยอะ',
      en: '9. Sort Before You Toss',
      zh: '9. 先分类再丢弃',
    },
    description: {
      th: 'รณรงค์การทิ้งขยะผ่านโซเชียลของพรรคก้าวใกล้ และสัมภาษณ์น้องๆ เกี่ยวกับการทิ้งขยะ เพื่อสร้างจิตสำนึกในการแยกขยะและรักษาสิ่งแวดล้อม',
      en: 'Promotes proper waste disposal through ก้าวใกล้ Party\u2019s social media and interviews with junior students, raising awareness of waste sorting and environmental care.',
      zh: '通过 ก้าวใกล้ 党的社交媒体宣传垃圾投放，并采访学弟学妹，培养垃圾分类意识、保护环境。',
    },
  },
  {
    icon: 'fa-clipboard-list',
    title: {
      th: '10. สภาช่วยจำ',
      en: '10. The Council Remembers',
      zh: '10. 学生会帮你记',
    },
    description: {
      th: 'จดการบ้านผ่าน Google Sheets เพื่อให้นักเรียนเข้าถึงข้อมูลการบ้านได้ง่ายและสะดวก ไม่พลาดทุกงานที่ได้รับมอบหมาย',
      en: 'Records homework on Google Sheets so students can access assignment information easily and never miss a task.',
      zh: '通过 Google Sheets 记录作业，让学生轻松查阅作业信息，不错过每一项任务。',
    },
  },
  // {
  //   icon: 'fa-umbrella',
  //   title: {
  //     th: '8. กันเปียกเรียก 3 บาท',
  //     en: '8. Stay Dry for 3 Baht',
  //     zh: '8. 3泰铢防雨服务',
  //   },
  //   description: {
  //     th: 'จำหน่ายเสื้อกันฝนราคา 3 บาท (ขายตรงข้ามห้องโสต) โดยกำไรนำเข้าวงเงินสภาเพื่อพัฒนาโรงเรียน ช่วยให้นักเรียนไม่เปียกฝนในราคาประหยัด',
  //     en: 'Sells raincoats for 3 baht (opposite the audio-visual room). The profits go into the council fund for school development, keeping students dry at a low cost.',
  //     zh: '以3泰铢出售雨衣（在视听室对面），利润纳入学生会经费用于学校建设，让学生以实惠的价格免受雨淋。',
  //   },
  // },
  {
    icon: 'fa-laugh-beam',
    title: {
      th: '11. สภาไม่เคร่ง เน้นเสียงหัวเราะ',
      en: '11. A Council Full of Laughter',
      zh: '11. 轻松愉快的学生会',
    },
    description: {
      th: 'สร้างคอนเทนต์สัมภาษณ์สนุกสุดฮาลงในแพลตฟอร์มต่างๆ เพื่อให้นักเรียนได้ผ่อนคลายจากความเครียดในการเรียนด้วยเสียงหัวเราะ',
      en: 'Creates fun, light-hearted interview content across various platforms to help students relax from study stress with laughter.',
      zh: '在各平台制作有趣搞笑的采访内容，让学生在欢笑中缓解学习压力。',
    },
  },
  // {
  //   icon: 'fa-heart',
  //   title: {
  //     th: '11. พูดแทนใจให้สภา',
  //     en: '11. The Council Speaks for You',
  //     zh: '11. 学生会替你发声',
  //   },
  //   description: {
  //     th: 'เปิดพื้นที่รับฟังความคิดเห็นและปัญหาผ่าน NGL เว็บไซต์ และ Instagram ของพรรคก้าวใกล้ แบบไม่เปิดเผยตัวตน เพื่อให้ทุกคนกล้าแสดงความเห็น',
  //     en: 'Opens a space to listen to opinions and problems through NGL, the website, and ก้าวใกล้ Party\u2019s Instagram, anonymously, so everyone feels free to speak up.',
  //     zh: '通过 NGL、网站以及 ก้าวใกล้ 党的 Instagram 开设匿名渠道，倾听意见与问题，让每个人都敢于表达。',
  //   },
  // },
];

export const contents = [
  { image: '/img/content/content1.png', caption: { th: 'แนะนำ', en: 'intruduc', zh: 'ddd' }, featured: true },
  { image: '/img/content/content2.png', caption: { th: '', en: '', zh: '' } },
  { image: '/img/content/content3.png', caption: { th: '', en: '', zh: '' } },
  { image: '/img/content/content4.png', caption: { th: '', en: '', zh: '' } },
  { image: '/img/content/content5.png', caption: { th: '', en: '', zh: '' } },
];

export const navItems = [
  // { href: '#home', labelKey: 'nav.home' },
  { href: '#president', labelKey: 'nav.president' },
  { href: '#management', labelKey: 'nav.management' },
  { href: '#members', labelKey: 'nav.members' },
  { href: '#policy', labelKey: 'nav.policy' },
  // { href: '#content', labelKey: 'nav.content' },
  { href: '#feedback', labelKey: 'nav.feedback' },
];
