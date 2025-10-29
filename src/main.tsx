import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="bg-gradient-to-t from-black to-gray-700 w-screen min-h-screen">
      <App />
    </div>
  </StrictMode>
);
