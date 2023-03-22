import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material"

import { useState, useEffect, Fragment } from "react";
import { db, auth } from "../firebase-config";
import { collection, query, onSnapshot, DocumentData, where, doc, getDoc, deleteDoc} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import '../schemas/Review.ts';
import './Reviews.css'

export default function Reviews(isbn: any) {
    const currentBook = isbn.isbn;
    
    //our table will display whatever data is in 'rows'
    const [rows, setRows] = useState<DocumentData[]>([]);
    const [userId, setUserId] = useState('0');
    const [isAdmin, setIsAdmin] = useState(false);


    //getBooks functions to attach a listener and fetch book data
    const getReviews = () => {
        const q = query(collection(db, "reviews"), where("book", "==", currentBook));
        onSnapshot(q, (querySnapshot) => {
            const rows: DocumentData[] = [];
            querySnapshot.forEach(async (doc) => {
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

      async function CheckIfAdmin(userId: string) {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return (
          docSnap.get("admin")
        );
      };
  
      onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUserId(user.uid);
            setIsAdmin(await CheckIfAdmin(userId));
          }
        });
  
      function showDeleteReview(reviewID: string) {
        if (isAdmin) {
          return (
            <Button color="warning" variant="outlined" onClick={()=>deleteReview(reviewID)}> Delete </Button>
          )
        }
      }

    const deleteReview = async (id: string) =>{
        await deleteDoc(doc(db, "reviews", id));
        alert("The review has been successfully deleted.")
    }

    //call getBooks when app is loaded
    useEffect(() => {
        getReviews();
    }, [isbn]);

    function showUsername(index: number) {
        return 
    }
    return (
        <div>
            {rows.map((rows, index) => (
                <div key={rows.id} className="reviewcomponent" >
                    <h2 className="rating">{rows.rating}/6</h2>
                        <div className = "reviewinfo">
                            <div className="userinfo">
                                <p style={{textAlign: 'left'}}> {formatDate(rows.published)} </p>
                                <p style={{textAlign: 'right'}}> Skrevet av {rows.username}</p>
                            </div>
                        <h3>{rows.text}</h3>
                        {showDeleteReview(rows.id)}
                    </div>
                </div>  
            ))}
        </div>
    );
};
