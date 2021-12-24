import { Subsection } from "./Subsection";

export interface Section {
  title: string;
  description: string;
  time: number;
  verseIndex: null | number;
  firstExplanation: boolean;
  subsections?: Subsection[];
}

export interface SectionWithIndex extends Section {
  sectionIndex: number;
}

export const RAW_SECTION_WITH_INDEX:SectionWithIndex = {
  title: "",
  description: "",
  firstExplanation: false,
  time: 0,
  verseIndex: null,
  subsections: [],
  sectionIndex: 0,
};