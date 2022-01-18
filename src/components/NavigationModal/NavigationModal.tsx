import { FC } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { NavlinkData } from "../MainHeader/MainHeader";
import Modal from "../Modal/Modal";

import './NavigationModal.css';
import NavigationModalItem from "./NavigationModalItem/NavigationModalItem";
interface NavigationModalProps {
  addresses:NavlinkData[];
  onClose:(duration:number)=>void
}

const NavigationModal:FC<NavigationModalProps> = props => {
  return createPortal(
  <Modal exit={props.onClose}>
      {props.addresses.map((navlinkData)=>
      <NavigationModalItem title={navlinkData.title} path={navlinkData.path} icon_class={navlinkData.icon_class} key={navlinkData.title}/>
      )}
  </Modal>,document.getElementById('modal-root') as Element)
}

export default NavigationModal;