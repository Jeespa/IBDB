import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs, getDoc, CollectionReference } from "firebase/firestore";
import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

import { db } from "../firebase-config";
import { Book } from "../schemas/Book";
import "./WishList.css";

interface WishlistProps {
    userId: string;
}

function WishList(props: WishlistProps) {
    const [rows, setRows] = useState<Book[]>([]);

    const navigate = useNavigate();
    // HER
    const onTableCellClick = (documentID: string) => {
        navigate(`/book/${documentID}`);
    };

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

            const wishBooks = userData.wish || [];
            const filteredBooks = booksData.filter((book) => {
                return wishBooks.includes(book.documentID);
            });
            setRows(filteredBooks);
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
