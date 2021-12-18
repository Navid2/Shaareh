import { FC } from "react";

import './PageComponent.css';

interface PageComponentProps {
  className?:string
}

const PageComponent:FC<PageComponentProps> = props => {
  return <main className={`page${props.className?` ${props.className}`:''}`}>
    {props.children}
  </main>
}

export default PageComponent;