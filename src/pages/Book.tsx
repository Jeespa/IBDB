import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from "../firebase-config.js";
import { onSnapshot, doc} from "firebase/firestore";
import '../index.css'
import { Book } from '../schemas/Book'

function BookPage() {
  const { isbn } = useParams();
  
  const [book, setBook] = useState<Book>();
  const [bookExists, setBookExists] = useState(true);

  const getBook = () => {
    if (isbn !== undefined) {
      const bookRef = doc(db, 'books', isbn);
      onSnapshot(bookRef, (doc) => {
      if (doc.data()){
        setBook(doc.data() as Book);  
        setBookExists(true);
        } 
      else {
        setBookExists(false);
      }
    })
    }
  };

  useEffect(() => {
    getBook();
  }, [isbn]);

  if (!bookExists) {
    return <h1>404 Book Not Found</h1>;
  }

  return (
    <div style={{ marginTop: 10}}>
      {book ? (
        <>
          <h2>{book.title}</h2>
          <div>Description: {book.description}</div>
          <div>Author: {book.authors?.join(', ')}</div>
          <div>Number of pages: {book.pages}</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookPage