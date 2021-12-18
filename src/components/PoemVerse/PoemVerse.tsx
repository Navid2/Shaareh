import { FC } from "react";

import './PoemVerse.css';

interface PoemVerseProps {
  hemistish_1:string
  hemistish_2:string
  index:number
  isActive:boolean
  isPlaying:boolean
  onClick:(index:number) => void
}

const PoemVerse:FC<PoemVerseProps> = props => {
  return <div className={`poem-verse poem-verse-${props.index} ${props.isActive?'active':''} ${props.isPlaying?'is-playing':''}` } onClick={()=>{props.onClick(props.index)}}>
  <div className="poem-hemistich poem-hemistich-1">
    <p>{props.hemistish_1}</p>
  </div>
  <div className="poem-hemistich poem-hemistich-2">
    <p>{props.hemistish_2}</p>
  </div>
</div>
}

export default PoemVerse;