import { FC } from "react";
import PageComponent from "../../components/PageComponent/PageComponent";
import './ContributorPage.css';

const ContributorPage:FC = () => {
  return <PageComponent className="contributor-page">
      <div>
        we'll have the avatar, firstname, lastname, educational_status, description and contributions.
      </div>
    </PageComponent>
}

export default ContributorPage;