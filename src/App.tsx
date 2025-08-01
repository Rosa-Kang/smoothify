import React, { Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Loading from './common/components/Loading';
import OAuthCallback from './OAuthCallback';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(()=> import('./pages/Home/HomePage'));
const SearchPage = React.lazy(()=> import('./pages/SearchPage/SearchPage'));
const SearchWithKeyword = React.lazy(() => import('./pages/SearchWithKeyword/SearchWithKeyword'));
const PlaylistDetailPage = React.lazy(() => import('./pages/PlaylistDetailPage/PlaylistDetailPage'));
const PlaylistPage = React.lazy(() => import('./pages/PlaylistPage/PlaylistPage'));
const AlbumTrackPage = React.lazy(() => import('./pages/TrackPage/AlbumTrackPage'));
const ArtistTrackPage = React.lazy(() => import('./pages/TrackPage/ArtistTrackPage'));

function App() {
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
            <Route path="albums/:id" element={<AlbumTrackPage/>}  /> 
            <Route path="artists/:id" element={<ArtistTrackPage/>}  /> 
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;