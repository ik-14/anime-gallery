import React from 'react'
import {Route, Routes} from 'react-router-dom'
import AnimePage from './pages/AnimePage'
import Home from './pages/Home'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="anime/:id" element={<AnimePage />} />
    </Routes>
  );
}

