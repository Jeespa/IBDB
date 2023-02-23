import Slideshow from "../components/Slideshow";
import { auth } from "../firebase-config";
import "./Home.css"

function Home() {
  console.log(auth.currentUser);
  return (
    <>
    <div className="topPage">
      <h1>Home</h1>
      <div>
        <Slideshow />
      </div>
      <div className="sideBar">
        This is a sideBar 
        <br/>
        Kanskje man kan vise kommende bøker her?
        {/* <ComingBooks /> */}
      </div>
    </div>
    <div className="midPage">
      <div>Some midSection stuff
        <br />
        Vise de nyeste bøkene her?
      </div>
      {/* <NewBooks /> */}
    </div>
    </>
  )
}

export default Home;