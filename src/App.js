import React from 'react'
import {Route, Routes, } from 'react-router-dom'
import InfoPage from './pages/InfoPage'
import Home from './pages/Home'
import WatchPage from './pages/WatchPage';
import ResultsPage from './pages/ResultsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="results/:id" element={<ResultsPage />} />
      <Route path="info/:infoId" element={<InfoPage />} />
      <Route path="watch/:watchId" element={<WatchPage />} />
    </Routes>
  );
}

