import { Section } from "./Section";
import { Verse } from "./Verse";

export interface PoemVideoExplanation {
  id:string
  title:string
  videoURL:string
  videoSections:Section[]
  verses:Verse[]
}