import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function BookPage() {
  const params = useParams();
  const [bookName, setBookName] = useState(params);
  


  return (
    <div>this is the page for { bookName.bookname } </div>
  )
}

export default BookPage