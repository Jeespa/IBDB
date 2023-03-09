import {
  Button,
  Container,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { Review } from "../schemas/Review"

function addReview() {
  const [rating, setRating] = useState("1");
  const [ratingValue, setRatingValue] = useState(1);
  const [text, setText] = useState("");
  const [isbn, setIsbn] = useState(useParams().isbn);
  const [published, setPublished] = useState(new Date().toLocaleString() + "");

  const handleChange = (event: SelectChangeEvent) => {
    setRating(event.target.value);
    setRatingValue(parseInt(rating));
  };

  const insertReview = async () => {
    const user = auth.currentUser?.uid;
    const book = isbn;
    const documentID = book! + user;
  
    if (ratingValue > 0 && ratingValue < 7) {
      try {
        const review: Review = {
          user: user!,
          book: book!,
          rating: rating,
          text: text,
          published: published
        };
  
        const docRef = doc(db, 'reviews', documentID);
        await setDoc(docRef, review);
        console.log("Review added with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding review: ", e);
      }
    } else {
      alert("Fill in a rating between 1 and 6!");
    }
  };

  return (
    <div>
      <Container
        component={Paper}
        sx={{ marginBottom: "20px", padding: "20px" }}
      >
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
          <Button variant="contained" onClick={insertReview}>
            Legg til vurdering
          </Button>
        </Stack>
      </Container>
    </div>
  );
}

export default addReview;
