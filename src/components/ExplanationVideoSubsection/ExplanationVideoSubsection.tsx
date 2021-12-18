import { FC } from "react";
import "./ExplanationVideoSubsection.css";

interface ExplanationVideoSubsectionProps {
  title:string,
  time:number,
  hasHour:boolean,
  hasMinute:boolean,
  isActive:boolean,
  onClickedSubsection:(time:number)=>void
}

const ExplanationVideoSubsection:FC<ExplanationVideoSubsectionProps> = props => {
  const { hour, minute, second } = getTimestampDetails(props.time);

  const timestamp = `${props.hasHour ? `${addZero(hour)}:` : ""}${
    props.hasMinute ? `${addZero(minute)}:` : ""
  }${addZero(second)}`;

  return <li className="subsection-container" onClick={()=>{props.onClickedSubsection(props.time)}}>
  <div className="subsection-right">
    <i className={`subsection-pointer-icon fas fa-chevron-left${props.isActive?" active":""}`}/>
    <p className="subsection-name">{props.title}</p>
  </div>
  <div className="subsection-left">
    <p className={`subsection-timestamp${props.isActive?" active":"" }`}>{timestamp}</p>
  </div>
</li>
}

export default ExplanationVideoSubsection;


// adds zero to the numbers under 10
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


// extract hours, minutes and seconds from raw seconds
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
