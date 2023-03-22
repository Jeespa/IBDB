import { getDownloadURL, ref } from 'firebase/storage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { booksByGenre } from '../components/Genres';
import { storage } from '../firebase-config';

//This component renders the books for the selected genre based on URL parameter.
async function GenrePage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { genre } = useParams<{ genre: string }>();

    // filter the books to display only those with the selected genre
    const booksToShow = booksByGenre[genre as string] || [];
    console.log('genre: ' + genre);
    console.log('books to show: ' + booksToShow);

    const navigate = useNavigate();

    const onBookClick = (e: React.MouseEvent<HTMLLIElement>) => {
        navigate(`/book/${e.currentTarget.id}`);
    }

    // get image URLs for each book
    const coverUrlPromises = booksToShow.map((book) => {
        return getDownloadURL(ref(storage, `books/${book.documentID}.jpg`));
    });

    const coverUrls = await Promise.all(coverUrlPromises);

    return (
        <div>
            <h1> {genre} </h1>
            <ul>
                {booksToShow.map((book, i) => (
                    <li key={i} id={book.documentID} onClick={onBookClick} style={{ cursor: 'pointer' }}>
                        {coverUrls[i] && (
                            <img src={coverUrls[i]} />
                        )}
                        {book.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GenrePage;