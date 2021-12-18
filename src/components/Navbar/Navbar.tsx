import { FC } from "react";
import { NavLink } from "react-router-dom";
import { NavlinkData } from "../MainHeader/MainHeader";

import './Navbar.css';

interface NavbarProps {
  className:string
  addresses:NavlinkData[]
}

const Navbar:FC<NavbarProps> = props => {
  return <nav className={`main-header-navbar ${props.className}`}>
  <ul className="main-header-navlist">
    {props.addresses.map((navlinkData,index)=>
    <li className="main-header-navlink-container" key={index}>
      <NavLink className="main-header-navlink" to={navlinkData.path} exact>{navlinkData.title}</NavLink>
    </li>
    )}
  </ul>
</nav>
}

export default Navbar;