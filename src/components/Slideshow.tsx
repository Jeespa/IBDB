import { useState } from "react";
import "./Slideshow.css";

function Slideshow() {
    const slides =[
     //sett inn whatever man vil vise i slideshow
    '../grave_secrets.jpeg',
    '../head_kid.jpg',
    '../the_amber_spyglass.jpg',
    '../snømannen.jpg',
    ]

    const [index, setIndex] = useState(0);
   
    const next = () => {
        if (index === slides.length -1) {
            setIndex(0)  
        } else {
            setIndex(index +1)
        }
        console.log("index: " + index)
    }

    const previous = () => {
        if (index === 0) {
            setIndex(slides.length -1)
        } else {
            setIndex(index -1)
        }
        console.log("index: " + index)
    }
    
    return (
        <div className="slideshow-container">
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