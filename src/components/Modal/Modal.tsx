import { FC, useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../Backdrop/Backdrop";

import "./Modal.css";

interface ModalPropType {
  exit:(duration:number)=>void;
}

const Modal: FC<ModalPropType> = (props) => {
  const [backdropExit,setBackdropExit] = useState<boolean>(false);

  const modalCloseHandler = (exit_duration:number) => {
    // close modal
    setBackdropExit(true);
    props.exit(exit_duration);
    setTimeout(()=>{
      setBackdropExit(false);
    },exit_duration*1000);
  }

  return createPortal(
    <>
     <Backdrop onClick={modalCloseHandler} exit={backdropExit}/>
      <section className="modal">
        <div className="modal-controls">
          <div className="modal-button close-button" onClick={()=>modalCloseHandler(0.5)}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="modal-body">{props.children}</div>
      </section>
    </>,
    document.getElementById("modal-root") as Element
  );
};

export default Modal;