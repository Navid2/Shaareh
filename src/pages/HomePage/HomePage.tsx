import { FC } from "react";
import { gregorianToJalali } from "shamsi-date-converter";

import { useGetPoemsExcerpt } from "../../api/GetPoem";
import PoemVideoExplanationExcerpt from "../../components/PoemVideoExplanationExcerpt/PoemVideoExplanationExcerpt";
import PageComponent from "../../components/PageComponent/PageComponent";

import { serverURI } from "../..";

import "./HomePage.css";
import HomepageIntroduction from "../../components/HomepageIntroduction/HompepageIntroduction";
import { Helmet } from "react-helmet";
import { useGetHomepage } from "../../api/GetHomepage";

const HomePage: FC = (props) => {
  const { categories } = useGetPoemsExcerpt();

  console.log(categories);

  const { loading, error, homepage } = useGetHomepage();

  let keywords = homepage?.keywords
    .map((metaKeyword) => (metaKeyword.active ? metaKeyword.keyword : null))
    .filter((value) => value !== null);
  const keywords_text = keywords?.join(",");

  return (
    <PageComponent className="home-page">
      <Helmet>
        {!loading && !error && <title>{homepage?.title}</title>}
        {!loading && !error && (
          <meta name="description" content={homepage?.description} />
        )}
        <meta name="keywords" content={keywords_text} />
      </Helmet>
      <HomepageIntroduction />
      <div className="categories-container">
        {categories?.map((category) => {
          if (category.poems.length > 0) {
            return (
              <>
                <div className="category">
                  <div className="category-title-container">
                    <i className="fas fa-hashtag category-hashtag-icon" />
                    <h3 className="category-title">{category.title}</h3>
                    <i className="fas fa-angle-left category-link-icon" />
                  </div>
                  <div className="category-posts">
                    {category.poems.map((post, index) => {
                      const date = new Date(post.created_at);
                      const shamsiDate = gregorianToJalali(date).join("/");
                      return (
                        <>
                          <PoemVideoExplanationExcerpt
                            title={post.title}
                            dateText={shamsiDate}
                            coverUrl={`${serverURI}${post.cover.url}`}
                            id={post.id}
                            key={index}
                          />
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          }else{
			  return '';
		  }
        })}
      </div>
    </PageComponent>
  );
};

export default HomePage;
