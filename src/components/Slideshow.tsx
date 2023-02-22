import { useState } from "react";
import "./Slideshow.css";

const Slideshow = ({slides}) => {
    const [index, setIndex] = useState(0);
   
    const next = () => {
        if (index === slides.length -1) {
            setIndex(0)  
            console.log("index: " + index);
        } else {
            setIndex(index +1)
            console.log("du er nå på " + index);
        }
    }

    const previous = () => {
        if (index === 0) {
            setIndex(slides.length -1)
            console.log("index: " + index)
        } else {
            setIndex(index -1)
            console.log("du er nå på " + index);
        }
    }
    
    return (
        <div className="slideshow-container">
            <h2>Slideshow for whatever you would like</h2>
            {/* bytt ut img til det man vil ha */}
            <img className="slideshow-objects" src={slides[index]} alt="bok" /> 
            <div className="arrows">
                <button className="previous" onClick={previous}> {"<"} </button>
                <button className="next" onClick={next}> {">"} </button>
            </div>
        </div>
    )
}

export default Slideshow;