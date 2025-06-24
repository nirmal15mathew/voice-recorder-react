import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router';
import { RecordingProvider } from './context/RecordingContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <StrictMode>
    <RecordingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecordingProvider>
  </StrictMode>
  </ThemeProvider>
);
