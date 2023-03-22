import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs, getDoc, CollectionReference, documentId } from "firebase/firestore";
import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

import { db } from "../firebase-config";
import { Book } from "../schemas/Book";
import "./WishList.css";


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
        async function getBooks() {
            const userDocRef = doc(db, "users", props.userId); //her skal den hente ut verdien
            const userDoc = await getDoc(userDocRef); //denne funksjonen venter, men neste linje kjører, så derfor rekker den ikke å laste inn tror jeg?
            const userData = userDoc.data() ?? {}; //Her vil den heller velge den tomme arrayen {} fordi den ikke rekker å laste inn infoen fra userdocRef

            console.log(userDoc.data)
            const booksRef = collection(db, "books") as CollectionReference<Book>;
            const booksSnapshot = await getDocs<Book>(booksRef);
    
            let booksData = booksSnapshot.docs.map((doc) => {
                const data = doc.data() as Record<string, any>;
                data["documentID"] = doc.id;
                return data as Book;
            })
    
            const wishList = userData.read || [];
            const filteredBooks = booksData.filter((book) => {
                return wishList.includes(book.documentID);
            });
            setRows(filteredBooks);
    
        
            console.log(wishList)
        }

        getBooks();

        
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
