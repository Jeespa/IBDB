import Home from "./pages/Home"
import Navbar from './components/Navbar';
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AddBook from './pages/AddBook'
import { auth } from "./firebase-config";
import LoginPage from "./LoginPage";

function app() {

  console.log(auth);

  return (
    <Router>
    <div className="pt-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/addbook" element={<AddBook />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </div>
    </Router>
  )
}

export default app;
