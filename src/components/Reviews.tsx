import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material"

import { useState, useEffect } from "react";
import { db } from "../firebase-config.js";
import { collection, query, onSnapshot, DocumentData, where} from "firebase/firestore";
import { useParams } from "react-router-dom";

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

    //call getBooks when app is loaded
    useEffect(() => {
        getReviews();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Review No.</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Comment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell>{row.rating}</TableCell>
                            <TableCell>{row.text}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
