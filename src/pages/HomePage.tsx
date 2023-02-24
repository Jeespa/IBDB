import Slideshow from "../components/Slideshow";
import { auth } from "../firebase-config";
import "./HomePage.css"

function Home() {
  console.log(auth.currentUser);
  return (
    <>
    <div className="topPage">
      <h1>Månedens beste bøker</h1>
      <div>
        <Slideshow />
      </div>
    </div>
    </>
  )
}

export default Home;