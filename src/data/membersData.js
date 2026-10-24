export const membersData = {
    president: {
        name: 'กัลยาณี โลหะทิน',
        nickname: 'บิว',
        image: 'img/president/kanlayanee.jpg',
        highlights: [
            'มีประสบการณ์เป็นหัวหน้าห้องมา 3 ปีติดต่อกัน',
            'ผ่านการอบรมภาวะผู้นำระดับชาติ',
            'มีวิสัยทัศน์ในการพัฒนาโรงเรียนอย่างชัดเจน'
        ],
        class: 'ม.5/1',
        program: 'วิทย์-คณิต'
    },
    vice1: {
        name: 'ชินณพัฒน์ นุชอนงค์',
        nickname: 'เกอร์',
        image: 'img/manager/chinnapat.jpg',
        highlights: [
            'มีทักษะการเขียนโปรแกรม',
            'มีประสบการณ์ทำโปรเจกต์เทคโนโลยีจริง',
            'เรียนรู้เทคโนโลยีใหม่ได้เร็ว และนำไปประยุกต์ใช้ได้'
        ],
        class: 'ม.5/1',
        program: 'วิทย์-คณิต'
    },
    vice2: {
        name: 'คุณานนต์ ยอดเกวียน',
        nickname: 'เซน',
        image: 'img/manager/kunanon.jpg',
        highlights: [
            'มีความสามารถในการวิเคราะห์และแก้ปัญหาเฉพาะหน้าได้ดี',
            'เคยเป็นหัวหน้าโครงการพัฒนาห้องสมุดโรงเรียน',
            'มีความรับผิดชอบและตรงต่อเวลา'
        ],
        class: 'ม.5/1',
        program: 'วิทย์-คณิต'
    },
    secretary: {
        name: 'วริศรา ดรุณกรพงษ์',
        nickname: 'เกม',
        image: 'img/manager/warisara.jpg',
        highlights: [
            'ชำนาญในการจัดทำเอกสารและบันทึกรายงานการประชุม',
            'มีความละเอียดรอบคอบในการทำงาน',
            'เชี่ยวชาญโปรแกรม Microsoft Office และ Google Workspace'
        ],
        class: 'ม.5/1',
        program: 'วิทย์-คณิต'
    },
    'assistant-secretary': {
        name: 'อรอุมา ทะนามศรี',
        nickname: 'เป้อ',
        image: 'img/manager/aonauma.jpg',
        highlights: [
            'มีความกระตือรือร้นและพร้อมช่วยเหลืองานต่างๆ',
            'มีทักษะการจัดเก็บเอกสารและข้อมูลเป็นระบบ',
            'เรียนรู้ได้เร็วและปรับตัวได้ดี'
        ],
        class: 'ม.5/1',
        program: 'วิทย์-คณิต'
    },
    spokesperson: {
        name: 'ฉัตรชัย',
        nickname: 'หล่อ',
        image: 'img/manager/chatchai.jpg',
        highlights: [
            'มีทักษะการพูดและการนำเสนอที่โดดเด่น',
            'เคยเป็นตัวแทนโรงเรียนในการแข่งขันปราศรัยระดับจังหวัด',
            'สามารถสื่อสารกับคนทุกกลุ่มได้อย่างมีประสิทธิภาพ'
        ],
        class: 'ม.5/1',
        program: 'วิทย์-คณิต'
    }
};

export const executives = [
    {
        id: 'spokesperson',
        image: 'img/manager/chatchai.jpg',
        name: 'ฉัตรชัย',
        details: 'ม.5/1 | วิทย์-คณิต',
        badge: { class: 'spokesperson-badge', icon: 'fa-bullhorn', label: 'โฆษกพรรค' }
    },
    {
        id: 'vice2',
        image: 'img/manager/kunanon.jpg',
        name: 'คุณานนต์ ยอดเกวียน',
        details: 'ม.5/1 | วิทย์-คณิต',
        badge: { class: 'vice-badge', icon: 'fa-star', label: 'รองหัวหน้าพรรค' }
    },
    {
        id: 'vice1',
        image: 'img/manager/chinnapat.jpg',
        name: 'ชินณพัฒน์ นุชอนงค์',
        details: 'ม.5/1 | วิทย์-คณิต',
        badge: { class: 'vice-badge', icon: 'fa-star', label: 'รองหัวหน้าพรรค' }
    },
    {
        id: 'secretary',
        image: 'img/manager/warisara.jpg',
        name: 'วริศรา ดรุณกรพงษ์',
        details: 'ม.5/1 | วิทย์-คณิต',
        badge: { class: 'secretary-badge', icon: 'fa-file-alt', label: 'เลขานุการพรรค' }
    },
    {
        id: 'assistant-secretary',
        image: 'img/manager/aonauma.jpg',
        name: 'อรอุมา ทะนามศรี',
        details: 'ม.5/1 | วิทย์-คณิต',
        badge: { class: 'secretary-badge', icon: 'fa-file-alt', label: 'ผู้ช่วยเลขานุการ' }
    }
];

export const committeeMembers = [
  { id: 'committee-1',  image: 'img/member/kamonthat.jpg',  name: 'กมนทัต กาญจนรัตน์วารี', details: 'ม.5/1 | วิทย์-คณิต'},
  { id: 'committee-2',  image: 'img/member/danaya.jpg',  name: 'ดนยา ชวนะศิลป์', details: 'ม.5/1 | วิทย์-คณิต' },
  { id: 'committee-3', image: 'img/member/pronyanee.jpg', name: 'พรญาณี นามทอง', details: 'ม.5/2 | วิทย์-คณิต' },
  { id: 'committee-4',  image: 'img/member/pareploy.jpg',  name: 'แพรพลอย พิลึก', details: 'ม.5/2 | วิทย์-คณิต' },
  { id: 'committee-5', image: 'img/member/nattakrit.jpg', name: 'ณัฐกฤษฏิ์ สุขสมกิจ', details: 'ม.5/2 | วิทย์-คณิต' },
  { id: 'committee-6', image: 'img/member/nattamont.jpg', name: 'ณัฐมน ศุภกาญจน์', details: 'ม.5/2 | วิทย์-คณิต' },
  { id: 'committee-7',  image: 'img/member/phopeang.jpg',  name: 'พอเพียง เสนีวงศ์ ณ อยุธยา', details: 'ม.5/3 | วิทย์-คณิต' },
  { id: 'committee-8',  image: 'img/member/kanyapron.jpg',  name: 'กัญญาพร กาญจนวาส', details: 'ม.5/3 | วิทย์-คณิต' },
  { id: 'committee-9',  image: 'img/member/tantawan.jpg',  name: 'ทานตะวัน เวียงวิเศษ', details: 'ม.5/3 | วิทย์-คณิต' },
  { id: 'committee-10',  image: 'img/member/puyapron.jpg',  name: 'ปุณยาพร มดแสง', details: 'ม.5/3 | วิทย์-คณิต' },
  { id: 'committee-11',  image: 'img/member/suthida.jpg',  name: 'สุธิดา เพ็ชรเสือ', details: 'ม.5/3 | วิทย์-คณิต' },
  { id: 'committee-12', image: 'img/member/pronanek.jpg', name: 'พรเอนก เจริญดี', details: 'ม.5/3 | วิทย์-คณิต' },
  { id: 'committee-13', image: 'img/member/nammont.jpg', name: 'น้ำมนต์ สาลารัตน์', details: 'ม.5/3 | วิทย์-คณิต' },
  { id: 'committee-14',  image: 'img/member/panatha.jpg',  name: 'ปณัฎฎา ซ่อนกลิ่น', details: 'ม.5/6 | สถาปัตย์' },
  { id: 'committee-15',  image: 'img/member/sirinrat.jpg',  name: 'ศิรินทร์รัตน์ บุญสุภาพ', details: 'ม.5/6 | สถาปัตย์' },
  { id: 'committee-16',  image: 'img/member/kanyapak.jpg',  name: 'กัญญาภัค ฤกษ์ทิพย์ศร', details: 'ม.5/6 | สถาปัตย์' },
  { id: 'committee-17', image: 'img/member/supanthisa.jpg', name: 'สุพันธิสา ชูแสง', details: 'ม.5/6 | สถาปัตย์' },
];

export const policies = [
    { icon: 'fa-hands-wash', title: '1. สภาช่วยเช็ค', description: 'การช่วยดูแลโรงเรียนในเรื่องของการทิ้งขยะไม่ถูกที่ โดยจัดเวรสภาวันละ 5 คน แบ่งทีมเป็น 2 ทีม ตรวจตึกใหม่ 2 คน ตึกเก่า 3 คน เพื่อรักษาความสะอาดของโรงเรียน' },
    { icon: 'fa-comments', title: '2. สภา Speak Out', description: 'รับฟังปัญหาผ่าน NGL และ QR Code ทั่วอาคารเรียน ให้ทุกคนส่งความคิดเห็นได้แบบนิรนาม เพื่อนำเสียงของนักเรียนไปแก้ไขในสภาโดยไม่เปิดเผยตัวตน' },
    { icon: 'fa-toilet', title: '3. กลิ่นดี สุขาเด่น', description: 'จัดเวรชายละหญิง ทีมละ 4 คน เพื่อดูแลกลิ่นห้องน้ำโดยใช้เจลดับกลิ่นโถท้วมสัปดาห์ละ 1 ครั้ง เพื่อให้ห้องน้ำมีกลิ่นหอมสะอาดอยู่เสมอ' },
    { icon: 'fa-venus', title: '4. เพื่อนแท้พลังหญิง', description: 'ใช้กระดาษให้กลับมามีประโยชน์อีกครั้ง นำมาพับเพื่อเป็นที่ใส่ผ้าอนามัยและจัดวางในห้องน้ำผู้หญิง เพื่อความสะดวกและความเป็นส่วนตัว' },
    { icon: 'fa-recycle', title: '5. แยกก่อนทิ้งเท่กว่าเยอะ', description: 'รณรงค์การทิ้งขยะผ่านโซเชียลพรรคก้าวใกล้และสัมภาษณ์น้องๆเกี่ยวกับการทิ้งขยะ เพื่อสร้างจิตสำนึกในการแยกขยะและรักษาสิ่งแวดล้อม' },
    { icon: 'fa-clipboard-list', title: '6. สภาช่วยจำ', description: 'จดการบ้านผ่านแอป Google Sheets เพื่อให้นักเรียนสามารถเข้าถึงข้อมูลการบ้านได้ง่ายและสะดวก ไม่พลาดทุกงานที่มอบหมาย' },
    { icon: 'fa-flag', title: '7. รักชาติไม่ต้องบังคับ แค่ซึมซับเหมือนน้ำ', description: 'รณรงค์เกี่ยวกับการรักชาติโดยให้ความรู้ผ่านช่องทางออนไลน์และบนเวทีเดือนละ 1 ครั้ง เพื่อปลูกฝังความรักชาติในหัวใจของนักเรียน' },
    { icon: 'fa-umbrella', title: '8. กันเปียกเรียก 3 บาท', description: 'จำหน่ายเสื้อกันฝนราคา 3 บาท (ขายตรงข้ามห้องโสต) โดยกำไรจะนำเข้าวงเงินสภาเพื่อพัฒนาโรงเรียน ช่วยให้นักเรียนไม่เปียกฝนในราคาประหยัด' },
    { icon: 'fa-gamepad', title: '9. โหวตแล้วลุย คุยกันเอง', description: 'เปิดโหวตการแข่งขันเลือกเกมเพื่อนำไปจัดการแข่งขัน ให้นักเรียนมีส่วนร่วมในการตัดสินใจและสนุกกับกิจกรรมที่ตัวเองชื่นชอบ' },
    { icon: 'fa-laugh-beam', title: '10. สภาไม่เคร่ง เน้นเสียงหัวเราะ', description: 'สร้างคอนเทนต์สัมภาษณ์ที่สนุกสุดฮาลงในแพลตฟอร์มต่างๆ เพื่อให้นักเรียนได้ผ่อนคลายจากความเครียดในการเรียนด้วยเสียงหัวเราะ' },
    { icon: 'fa-chalkboard-teacher', title: '11. สภาช่วยสอน', description: 'จัดทำคลิปวิดีโอให้ความรู้เกี่ยวกับเนื้อหาที่เรียน สรุปเนื้อหายากให้เข้าใจง่ายในสไตล์เพื่อนสอนเพื่อน เผยแพร่ผ่านแพลตฟอร์มของพรรค' },
    { icon: 'fa-heart', title: '12. พูดแทนใจให้สภา', description: 'เปิดพื้นที่รับฟังความคิดเห็นและปัญหาผ่าน NGL เว็บไซต์ และ Instagram พรรคก้าวใกล้ แบบไม่เปิดเผยตัวตน เพื่อให้ทุกคนกล้าแสดงความเห็น' }
];

export const contents = [
    { image: 'img/content1.jpg', caption: 'แนะนำสมาชิกพรรคก้าวใกล้', featured: true },
    { image: 'img/content2.jpg', caption: 'นโยบายเด็ด ที่นักเรียนต้องรู้' },
    { image: 'img/content3.jpg', caption: 'สภาไม่เคร่ง เน้นเสียงหัวเราะ' },
    { image: 'img/content4.jpg', caption: 'ก้าวใกล้ ไม่ก้าวคนเดียว' },
    { image: 'img/content5.jpg', caption: 'Behind the scenes' }
];

export const navItems = [
    // { href: '#home', label: 'หน้าหลัก' },
    { href: '#president', label: 'หัวหน้าพรรค' },
    { href: '#management', label: 'คณะบริหารพรรค' },
    { href: '#members', label: 'คณะกรรมการพรรค' },
    { href: '#policy', label: 'นโยบาย' },
    { href: '#content', label: 'คอนเทนต์พรรค' },
    { href: '#votesection', label: 'โหวตนโยบาย' },
    { href: '#feedback', label: 'ส่งปัญหา/ข้อเสนอแนะ' }
];
