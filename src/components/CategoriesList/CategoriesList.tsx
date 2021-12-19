import { FC } from "react";

import speech from "../../assets/photos/speech.jpg";

import CategoriesListItem from "../CategoriesListItem/CategoriesListItem";

const CategoryList: FC = (props) => {
  return (
    <ul className="categories-list">
      <CategoriesListItem title="درس گفتار حافظ شناسی" id="1" coverUrl={speech}/>
    </ul>
  );
};

export default CategoryList;
