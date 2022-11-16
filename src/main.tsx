import AuthProvider from 'contexts/auth/AuthProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LiffProvider } from 'react-liff';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LiffProvider liffId='1657631189-Q7yGOJmZ'>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LiffProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
