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
  const subsections: Subsection[] = sections[currentSectionIndex].subsections as Subsection[];
  if (subsections && subsections.length > 0) {
    subsections.map(
      (subsection, index) => {
        console.log(`index of current iteration is : ${index}`);

        const isFirstIteration = index === 0;
        const isLastIteration =
          index ===
          subsections.length -
          1;

        if (isFirstIteration) {
          // the first subsection is not yet touched
          // null value should be returned as we are on the main section timespan
          if (secondsPassed < subsection.time) {
            console.log(`before the first subsection`);
            setCurrentSubsectionIndex(-1);
          } else {
            if (subsections.length === 1) {
              setCurrentSubsectionIndex(0);
            }
          }
        } else if (isLastIteration && secondsPassed > subsection.time) {
          // the last subsection must be returned
          console.log(`past the last subsection`);
          setCurrentSubsectionIndex(index);
        } else if (
          secondsPassed >
          subsections[
            index - 1
          ].time &&
          secondsPassed < subsection.time
        ) {
          console.log(`in ${index - 1}th subsection`);
          setCurrentSubsectionIndex(index - 1);
        }
      }
    );
  } else {
    console.log(`no subsections (on this specific section).`)
    setCurrentSubsectionIndex(-1);
  }
};
