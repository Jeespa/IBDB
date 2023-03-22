import { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { booksByGenre } from '../components/Genres';
import { storage } from '../firebase-config';

function GenrePage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { genre } = useParams<{ genre: string }>();

    const booksToShow = booksByGenre[genre as string] || [];
    const navigate = useNavigate();
    const [coverUrls, setCoverUrls] = useState<Array<string>>([]);

    useEffect(() => {
        const fetchCoverUrls = async () => {
            const coverUrlPromises = booksToShow.map((book) => {
                return getDownloadURL(ref(storage, `books/${book.documentID}.jpg`));
            });

            const urls = await Promise.all(coverUrlPromises);
            setCoverUrls(urls);
        };

        fetchCoverUrls();
    }, [booksToShow]);

    const onBookClick = (e: React.MouseEvent<HTMLLIElement>) => {
        navigate(`/book/${e.currentTarget.id}`);
    }

    return (
        <div>
            <h1>{genre}</h1>
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
