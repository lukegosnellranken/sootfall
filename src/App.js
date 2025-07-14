import React from 'react';
import { Settings } from './Settings';
import Nav from './components/navbar/Nav';
import Background from './components/background/background';
import './App.scss';
import Footer from './components/footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Article from './pages/Article';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Tag from './pages/Tag';
import Author from './pages/Author';
import Authors from './pages/Authors';

function App() {
  return (
    <Settings>
      <div id='appDiv'>
        <Nav/>
        <Background/>
        <div id='div-content-and-footer'>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path='/articles/:id' element={<Article/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/tags/:tagName' element={<Tag/>}/>
            <Route path='/authors/:authorName' element={<Author/>}/>
            <Route path='/authors' element={<Authors/>}/>
            <Route path='/search/:searchName' element={<Search/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Settings>
  );
}

export default App;
