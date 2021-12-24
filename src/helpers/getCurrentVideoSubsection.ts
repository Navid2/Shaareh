import { Section } from "../model/Section";
import { Subsection } from "../model/Subsection";

// function responsible to receive the index of current subsection
export const getCurrentSubsectionIndex = (
  sections: Section[],
  currentSectionIndex: number,
  secondsPassed: number,
  setCurrentSubsectionIndex: React.Dispatch<React.SetStateAction<number | null>>
): void => {
  // extracting what subsection we are in
  if (sections[currentSectionIndex].subsections && (sections[currentSectionIndex].subsections as Subsection[]).length>0) {
    (sections[currentSectionIndex].subsections as Subsection[]).map(
      (subsection, index) => {
        console.log(`index of current iteration is : ${index}`);

        const isFirstIteration = index === 0;
        const isLastIteration =
          index ===
          (sections[currentSectionIndex].subsections as Subsection[]).length -
            1;

        if (isFirstIteration && secondsPassed < subsection.time) {
          // the first subsection is not yet touched
          // null value should be returned as we are on the main section timespan
          console.log(`we are behind the first subsection`);
          setCurrentSubsectionIndex(-1);
        // } else if (
        //   isFirstIteration &&
        //   sections[currentSectionIndex].subsections?.length == 1 &&
        //   !isLastIteration &&
        //   secondsPassed < sections[currentSectionIndex + 1].time
        // ) {
        //   // if it is the first iteration, and the time is not behind of first subsection, then in the other iterations it will be considered
        //   console.log(`the only subsection is the one active`);
        //   setCurrentSubsectionIndex(0);
        } else if (isLastIteration && secondsPassed > subsection.time) {
          // the last subsection must be returned
          console.log(`we are past the last subsection`);
          setCurrentSubsectionIndex(index);
        } else if (
          secondsPassed >
            (sections[currentSectionIndex].subsections as Subsection[])[
              index - 1
            ].time &&
          secondsPassed < subsection.time
        ) {
          console.log(`we are in ${index - 1} subsection`);
          setCurrentSubsectionIndex(index - 1);
        }
      }
    );
  } else {
    console.log(`subsections? what are they?`)
    setCurrentSubsectionIndex(-1);
  }
};
