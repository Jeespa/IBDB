import Slideshow from "../components/Slideshow";
import "./HomePage.css"

function Home() {
  return (
    <div className="topPage">
      <h1>Månedens beste bøker</h1>
      <div>
        <Slideshow />
      </div>
    </div>
  )
}

export default Home;