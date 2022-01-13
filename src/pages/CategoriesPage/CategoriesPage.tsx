import { FC } from "react";
import { useGetCategories } from "../../api/GetCategories";
import CategoryList from "../../components/CategoriesList/CategoriesList";
import PageComponent from "../../components/PageComponent/PageComponent";

import "./CategoriesPage.css";

const CategoriesPage: FC = () => {

  const {loading,error,categories:poemVideoExplanationCategories}=useGetCategories();

  return (
    <PageComponent className="categories-page">
      <div className="categories-wrapper">
        <h1 className="categories-title">دسته بندی ها</h1>
        <section className="categories-list-wrapper">
          <CategoryList poemVideoExplanationCategories={poemVideoExplanationCategories}/>
        </section>
      </div>
    </PageComponent>
  );
};

export default CategoriesPage;
