import {
  FC,
  Fragment,
  Ref,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageComponent from "../../components/PageComponent/PageComponent";
import ExplanationSectionContainer from "../../components/ExplanationSectionsContainer/ExplanationSectionContainer";
import PoemScriptBox from "../../components/PoemScriptBox/PoemScriptBox";
import Video from "../../components/Video/Video";

import "./PoemExplanation.css";
import { Section } from "../../model/Section";

// import { poemExplanationData as poem } from "../../dummy-data/poem-explanation";
import { Subsection } from "../../model/Subsection";
import { useGetPoem } from "../../api/GetPoem";
import { useEffect } from "react";
import { ApolloError } from "@apollo/client";
import { PoemVideoExplanation } from "../../model/PoemVideoExplanation";

const PoemExplanation: FC = (props) => {
  console.log('page rendered');
  const id = useParams<{ poem_id: string }>().poem_id;

  const RAW_SECTION = useMemo<SectionWithIndex>(
    () => ({
      title: "",
      description: "",
      firstExplanation: false,
      time: 0,
      verseIndex: null,
      subsections: [],
      sectionIndex: 0,
    }),
    []
  );

  
	const [loading,setLoading] = useState<boolean>();
	const [error,setError] = useState<ApolloError|undefined>();
	const [poem,setPoem] = useState<PoemVideoExplanation|null>();

  useGetPoem(id,setLoading,setError,setPoem);
  
  const [secondsPassed, setSecondsPassed] = useState<number>(0);
  const [updateTime, setUpdateTime] = useState<boolean>(true);
  const [videoIsTouched, setVideoIsTouched] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [updateIsPlaying, setUpdateIsPlaying] = useState<boolean>(true);
  const [currentSection, setCurrentSection] =
    useState<SectionWithIndex>(RAW_SECTION);


  const videoRef = useRef<HTMLVideoElement>();

  // setting the current section

  interface SectionWithIndex extends Section {
    sectionIndex: number;
  }
  const getCurrentSection = useCallback(
    (sections: Section[], secondsPassed: number) => {
      let currentSection: SectionWithIndex = {
        ...sections[0],
        sectionIndex: 0,
      };

      if (sections.length === 0) {
        return RAW_SECTION;
      }

      sections.map((videoSection, index) => {
        const isFirstIteration = index === 0;
        const isLastIteration = index === sections.length - 1;

        //the case that it is the last iteration and the time passed last section starting point
        if (isLastIteration && secondsPassed > videoSection.time) {
          currentSection = { ...videoSection, sectionIndex: index };
          return videoSection;
        }

        if (isFirstIteration && sections.length === 1) {
          currentSection = { ...videoSection, sectionIndex: 0 };
          return videoSection;
        }
        //the case that first iteration and we are behind the first section
        if (isFirstIteration && secondsPassed < sections[1].time) {
          currentSection = { ...videoSection, sectionIndex: 0 };
          return videoSection;
        }

        //return if it was the first case
        if (isFirstIteration) {
          return videoSection;
        }

        //the case that the time passed is in between of the last iteration section and current iteration section
        if (
          sections[index - 1].time < secondsPassed &&
          secondsPassed < videoSection.time
        ) {
          currentSection = {
            ...sections[index - 1],
            sectionIndex: index - 1,
          };
          return videoSection;
        }

        //decoration for linting tool
        return videoSection;
      });

      return currentSection;
    },
    [RAW_SECTION]
  );

  useEffect(() => {
    if (!error && !loading && poem) {
      setCurrentSection(
        getCurrentSection(
          poem.videoSections ? poem.videoSections : [],
          secondsPassed
        )
      );
    }
  }, [secondsPassed, error, loading, poem, getCurrentSection]);

  const getCurrentSubsectionIndex = useCallback(
    (currentSection: Section, secondsPassed: number): number | null => {
      let currentSubsectionIndex: number | null = null;
      // extracting what subsection we are in
      if (currentSection.subsections) {
        (currentSection?.subsections as Subsection[]).map(
          (subsection, index) => {
            const isFirstIteration = index === 0;
            const isLastIteration =
              index ===
              (currentSection?.subsections as Subsection[]).length - 1;
            if (isFirstIteration && secondsPassed < subsection.time) {
              // the first subsection is not yet touched
              // null value should be returned as we are on the main section timespan
              currentSubsectionIndex = -1;
            } else if (isFirstIteration) {
              // if it is the first iteration, and the time is not behind of first subsection, then in the other iterations it will be considered
            } else if (isLastIteration && secondsPassed > subsection.time) {
              // the last subsection must be returned
              currentSubsectionIndex = index;
            } else if (
              secondsPassed >
                (currentSection.subsections as Subsection[])[index - 1].time &&
              secondsPassed < subsection.time
            ) {
              currentSubsectionIndex = index - 1;
            }
            return null;
          }
        );
      }

      return currentSubsectionIndex;
    },
    []
  );

  const currentSubsectionIndex = getCurrentSubsectionIndex(
    currentSection as Section,
    secondsPassed
  );

  const epsilonTime = 0.3;

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

  const sectionChangeHandler = (time: number) => {
    if (!videoIsTouched) {
      (videoRef.current as HTMLVideoElement).play();
    }
    (videoRef.current as HTMLVideoElement).currentTime = time + epsilonTime;
    setSecondsPassed(time + epsilonTime);
    setUpdateTime(false);
  };

  const getSecondsPassed = () => {
    return (videoRef.current as HTMLVideoElement).currentTime
  }

  const timeUpdateHandler = (seconds: number) => {
    if (updateTime) {
      setSecondsPassed(seconds);
    }
  };

  const playHandler = () => {
    setVideoIsTouched(true);
    if (updateIsPlaying) {
      setIsPlaying(true);
    }
  };

  const pauseHandler = () => {
    if (updateIsPlaying) {
      setIsPlaying(false);
    }
  };

  const videoSeekingHandler = () => {
    setUpdateTime(false);
  };

  const videoSeekedHandler = () => {
    setUpdateIsPlaying(true);
    if (isPlaying) {
      (videoRef.current as HTMLVideoElement).play();
    }
    setUpdateTime(true);
  };

  const [keywordsText, setKeywordsText] = useState<string>("");

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
              onTimeUpdate={timeUpdateHandler}
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
