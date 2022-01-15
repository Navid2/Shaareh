import { FC, useContext, useState } from "react";

import transparent_logo from '../../assets/logo/transparent_logo.png';
import { NavModalContext } from "../../store/nav-modal-context";
import Backdrop from "../Backdrop/Backdrop";
import Navbar from "../Navbar/Navbar";
import NavigationModal from "../NavigationModal/NavigationModal";
import './MainHeader.css';

export interface NavlinkData {
  title:string
  path:string
  icon_class:string
}

const MainHeader:FC = props => {

  const navModalContext = useContext(NavModalContext);
  
  const [backdropExit,setBackdropExit] = useState<boolean>(false);

  const backdropClickHandler = (exit_duration:number) => {
    // close nav modal
    setBackdropExit(true);
    setTimeout(()=>{
      navModalContext.close();
      setBackdropExit(false);
    },exit_duration*1000);
  }

  // nav addresses
  const addresses:NavlinkData[] = [
    {title:'خانه',path:'/',icon_class:'fas fa-home'},
    {title:'دسته بندی ها',path:'/categories',icon_class:'fas fa-list'},
    {title:'تماس',path:'/cantact-us',icon_class:'fas fa-phone'},
  ]

  return <header className="main-header">
    <section>
      <div className="main-header-right">
        {navModalContext.isOpen&&<Backdrop exit={backdropExit} onClick={backdropClickHandler}/>}
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