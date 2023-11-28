import * as React from 'react';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const MyPage = () => {
  const [director, setDirector] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [results, setResults] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [retrieve, setRetrieve] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [watchlistButtonText, setWatchlistButtonText] = React.useState("Check Watchlist");
  const [allData, setAllData] = React.useState({});
  const [movies, setMovies] = React.useState([]);

  const handleGenreChange = (e) =>{
    setGenre(e.target.value);
  }

  const handleDirectorChange = (e) =>{
    setDirector(e.target.value);
  }

  React.useEffect(() => {
    if (title) {
      callApiAddFav();
    }
  }, [title]);

  React.useEffect(()=> {
    const callApiLoadWatchList = async () => {
      const response = await fetch("/api/getWatchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setAllData(data);
      let movieList = [];
      data.map((temp) => {
        movieList.push(temp.movie);
      });
      setMovies(movieList);
    }
    callApiLoadWatchList();
  }, []);

  const handleMovieButtonClick = (movie) => {
    setTitle(movie.name);
    movies.push(movie.name);
  };

  const handleWatchlistClick = () => {
    setIsOpen(!isOpen);
    setWatchlistButtonText(isOpen ? "Check Watchlist" : "Close Watchlist");
  };

  const handleEmptyListClick = () => {
    const response = fetch("/api/emptyList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setMovies([]);
  }
  
  const callApiAddFav = async () => {
    const response = await fetch("/api/addFav", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title
      })
    });
    const data = await response.json();
    setRetrieve(data);
  }
 
  const callApiSearchRec = async () =>{
    const response = await fetch("/api/getRec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        genre: genre,
        director: director,
      })     
    });
    const data = await response.json();
    setResults(data);
  };


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
                  Search
                </Typography>
              </Link>

              <Link color="inherit" style={{ cursor: "pointer", textDecoration: "none" }} onClick={() => navigate('/MyPage')}>
                <Typography variant="h5" noWrap>
                  <strong>Watchlist</strong>
                </Typography>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Container>
      <Grid container  >
        <Grid item xs = {12} sm = {12} md = {12} lg = {12} xl = {12} >
          <Typography variant="h3" align = 'left' sx={{ color: 'rgb(23, 81, 126)' }}>Find a Recommendation</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} align = 'left'>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
        <h2 style={{ fontSize: 20 }}>Search by Genre:</h2>
        <Typography><strong>Note:</strong> When searching by multiple genres please seperate each genre by a <strong>comma</strong></Typography>
          <TextField id="movie_genre" label="Movie Genre" variant="outlined" onChange={handleGenreChange} fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <h2 style={{ fontSize: 20 }}>Search by Director:</h2>
          <TextField id="director_name" label="Director Name" variant="outlined" onChange={handleDirectorChange} fullWidth/>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ display: 'flex', gap: '10px' }}>
          <Button variant="outlined" onClick={callApiSearchRec} style={{ width: '150px', height: '50px' }}>Search</Button>
          <Button variant="outlined" style={{ width: '200px', height: '50px' }} onClick={handleWatchlistClick}>{watchlistButtonText}</Button>
        </Grid>
          {isOpen == true ? 
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <h4>Watchlist:</h4>
              {movies.map((movie) => <li key={movie}>{movie}</li>)}
              {movies.length == 0 ? "Your watchlist is currently empty, try searching for some movies and adding them to your watchlist": <Button variant= "outlined" sx={{ color: 'red', borderColor: 'red' }} onClick={handleEmptyListClick}>Empty List</Button>}
            </Grid>
            : null}
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
                <Typography><strong>Genre(s):</strong> {movie.genres}</Typography>
              </div>
              {movie.average_rating && (
                <div>
                  <Typography><strong>Average Rating:</strong> {movie.average_rating}</Typography>
                </div>
              )}
                <Button variant="outlined" onClick={() => handleMovieButtonClick(movie)}>
                  Add to Watchlist
                </Button>
            </div>
            
          ))}

        </div>
      ) : null}
    </div>     
    </div>
  );
}

export default MyPage;