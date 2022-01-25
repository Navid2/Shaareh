import { FC } from "react";

import "./Image.css";

interface ImagePropType{
  imageURL:string
  edge:"round"|"circle"|"sharp"
  hoverEffect?:boolean
  className?:string
}

const Image:FC<ImagePropType> = (props) => {
  return <div className={`image${props.className?` ${props.className}`:''}${props.hoverEffect?' hover-effect':''} ${props.edge}-edge`} style={{backgroundImage:`url(${props.imageURL})`}}>
  </div>
}

export default Image;