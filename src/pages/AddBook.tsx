import { useState } from "react";
import { TextField, Button, Stack, Paper, Container } from "@mui/material";
import Books from "../components/Books";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { db } from "../firebase-config.js";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase-config";

function AddBook() {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  //const genreList: Array<String> = ["Fiction", "Fantasy", "Horror", "Comic", "Drama", "Crime", "Romance", "Satire"]

  const addBook = async () => {
    if (title !== "" &&  authors != "" && description !== "" && pages !== "" 
      && published !== "" && genre !== "")  {
      try {
        //add book data to collection
        
        const timestamp = firebase.firestore.Timestamp.fromDate(new Date(published)); //Convert published to Timestamp
        const authorArray = authors.split(",");

        await setDoc(doc(db, "books", title), {
          title,
          authors: authorArray,
          description,
          pages,
          published: timestamp,
          genre,
        });
        //clear text fields
        setTitle("");
        setAuthors("");
        setDescription("");
        setPages("");
        setPublished("");
        setGenre("");
        alert("A new book has been added to the library!");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else alert("Missing fields");
  };

  return (
    <div className="App">
      <h1>IKKE LEGG TIL BØKER HER: Firestore Library</h1>
      <p>Det må fikses slik at det matcher med backend først! Søk ødelegges hvis dokumentene blir lagt inn feil. Publiseringsdatoen må være av typen timestamp og det være en array av authors,</p>
      <Container
        component={Paper}
        sx={{ marginBottom: "20px", padding: "20px" }}>
        <h2 style={{ fontSize: "20px" }}>Add New Book</h2>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            label="Author"
            value={authors}
            onChange={(e) => {
            setAuthors(e.target.value);
            }}
          />
          <TextField
            label="Description"
            value={description}
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            label="Pages"
            value={pages}
            type="number"
            onChange={(e) => {
              setPages(e.target.value);
            }}
          />
          <TextField
            label="Genre"
            value={genre}
            type="text"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          />
          <TextField
            label="Published"
            value={published}
            type="date"
            onChange={(e) => {
              setPublished(e.target.value);
            }}
          />
          <Button variant="contained" onClick={addBook}>Add Book</Button>
        </Stack>
      </Container>
      <Books />
    </div>
  );
}

export default AddBook;