import { FC,createContext, useState } from "react";

export const NavModalContext = createContext({
  isOpen:false,
  open:()=>{},
  close:()=>{}
})

export const NavModalContextProvider:FC = props => {
  const [isOpen,setIsOpen] = useState<boolean>(false);

  const open = () => {
    setIsOpen(true);
  }

  const close = () => {
    setIsOpen(false);
  }

  const value = {
    isOpen,
    open,
    close
  }
  return <NavModalContext.Provider value={value}>{props.children}</NavModalContext.Provider>
}