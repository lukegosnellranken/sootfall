import { Settings } from '../config/Settings';
import Nav from '../components/navbar/Nav';
import Background from '../components/background/background';
import Footer from '../components/footer/Footer';
import './layout.scss';

export const metadata = {
  title: 'Sootfall',
  description: 'Welcome to Sootfall'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  viewportFit: 'cover',
  themeColor: '#000000'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
      <body>
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