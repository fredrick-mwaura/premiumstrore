import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './admin/ThemeProvider.tsx';
import {GoogleOAuthProvider} from '@react-oauth/google'
import {store} from './redux/store';
import {Provider} from 'react-redux';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <GoogleOAuthProvider clientId='google_client_id'> {/*update*/}
          <App/>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);