import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home.jsx';
import { Login } from './pages/Login/Login.jsx';
import { About } from './pages/About/About.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import { NavBar } from './components/NavBar/NavBar.jsx';
import './app.scss';

export function App() {
  const [token, setToken] = useState(window.sessionStorage.getItem('token'));

  return (
    <Router>
      <main style={{ display: 'flex' }} className="container-main v-100 vh-100">

        {token && <NavBar setToken={setToken} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {token && <Footer/>}  
    </Router>
  );
}
