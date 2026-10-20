import phenocdsImg from "@/assets/winners/phenocds.jpg?w=400;800;1200&format=webp;jpg&as=picture";
import icbigbossImg from "@/assets/winners/icbigboss.jpg?w=400;800;1200&format=webp;jpg&as=picture";
import healthorithmImg from "@/assets/winners/healthorithm.jpg?w=400;800;1200&format=webp;jpg&as=picture";
import tuWeichou from "@/assets/people/tu-weichou.jpg?w=160;320;480&aspect=1:1&format=webp;jpg&as=picture";
import linChin from "@/assets/people/lin-chin.jpg?w=160;320;480&aspect=1:1&format=webp;jpg&as=picture";
import jamesLiu from "@/assets/people/james-liu.jpg?w=160;320;480&aspect=1:1&format=webp;jpg&as=picture";
import leeTayu from "@/assets/people/lee-tayu.jpg?w=160;320;480&aspect=1:1&format=webp;jpg&as=picture";
import tuYukang from "@/assets/people/tu-yukang.jpg?w=160;320;480&aspect=1:1&format=webp;jpg&as=picture";
import wangYanwen from "@/assets/people/wang-yanwen.jpg?w=160;320;480&aspect=1:1&format=webp;jpg&as=picture";
import wangJiahui from "@/assets/people/wang-jiahui.jpg?w=160;320;480&aspect=1:1&format=webp;jpg&as=picture";

export const edition2026 = {
  year: "2026",
  editionLabel: "VII · 7th Edition",
  dates: "April 10–11, 2026",
  titleZh: "台灣站 2026",
  venueName: "NTU College of Public Health",
  venueCity: "Taipei",
  scheduleVenue: "Two days, one venue — NTU College of Public Health, Room 201.",
  globalRegistrantCount: 14708,
  countryCount: 41,
  applicantCount: 137,
  teamCount: 31,
  participantCount: 130,
  mentorCount: 3,
  judgeCount: 5,
  hsilUrl: "https://hsph.harvard.edu/research/health-systems-innovation-lab/work/hsil-hackathon-2026-building-high-value-health-systems-leveraging-ai/",
} as const;

export interface ScheduleItem {
  time: string;
  title: string;
}

export interface ScheduleDay {
  label: string;
  date: string;
  subtitle: string;
  items: ScheduleItem[];
}

export const scheduleDays: ScheduleDay[] = [
  {
    label: "Day One",
    date: "Friday · April 10",
    subtitle: "Opening · Team Formation · Ideation",
    items: [
      { time: "09:00", title: "Opening ceremony" },
      { time: "10:00", title: "HSIL Global Live Session — all hubs connect worldwide" },
      { time: "11:05", title: "Team formation & registration" },
      { time: "13:30", title: "Ideation & mentor consultations" },
      { time: "17:30", title: "Day 1 wrap-up & pitch order lottery" },
    ],
  },
  {
    label: "Day Two",
    date: "Saturday · April 11",
    subtitle: "Refinement · Pitches · Awards",
    items: [
      { time: "09:15", title: "Solution refinement & pitch preparation" },
      { time: "12:00", title: "Slide deadline · judges arrive" },
      { time: "13:10", title: "Team pitches · 31 teams · 3-min pitch + Q&A" },
      { time: "17:30", title: "Awards ceremony — 1st · 2nd · 3rd" },
      { time: "17:50", title: "Closing remarks & group photo" },
    ],
  },
];

export interface Winner {
  place: string;
  label: string;
  labelZh: string;
  team: string;
  desc: string;
  primary: boolean;
  img: ImagetoolsPicture;
}

export const winners: Winner[] = [
  { place: "01", label: "First Place", labelZh: "冠軍", team: "PhenoCDS", desc: "AI-powered clinical decision support for early identification and diagnosis of rare diseases across multiple specialties.", primary: true, img: phenocdsImg },
  { place: "02", label: "Second Place", labelZh: "亞軍", team: "ICBigBoss", desc: "Smart eye health management tool combining visual fatigue tracking, risk assessment, and personalized eye care recommendations.", primary: false, img: icbigbossImg },
  { place: "03", label: "Third Place", labelZh: "季軍", team: "The Healthorithm", desc: "HealthPET — a multimodal AI health companion that improves medication adherence for chronic disease patients.", primary: false, img: healthorithmImg },
];

export interface PressItem {
  outlet: string;
  title: string;
  preview: string;
  url: string;
}

export const pressItems: PressItem[] = [
  {
    outlet: "NTU AI Center (AINTU)",
    title: "全球36國同步連線　台灣首屆健康創新黑客松登場",
    preview: "台大人工智慧中心協辦，Harvard HSIL 第七屆全球健康創新黑客松首度落地台灣，130 位參賽者於台大公衛學院展開兩天密集創新挑戰。",
    url: "https://ai.ntu.edu.tw/%E3%80%90%E6%96%B0%E8%81%9E%E7%A8%BF%E3%80%91%E5%85%A8%E7%90%8336%E5%9C%8B%E5%90%8C%E6%AD%A5%E9%80%A3%E7%B7%9A%E3%80%80%E5%8F%B0%E7%81%A3%E9%A6%96%E5%B1%86%E5%81%A5%E5%BA%B7%E5%89%B5%E6%96%B0%E9%BB%91/",
  },
  {
    outlet: "NTU Sustainability (永續發展)",
    title: "HSIL Hackathon 2026 Taiwan Hub — 健康創新黑客松",
    preview: "台大公衛學院健康經濟與人工智慧實驗室主辦，31 組團隊聚焦 AI 與醫療體系創新，前兩名晉級 Harvard HSIL Global Bootcamp。",
    url: "https://sustainable.ntu.edu.tw/ntu-sdgs/actions/69e9b764dac24/detail",
  },
];

export interface Person {
  name: string;
  en: string;
  title: string;
  org: string;
  img: ImagetoolsPicture;
}

export const mentors: Person[] = [
  { name: "杜維州", en: "Tu Wei-Chou", title: "執行長", org: "臺大人工智慧中心 (AINTU)", img: tuWeichou },
  { name: "林嶔", en: "Lin Chin", title: "AI 核心實驗室主任", org: "國防醫學院", img: linChin },
  { name: "劉致宏", en: "James Liu", title: "健康與醫療產業總監", org: "台灣微軟", img: jamesLiu },
];

export const judges: Person[] = [
  { name: "李達宇", en: "Prof. Lee Tayu", title: "教授", org: "臺大健康政策與管理研究所", img: leeTayu },
  { name: "杜裕康", en: "Prof. Tu Yu-Kang", title: "教授", org: "臺大流行病學與預防醫學研究所", img: tuYukang },
  { name: "王彥雯", en: "Prof. Wang Yan-Wen", title: "教授", org: "臺大健康數據拓析統計研究所", img: wangYanwen },
  { name: "王佳惠", en: "Victoria Wang", title: "協理", org: "台杉投資", img: wangJiahui },
  { name: "劉致宏", en: "James Liu", title: "健康與醫療產業總監", org: "台灣微軟", img: jamesLiu },
];

export interface Organizer {
  name: string;
  nameZh: string;
  role: string;
  initials: string;
  bio: string;
}

export const organizers: Organizer[] = [
  { name: "Arthur C. Kuo", nameZh: "郭爵安", role: "Executive Director · 執行總監", initials: "郭", bio: "[Bio placeholder]" },
  { name: "Prof. John Tayu Lee", nameZh: "李達宇", role: "Faculty Advisor · 指導老師", initials: "李", bio: "[Bio placeholder]" },
  { name: "Dr. Hsiao-Hui Chen", nameZh: "", role: "Advisor · Pre-Event Planning", initials: "陳", bio: "[Bio placeholder]" },
  { name: "May", nameZh: "", role: "Co-Lead", initials: "M", bio: "[Bio placeholder — school, major, background]" },
  { name: "艾庭", nameZh: "", role: "Co-MC · Press", initials: "艾", bio: "[Bio placeholder — school, major, background]" },
  { name: "Jess", nameZh: "", role: "Logistics", initials: "J", bio: "[Bio placeholder — school, major, background]" },
  { name: "Toby", nameZh: "楷博", role: "Photography", initials: "楷", bio: "[Bio placeholder — school, major, background]" },
  { name: "林彥均", nameZh: "", role: "Production · Print", initials: "林", bio: "[Bio placeholder — school, major, background]" },
  { name: "Freddy", nameZh: "", role: "AV · Tech Lead", initials: "F", bio: "[Bio placeholder — school, major, background]" },
  { name: "Benson", nameZh: "", role: "Catering · Registration · Documentation", initials: "B", bio: "[Bio placeholder — school, major, background]" },
  { name: "Andrew", nameZh: "", role: "Video · AV Equipment", initials: "A", bio: "[Bio placeholder — school, major, background]" },
];

export const eventStats = [
  { target: edition2026.teamCount, prefix: "", label: "Competing Teams" },
  { target: edition2026.participantCount, prefix: "", label: "Participants on Site" },
  { target: edition2026.mentorCount, prefix: "", label: "Mentors" },
  { target: edition2026.judgeCount, prefix: "", label: "Judges" },
];

export type PipelineStatus = "Completed" | "In Progress" | "Upcoming";

export interface PipelineStage {
  num: string;
  title: string;
  zh: string;
  dates: string;
  desc: string;
  status: PipelineStatus;
}

export const pipelineStages: PipelineStage[] = [
  { num: "I", title: "Taiwan Hub Hackathon", zh: "台灣站黑客松", dates: edition2026.dates, desc: "Two days of team formation, ideation, and pitching at NTU College of Public Health. PhenoCDS, ICBigBoss, and The Healthorithm placed first through third. The top two advanced into the global program.", status: "Completed" },
  { num: "II", title: "Bootcamp I & II", zh: "全球訓練營", dates: "April 20 – May 15", desc: "Advancing teams joined the virtual Venture Building Program. One hundred ventures were selected from 1,553.", status: "Completed" },
  { num: "III", title: "Venture Building Immersion", zh: "創業深耕", dates: "May 18 – June 12", desc: "Teams continued through the later phases of the program. Twenty were named Demo Day finalists.", status: "Completed" },
  { num: "IV", title: "Demo Day", zh: "Demo Day", dates: "June 16, 2026", desc: "Twenty finalist teams presented to investors and industry partners. PhenoCDS, the Taiwan Hub champion, was one of them.", status: "Completed" },
];
