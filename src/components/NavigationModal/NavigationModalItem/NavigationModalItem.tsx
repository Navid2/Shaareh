import { FC } from "react";
import { NavLink } from "react-router-dom";

import "./NavigationModalItem.css";

interface NavigationModalItemPropType {
  path:string,
  title:string,
  icon_class:string
}

const NavigationModalItem:FC<NavigationModalItemPropType> = (props)=>{
  return <li className="mobile-navlink-item-container">
  <NavLink to={props.path} className="mobile-navlink">
    <div className="mobile-navlink-item">
      <p className="mobile-navlink-title">{props.title}</p>
      <i className={`mobile-navlink-icon ${props.icon_class}`}></i>
    </div>
  </NavLink>
</li>
}

export default NavigationModalItem;