import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.css';
import './i18n';
import reportWebVitals from './reportWebVitals';
import App from './components/App';
import store from './redux/Store';
import SimpleReactLightbox from 'simple-react-lightbox';


ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback="loading">
    <SimpleReactLightbox>
      <App />
      </SimpleReactLightbox>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
