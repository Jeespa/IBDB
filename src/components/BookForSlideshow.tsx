import { Book } from '../schemas/Book'

function BookSlideshow ({ book }: { book: Book }) {
    return (
      <div style={{ marginTop: 10 }}>
        {/* <img style={{ marginTop: 10 }} src={"/ibdb.png"} /> */}
        <h2>{book.title}</h2>
        <div>Description: {book.description}</div>
        <div>Author: {book.authors}</div>
        <div>Number of pages: {book.pages}</div>
      </div>
    );
  }
export default BookSlideshow;