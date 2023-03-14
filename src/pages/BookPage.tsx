import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { onSnapshot, doc, Firestore, updateDoc, arrayUnion, getDoc} from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';

import { db, storage, auth } from "../firebase-config";
import { Book } from '../schemas/Book'
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import AverageRating from '../components/AverageRating';
import '../index.css'
import './BookPage.css'
import { onAuthStateChanged } from 'firebase/auth';

function BookPage() {
  const { isbn } = useParams();
  
  const [book, setBook] = useState<Book>();
  const [bookExists, setBookExists] = useState(true);
  const [imageURL, setImageURLState] = useState<string>();
  const [hasReadBook, setHasReadBook] = useState(false);
  const [buttonName, setButtonName] = useState("Legg til i Har lest");

  const setImageURL = async () => {
    setImageURLState(await getDownloadURL(ref(storage, `books/${isbn}.jpg`)));
  }
  const getBook = () => {
    if (isbn !== undefined) {
      const bookRef = doc(db, 'books', isbn);
      onSnapshot(bookRef, (doc) => {
        if (doc.data()){
          const book = doc.data() as Book;
          setBook(book);  
          setImageURL();
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




    const handleHasReadBook = () => {
      if (hasReadBook) {
        
        setHasReadBook(false);
        setButtonName("Legg til i Har lest");
        setIsOpen(false);
      }
      else {
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log(currentUser.uid)
          const userDocRef = doc(db, "users", 'zVFNJVNEMHqW2kKLdGZQ');
          updateDoc(userDocRef, {
            readBooks: arrayUnion(isbn),
          }).then(() => {
            alert(`${book?.title} ble lagt til i Leste bøker`);
            setHasReadBook(true);
            setButtonName("Fjern fra Har lest");
          })
          .catch((error) => {
            alert("Error adding book to read list: " + error.message); // Set error message
          });
      } else {
        alert("You must log in to add a book to your read list"); // Set error message
      }
        

      } 
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid)
      } else {
      }
    });
  

  useEffect(() => {
    getBook();
    const currentUser = auth.currentUser;
    
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      getDoc(userDocRef)
        .then((doc) => {
          console.log(isbn);
          if (doc.exists()) {
            const data = doc.data();
            if (data.readBooks.includes(isbn)) {
              setHasReadBook(true);
              setButtonName("Fjern fra Har lest");
            } else {
              setHasReadBook(false);
              setButtonName("Legg til i Har lest");
              setIsOpen(false);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
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
            <img src={imageURL} style={{ width: "200px", height: "300px" , borderRadius:"5px"}} />
          </div>
          <div className="bookinfo">
            <h1>{book.title} {hasReadBook ? <img src="/check_cricle.png" /> : null}</h1>
            <div className="author">{book.authors?.join(', ')}</div>
            <AverageRating />
            <div>{book.description}</div>
            <div>Antall sider: {book.pages}</div>
          </div>
        </div>
        <div className="reviewmodal">
        <button onClick={handleHasReadBook}>{buttonName}</button>
        <button onClick={handleOpenModal} disabled={!hasReadBook}> Legg til vurdering</button>
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