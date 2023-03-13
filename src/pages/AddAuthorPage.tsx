import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import Dropzone from 'react-dropzone';
import { doc, addDoc, collection } from "firebase/firestore";

import { db, storage } from '../firebase-config';
import { ref, uploadBytes } from 'firebase/storage';

const AuthorForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [deathdate, setDeathdate] = useState('');

  const handleDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      console.log('Please upload a picture');
      return;
    }

    const storageRef = ref(storage, `authors/${file.name}`);
    await uploadBytes(storageRef, file);

    await addDoc(collection(db, "authors"), {
      name: "test",
    });


    setFile(null);
    setNationality('');
    setBirthdate('');
    setDeathdate('');
  };

  return (
    <div>
  <Box sx={{ width: '70%', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Legg til forfatter</h1>
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
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
      <Box sx={{ flex: 1 , order: 2}}> {/* use flex: 1 to take up remaining space */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Navn"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            label="Nasjonalitet"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nationality}
            onChange={(event) => setNationality(event.target.value)}
          />
          <TextField
            label="Fødselsdato"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            value={birthdate}
            onChange={(event) => setBirthdate(event.target.value)}
          />
          <TextField
            label="Dødsdato"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            value={deathdate}
            onChange={(event) => setDeathdate(event.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ marginTop: '20px', width: '100%' , height: '60px'}}>
            Lagre
          </Button>
        </form>
      </Box>
    </Box>
  </Box>
</div>

  );
};

const AddAuthor = () => {
  return (
    <AuthorForm />
  );
};

export default AddAuthor;
