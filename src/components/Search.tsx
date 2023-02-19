import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Book } from '../schemas/Book';
import "./Search.css"

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [showResults, setShowResults] = useState(false);

  const searchBooksAndAuthors = async () => {
    const q = query(
      collection(db, 'books'),
      where('title', '>=', searchQuery),
      where('title', '<=', searchQuery + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);

    const results = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        documentID: doc.id,
        author: data.author,
        title: data.title,
        description: data.description,
        genre: data.genre,
        image: data.image,
        pages: data.pages,
        published: data.published,
      } as Book;
    });

    setSearchResults(results);
  };

  useEffect(() => {
    searchBooksAndAuthors();
  }, [searchQuery]);

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setShowResults(true);
  };

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchContainerRef.current?.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const handleSearchResultClick = (docID: string) => {
    navigate(`/book/${docID}`);
    setShowResults(false);
  };

  return (
    <div className="search-container" ref={searchContainerRef}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onClick={() => setShowResults(true)}
        className="search-input"
        placeholder="Search IBDb"
      />
      {showResults && (
        <div className="search-results">
          <ul className="search-list">
            {searchResults.map((result) => (
              <li key={result.documentID} className="search-item" onClick={() => handleSearchResultClick(result.documentID)}>
                <img src="https://via.placeholder.com/60x80" alt="Search Result Image" className="search-item-image" />
                <div className="search-item-details">
                  <h3 className="search-item-title">{result.title}</h3>
                  {result.published && (
                    <p className="search-item-year">{result.published.toDate().getFullYear()}</p>
                  )}
                  <p className="search-item-author">{result.author}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
