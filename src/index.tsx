import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('content') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
          <CssBaseline  />
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
      </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
