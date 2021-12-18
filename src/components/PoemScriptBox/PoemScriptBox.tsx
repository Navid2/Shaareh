import { FC, useEffect } from "react";
import PoemVerse from "../PoemVerse/PoemVerse";

import "./PoemScriptBox.css";

interface PoemScriptBoxProps {
	verses: VerseExplanation[];
	activeVerseIndex: number | null;
  isPlaying:boolean
	onVerseClick: (index: number) => void;
}

interface VerseExplanation {
	hemistish_1: string;
	hemistish_2: string;
}


const PoemScriptBox: FC<PoemScriptBoxProps> = (props) => {

  useEffect(()=>{
    if(props.activeVerseIndex!==null){
      const poemContainer = document.querySelector(`.poem-text-container`);
      if(props.activeVerseIndex === 0){
        poemContainer?.scroll(0,-poemContainer.scrollHeight);
      } else if(props.activeVerseIndex === props.verses.length-1){
        poemContainer?.scroll(0,poemContainer.scrollHeight);
      }else{
        // the line below doesn't do the scroll correctly so after some milliseconds we do it again
        document.querySelector(`.poem-verse-${props.activeVerseIndex}`)?.scrollIntoView();
        setTimeout(()=>{
          document.querySelector(`.poem-verse-${props.activeVerseIndex}`)?.scrollIntoView();
        },500)
      }
    }
  },[props.activeVerseIndex,props.verses.length]);

	return (
		<div className="poem-text-wrapper">
			<div className="poem-text-container">
				{props.verses.map((verse, index) => (
					<PoemVerse
						hemistish_1={verse.hemistish_1}
						hemistish_2={verse.hemistish_2}
						index={index}
						onClick={props.onVerseClick}
            isActive={props.activeVerseIndex===index}
            isPlaying={props.isPlaying}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

export default PoemScriptBox;
