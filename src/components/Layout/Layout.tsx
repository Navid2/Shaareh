import { FC } from 'react';
import MainHeader from '../MainHeader/MainHeader';

import './Layout.css';

const Layout:FC = (props) => {
  return (
    <section className="app">
      <MainHeader/>
      {props.children}
    </section>
  );
}

export default Layout;