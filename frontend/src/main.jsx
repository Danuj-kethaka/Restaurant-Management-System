import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Toaster position="top-right" toastOptions={{ duration: 3000,}}/>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
