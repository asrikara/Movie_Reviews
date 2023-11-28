import * as React from 'react';
import { Container, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


const Search = () => {
  const [title, setTitle] = React.useState('');
  const [actor, setActor] = React.useState('');
  const [director, setDirector] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [errorCheck, setErrorCheck] = React.useState(false);

  const handleTitleChange = (e) =>{
    setTitle(e.target.value);
  }

  const handleActorChange = (e) =>{
    setActor(e.target.value);
  }

  const handleDirectorChange = (e) =>{
    setDirector(e.target.value);
  }

  const callApiSearchMovies = async () =>{

    if(title.length === 0 && actor.length === 0 && director.length ===0){
      setErrorCheck(true);
      return;
    }

    const response = await fetch("/api/searchMovies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        title: title,
        actor: actor, 
        director: director
      })     
    });
    const data = await response.json();
    setResults(data);
    setErrorCheck(false);
  }

  const navigate = useNavigate();
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar variant="dense">
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link color="inherit" style={{ cursor: "pointer", marginRight: "20px", textDecoration: "none" }} onClick={() => navigate('/')}>
                <Typography variant="h5" noWrap>
                  Landing
                </Typography>
              </Link>

              <Link color="inherit" style={{ cursor: "pointer", marginRight: "20px", textDecoration: "none" }} onClick={() => navigate('/Review')}>
                <Typography variant="h5" noWrap>
                  Review
                </Typography>
              </Link>

              <Link color="inherit" style={{ cursor: "pointer", marginRight: "20px", textDecoration: "none" }} onClick={() => navigate('/Search')}>
                <Typography variant="h5" noWrap>
                  <strong>Search</strong>
                </Typography>
              </Link>

              <Link color="inherit" style={{ cursor: "pointer", textDecoration: "none" }} onClick={() => navigate('/MyPage')}>
                <Typography variant="h5" noWrap>
                  Watchlist
                </Typography>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>  

      <Container>
      <Grid container  >
        <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12} >
          <Typography variant="h3" align = 'left' sx={{ color: 'rgb(23, 81, 126)' }}>Search for a Movie</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} align = 'left'>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
        <h2 style={{ fontSize: 20 }}>Filter by Movie Title:</h2>
          <TextField id="movie_title" label="Movie Title" variant="outlined" onChange={handleTitleChange} fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <h2 style={{ fontSize: 20 }}>Filter by Actor:</h2>
          <TextField id="actor_name" label="Actor Name" variant="outlined" onChange={handleActorChange} fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <h2 style={{ fontSize: 20 }}>Filter by Director:</h2>
          <TextField id="director_name" label="Director Name" variant="outlined" onChange={handleDirectorChange} fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button variant="outlined" onClick={callApiSearchMovies} style={{ width: '150px', height: '50px' }}>Search</Button>
        </Grid>
        {errorCheck && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography color="red">Please use a filter!</Typography>    
          </Grid>
        )}
      </Grid>
      </Container>
      
      
      <div style={{ display: 'flex', justifyContent: 'left', marginLeft: '185px', marginTop: '20px'}}>
      {results ? (
        <div>
          {results.map((movie, index) => (
            <div key={index} style={{ marginBottom: '20px', textAlign: 'left' }}>
              <div>
                <Typography><strong>Title:</strong> {movie.name}</Typography>
              </div>
              <div>
                <Typography><strong>Director(s):</strong> {movie.directors}</Typography>
              </div>
              {movie.review_body !== null ? (
                <div style={{ marginBottom: '10px', textAlign: 'left' }}>
                  <Typography><strong>Reviews:</strong></Typography>
                  <ol>
                  {movie.review_body.split('|').map((review, index) => (
                    <div key={index}>
                      <li>{review}</li>
                    </div>
                  ))}
                  </ol>
                </div>
              ) : null}
              {movie.average_rating && (
                <div>
                  <Typography><strong>Average Rating:</strong> {movie.average_rating}</Typography>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
    </div>
  );
}

export default Search;