import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

const MovieSelection = (props) => {

  const title = "Select a Movie";
  //states declarations
  //constants and functions declarations
  const handleMovieChange = (event) => { //sets new value and resets error condition
    props.setSelectedMovie(event.target.value)
    props.setError((prevError) => ({
      ...prevError,
      selectMovie_error: false, 
    }));
  };

  return (
    <div>
      <h2 style={{ fontSize: 20 }}>{title}</h2>
      <FormControl fullWidth>
        <InputLabel>Movies</InputLabel>
          <Select onChange={handleMovieChange}  label="Movies" required value = {props.selectedMovie}>
            {props.movies.map((movie) => (
              <MenuItem key = {movie} value={movie}>{movie}</MenuItem>
              ))
            }
          </Select>
      </FormControl>
      
    </div>
  );
}

export default MovieSelection;