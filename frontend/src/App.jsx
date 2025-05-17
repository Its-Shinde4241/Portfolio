import React, { useEffect, useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { ThemeProvider } from './components/ui/theme-provider';
import Home from './pages/Home';
import { useLocation } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Navbar />
        {
          // location.pathname == `/` &&
          <WelcomePage />
        }
        <Home />
      </ThemeProvider>
    </>
  );
}
