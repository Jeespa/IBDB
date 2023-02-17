import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, query, where, getDocs} from 'firebase/firestore';
import { Book } from './schemas/Book';


function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const searchBooksAndAuthors = async () => {
    const booksRef = collection(db, 'books');
    const q = query(collection(db, 'books'), where('title', '>=', searchQuery), where('title', '<=', searchQuery + '\uf8ff'));
    // const q = query(booksRef, where('title', '>=', searchQuery), where('title', '<=', searchQuery + '\uf8ff'), where('author', '>=', searchQuery), where('author', '<=', searchQuery + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    
    const results = querySnapshot.docs.map((doc) => {
      /* console.log(doc.data());
      return {
        id: doc.id,
        title: doc.data
      }; */
      const data = doc.data();
      return {
        documentID: doc.id,
        author: data.author,
        title: data.title,
        description: data.description,
        genre: data.genre,
        image: data.image,
        pages: data.pages,
        published: data.published
      } as Book;
    });
  
    setSearchResults(results);
  };

  useEffect(() => {
    searchBooksAndAuthors();
  }, [searchQuery]);

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h1>Search Books and Authors</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result.title}</li>
        ))}
      </ul>
    </div>
    /* <div
      style={{
        position: 'absolute',
        left: '37.33%',
        right: '0%',
        top: '0%',
        bottom: '0%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
        backgroundColor: '#F5F5F5',
        borderRadius: '5px',
      }}
    >
      <input
        type="text"
        placeholder="Search books and authors"
        value={searchQuery}
        onChange={searchBooksAndAuthors}
        style={{
          flex: 1,
          border: 'none',
          backgroundColor: 'transparent',
          marginLeft: '10px',
          fontSize: '16px',
          fontWeight: '600',
          color: '#333333',
          outline: 'none',
        }}
      />
      <button
        type="button"
        style={{
          marginLeft: '10px',
          backgroundColor: '#FFFFFF',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        Search
      </button>
    </div> */
  );
};

export default SearchPage;




