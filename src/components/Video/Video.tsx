import { BaseSyntheticEvent, forwardRef } from "react";

import "./Video.css";

interface VideoComponent {
	link: string;
	className?: string;
	onPlay: () => void;
	onPause: () => void;
  onSeeking?: () => void;
  onSeeked?:() => void;
	onTimeUpdate: (e: number) => void;
}

const Video = forwardRef<HTMLVideoElement, VideoComponent>((props, ref) => {
	return (
		<section
			className={`aparat-video-container${
				props.className ? ` ${props.className}` : ""
			}`}
		>
			{/* <div className="h_iframe-aparat_embed_frame">
				<span style={{ display: "block", paddingTop: "57%" }}></span>
				<iframe
					src={`https://www.aparat.com/video/video/embed/videohash/${props.link}/vt/frame?${props.time?`t=${props.time}`:``}`}
					title="video"
					allowFullScreen={true}
				></iframe>
			</div> */}
			<video
				ref={ref}
        onSeeked={props.onSeeked?props.onSeeked:undefined}
        onSeeking={props.onSeeking?props.onSeeking:undefined}
				controls
				onTimeUpdate={(e: BaseSyntheticEvent) => {
					props.onTimeUpdate(e.target.currentTime);
				}}
				onPlay={props.onPlay}
				onPause={props.onPause}
				playsInline
			>
				<source src={props.link} type="video/mp4" />
			</video>
		</section>
	);
});

export default Video;
