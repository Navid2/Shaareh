import { FC } from "react";
import { PoemVideoExplanationExcerptCategory } from "../../model/PoemVideoExplanationExcerptCategory";
import HomepageCategoryContainer from "../HomepageCategoryContainer/HomepageCategoryContainer";

import "./HomepageCategoriesContainer.css";

interface HomepageCategoriesContainerPropType {
  categories:PoemVideoExplanationExcerptCategory[]
}

const HomepageCategoriesContainer:FC<HomepageCategoriesContainerPropType> = (props) => {
  return <div className="categories-container">
    {props.categories.map((category) => {
      if (category.poems.length > 0) {
        return (
          <>
            <HomepageCategoryContainer category={category}/>
            <HomepageCategoryContainer category={category}/>
            <HomepageCategoryContainer category={category}/>
            <HomepageCategoryContainer category={category}/>
          </>
        );
      }else{
    return '';
  }
    })}
  </div>
}

export default HomepageCategoriesContainer;