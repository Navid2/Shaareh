import { FC } from "react";
import PageComponent from "../../components/PageComponent/PageComponent";

import "./CategoriesPage.css";

const CategoriesPage: FC = () => {
  return (
    <PageComponent className="categories-page">
      <div className="categories-wrapper">
        <h1 className="categories-title">دسته بندی ها</h1>
        <ul className="categories-list">
          <li className="categories-list-item">
            <div className="categories-list-item-container">
              <div className="categories-list-item-title-wrapper">
                <i className="fas fa-hashtag" />
                <h3>درس گفتار حافظ شناسی</h3>
              </div>
              <div className="categories-list-item-controls">
                <i className="fas fa-video" />
                <i className="fas fa-arrow-left" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </PageComponent>
  );
};

export default CategoriesPage;
