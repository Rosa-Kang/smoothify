import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'; // Fixed import
import Loading from './common/components/Loading';
import useExchangeToken from './hooks/useExchangeToken';
import { REDIRECT_URI } from './configs/commonConfig';
import OAuthCallback from './OAuthCallback';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(()=> import('./pages/Home/HomePage'));
const SearchPage = React.lazy(()=> import('./pages/SearchPage/SearchPage'));
const SearchWithKeyword = React.lazy(() => import('./pages/SearchWithKeyword/SearchWithKeyword'));
const PlaylistDetailPage = React.lazy(() => import('./pages/PlaylistDetailPage/PlaylistDetailPage'));
const PlaylistPage = React.lazy(() => import('./pages/PlaylistPage/PlaylistPage'));

function App() {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    let codeVerifier = localStorage.getItem('code_verifier');
    const { mutate: exchangeToken } = useExchangeToken();

    console.log('Code:', code);
    console.log('Code Verifier:', codeVerifier);
    console.log('Redirect URI:', REDIRECT_URI);

    useEffect(() => {
      if(code && codeVerifier) {
        exchangeToken({code, codeVerifier});
      }
    }, [code, codeVerifier, exchangeToken]);

  return (
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="/callback" element={<OAuthCallback />} />
        <Route path="/" element={<AppLayout/>}>
            <Route index element={<HomePage/>}  />    
            <Route path="search" element={<SearchPage/>}  />
            <Route path="search/:keyword" element={<SearchWithKeyword/>}  />
            <Route path="playlist/:id" element={<PlaylistDetailPage/>}  /> 
            <Route path="playlist" element={<PlaylistPage/>}  /> 
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;