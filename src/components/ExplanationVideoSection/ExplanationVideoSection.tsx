import { FC } from "react";
import { Subsection } from "../../model/Subsection";
import ExplanationVideoSubsection from "../ExplanationVideoSubsection/ExplanationVideoSubsection";

import "./ExplanationVideoSection.css";

interface ExplanationVideoSectionProps {
	title: string;
	seconds: number;
	index: number;
	hasHour: boolean;
	hasMinute: boolean;
	description?: string;
	subsections?: Subsection[];
	isActive: boolean;
	currentSubsectionIndex: number | null;
	onClick: (time: number) => void;
}

const ExplanationVideoSection: FC<ExplanationVideoSectionProps> = (props) => {
	const { hour, minute, second } = getTimestampDetails(props.seconds);

	const timestamp = `${props.hasHour ? `${addZero(hour)}:` : ""}${
		props.hasMinute ? `${addZero(minute)}:` : ""
	}${addZero(second)}`;

	return (
		<li
			className={`explanation-section${
				props.isActive ? " active" : ""
			} explanation-section-${props.index}`}
		>
			<div
				className="explanation-section-title-container"
				onClick={() => {
					props.onClick(props.seconds);
				}}
			>
				<h4 className="explanation-section-title">{props.title}</h4>
				<p
					className={`explanation-section-timestamp${
						props.isActive && props.currentSubsectionIndex === -1
							? " active"
							: ""
					}`}
				>
					{timestamp}
				</p>
			</div>
			{props.description ? (
				<p className="explanation-section-description">
					{props.description}
				</p>
			) : (
				""
			)}
			<div>
				<ul>
					{props.subsections &&
						props.subsections.map((subsection, index) => (
							<ExplanationVideoSubsection
								title={subsection.title}
								time={subsection.time}
								hasHour={props.hasHour}
								hasMinute={props.hasMinute}
								onClickedSubsection={props.onClick}
								isActive={
									props.currentSubsectionIndex === index
								}
								key={index}
							/>
						))}
				</ul>
			</div>
		</li>
	);
};

export default ExplanationVideoSection;

const addZero: (num: number | null) => string | null = (num) => {
	if (!num && num !== 0) {
		//non-zero null
		return null;
	}
	if (num < 10) {
		return `0${num}`;
	}
	return `${num}`;
};

const getTimestampDetails: (
	seconds: number
) => { second: number; minute: number; hour: number } = (seconds) => {
	let hour = 0,
		minute = 0,
		second = 0;

	const hours = seconds / (60 * 60);

	if (hours >= 1) {
		hour = Math.floor(hours);
	} else {
		//decoration-only
		hour = 0;
	}

	const minutes = seconds / 60 - hour * 60;

	if (minutes >= 1) {
		minute = Math.floor(minutes);
	} else {
		//decoration-only
		minute = 0;
	}

	second = seconds - minute * 60 - hour * 60 * 60;

	return { hour, minute, second };
};
