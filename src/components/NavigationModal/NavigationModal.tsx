import { FC } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { NavlinkData } from "../MainHeader/MainHeader";

import './NavigationModal.css';
import NavigationModalItem from "./NavigationModalItem/NavigationModalItem";
interface NavigationModalProps {
  addresses:NavlinkData[]
}

const NavigationModal:FC<NavigationModalProps> = props => {
  return createPortal(
  <nav className="mobile-navigation-modal">
    <div className="mobile-navigation-modal-controls">
      <div className="mobile-navigation-modal-button close-button">
        <i className="fas fa-times"></i>
      </div>
    </div>
    <ul className="mobile-navlink-list">
      {props.addresses.map((navlinkData)=>
      <NavigationModalItem title={navlinkData.title} path={navlinkData.path} icon_class={navlinkData.icon_class} key={navlinkData.title}/>
      )}
    </ul>
  </nav>,document.getElementById('modal-root') as Element)
}

export default NavigationModal;