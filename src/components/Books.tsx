import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material"

import { useState, useEffect } from "react";
import { db } from "../firebase-config.js";
import { collection, query, onSnapshot, doc, deleteDoc, DocumentData} from "firebase/firestore";


export default function Books() {

    //our table will display whatever data is in 'rows'
    const [rows, setRows] = useState<DocumentData[]>([]);

    //getBooks functions to attach a listener and fetch book data
    const getBooks = () => {
        const q = query(collection(db, "books"));
        onSnapshot(q, (querySnapshot) => {
            const rows: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
                rows.push(doc.data())
            });
            setRows(rows);
        });
    };

    //call getBooks when app is loaded
    useEffect(() => {
        getBooks();
    }, []);

    const deleteBook = async (title: string) =>{
        await deleteDoc(doc(db, "Bøker", title));
        alert(title+" has been successfully deleted.")
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Delete</TableCell>
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
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.author}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={()=>deleteBook(row.title)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
