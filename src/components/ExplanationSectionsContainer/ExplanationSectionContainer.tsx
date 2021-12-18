import { FC, useEffect } from "react";
import { Section } from "../../model/Section";
import ExplanationVideoSection from "../ExplanationVideoSection/ExplanationVideoSection";

import "./ExplanationSectionContainer.css";


interface ExplanationSectionContainerProps {
	videoSections: Section[];
	onTimeChange: (timeInSeconds: number) => void;
	activeSection: number;
	className?: string;
  currentSubsectionIndex:number|null;
}

const ExplanationSectionContainer: FC<ExplanationSectionContainerProps> = (
	props
) => {
	const sortedSections = props.videoSections.sort(
		(videoSection_a, videoSection_b) =>
			videoSection_a.time - videoSection_b.time
	);

	// const lastSectionSubsections = sortedSections[sortedSections.length - 1].subsections as Subsection[];
  // const lastSubsectionSeconds = lastSectionSubsections[lastSectionSubsections.length-1].time;
	// let hasHour = lastSubsectionSeconds > 3600 ,
	// 	hasMinute = lastSubsectionSeconds > 60;

  const hasMinute = true;
  const hasHour = false;

	useEffect(() => {
		document.querySelector(`.explanation-section-${props.activeSection}`)?.scrollIntoView();
		const explanationSectionList = document.querySelector(
			".explanation-section-list"
		);
		setTimeout(() => {
      if(props.activeSection!==0&&props.activeSection!==props.videoSections.length-1){
        explanationSectionList?.scrollBy({left:0,top:-30,behavior:'smooth'});
      }
		}, 300);
	}, [props.activeSection,props.videoSections]);

	return (
		<div
			className={`explanation-section-container ${
				props.className ? props.className : ""
			}`}
		>
			<ul className="explanation-section-list">
				{sortedSections.map((section, index) => {
          const isActive=index === props.activeSection;
          return(
					<ExplanationVideoSection
						seconds={section.time}
						title={section.title}
						description={section.description}
						hasHour={hasHour}
						hasMinute={hasMinute}
						onClick={props.onTimeChange}
						isActive={isActive}
						index={index}
            subsections={section.subsections}
            currentSubsectionIndex={isActive?props.currentSubsectionIndex:-1}
						key={section.time}
					/>
				)})}
			</ul>
		</div>
	);
};

export default ExplanationSectionContainer;
