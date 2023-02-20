import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from "../firebase-config.js";
import { collection, query, onSnapshot, doc, deleteDoc, DocumentData} from "firebase/firestore";
import { CardMedia, Card, Box, Typography, IconButton, Stack } from '@mui/material';
import '../index.css'
import { Book } from '../schemas/Book'
import { Timestamp } from 'firebase/firestore';

function BookPage() {
  const params = useParams();
  const [bookID, setBookID] = useState(params.bookid);
  
  const errorBook: Book = {
    "documentID": 'Error', // ISBN
    "author": 'Error',
    "title": 'Error',
    "description": 'Error',
    "genre": [],
    "image": 'Error',
    "pages": 0,
    "published": new Timestamp(0, 0),
  }
  
  const [book, setBook] = useState<Book>(errorBook);

  const getBook = () => {
    const id = bookID;
    if (id !== undefined) {
      const bookRef = doc(db, 'books', id);
      onSnapshot(bookRef, (doc) => {
      if (doc.data()){
        setBook(doc.data() as Book);  
      }
    })
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div style={{ marginTop: 10}}>
          <img 
              style={{ marginTop: 10 }} 
              src={"/ibdb.png"}
          />
          <h2>
            { book.title }
          </h2>
          <div>
            Description: { book.description }
          </div>
          <div>
            Author: { book.author }
          </div>
          <div>
            Number of pages: { book.pages }
          </div>
    </div>
  )
}

export default BookPage