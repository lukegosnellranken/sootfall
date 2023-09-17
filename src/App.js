import React from 'react';
import Nav from './components/navbar/Nav';
import Background from './components/background/background';
import './App.css';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Article from './pages/Article';
import NotFound from './pages/NotFound';
import OurFamily from './pages/OurFamily';

function App() {
  // fetch('http://localhost:1337/api/articles')
  //   .then(res => {return res.json()})
  //   .then(data => {console.log(data)})
  //   .catch(error => {console.log(error)});
  return (
    <div id='appDiv'>
      <Nav/>
      <Background/>
      <div id='div-content-and-footer'>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path='/articles/:id' element={<Article/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/our-family' element={<OurFamily/>}/>
          </Routes>
        </BrowserRouter>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
