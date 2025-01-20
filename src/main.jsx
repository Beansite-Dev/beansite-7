import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './style/index.scss';
import App from './App.jsx';
const AppRouter=({})=>{
  return(<StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>);
}
createRoot(document.getElementById('root'))
  .render(<AppRouter/>);