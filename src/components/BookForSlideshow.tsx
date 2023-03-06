import { Book } from '../schemas/Book'

function BookForSlideshow ({ book }: { book: Book }) {
    return (
      <div style={{ marginTop: 10 }}>
        {/* <img style={{ marginTop: 10 }} src={"/ibdb.png"} /> */}
        <h2>{book.title}</h2>
        <div>Beskrivelse: {book.description}</div>
        <div>Forfattere: {book.authors?.join(', ')}</div>
        <div>Sideantall: {book.pages}</div>
      </div>
    );
  }
export default BookForSlideshow;