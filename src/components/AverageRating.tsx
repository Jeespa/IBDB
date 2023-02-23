<<<<<<< HEAD
=======
import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Button, Rating, TextField } from "@mui/material"

>>>>>>> cf60758 (Fikset merge conflicts)
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
<<<<<<< HEAD
        if(Number.isNaN(totalRating / totalReviews)) {
            setAverageRating(0);
        } else {
            setAverageRating(totalRating / totalReviews);
        }
        
=======
        setAverageRating(totalRating / totalReviews);
>>>>>>> cf60758 (Fikset merge conflicts)
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
<<<<<<< HEAD
            <h3>{averageRating.toString().substring(0, 4)}/6</h3>
=======
            <h3>Gjennomsnittlig Vurdering: {averageRating.toString().substring(0, 4)}</h3>
>>>>>>> cf60758 (Fikset merge conflicts)
        </div>
    )
}
