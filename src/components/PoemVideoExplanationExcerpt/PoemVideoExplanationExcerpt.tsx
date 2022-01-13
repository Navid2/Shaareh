import { FC } from "react";
import { Link } from "react-router-dom";
import "./PoemVideoExplanationExcerpt.css";

interface HomeCategoryProps {
  title: string;
  dateText: string;
  coverUrl: string;
  id: string;
}

const PoemVideoExplanationExcerpt: FC<HomeCategoryProps> = (props) => {
  return (
    <Link to={`/poem-explanation/${props.id}`} className="category-post-excerpt">
      <div
        className="category-post-cover"
        style={{
          backgroundImage: `url(${props.coverUrl})`,
        }}
      ></div>
      <div className="category-post-details">
        <h4 className="category-post-title">{props.title}</h4>
        <div className="category-post-date-and-type">
          <p className="category-post-uploadtime">{props.dateText}</p>
					<div className="category-post-icons">
          	<i className="fas fa-map" />
          	<i className="fas fa-video" />
					</div>
        </div>
      </div>
    </Link>
  );
};

export default PoemVideoExplanationExcerpt;
