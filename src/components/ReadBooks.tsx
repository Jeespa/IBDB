import { CollectionReference, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { Book } from "../schemas/Book";
import { collection, query, where, QuerySnapshot } from "firebase/firestore";
import "./ReadBooks.css"

interface Props {
  userId: string;
}

function ReadBooks(props: Props) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function getBooks() {
      const userDocRef = doc(db, "users", props.userId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (userData) {
        console.log(userData.name);
      } else {
        console.log("User not found");
}

      const readBooks = userDoc.data()?.readBooks || [];
      console.log(readBooks);

      const booksRef = collection(db, "books") as CollectionReference<Book>;
      console.log(booksRef);

      const booksQuery = query<Book>(booksRef, where("_disbn_",'in', readBooks));
  
      const booksQuerySnapshot = await getDocs<Book>(booksQuery);
      const booksData = booksQuerySnapshot.docs.map((doc) => doc.data());
      console.log(booksData);

      setBooks(booksData);

     
    }

    getBooks();
  }, [props.userId]);

  /* if (books.length === 0) {
    return <div>No read books found</div>;
  } */

  return (
    <div className="read-books">
      <h2>Leste bøker</h2>
      <ul>
       {books.map((book) => (
          <li key={book.documentID}>
            <h3>{book.title}</h3>
            <p>{book.authors?.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadBooks;
