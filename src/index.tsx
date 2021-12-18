import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { NavModalContextProvider } from './store/nav-modal-context';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

export const serverURI = 'http://localhost:1337';

const client = new ApolloClient({
  uri: `${serverURI}/graphql`,
  cache: new InMemoryCache()
});


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <NavModalContextProvider>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
    </NavModalContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);