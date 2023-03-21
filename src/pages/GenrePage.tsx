import { useLocation, useParams } from 'react-router-dom';
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
    

    return (
        <div>
            <h1> {genre} </h1>
            <ul>
                {booksToShow.map((bookTitle, i) => (
                    <li key={i}>{bookTitle}</li>
                ))}

            </ul>
        </div>
        
    );
}

export default GenrePage;