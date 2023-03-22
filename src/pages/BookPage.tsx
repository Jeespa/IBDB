import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { onSnapshot, doc, getDoc, updateDoc, arrayUnion} from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';

import { auth, db, storage } from "../firebase-config";
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
  const [hasAddedWish, setHasAddedWish]=useState(false);
  const [buttonName,setButtonName]=useState("Legg til i min ønskeliste")

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

  const handleHasAddedWish = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("Du må logge inn for å legge til bok i Leste bøker");
      return;
    }
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();
    const wishlist = userData?.Wishlist || [];
    if (hasAddedWish) {
      const updatedWishlist = wishlist.filter((isbnInWishlist: string) => isbnInWishlist !== isbn);
      await updateDoc(userDocRef, { Wishlist: updatedWishlist }).then(() => {
        alert("Bok fjernet fra ønskeliste.")
        setHasAddedWish(false);
        setButtonName("Legg til i min ønskeliste");
        setIsOpen(false);
      })
        .catch((error) => {
          alert("En feil oppstod ved fjerning av bok fra Leste bøker: " + error.message); // Set error message
        });
    }
    else {
      updateDoc(userDocRef, {
        Wishlist: arrayUnion(isbn),
      }).then(() => {
        alert("Boken ble lagt til i min ønskeliste")
        setHasAddedWish(true);
        setButtonName("Fjern fra min ønskeliste");
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
            if (data.Wishlist.includes(isbn)) {
              setHasAddedWish(true);
              setButtonName("Fjern fra min ønskeliste");
            } else {
              setHasAddedWish(false);
              setButtonName("Legg til i min ønskeliste");
              setIsOpen(false);
            }
          }
        })
        .catch((error) => {
          console.log(error);
      });
    }
  });



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
            <img src={imageURL} style={{ width: "200px", height: "300px" , borderRadius:"5px"}} />
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
        <button onClick={handleHasAddedWish}>{buttonName}</button>
        

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