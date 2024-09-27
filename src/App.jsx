// App.js
import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy, useEffect } from 'react';
import Spinner from './components/Spinner'; // Example loading spinner component
import Layout from './components/Layout';
import CreateMovie from './components/CreateMovie';
import Download from './components/Download';


// Lazy load components
const HomePage = lazy(() => import('./components/HomePage'));
const Comman = lazy(() => import('./components/Comman'));
const NotFound = lazy(() => import('./components/NotFound'));
const Genre = lazy(() => import('./components/Genre'));
const MovieDetail = lazy(() => import('./components/MovieDetail'));
const Search = lazy(() => import('./components/Search'));

// Example ScrollToTop component for better UX during route changes
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function App() {
  return (
      <Layout>
        <Suspense fallback={<Spinner />}>
  
          <Routes>
            <Route path='/' element={<HomePage type={"Here you can watch and download Movies and TV series"} />} />
            <Route path='/movies' element={<Comman type={"Movies"} />} />
            <Route path='/tv-series' element={<Comman type={"Tv Shows"} />} />
            <Route path='/download/:title' element={<Download />} />
            <Route path='/documentary' element={<Comman type={"Documentary"} />} />
            <Route path='/movies/:genre' element={<Genre />} />
            <Route path='/search' element={<Search />} />
            <Route path="/admin/create/movie" element={<CreateMovie />} />
            <Route path='/movies/detail/:title' element={<MovieDetail />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
  
  );
}

export default App;
