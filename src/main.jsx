import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './sdk/store/store.js';
import { Provider } from 'react-redux';
import './style/index.scss';
import App from './App.jsx';
const AppRouter=({})=>{
  return(<StrictMode>
    {/* <Provider store={store}> */}
      <HelmetProvider>
        <App />
      </HelmetProvider>
    {/* </Provider> */}
  </StrictMode>);
}
createRoot(document.getElementById('root'))
  .render(<AppRouter/>);