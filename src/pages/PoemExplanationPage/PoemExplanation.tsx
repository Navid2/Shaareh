// essentials
import { FC, Fragment, Ref, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ApolloError } from "@apollo/client";

// css
import "./PoemExplanation.css";

// components
import PageComponent from "../../components/PageComponent/PageComponent";
import ExplanationSectionContainer from "../../components/ExplanationSectionsContainer/ExplanationSectionContainer";
import PoemScriptBox from "../../components/PoemScriptBox/PoemScriptBox";
import Video from "../../components/Video/Video";

// models
import {
  RAW_SECTION_WITH_INDEX,
  Section,
  SectionWithIndex,
} from "../../model/Section";
import { PoemVideoExplanation } from "../../model/PoemVideoExplanation";

// api hook
import { useGetPoem } from "../../api/GetPoem";

// helpers
import { getCurrentSubsectionIndex } from "../../helpers/getCurrentVideoSubsection";
import { getCurrentSection } from "../../helpers/getCurrentVideoSection";

/*

// dummy poem data
import { poemExplanationData as poem } from "../../dummy-data/poem-explanation";

*/

const PoemExplanation: FC = (props) => {
  console.log("page rerendered");

  const TIME_UPDATE_FREQUENCY_MS = 1000;

  // get seconds passed from video tag
  const getSecondsPassed = () => {
    return (videoRef.current as HTMLVideoElement).currentTime;
  };
  const setSecondsPassed = (timeInSeconds: number) => {
    (videoRef.current as HTMLVideoElement).currentTime = timeInSeconds;
  };

  // get poem id for making request
  const id = useParams<{ poem_id: string }>().poem_id;

  // fetching the poem
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<ApolloError | undefined>();
  const [poem, setPoem] = useState<PoemVideoExplanation | null>();

  useGetPoem(id, setLoading, setError, setPoem);

  // boolean value to determine if time should be updated
  const [updateTime, setUpdateTime] = useState<boolean>(true);

  // boolean value to determine if the video was touched
  const [videoIsTouched, setVideoIsTouched] = useState<boolean>(false);

  // boolean value to represent playing status of video tag
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // boolean value to determine if isPlaying should be updated or not
  const [updateIsPlaying, setUpdateIsPlaying] = useState<boolean>(true);

  // current video section
  const [currentSection, setCurrentSection] = useState<SectionWithIndex>(
    RAW_SECTION_WITH_INDEX
  );

  // current video subsection index
  const [currentSubsectionIndex, setCurrentSubsectionIndex] = useState<
    number | null
  >(null);

  // video reference to provide us a connection to video tag
  const videoRef = useRef<HTMLVideoElement>();

  // set the current section when the poem was first loaded
  useEffect(() => {
    if (!error && !loading && poem && isPlaying) {
      setCurrentSection(
        getCurrentSection(
          poem.videoSections ? poem.videoSections : [],
          getSecondsPassed()
        )
      );
    }
  }, [error, loading, poem, isPlaying]);

  // getting current subsection from seconds passed
  const updaterInterval = useRef<NodeJS.Timeout>(
    setInterval(() => {}, TIME_UPDATE_FREQUENCY_MS)
  );
  useEffect(() => {
    clearInterval(updaterInterval.current);
    if (isPlaying) {
      updaterInterval.current = setInterval(() => {
        // console.log(isPlaying ? "is being played":"is paused");
        if (!loading && !error && poem && isPlaying) {
          const currentSubsectionIndex = getCurrentSubsectionIndex(
            poem.videoSections,
            currentSection.sectionIndex,
            getSecondsPassed(),
            setCurrentSubsectionIndex
          );
          setCurrentSection(() => {
            const currentSection = getCurrentSection(
              poem.videoSections,
              getSecondsPassed()
            );
            console.log(currentSection);
            return currentSection;
          });
        }
      }, TIME_UPDATE_FREQUENCY_MS);
    }
  }, [isPlaying]);

  // safe time to add to the section/subsection starting point to update the current section and subsection correctly
  const epsilonTime = 0.3;

  // this handler gets executed when a verse is clicked and jumps the time to its first explanation section
  const verseClickHandler = (index: number) => {
    if (!videoIsTouched) {
      (videoRef.current as HTMLVideoElement).play();
    }
    const targetVideoSection = poem?.videoSections.find(
      (videoSection) =>
        videoSection.verseIndex === index && videoSection.firstExplanation
    );

    if (targetVideoSection) {
      setUpdateIsPlaying(false);
      (videoRef.current as HTMLVideoElement).pause();
      (videoRef.current as HTMLVideoElement).currentTime =
        (targetVideoSection?.time as number) + epsilonTime;

      setSecondsPassed((targetVideoSection?.time as number) + epsilonTime);
      setUpdateTime(false);
    }
  };

  // this handler gets executed whenever a section gets clicked and jumps the time to section start time
  const sectionChangeHandler = (time: number) => {
    if (!videoIsTouched) {
      (videoRef.current as HTMLVideoElement).play();
    }
    (videoRef.current as HTMLVideoElement).currentTime = time + epsilonTime;
    setSecondsPassed(time + epsilonTime);
    setUpdateTime(false);
  };

  // this handler gets executed whenever video tag play button gets clicked
  const playHandler = () => {
    setVideoIsTouched(true);
    if (updateIsPlaying) {
      console.log("played");
      setIsPlaying(true);
    }
  };

  // this handler gets executed whenever video tag pause button gets clicked
  const pauseHandler = () => {
    if (updateIsPlaying) {
      console.log("paused");
      setIsPlaying(false);
    }
  };

  // this handler gets executed whenever video tag is seeking the time (basically buffering the target time of video)
  const videoSeekingHandler = () => {
    setUpdateTime(false);
  };

  // this handler gets executed whenever video tag seeked and buffered successfully
  const videoSeekedHandler = () => {
    setUpdateIsPlaying(true);
    if (isPlaying) {
      (videoRef.current as HTMLVideoElement).play();
    }
    setUpdateTime(true);
  };

  // keywords text state for seo
  const [keywordsText, setKeywordsText] = useState<string>("");

  // updates (*sets) the keywords text when poem fetched successfully
  useEffect(() => {
    let keywords: string[] = [];
    poem?.videoSections.map((section) => {
      if (!section.firstExplanation) {
        keywords.push(section.title);
      }
      section?.subsections?.map((subsection) => {
        keywords.push(subsection.title);
        return null;
      });
      return null;
    });
    setKeywordsText(keywords.join(","));
  }, [poem]);

  // jsx
  return (
    <PageComponent>
      {poem && (
        <Fragment>
          <Helmet>
            <title>{poem.title}</title>
            <meta
              name="description"
              content={`شرح ویدئویی شعر ${poem.title}`}
            />
            <meta name="keywords" content={keywordsText} />
          </Helmet>
          <div className="explanation-video-and-sections">
            <ExplanationSectionContainer
              className="poem-explanation-sections"
              videoSections={poem.videoSections}
              activeSection={(currentSection as SectionWithIndex).sectionIndex}
              onTimeChange={sectionChangeHandler}
              currentSubsectionIndex={currentSubsectionIndex}
            />
            <Video
              link={poem.videoURL}
              className="poem-explanation-video"
              ref={videoRef as Ref<HTMLVideoElement>}
              onPlay={playHandler}
              onPause={pauseHandler}
              onSeeking={videoSeekingHandler}
              onSeeked={videoSeekedHandler}
            />
          </div>
          <PoemScriptBox
            onVerseClick={verseClickHandler}
            activeVerseIndex={(currentSection as SectionWithIndex).verseIndex}
            verses={poem.verses}
            isPlaying={isPlaying}
          />
        </Fragment>
      )}
    </PageComponent>
  );
};

export default PoemExplanation;
