import { Button, Container, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase-config";

function Review() {

  const [rating, setRating] = useState('1');
  const [ratingValue, setRatingValue] = useState(1);
  const [text, setText] = useState('');
  const [user, setUser] = useState(auth.currentUser?.uid || '');
  const [isbn, setIsbn] = useState(useParams().isbn);
  const [reviewId, setReviewId] = useState(isbn + user);
  const [published, setPublished] = useState(new Date().toLocaleString() + "");
  //Date.parse(new Date().toLocaleString() + "") / 1000

  //console.log(published);

  const handleChange = (event: SelectChangeEvent) => {
    setRating(event.target.value)
    setRatingValue(parseInt(rating));
  }

  function setValues() {
    setUser(auth.currentUser?.uid || '');
    console.log(user);
    setReviewId(isbn + user);
  }

  const addReview = async () => {
    setValues();
    console.log(rating)
    console.log(ratingValue);
    if (ratingValue > 0 && ratingValue < 7) {
      try {
        await setDoc(doc(db, "reviews", reviewId), {
          isbn,
          user,
          published,
          rating,
          text,
        });
        /* //setIsbn('');
        //setUser(auth.currentUser?.uid);
        setReviewId(isbn + user);
        //setPublished('');
        setRating('1');
        setRatingValue(parseInt(rating));
        setText(''); */
        alert("Review has been added!");
      } catch (e) {
        console.error("Error adding review: ", e);
      }
    } else {
      alert("Fill in a rating between 1 and 6!");
    }
  }

  return (
    <div>
    <Container
        component={Paper}
        sx={{ marginBottom: "20px", padding: "20px"}}>
        <h2 style={{ fontSize: "20px" }}>Legg til vurdering</h2>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Review"
            value={text}
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <Select label="Rating" value={rating} onChange={handleChange}>
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"5"}>5</MenuItem>
            <MenuItem value={"6"}>6</MenuItem>
            </Select>
        <Button variant="contained" onClick={addReview}>Legg til vurdering</Button>
        </Stack>
      </Container>
    </div>
  )
}

export default Review;