import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar';
import "./App.css";
import Home from "./pages/HomePage"
import AddBook from './pages/AddBookPage'
import AddAuthor from './pages/AddAuthorPage'
import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage";
import ProfilePage from "./pages/ProfilePage";
import BookPage from "./pages/BookPage";

function app() {
  return (
    <Router>
    <div className="pt-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/add-book" element={<AddBook />}/>
        <Route path="/add-author" element={<AddAuthor />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/createuser" element={<CreateUserPage />}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/book/:isbn" element={<BookPage />}/>
      </Routes>
    </div>
    </Router>
  )
}

export default app;
