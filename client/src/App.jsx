import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './utils/GlobalState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';

import './assets/style/style.css';
import InitPrompt from './components/InitPrompt';
import { render } from '@testing-library/react';

export default function App() {
  const [page, changePage] = useState(() => {
    if (localStorage.getItem('teamName')) {
      return 'Home';
    } else {
      return 'Init';
    }
  });

  const renderPage = () => {
    switch (page) {
      case 'Init':
        return <InitPrompt page={page} handlePageChange={handlePageChange} />;
      case 'Home':
        return <Home handlePageChange={handlePageChange} />;
      default:
        return <Home handlePageChange={handlePageChange} />;
    }
  };

  const handlePageChange = (page) => changePage(page);

  return (
    <Router>
      <AppProvider>
        <Navbar />
        <main>{renderPage()}</main>
        <Footer />
      </AppProvider>
    </Router>
  );
}

