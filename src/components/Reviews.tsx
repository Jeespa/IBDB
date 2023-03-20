import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material"

import { useState, useEffect } from "react";
import { db } from "../firebase-config.js";
import { collection, query, onSnapshot, DocumentData, where} from "firebase/firestore";
import { useParams } from "react-router-dom";
import '../schemas/Review.ts';
import './Reviews.css'

export default function Reviews() {

    const currentBook = useParams().isbn;

    //our table will display whatever data is in 'rows'
    const [rows, setRows] = useState<DocumentData[]>([]);

    //getBooks functions to attach a listener and fetch book data
    const getReviews = () => {
        const q = query(collection(db, "reviews"), where("book", "==", currentBook));
        onSnapshot(q, (querySnapshot) => {
            const rows: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
                rows.push({ ...doc.data(), id: doc.id })
            });
            setRows(rows);
        });
    };

    function formatDate(dateString: string): string {
        const dateParts = dateString.split(".");
        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const year = parseInt(dateParts[2]);
        
        const monthNames = [
          "Januar",
          "Februar",
          "Mars",
          "April",
          "Mai",
          "Juni",
          "Juli",
          "August",
          "September",
          "Oktober",
          "November",
          "Desember"
        ];
        
        return `${day}. ${monthNames[month - 1]}, ${year}`;
      }

    //call getBooks when app is loaded
    useEffect(() => {
        getReviews();
    }, []);

    return (
        <div>
            {rows.map((rows) => (
                <div key={rows.id} className="reviewcomponent" >
                    <h2 className="rating">{rows.rating}/6</h2>
                        <div className = "reviewcomponent">
                            <div className="userinfo">
                                <p style={{textAlign: 'left'}}> {formatDate(rows.published)} </p>
                                <p style={{textAlign: 'right'}}> Skrevet av </p>
                            </div>
                                <h3>{rows.text}</h3>
                        </div>
                </div>
            ))}
        </div>
    );
};
