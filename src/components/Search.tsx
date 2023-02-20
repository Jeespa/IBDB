import { useNavigate } from 'react-router-dom';
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
    if (searchQuery === ""){
      setSearchResults([]);
      return;
    }
    const q = query(
      collection(db, 'books')
    );
    const querySnapshot = await getDocs(q);

    let results = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        documentID: doc.id,
        authors: data.authors,
        title: data.title,
        description: data.description,
        genre: data.genre,
        pages: data.pages,
        published: data.published,
      } as Book;
    });

    results = results.filter((post) => {
      if (post.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return post;
      }
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
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const handleSearchIconClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    setShowResults(true);
  }

  return (
    <div className="search-container" ref={searchContainerRef}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onClick={() => setShowResults(true)}
        ref={searchInputRef}
        className="search-input"
        placeholder="Search IBDb"
      />
      <span className="search-icon" onClick={handleSearchIconClick}></span>
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
                  <p className="search-item-author">{result.authors?.join(', ')}</p>
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
