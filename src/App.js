import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Editor from './pages/Editor';
import Preview from './pages/Preview';
import ArticleList from './pages/ArticleList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/preview/:id" element={<Preview />} />
        <Route path="/articles" element={<ArticleList />} />
      </Routes>
    </div>
  );
}

export default App; 