import { useState } from "react";
import { TextField, Button, Stack, Paper, Container } from "@mui/material";
import Books from "./Books";

import { db } from "../firebase-config.js";
import { doc, setDoc } from "firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function AddBook() {
  const [isbn, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const genreList: Array<String> = ["Fiction", "Fantasy", "Horror", "Comic", "Drama", "Crime", "Romance", "Satire"]

  const addBook = async () => {
    if (isbn !== "" && title !== "" && authors !== "" && description !== "" && pages !== "" 
      && published !== "" && genre !== "")  {
      try {
        //add book data to collection
        const timestamp = firebase.firestore.Timestamp.fromDate(new Date(published));
        await setDoc(doc(db, "books", isbn), {
          title,
          authors: authors.split(","),
          description,
          pages,
          published: timestamp,
          genre: genre.split(","),
        });
        //clear text fields
        setTitle("");
        setAuthor("");
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
    <div>
      <h1>Legg til bøker</h1>
      <Container
        component={Paper}
        sx={{ marginBottom: "20px", padding: "20px" }}>
        <Stack direction="row" spacing={2.5}>
          <TextField
            label="ISBN"
            value={isbn}
            onChange={(e) => {
              setISBN(e.target.value);
            }}
          />
          <TextField
            label="Tittel"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            label="Forfattere"
            value={authors}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <TextField
            label="Beskrivelse"
            value={description}
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            label="Sideantall"
            value={pages}
            type="number"
            onChange={(e) => {
              setPages(e.target.value);
            }}
          />
          <TextField
            label="Sjangere"
            value={genre}
            type="text"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          />
          <TextField
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