import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Crud from './Crud/Crud';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Crud/>
  </React.StrictMode>
);
