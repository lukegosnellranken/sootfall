// This is the root layout file for the entire Next.js application.
// It defines the basic structure (like the HTML, head, and body) that all pages in the application will share.
// Think of it as the main template that wraps around all your content.

// This directive marks the component as a Client Component.
// Client Components run on the browser, allowing for interactivity, state management, and lifecycle effects.
"use client";

// We're importing necessary components and hooks here.
import { useState, useEffect } from 'react';
import { Settings } from '../config/Settings.js';
import Nav from '../components/navbar/Nav.js';
import Background from '../components/background/background.js';
import Footer from '../components/footer/Footer.js';
import './layout.scss'

// This is the main layout component that wraps around all other pages.
// It receives `children` as a prop, which represents the content of the current page.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 'loading' state is used to control the visibility of a loading spinner.
  const [loading, setLoading] = useState(true);

  // This 'useEffect' hook runs once when the component mounts.
  // It sets a timer to hide the loading spinner after a short delay (100 milliseconds).
  // This creates a smoother user experience by preventing a flicker if content loads very quickly.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    // The cleanup function clears the timer if the component unmounts before the timer finishes.
    return () => clearTimeout(timer);
  }, []); // The empty dependency array ensures this effect runs only once after the initial render.

  // The component returns the overall HTML structure of the application.
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <title>Sootfall</title>
        {/* This script imports Font Awesome for icons. */}
        <script src="https://kit.fontawesome.com/0ca3f21638.js" crossOrigin="anonymous"></script>
        {/* These links import various Google Fonts to be used throughout the website for styling text. */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Borel"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bilbo"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Qwitcher+Grypen"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Karla"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Serif+4"/>
      </head>
      <body className={loading ? 'loading-active' : ''}>
            <div className={`loader-container ${loading ? '' : 'hidden'}`}>
          <div className="loader"></div>
        </div>
        {/* The 'Settings' component wraps the entire application, providing global settings via React Context. */}
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