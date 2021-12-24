import { RAW_SECTION_WITH_INDEX, Section, SectionWithIndex } from "../model/Section";



export const getCurrentSection = (sections: Section[], secondsPassed: number) : SectionWithIndex => {
  let currentSection: SectionWithIndex = {
    ...sections[0],
    sectionIndex: 0,
  };

  if (sections.length === 0) {
    return RAW_SECTION_WITH_INDEX;
  }

  sections.map((videoSection, index) => {
    const isFirstIteration = index === 0;
    const isLastIteration = index === sections.length - 1;

    //the case that it is the last iteration and the time passed last section starting point
    if (isLastIteration && secondsPassed > videoSection.time) {
      currentSection = { ...videoSection, sectionIndex: index };
      return videoSection;
    }

    if (isFirstIteration && sections.length === 1) {
      currentSection = { ...videoSection, sectionIndex: 0 };
      return videoSection;
    }
    //the case that first iteration and we are behind the first section
    if (isFirstIteration && secondsPassed < sections[1].time) {
      currentSection = { ...videoSection, sectionIndex: 0 };
      return videoSection;
    }

    //return if it was the first case
    if (isFirstIteration) {
      return videoSection;
    }

    //the case that the time passed is in between of the last iteration section and current iteration section
    if (
      sections[index - 1].time < secondsPassed &&
      secondsPassed < videoSection.time
    ) {
      currentSection = {
        ...sections[index - 1],
        sectionIndex: index - 1,
      };
      return videoSection;
    }

    //decoration for linting tool
    return videoSection;
  });

  return currentSection;
};
