import { FC } from "react";
import { Link } from "react-router-dom";
import './PoemVideoExplanationExcerpt.css';

interface HomeCategoryProps {
	title: string;
	dateText: string;
  coverUrl:string;
  id:string;
}

const PoemVideoExplanationExcerpt: FC<HomeCategoryProps> = (props) => {
	return (
			<Link
        to={`/poem-explanation/${props.id}`}
				className="category-post"
				style={{
					backgroundImage:`url(${props.coverUrl})`,
				}}
			>
				<div className="category-post-details">
					<h4 className="category-post-title">{props.title}</h4>
					<p className="category-post-uploadtime">{props.dateText}</p>
				</div>
			</Link>
	);
};

export default PoemVideoExplanationExcerpt;