import { FC } from "react";
import { cmsURI } from "../..";

import speech from "../../assets/photos/speech.jpg";
import { PoemVideoExplanationCategory } from "../../model/PoemVideoExplanationCategories";

import CategoriesListItem from "../CategoriesListItem/CategoriesListItem";

import "./CategoriesList.css";

interface CategoriesListPropType{
  poemVideoExplanationCategories:PoemVideoExplanationCategory[]|null
}

const CategoryList: FC<CategoriesListPropType> = (props) => {
  return (
    <ul className="categories-list">
      {props.poemVideoExplanationCategories?.map((poemVideoExplanationCategory)=>
      <CategoriesListItem title={poemVideoExplanationCategory.title} id={poemVideoExplanationCategory.id} coverUrl={`${cmsURI}${poemVideoExplanationCategory.cover.url}`}/>
      )}
      {/* <CategoriesListItem title={"جام جهان نمای حافظ"} id={"12"} coverUrl={''}/> */}
    </ul>
  );
};

export default CategoryList;
