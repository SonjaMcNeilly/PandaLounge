import './App.css';
import React from 'react';
import './styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Posts from './pages/Posts.js';
import Register from './pages/Register.js';
import CreatePost from './pages/CreatePost.js';
import Login from './pages/Login.js';
import PostDetail from './pages/PostDetail.js';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Posts/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/create-post" element={<CreatePost/>}></Route>
        <Route path="/post/:postId" element={<PostDetail />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
library.add(fas, far)
