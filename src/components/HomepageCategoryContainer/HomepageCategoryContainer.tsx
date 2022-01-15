import { FC } from "react";
import { gregorianToJalali } from "shamsi-date-converter";
import { cmsURI } from "../..";
import { PoemVideoExplanationExcerptCategory } from "../../model/PoemVideoExplanationExcerptCategory";
import PoemVideoExplanationExcerpt from "../PoemVideoExplanationExcerpt/PoemVideoExplanationExcerpt";

import "./HomepageCategoryContainer.css";

interface HomepageCategoryContainerPropType {
  category:PoemVideoExplanationExcerptCategory
}

const HomepageCategoryContainer: FC<HomepageCategoryContainerPropType> = (props) => {

  return (
    <div className="category">
      <div className="category-title-container">
        <i className="fas fa-hashtag category-hashtag-icon" />
        <h3 className="category-title">{props.category.title}</h3>
        <i className="fas fa-angle-left category-link-icon" />
      </div>
      <div className="category-posts">
        {props.category.poems.map((post, index) => {
          const date = new Date(post.created_at);
          const shamsiDate = gregorianToJalali(date).join("/");
          return (
            <>
              <PoemVideoExplanationExcerpt
                title={post.title}
                dateText={shamsiDate}
                coverUrl={`${cmsURI}${post.cover.url}`}
                id={post.id}
                key={index}
              />
              <PoemVideoExplanationExcerpt
                title={post.title}
                dateText={shamsiDate}
                coverUrl={`${cmsURI}${post.cover.url}`}
                id={post.id}
                key={index}
              />
              <PoemVideoExplanationExcerpt
                title={post.title}
                dateText={shamsiDate}
                coverUrl={`${cmsURI}${post.cover.url}`}
                id={post.id}
                key={index}
              />
              <PoemVideoExplanationExcerpt
                title={post.title}
                dateText={shamsiDate}
                coverUrl={`${cmsURI}${post.cover.url}`}
                id={post.id}
                key={index}
              />
              <PoemVideoExplanationExcerpt
                title={post.title}
                dateText={shamsiDate}
                coverUrl={`${cmsURI}${post.cover.url}`}
                id={post.id}
                key={index}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default HomepageCategoryContainer;