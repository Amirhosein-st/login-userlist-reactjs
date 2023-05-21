import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App/App';
import { UserProvider } from './Components/UserContext/UserContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();