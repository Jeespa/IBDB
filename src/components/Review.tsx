import { Container, Paper, Stack, TextField } from "@mui/material";
import { useState } from "react";

function Review() {
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');  

  return (
    <div>
    <Container
        component={Paper}
        sx={{ marginBottom: "20px", padding: "20px" }}>
        <h2 style={{ fontSize: "20px" }}>Add New Book</h2>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Rating"
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <TextField
            label="Review"
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </Stack>
      </Container>
    </div>
  )
}

export default Review;