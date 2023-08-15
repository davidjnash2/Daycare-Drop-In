import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProviderPhotoItem from "../ProviderPhotoItem/ProviderPhotoItem";
import "./ProviderPhotoGallery.css";

import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  InputAdornment,
} from "@mui/material";

function ProviderPhotoGallery({ provider }) {
  const dispatch = useDispatch();
  const provider_id = provider.id;
  const photoArray = useSelector((store) => store.photo);

  useEffect(() => {
    provider_id &&
      dispatch({
        type: "GET_PHOTOS",
        payload: provider_id,
      });
  }, [provider_id]);

  const [newPhotoFile, setNewPhotoFile] = useState("");
  const [newPhotoDescription, setNewPhotoDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Bundling up all the data that we need for the whole process:
    // NOTE: We are inside the handleSubmit function. At this moment in
    //       time, we should not need to call any other setState kinds
    //       things. At this moment in time, the data we "need" must be
    //       available to us, and now our job is to send it to a Saga function.
    const newPhoto = {
      provider_id: provider_id,
      description: newPhotoDescription, // From React state that's tied to the form input.
      photo_file: newPhotoFile, // From React state that's tied to the "file" form input.
      // NOTE: We have not yet uploaded anything to AWS. We will
      //       handle that inside the:
      //         1. postPhoto saga function
      //         2. /api/photo POST route
    };
    console.log("newPhoto object IMMEDIATELY BEFORE DISPATCH:", newPhoto);

    // Sending this lovely lil' object off to Sagaland, where we'll
    // make a FormData object that includes the photo file, then
    // send that to our server. :)
    dispatch({ type: "POST_PHOTO", payload: newPhoto });

    // Cleaning up the form inputs:
    setNewPhotoFile("");
    setNewPhotoDescription("");
  };

  const handleDelete = (id) => {
    console.log("delete button clicked for photo of id:", id);
    const dataToSend = { id, provider_id };
    dispatch({ type: "DELETE_PHOTO", payload: dataToSend });
  };

  //LOADING STATE

  if (!provider_id) {
    return <div>Loading...</div>;
  }

  return (
    provider_id && (
      <Container>
        {photoArray.map((photo) => (
          <ProviderPhotoItem
            key={photo.id}
            photo={photo}
            handleDelete={handleDelete}
          />
        ))}

        <h3>Add another photo:</h3>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
          autoComplete="off"
          encType="multipart/form-data"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="photo"
            label="Upload a new photo"
            type="file"
            id="photo"
            onChange={(event) => setNewPhotoFile(event.target.files[0])}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            name="photo_description"
            label="Photo Description"
            type="text"
            id="photo_description"
            value={newPhotoDescription}
            onChange={(event) => setNewPhotoDescription(event.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{
              mb: 5,
              p: 2,

              // backgroundColor: "#390854",
            }}
          >
            Add Photo
          </Button>
        </Box>
      </Container>
    )
  );
}

export default ProviderPhotoGallery;
