import { FC } from "react";
import { gregorianToJalali } from "shamsi-date-converter";

import { useGetPoemsExcerpt } from "../../api/GetPoem";
import PoemVideoExplanationExcerpt from "../../components/PoemVideoExplanationExcerpt/PoemVideoExplanationExcerpt";
import PageComponent from "../../components/PageComponent/PageComponent";

import { cmsURI } from "../..";

import "./HomePage.css";
import HomepageIntroduction from "../../components/HomepageIntroduction/HompepageIntroduction";
import { Helmet } from "react-helmet";
import { useGetHomepage } from "../../api/GetHomepage";
import HomepageCategoryContainer from "../../components/HomepageCategoryContainer/HomepageCategoryContainer";
import HomepageCategoriesContainer from "../../components/HomepageCategoriesContainer/HomepageCategoriesContainer";

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
      {categories && <HomepageCategoriesContainer categories={categories} />}
    </PageComponent>
  );
};

export default HomePage;
