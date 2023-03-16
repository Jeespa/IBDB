import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Box, Button, TextField, Select, MenuItem, InputLabel, OutlinedInput, SelectChangeEvent, Checkbox, ListItemText, FormControl, InputAdornment } from '@mui/material';
import { addDoc, collection, getDocs, query, Timestamp } from "firebase/firestore";
import { ref, uploadBytes } from 'firebase/storage';

import { db, storage } from '../firebase-config';
import { Author } from '../schemas/Author';

const MultipleAuthorsCheckmarks = (authors: Author[]) => {
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedPersons>) => {
    const {
      target: { value },
    } = event;
    setSelectedPersons(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl style={{flex: 2}}>
      <InputLabel id="demo-multiple-checkbox-label">Forfatter(e)</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={selectedPersons}
        onChange={handleChange}
        input={<OutlinedInput label="Forfatter(e)" />}
        renderValue={(selected) => selected.join(', ')}
      >
        {authors.map((author) => (
          <MenuItem key={author.name} value={author.name}>
            <Checkbox checked={selectedPersons.indexOf(author.name) > -1} />
            <ListItemText primary={author.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const MultipleBooksCheckmarks = (genres: string[], selectedGenres: string[], setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>) => {
  const handleChange = (event: SelectChangeEvent<typeof selectedGenres>) => {
    const {
      target: { value },
    } = event;
    setSelectedGenres(
      typeof value === 'string' ? value.split(',') : value,
      );
    };

    return (
    <FormControl style={{flex: 2}}>
      <InputLabel id="demo-multiple-checkbox-label">Sjanger</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={selectedGenres}
        onChange={handleChange}
        input={<OutlinedInput label="Sjanger" />}
        renderValue={(selected) => selected.join(', ')}
      >
        {genres.map((genre) => (
          <MenuItem key={genre} value={genre}>
            <Checkbox checked={selectedGenres.indexOf(genre) > -1} />
            <ListItemText primary={genre} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function BookForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isbn, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
  const genres = ["Roman", "Drama", "Krim", "Fantasy", "Historie", "Biografi", "Sjangerløs"];
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState("");
  const [published, setPublished] = useState("");
  
  const handleDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const getAuthors = async () => {
    const q = query(collection(db, 'authors'));
    const qSnapshot = await getDocs(q);
    const authorResults = qSnapshot.docs.map((doc) => {
      const data = doc.data() as Record<string, any>;
      data["documentID"] = doc.id;
      return data as Author;
    })
    setAuthors(authorResults);
  };
  getAuthors();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert('Du må laste opp et bilde av boken!')
      return;
    }
    if (!isbn || !title || !description || !pages || !published) {
      alert('Du må fylle inn alle feltene!')
      return;
    }

    // const docData: { [key: string]: any } = {
    //   name: name,
    //   nationality: nationality,
    //   birth: Timestamp.fromDate(new Date(birthdate)),
    // };
    // if (deathdate) {
    //   docData['death'] = Timestamp.fromDate(new Date(deathdate));
    // }
    // const document = await addDoc(collection(db, "books"), docData);
    // const docID = document.id;

    // const storageRef = ref(storage, `books/${docID}.jpg`);
    // await uploadBytes(storageRef, file);

    // setTitle("");
    // setAuthor("");
    // setDescription("");
    // setPages("");
    // setPublished("");
    // setGenre("");
    // alert("Boken ble lagt til!");
  };

  return (
    <div>
      <Box sx={{ width: '70%', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Legg til bok</h1>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', width: '100%' }}>
          <Box sx={{
            border: '1px dashed grey',
            borderRadius: '10px',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            marginRight: '20px', // add some space between the dropzone and input fields
            order: 1, // move the dropzone to the left
          }}>
            <Dropzone onDrop={handleDrop} multiple={false} maxSize={52428800} accept={{ "images/jpg": [".jpg"] }}>
              {({ getRootProps, getInputProps }) => (
                <Box {...getRootProps()}>
                  <input {...getInputProps()} />
                  {file ? (
                    <img src={URL.createObjectURL(file)} alt="forhåndsvisning" width="200px" height="300px" />
                  ) : (
                    <p>Dra og slipp et bilde her, eller klikk for å velge en fil</p>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>
          <Box sx={{ flex: 1, order: 2 }}> {/* use flex: 1 to take up remaining space */}
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: '5px' }}>
                <TextField
                  label="Tittel"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  style={{ flex: 4 }}
                />
                <TextField
                  label="ISBN"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={isbn}
                  onChange={(event) => setISBN(event.target.value)}
                  style={{ flex: 2 }}
                />
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
              <TextField
                label="Beskrivelse"
                variant="outlined"
                fullWidth
                margin="normal"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                style={{ marginTop: '0px' }}
              />
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                {MultipleAuthorsCheckmarks(authors)}
                {MultipleBooksCheckmarks(genres, selectedGenres, setSelectedGenres)}
              </div>
              <div style={{ display: 'flex', gap: '5px'}}>
                <TextField
                  label="Utgivelsesdato"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={published}
                  onChange={(event) => setPublished(event.target.value)}
                  InputProps={{
                    style: { color: 'gray' },
                  }}
                  style={{ marginTop: '8px' }}
                />
                <TextField
                  label="Antall sider"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={pages}
                  onChange={(event) => setPages(event.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
              <Button type="submit" variant="contained" sx={{ marginTop: '20px', width: '100%', height: '60px' }}>
                Lagre
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default BookForm;