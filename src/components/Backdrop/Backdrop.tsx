import { FC } from "react";
import { createPortal } from "react-dom";

import './Backdrop.css';

interface BackdropProps {
  onClick?:()=>void
}

const Backdrop: FC<BackdropProps> = (props) => {
	return createPortal(
		<div className="backdrop" onClick={props.onClick}></div>,
		document.getElementById("backdrop-root") as Element
	);
};

export default Backdrop;
