import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAdaS8YX1hk7DetUIODwJcUlgfTtFymp98',
  authDomain: 'where-s-waldo-67cb4.firebaseapp.com',
  projectId: 'where-s-waldo-67cb4',
  storageBucket: 'where-s-waldo-67cb4.appspot.com',
  messagingSenderId: '457253770304',
  appId: '1:457253770304:web:5fdd1eecd9b8e505357ba5',
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
