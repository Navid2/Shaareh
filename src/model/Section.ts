import { Subsection } from "./Subsection";

export interface Section {
  title: string;
  description: string;
  time: number;
  verseIndex: null | number;
  firstExplanation: boolean;
  subsections?: Subsection[];
}