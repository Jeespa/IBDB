import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { onSnapshot, doc} from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';

import { db, storage } from "../firebase-config";
import { Book } from '../schemas/Book'
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import AverageRating from '../components/AverageRating';
import '../index.css'
import './BookPage.css'

function BookPage() {
  const { isbn } = useParams();
  
  const [book, setBook] = useState<Book>();
  const [bookExists, setBookExists] = useState(true);
  const [imageURL, setImageURLState] = useState<string>("https://via.placeholder.com/300x300.png?text=Placeholder+Image");

  const setImageURL = async (book: Book) => {
    setImageURLState(await getDownloadURL(ref(storage, `books/${book.documentID}.jpg`)))
    console.log(book.documentID)
  }
  const getBook = () => {
    if (isbn !== undefined) {
      const bookRef = doc(db, 'books', isbn);
      onSnapshot(bookRef, (doc) => {
      if (doc.data()){
        let book = doc.data() as Book
        setBook(book);  
        setImageURL(book)
        setBookExists(true);
        } 
      else {
        setBookExists(false);
      }
    })
    }
  };


    const [isOpen, setIsOpen] = useState(false);
  
    const handleOpenModal = () => {
      setIsOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsOpen(false);
    };


  useEffect(() => {
    getBook();
  }, [isbn]);

  if (!bookExists) {
    return <h1>404 Book Not Found</h1>;
  }

  

  return (
    <div className="page">
      {book ? (
        <>
        <div className="book">
          <div className="bookimg">
            <img src={imageURL} alt="Search Result Image" style={{ width: "200px", height: "300px" }} />
          </div>
          <div className="bookinfo">
            <h1>{book.title}</h1>
            <div className="author">{book.authors?.join(', ')}</div>
            <AverageRating />
            <div>{book.description}</div>
            <div>Antall sider: {book.pages}</div>
          </div>
        </div>
        <div className="reviewmodal">
        <button onClick={handleOpenModal}> Legg til vurdering</button>
          {isOpen && (
            <div>
              <AddReview />
              <button onClick={handleCloseModal}> Lukk </button>
            </div>
          )}
        </div>
      <Reviews />
        </>
      ) : (
        <p>Loading...</p>
        )}
    </div>
  );
}

export default BookPage