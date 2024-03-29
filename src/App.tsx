import { FC } from "react";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import {Route, Switch} from 'react-router-dom';
import PoemExplanation from "./pages/PoemExplanationPage/PoemExplanation";
import ContributorPage from "./pages/ContributorPage/ContributorPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";

const App:FC = (props) => {

  return <Layout>
    <Switch>
      <Route path="/" exact>
        <HomePage/>
      </Route>
      <Route path="/poem-explanation/:poem_id" exact>
        <PoemExplanation/>
      </Route>
      <Route path="/contributor/:contributor_id" exact>
        <ContributorPage/>
      </Route>
      <Route path="/categories" exact>
        <CategoriesPage/>
      </Route>
    </Switch>
  </Layout>
}


export default App;