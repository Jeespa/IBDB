import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs, getDoc, CollectionReference, documentId } from "firebase/firestore";
import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

import { db } from "../firebase-config";
import { Book } from "../schemas/Book";
import "./WishList.css";
import { async } from "@firebase/util";


interface Props {
    userId: string;
}

function WishList(props :Props) {
    const [rows, setRows] = useState<Book[]>([]);


    const navigate = useNavigate();
    // HER
    const onTableCellClick = (documentID: string) => {
        navigate(`/book/${documentID}`);
    };


    useEffect(() => {
        async function getUserData() {
            const userDocRef = doc(db, "users", props.userId); 
            const userDoc = await getDoc(userDocRef);
            
            const userData = userDoc.data() ?? {}; 
            console.log(userData)
            return userData;
        }

        async function getBooksData(){
            const booksRef = collection(db, "books") as CollectionReference<Book>;
            const booksSnapshot = await getDocs<Book>(booksRef);
    
            let booksData = booksSnapshot.docs.map((doc) => {
                const data = doc.data() as Record<string, any>;
                data["documentID"] = doc.id;
                return data as Book;
            })

           
            return booksData;

        }

        async function getWishlist(){
            const userData= await getUserData();
            console.log(userData)
            
            
            const booksData=await getBooksData();
            console.log(booksData)
            

            
            const wishList = userData.Wishlist || [];
            const filteredBooks = booksData.filter((book) => {
                return wishList.includes(book.documentID);
             });
          setRows(filteredBooks);
          console.log(filteredBooks)
          return filteredBooks;

        } getWishlist()
    
    }, [props.userId]);
    


    return (
        <div className="list-container">
            <div style={{ width: "100%", margin: "50 auto" }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 250, maxWidth: 500 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Min ønskeliste</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                // HER
                                <TableRow key={row.documentID}>
                                    <TableCell onClick={() => onTableCellClick(row.documentID)} style={{ cursor: "pointer" }}>
                                        {row.title}, {row.authors?.join(", ")}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
export default WishList;
