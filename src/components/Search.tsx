import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

import { db, storage } from '../firebase-config';
import { Book } from '../schemas/Book';
import "./Search.css";


function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [searchResultsUrl, setSearchResultsUrl] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const searchBooksAndAuthors = async () => {
    if (searchQuery === "") {
      setSearchResults([]);
      return;
    }
    const q = query(
      collection(db, 'books')
    );
    const querySnapshot = await getDocs(q);

    let results = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Record<string, any>;
      data["documentID"] = doc.id;
      return data as Book;
    });

    results = results
    .map((book) => {
      const exactTitleScore = book.title.toLowerCase().startsWith(searchQuery.toLowerCase()) ? 2.1 : 0;
      const titleScore = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
      const descriptionScore = book.description?.toLowerCase().includes(searchQuery.toLowerCase()) ? 0.5 : 0;
      const authorScore = book.authors?.join(",").toLowerCase().includes(searchQuery.toLowerCase()) ? 0.4 : 0;
      const totalScore = exactTitleScore + titleScore + authorScore + descriptionScore;
      return { book, score: totalScore };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((result) => result.book);
    
    const storageRefs = results.map(result => ref(storage, `books/${result.documentID}.jpg`));
    const urlPromises = storageRefs.map(storageRef => getDownloadURL(storageRef));
    const urls = await Promise.all(urlPromises);
    setSearchResultsUrl(urls);
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
            {searchResults.map((result, index) => (
              <li key={result.documentID} className="search-item" onClick={() => handleSearchResultClick(result.documentID)}>
                <img src={searchResultsUrl[index]} className="search-item-image" />
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
