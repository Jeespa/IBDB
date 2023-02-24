import { useEffect, useState } from "react";
import { db } from "../firebase-config.js";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Carousel from "react-material-ui-carousel";
import { Book } from "../schemas/Book.js";
import BookSlideshow from "./BookSlideshow.js";

function Slideshow() {
  const [books, setBooks] = useState<string[]>([]);
  const [booksRating, setBooksRating] = useState<Array<number>>([]);
  const [booksRatingAmount, setBooksRatingAmount] = useState<Array<number>>([]);
  const [avgRating, setAvgRating] = useState(new Map());
  const [sortedMap, setSortedMap] = useState(new Map());

  const getBooks = async () => {
    const q = query(collection(db, "books"));
    const querySnapshot = await getDocs(q);
    const tmp = querySnapshot.docs.map((doc) => doc.id);
    console.log(tmp);
    setBooks(tmp);

    const promises = tmp.map((book) => {
      const q = query(collection(db, "reviews"), where("isbn", "==", book));
      return getDocs(q);
    });

    const booksRatingArr: number[] = [];
    const booksRatingAmountArr: number[] = [];

    const results = await Promise.all(promises);
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

    const tmpMap = new Map();
    tmp.forEach((book) => {
      let temp =
        booksRatingArr[tmp.indexOf(book)] /
        booksRatingAmountArr[tmp.indexOf(book)];
      if (!isNaN(temp)) {
        tmpMap.set(book, temp);
      }
    });
    setAvgRating(tmpMap);
    setSortedMap(new Map([...tmpMap.entries()].sort((a, b) => b[1] - a[1])));
    console.log(tmpMap);
    return tmpMap;
  };

  useEffect(() => {
    async function fetchData() {
      return await getBooks();
    }
    fetchData().then( (data) => {
      showCarousel(getDisplayBooks(data));
    })
  }, []);

  /* useEffect(() => {
    getDisplayBooks();
  }, [books, booksRating, booksRatingAmount]); */

  const [displayBooks, setDisplayBooks] = useState<Array<Book>>([]);

  const getDisplayBooks = (sortedMap: Map<any, any>) => {
    const docRefs = Array.from(sortedMap.keys()).map((key) =>
      doc(db, "books", key)
    );
    const queryRef = query(
      collection(db, "books"),
      where("documentID", "in", docRefs)
    );
    onSnapshot(queryRef, (querySnapshot) => {
      const bookDocs: Array<Book> = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const bookDoc = doc.data() as Book;
          bookDocs.push(bookDoc);
        }
      });
      console.log(bookDocs)
      return bookDocs;
    });
    
  };

  const showCarousel = (bookDocs: Book[]) => {
    return (
      <Carousel>
        {bookDocs.map((book) => (
          <div key={book.documentID}>
            <BookSlideshow book={book} />
          </div>
        ))}
      </Carousel>
    );
  }

  /* return (
   
  ); */
}

export default Slideshow;
