import { useEffect, useState } from "react";
//import "./Slideshow.css";
import { db } from "../firebase-config.js";
import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { async } from "@firebase/util";
import { Box, Card, CardMedia, Slide } from "@mui/material";
import BookPage from "../pages/Book.js";
import SlideShow from "./SlideShow.js";
import Carousel from "react-material-ui-carousel";
import { Book } from "../schemas/Book.js";
import BookSlideshow from "./BookSlideshow.js";


function Slideshow() {

    const [books, setBooks] = useState<string[]>([])
    const [booksRating, setBooksRating] = useState<Array<number>>([])
    const [booksRatingAmount, setBooksRatingAmount] = useState<Array<number>>([])
    const [AvgRating, setAvgRating] = useState(new Map())
    const [sortedMap, setSortedMap] = useState(new Map())


    const calcAvgRating = () => {
        const tmpMap = new Map();
        books.forEach((book) => {
            let tmp = booksRating[books.indexOf(book)] / booksRatingAmount[books.indexOf(book)]
            if (!isNaN(tmp)) {
                tmpMap.set(book, tmp);
              }
        })
        setAvgRating(tmpMap);
        setSortedMap(new Map([...tmpMap.entries()].sort((a, b) => b[1] - a[1])))
        console.log(AvgRating);
        console.log(sortedMap);
    }

    const getBooks = async () => {
        const q = query(collection(db, "books"));
        const querySnapshot = await getDocs(q);
        const tmp = querySnapshot.docs.map((doc) => doc.id);
        setBooks(tmp);
    
        const promises = tmp.map((book) => {
            const q = query(collection(db, "reviews"), where("isbn", "==", book));
            return getDocs(q);
        });
    
        const results = await Promise.all(promises);
    
        const booksRatingArr: number[] = [];
        const booksRatingAmountArr: number[] = [];
    
        results.forEach((querySnapshot) => {
            let ratingAmount = 0;
            let ratings = 0;
            querySnapshot.forEach((doc) => {
                ratingAmount += parseInt(doc.get("rating"));
                ratings++;
            });
            booksRatingArr.push(ratingAmount);
            booksRatingAmountArr.push(ratings);
        });
    
        setBooksRating(booksRatingArr);
        setBooksRatingAmount(booksRatingAmountArr);
    };

    useEffect(() => {
        async function fetchData() {
          await getBooks();
        }
        fetchData();
      }, []);
    
      useEffect(() => {
        calcAvgRating();
        getDisplayBooks();
      }, [books, booksRating, booksRatingAmount]);



      const slides = Array.from(sortedMap.keys()).slice(0, 5);

    
       const [index, setIndex] = useState(0);
      
       const next = () => {
           if (index === slides.length -1) {
               setIndex(0)  
           } else {
               setIndex(index +1)
           }
           console.log("index: " + index)
           console.log(books)
       }
    
       const previous = () => {
           if (index === 0) {
               setIndex(slides.length -1)
           } else {
               setIndex(index -1)
           }
           console.log("index: " + index)
       }
       

      const [displayBooks, setDisplayBooks] = useState<Array<Book>>([]);
      const getDisplayBooks = () => {
      const docRefs = Object.keys(sortedMap).map((key) =>
          doc(db, "books", key)
        );

      const queryRef = query(collection(db, "books"), where("isbn", "in", docRefs));
      onSnapshot(queryRef, (querySnapshot) => {
        const bookDocs: Array<Book> = [];
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            const bookDoc = doc.data() as Book;
            bookDocs.push(bookDoc);
          }
        });
        setDisplayBooks(bookDocs);
      });
  };

  return (
    <Carousel>
      {displayBooks.map((book) => (
        <div key={book.documentID}>
          <BookSlideshow book={book} />
        </div>
      ))}
    </Carousel>
  );
}


export default Slideshow;