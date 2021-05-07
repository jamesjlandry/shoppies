
import './App.css';
import { TextField } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState } from "react"
import film from './film.mp4'

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBotom: 12,
  }
})


function App() {
  const classes = useStyles();
  
  const [nominations, setNominations] = useState([])
  const [movies, setMovies] = useState()

  let getMovies = (e) =>  {
    e.preventDefault()
    fetch(`http://www.omdbapi.com/?s=${e.target.value}&apikey=5a61fa6a`)
    .then(response => response.json())
    .then(data => {
      if(data.Search) {
        setMovies(data.Search)
      }
    })
    
  }

  let removeNomination = (movie) => {
    let newNoms = nominations.filter(nomination =>  nomination !== movie)
    setNominations(newNoms)
  }

  let addNomination = (movie) => {
    if(nominations.length < 5) {
      setNominations([...nominations, movie])
    }
   
    
  }
  
  
  return (
    <div className="App">
      <video className="film_background" autoPlay loop muted>
          <source src={film} type='video/mp4' /> 
      </video>
        <div className="title" ><h1 >The Shoppies</h1></div>
        <form className="search"  onSubmit={e => getMovies(e.target.value)}>
          <TextField label="Title" placeholder="Enter Title" onChange={e =>  getMovies(e)}>
          </TextField>
        </form>
        {nominations.length === 5 
        ? 
        <div>
          <div>
            Congratulations, you have nominated 5 movies!
          </div>
        </div>
      : 
      null
      }
          {(movies)
          ? 
          <div className="search_results">
            {movies.map(movie => <div><div><Typography>{movie.Title}</Typography><Typography>{movie.Year}</Typography>
          <div>{nominations.includes(movie) ? <Button disabled size="small" onClick={e => addNomination(movie)}>Nominate</Button> : <Button size="small" onClick={e => addNomination(movie)}>Nominate</Button>} </div></div></div>)}
          </div>
        :
        null}
       
        {<div> {nominations.length > 0
          ? 
          nominations.map(nomination =>  <div className="nomination">
            <div>
          <Typography className={classes.title} color="textSecondary" gutterBottom> {nomination.Title}</Typography> 
          <Typography variant="h5" component="h2"> {nomination.Year}</Typography>
          <Typography className={classes.pos} color="textSecondary"> {nomination.imdbRating}</Typography>
          <Typography variant="body2" component="p">
       
          <br />
          <div><Button size="small" onClick={e => removeNomination(nomination)}>Remove Nomination</Button> </div>
          </Typography>
          </div>
         
          </div>)
         
          : null} 
          </div >}
    </div>
  );
}

export default App;
