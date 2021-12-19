import { FC } from "react";
import CategoryList from "../../components/CategoriesList/CategoriesList";
import PageComponent from "../../components/PageComponent/PageComponent";


import "./CategoriesPage.css";

const CategoriesPage: FC = () => {
  return (
    <PageComponent className="categories-page">
      <div className="categories-wrapper">
        <h1 className="categories-title">دسته بندی ها</h1>
        <section className="categories-list-wrapper">
          <CategoryList/>
        </section>
      </div>
    </PageComponent>
  );
};

export default CategoriesPage;
