import Home from "./pages/Home"
import Navbar from './components/Navbar';
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddBook from './pages/AddBook'
import { auth } from "./firebase-config";
import LoginPage from "./LoginPage";
import Login from './pages/Login'
import BookPage from './pages/BookPage'

function app() {

  return (
    <Router>
    <div className="pt-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/addbook" element={<AddBook />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/bookpage/:bookid" element={<BookPage />}/>
      </Routes>
    </div>
    </Router>
  )
}

export default app;
