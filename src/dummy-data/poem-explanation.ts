import { Section } from "../model/Section";
import { Verse } from "../model/Verse";

export const videoSections: Section[] = [
  {
    title: "تیتراژ آغازین",
    description: "",
    time: 0,
    verseIndex: null,
    firstExplanation: false,
    subsections: [
      { title: 'معرفی', time: 8 },
      { title: 'در دیوان حافظ نوروز عید نیست', time: 43 },
      { title: 'عید است و آخر گل و یاران در انتظار، ساقی به روی شاه ببین ماه و می بیار', time: 68 },
      { title: 'امانت دارِ کتاب باشید', time: 101 },
      { title: 'روخوانی شعر', time: 193 },
    ]
  },
  {
    title: "شرح بیت دوم",
    description: "",
    time: 267,
    verseIndex: 1,
    firstExplanation: true,
    subsections: [
      { title: 'جوی رکن آباد', time: 270 },
      { title: 'لوحش الله', time: 309 },
      { title: 'خضر', time: 353 },
    ]
  },
  {
    title: "شرح بیت سوم",
    description: "",
    time: 405,
    verseIndex: 2,
    firstExplanation: true,
    subsections: [
      { title: 'جعفرآباد', time: 412 },
      { title: 'مصلی', time: 449 },
      { title: 'شمال', time: 479 },
    ]
  },
  {
    title: "شرح بیت چهارم",
    description: "",
    time: 519,
    verseIndex: 3,
    firstExplanation: true,
    subsections: [
      { title: 'فارس و شیراز از یورش مغولان در امانند', time: 549 },
      { title: 'هزار پیر و ولی می شناسم اندر وی، که کعبه بر سر ایشان همی کند پرواز', time: 595 },
      { title: 'خوشا سپیده دمی باشد آنکه بینم باز، رسیده بر سرِ الله اکبر شیراز', time: 604 },
    ]
  },
  {
    title: "شرح بیت پنجم",
    description: "",
    time: 628,
    verseIndex: 4,
    firstExplanation: true,
    subsections: [
      { title: 'فند مصری', time: 635 },
      { title: 'کاروانِ شکر از مصر به شیراز آمد، یا مگر یارِ سفر کرده ما بازآمد', time: 674 },
      { title: 'به دل گفتم از مصر قند آورند، برِ دوستان ارمغانی برند', time: 684 },
      { title: 'مرا اگر نباشد بر آن قند دست، سخن های شیرین تر از قند هست', time: 690 },
      { title: 'انفعال', time: 713 },
    ]
  },
  {
    title: "شرح بیت ششم",
    description: "",
    time: 736,
    verseIndex: 5,
    firstExplanation: true,
    subsections: [
      { title: 'لولی', time: 745 },
      { title: 'کولی های چگونه به ایران آمدند؟', time: 758 },
    ]
  },
  {
    title: "شرح بیت هفتم",
    description: "",
    time: 843,
    verseIndex: 6,
    firstExplanation: true,
    subsections: [
      { title: 'معشوقِ مذکر در سنّت شعر فارسی', time: 851 },
      { title: 'به تنگ چشمی آن ترک لشکری نازم، که حمله بر منِ درویشِ یک قبا آورد', time: 922 },
    ]
  },
  {
    title: "شرح بیت هشتم",
    description: "",
    time: 989,
    verseIndex: 7,
    firstExplanation: true,
    subsections: [
      { title: 'خیال', time: 998 },
      { title: 'بیا که پرده گلریزِ هفت خانه چشم، کشیده ایم به تحریر کارگاه خیال', time: 1052 },
      { title: 'نقش خیالِ رویِ تو تا وقت صبحدم، بر کارگاه دیده بی خواب میزدم', time: 1060 },
    ]
  },
  {
    title: "شرح بیت نهم",
    description: "",
    time: 1090,
    verseIndex: 8,
    firstExplanation: true,
  },
  {
    title: "تیتراژ پایانی",
    description: "",
    time: 1129,
    verseIndex: null,
    firstExplanation: true,
  },
];
export const verses: Verse[] = [
  {
    hemistish_1: "خوشا شیراز و وضع بی مثالش",
    hemistish_2: "خداوندا نگه دار از زوالش",
  },
  {
    hemistish_1: "ز رکن‌آبادِ ما صد لوحش‌الله",
    hemistish_2: "که عمرِ خضر می‌بخشد زلالش"
  },
  {
    hemistish_1: "میانِ جعفر‌آباد و مصلی",
    hemistish_2: "عبیرآمیز می‌آید شمالش"
  },
  {
    hemistish_1: "به شیراز آی و فیضِ روحِ قدسی",
    hemistish_2: "بجوی از مردمِ صاحب‌کمالش"
  },
  {
    hemistish_1: "که نامِ قندِ مصری برد آنجا",
    hemistish_2: "که شیرینان ندادند انفعالش"
  },
  {
    hemistish_1: "صبا ز آن لولیِ شنگولِ سرمست",
    hemistish_2: "چه داری آگهی چون است حالش"
  },
  {
    hemistish_1: "گر آن شیرین پسر خونم بریزد",
    hemistish_2: "دلا چون شیرِ مادر کن حلالش"
  },
  {
    hemistish_1: "مکن از خواب بیدارم خدا را",
    hemistish_2: "که دارم خلوتی خوش با خیالش"
  },
  {
    hemistish_1: "چرا حافظ چو می‌ترسیدی از هجر",
    hemistish_2: "نکردی شکرِ ایامِ وصالش"
  },
];

export const poemExplanationData = {
  title: "",
  videoUrl:
    "https://aspb31.cdn.asset.aparat.com/aparat-video/5a19caad1df1902d641dcd1c7627776335906101-720p.mp4?wmsAuthSign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjcxYmUzYjQwNDdjMTUwZDU5Yzc0MDQ5ZmQ2YzUzNTBjIiwiZXhwIjoxNjMzNjA3MDA4LCJpc3MiOiJTYWJhIElkZWEgR1NJRyJ9.BhRd8J-S-mJCc1SiQ7c_MJQapJcBM5FY5zWfcCeg1G8",
  videoSections,
  verses
};
