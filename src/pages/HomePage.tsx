import Slideshow from "../components/Slideshow";
import AuthorSlideshow from "../components/AuthorSlideshow"
import "./HomePage.css"

function Home() {
  return (
    <div className="topPage">
      <div className="bestBooks">
        <h2>Toppliste bøker</h2>
        <div>
        <Slideshow />
        </div>
      </div>
      
      <div className="bestAuthor">
        <h2>Toppliste forfattere</h2>
        <div>
          <AuthorSlideshow />
        </div>
      </div>
    </div>
  )
}

export default Home;