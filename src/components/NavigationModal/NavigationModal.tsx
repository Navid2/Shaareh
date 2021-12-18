import { FC } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { NavlinkData } from "../MainHeader/MainHeader";

import './NavigationModal.css';
interface NavigationModalProps {
  addresses:NavlinkData[]
}

const NavigationModal:FC<NavigationModalProps> = props => {
  return createPortal(
  <nav className="mobile-navigation-modal">
    <ul>
      {props.addresses.map((navlinkData)=>
      <li>
        <NavLink to={navlinkData.path} >
          {navlinkData.title}
        </NavLink>
      </li>
      )}
    </ul>
  </nav>,document.getElementById('modal-root') as Element)
}

export default NavigationModal;