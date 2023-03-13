import { CollectionReference, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { Book } from "../schemas/Book";
import { collection } from "firebase/firestore";
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
        const userData = userDoc.data() ?? {};
        const booksRef = collection(db, "books") as CollectionReference<Book>;
        const booksSnapshot = await getDocs<Book>(booksRef);
        
        let booksData = booksSnapshot.docs.map((doc) => {
          const data = doc.data() as Record<string, any>;
          data["documentID"] = doc.id;
          return data as Book;
        });

        const readBooks = userData.readBooks || [];
        console.log(readBooks);
        const filteredBooks = booksData.filter((book) => {
          return readBooks.includes(book.documentID);
        });
        console.log(filteredBooks);
        setBooks(filteredBooks);

    }

    getBooks();
  }, [props.userId]);


  return (
    <div className="read-books">
      <h2>Leste bøker</h2>
      <ul>
        {books.map((book) => (
          <li key={book.documentID}>
            <a href={`/book/${book.documentID}`}>
            {book.title}, {book.authors?.join(", ")}
          </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadBooks;
