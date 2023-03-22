import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onSnapshot, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { FidgetSpinner } from "react-loader-spinner";

import { auth, db, storage } from "../firebase-config";
import { Book } from "../schemas/Book";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import AverageRating from "../components/AverageRating";
import "../index.css";
import "./BookPage.css";
import { onAuthStateChanged } from "firebase/auth";

function BookPage() {
  const { isbn } = useParams();

  const [book, setBook] = useState<Book>();
  const [bookExists, setBookExists] = useState(true);
  const [imageURL, setImageURLState] = useState<string>();
  const [hasReadBook, setHasReadBook] = useState(false);
  const [buttonName, setButtonName] = useState("Legg til i Leste bøker");

  const setImageURL = async () => {
    setImageURLState(await getDownloadURL(ref(storage, `books/${isbn}.jpg`)));
  }
  const getBook = () => {
    if (isbn !== undefined) {
      const bookRef = doc(db, "books", isbn);
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




    const handleHasReadBook = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("Du må logge inn for å legge til bok i Leste bøker");
        return;
      }

      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      const readBooks = userData?.read || [];

      if (hasReadBook) {
        console.log(isbn)
        const updatedReadBooks = readBooks.filter((isbnInRead: string) => isbnInRead !== isbn);
        
        await updateDoc(userDocRef, { read: updatedReadBooks }).then(() => {
          alert("Bok fjernet fra Leste bøker.")
          setHasReadBook(false);
          setButtonName("Legg til i Har lest");
          setIsOpen(false);
          
        })
          .catch((error) => {
            alert("En feil oppstod ved fjerning av bok fra Leste bøker: " + error.message); // Set error message
          });
      }
      else {
        updateDoc(userDocRef, {
          read: arrayUnion(isbn),
        }).then(() => {
          alert("Boken ble lagt til i Leste bøker")
          setHasReadBook(true);
          setButtonName("Fjern fra Har lest");
        })
        .catch((error) => {
          alert("En feil oppstod ved innleggelsen av boken i Leste bøker: " + error.message); // Set error message
        });
      } 
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        getDoc(userDocRef)
          .then((doc) => {
            console.log(isbn);
            if (doc.exists()) {
              const data = doc.data();
              if (data.read.includes(isbn)) {
                setHasReadBook(true);
                setButtonName("Fjern fra Leste bøker");
              } else {
                setHasReadBook(false);
                setButtonName("Legg til i Leste bøker");
                setIsOpen(false);
              }
            }
          })
          .catch((error) => {
            console.log(error);
        });
      }  
    });
  

  useEffect(() => {
    getBook();
  }, [isbn]);

  if (!bookExists) {
    return <h1>404 Bok ikke funnet</h1>;
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
          <h1>
            {book.title} {hasReadBook ? <img src="/check_circle.png" alt="check circle" /> : null}
          </h1>

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
        <FidgetSpinner
        backgroundColor="#0096C7"
        ballColors={["0", "0", "0"]}
      />
        )}
    </div>
  );
}

export default BookPage;
