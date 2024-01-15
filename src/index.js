import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster
  containerStyle={{
    zIndex: 1000000000,
  }}
/>
    <BrowserRouter>
    <Auth0Provider
      domain="dev-ud6rxmbfpockq8yo.us.auth0.com"
      clientId="TOlpNqDW9JYQDq0SbTYTg8SSQA2ArLnX"
      authorizationParams={{
      redirect_uri: window.location.origin
      }}
    >
      <App />
  </Auth0Provider>,
    </BrowserRouter>
  </React.StrictMode>
);
