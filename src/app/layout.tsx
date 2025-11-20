"use client";
import { useState, useEffect } from 'react';
import { Settings } from '../config/Settings.js';
import Nav from '../components/navbar/Nav.js';
import Background from '../components/background/background.js';
import Footer from '../components/footer/Footer.js';
import './layout.scss'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Sootfall</title>
        <script src="https://kit.fontawesome.com/0ca3f21638.js" crossOrigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Borel"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bilbo"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Qwitcher+Grypen"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"/>
      </head>
      <body className={loading ? 'loading-active' : ''}>
        <div className={`loader-container ${loading ? '' : 'hidden'}`}>
          <div className="loader"></div>
        </div>
        <Settings>
          <div id='appDiv'>
            <Nav />
            <Background />
            <div id='div-content-and-footer'>
              {children}
            </div>
            <Footer />
          </div>
        </Settings>
      </body>
    </html>
  );
}