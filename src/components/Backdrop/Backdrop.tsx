import { FC, useRef } from "react";
import { createPortal } from "react-dom";

import './Backdrop.css';

interface BackdropProps {
  onClick:(exit_duration:number)=>void
	exit:boolean
}

const Backdrop: FC<BackdropProps> = (props) => {
	
	const exit_duration = 0.5;
	
	const backdropRef = useRef<HTMLDivElement|null>(null);

	const closeBackdrop = (duration:number) => {
		if(backdropRef.current!=null){
			(backdropRef.current as HTMLDivElement).style.animationName="backdrop_exit";
			(backdropRef.current as HTMLDivElement).style.animationDuration=`${duration}s`;
		}
	}

	if(props.exit){
		closeBackdrop(exit_duration);
	}

	const backdropClickHandler = () => {
		props.onClick(exit_duration);
	}

	return createPortal(
		<div className="backdrop" onClick={backdropClickHandler} ref={backdropRef}></div>,
		document.getElementById("backdrop-root") as Element
	);
};

export default Backdrop;
