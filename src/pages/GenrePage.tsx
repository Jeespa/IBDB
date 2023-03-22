import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { booksByGenre } from '../components/Genres';

//This component renders the books for the selected genre based on URL parameter.
function GenrePage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    // const genre = queryParams.get('genre');
    const { genre } = useParams<{ genre: string }>();

    // filter the books to display only those with the selected genre
    const booksToShow = booksByGenre[genre as string] || [];
    console.log('genre: ' + genre);
    console.log('books to show: ' + booksToShow);

    const navigate = useNavigate();

    const onBookClick = (e: React.MouseEvent<HTMLLIElement>) => {
        navigate(`/book/${e.currentTarget.id}`);
    }

    return (
        <div>
            <h1> {genre} </h1>
            <ul>
                {booksToShow.map((book, i) => (
                    // cursor pointer
                    <li key={i} id={book.documentID} onClick={onBookClick} style={{ cursor: 'pointer' }} >{book.title}</li>
                ))}

            </ul>
        </div>

    );
}

export default GenrePage;