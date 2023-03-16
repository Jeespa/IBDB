import "./WishList.css";
import { SetStateAction, useEffect, useState } from "react";
import { collection, deleteDoc, doc, DocumentData, onSnapshot, query , getDocs, getDoc, CollectionReference, where} from "firebase/firestore";
import { db } from "../firebase-config";

import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

import 'firebase/firestore';
import { Book } from "../schemas/Book";
import BookPage from "../pages/BookPage";



interface Props {
    userId: string;
}

function WishList(props: Props) {
    const [rows,setRows]=useState<Book[]>([]);

    useEffect(() => {
        async function getBooks() {
          const userDocRef = doc(db, "users", props.userId);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data() ?? {};
          const booksRef = collection(db, "books") as CollectionReference<Book>;
          const booksSnapshot = await getDocs<Book>(booksRef);
          
          let booksData = booksSnapshot.docs.map((doc) => {
            const data = doc.data() as Record<string, any>;
            data["documentID"] = doc.id;
            return data as Book;
          });
  
          const readBooks = userData.read || [];
          const filteredBooks = booksData.filter((book) => {
            return readBooks.includes(book.documentID);
          });
          setRows(filteredBooks);
  
      }
  
      getBooks();
    }, [props.userId]);
  


    return(
        <div className="list-container">
            <div style={{width:"100%", margin: "50 auto" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 250, maxWidth:500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Min ønskeliste</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.documentID}>
                        <TableCell href={`/book/${row.documentID}`}>
                        {row.title}, {row.authors?.join(", ")}
                        </TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
            </TableContainer>
            </div>
        </div>
    );
}
export default WishList;


