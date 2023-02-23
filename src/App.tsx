import React from "react";
import Home from "./pages/HomePage"
import Navbar from './components/Navbar';
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddBook from './components/AddBook'
import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage";
import ProfilePage from "./pages/ProfilePage";
import Book from "./pages/BookPage";

function app() {

  return (
    <Router>
    <div className="pt-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/addbook" element={<AddBook />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/createuser" element={<CreateUserPage />}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/book/:isbn" element={<Book />}/>
      </Routes>
    </div>
    </Router>
  )
}

export default app;
