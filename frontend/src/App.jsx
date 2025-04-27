import React, { useEffect, useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { ThemeProvider } from './components/ui/theme-provider';

export default function App() {

  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background text-foreground">
          {/* <div className='bg-background min-w-screen min-h-screen'> */}
          <WelcomePage />
          <Navbar />
          
          <HomePage />

        </div>
      </ThemeProvider>
    </>
  );
}
