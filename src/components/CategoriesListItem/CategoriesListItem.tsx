import { FC } from "react";
import { Link } from "react-router-dom";

interface CategoriesListItemPropType {
  title:string,
	id:string,
	coverUrl:string
}

const CategoriesListItem: FC<CategoriesListItemPropType> = (props) => {
  return (
    <li
      className="categories-list-item"
      style={{ backgroundImage: `url(${props.coverUrl})` }}
    >
      <Link to={`/category/${props.id}`} className="categories-list-item-container">
        <div className="categories-list-item-title-wrapper">
          <i className="fas fa-hashtag" />
          <h3>{props.title}</h3>
        </div>
        <div className="categories-list-item-controls">
          <i className="fas fa-video" />
          <i className="fas fa-arrow-left" />
        </div>
      </Link>
    </li>
  );
};

export default CategoriesListItem;
