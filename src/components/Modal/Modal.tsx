import { FC, useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../Backdrop/Backdrop";

interface ModalPropType {
  exit:()=>void;
}

const Modal: FC<ModalPropType> = (props) => {
  const [backdropExit,setBackdropExit] = useState<boolean>(false);

  const modalCloseHandler = (exit_duration:number) => {
    // close modal
    setBackdropExit(true);
    setTimeout(()=>{
      setBackdropExit(false);
    },exit_duration*1000);
  }

  return createPortal(
    <>
     <Backdrop onClick={modalCloseHandler} exit={false}/>
      <section className="mobile-navigation-modal">
        <div className="modal-controls">
          <div className="mobile-navigation-modal-button close-button">
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