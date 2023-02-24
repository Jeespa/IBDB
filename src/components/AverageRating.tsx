import { useState, useEffect } from "react";
import { db } from "../firebase-config.js";
import { collection, query, onSnapshot, DocumentData, where} from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function AverageRating() {

    const currentBook = useParams().isbn;
    const [totalRating, setTotalRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    let tempRating = 0
    let tempReviews = 0

    const updateAverageRating = () => {
        if(Number.isNaN(totalRating / totalReviews)) {
            setAverageRating(0);
        } else {
            setAverageRating(totalRating / totalReviews);
        }
        
    }

    const getRatings = async () => {
        const q = query(collection(db, "reviews"), where("isbn", "==", currentBook));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                tempRating = tempRating + parseInt(doc.get("rating"));
                tempReviews++;
                setTotalRating(tempRating)
                setTotalReviews(tempReviews)
            });
        })
    }
    
    //call getRatings when app is loaded
    useEffect(() => {
        getRatings().then( () => {
            updateAverageRating();
        })
    });

    return (
        <div>
            <h3>Gjennomsnittlig Vurdering: {averageRating.toString().substring(0, 4)}</h3>
        </div>
    )
}