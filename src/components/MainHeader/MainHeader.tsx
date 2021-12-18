import { FC, useContext } from "react";

import transparent_logo from '../../assets/logo/transparent_logo.png';
import { NavModalContext } from "../../store/nav-modal-context";
import Backdrop from "../Backdrop/Backdrop";
import Navbar from "../Navbar/Navbar";
import NavigationModal from "../NavigationModal/NavigationModal";
import './MainHeader.css';

export interface NavlinkData {
  title:string
  path:string
}

const MainHeader:FC = props => {

  const navModalContext = useContext(NavModalContext);
  
  const backdropClickHandler = () => {
    // close nav modal
    navModalContext.close();
  }

  // nav addresses
  const addresses = [
    {title:'خانه',path:'/'},
    {title:'دسته بندی ها',path:'/categories'},
    {title:'تماس',path:'/cantact-us'},
  ]

  return <header className="main-header">
    <section>
      <div className="main-header-right">
        {navModalContext.isOpen&&<Backdrop onClick={backdropClickHandler}/>}
        {navModalContext.isOpen&&<NavigationModal addresses={addresses}/>}
        <Navbar addresses={addresses} className="main-header-navbar"/>
        <i className="mobile-navbar-trigger fas fa-bars" onClick={navModalContext.open}/>
      </div>
      <div className="main-header-left">
        <img className="main-header-transparent-logo" alt="شارح" src={transparent_logo}/>
      </div>
    </section>
  </header>
}

export default MainHeader;