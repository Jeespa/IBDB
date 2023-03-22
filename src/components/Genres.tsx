import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './Navbar.css';


import { getFirestore, doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { Link } from 'react-router-dom';
import { Book } from '../schemas/Book';

const books = collection(db, "books");

//Invoke the getDocs() method passing books as an argument to it.
//The getDocs() method will return a promise, add await keyword in front of it.
const docsSnap = await getDocs(books);
//object that stores books by genre
export const booksByGenre: Record<string, Book[]> = {
  // ...
};

//To see the genre of each document from the books collection, loop through the docsSnap object using the forEach() method.
docsSnap.forEach(doc => {
  // Make into a Book object with documentID as doc.id()
  const book = { ...doc.data(), documentID: doc.id } as Book;
  const genre = book.genre;

  // If the genre key doesn't exist in the object, create it with an empty array as the value
  genre?.forEach((g) => {
    if (!booksByGenre[g]) {
      booksByGenre[g] = [];
    }
    booksByGenre[g].push(book);
  });

  // Add the book title to the array for the corresponding genre
});

// console.log(booksByGenre);

// Extract the list of genre keys from the booksByGenre object
const genreList = Object.keys(booksByGenre);

// Pass the genreList to another page or use it to populate a drop-down menu
// console.log(genreList);


export default function Genres() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="sjangere"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Sjangere▼
      </Button>
      <Menu
        id="sjangere"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* <MenuItem onClick={handleClose}>Akademisk</MenuItem>
        <MenuItem onClick={handleClose}>Apokalyptisk</MenuItem>
        <MenuItem onClick={handleClose}>Biografi</MenuItem> */}


        <Link to={'books/Eventyr'}>
          <MenuItem onClick={handleClose}>Eventyr</MenuItem>
        </Link>
        <Link to={'/books/Fantasy'}>
          <MenuItem onClick={handleClose}>Fantasy</MenuItem>
        </Link>
        {/* <Link to={{ pathname: "/books", search: `?genre=Fantasy` }}>
          <MenuItem onClick={handleClose}>Fantasy</MenuItem>
        </Link> */}

        {/* <MenuItem onClick={handleClose}>Filosofi</MenuItem>
        <MenuItem onClick={handleClose}>Historisk</MenuItem>
        <MenuItem onClick={handleClose}>Komedie</MenuItem> */}
        <Link to={'books/Krim'}>
          <MenuItem onClick={handleClose}>Krim</MenuItem>
        </Link>
        {/* <MenuItem onClick={handleClose}>Reise</MenuItem>
        <MenuItem onClick={handleClose}>Religiøs</MenuItem> */}
        <Link to={'books/Roman'}>
          <MenuItem onClick={handleClose}>Roman</MenuItem>
        </Link>
        {/* <MenuItem onClick={handleClose}>Romantikk</MenuItem>
        <MenuItem onClick={handleClose}>Science fiction</MenuItem> */}
        <Link to={'books/Skrekk'}>
          <MenuItem onClick={handleClose}>Skrekk</MenuItem>
        </Link>
        {/* <MenuItem onClick={handleClose}>Spenning</MenuItem>
        <MenuItem onClick={handleClose}>Thriller</MenuItem>
        <MenuItem onClick={handleClose}>Tragedie</MenuItem> */}
      </Menu>
    </div>
  );
}