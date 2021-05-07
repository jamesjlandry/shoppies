
import './App.css';
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState } from "react"
import film from './film.mp4'


const useStyles = makeStyles({
  nomination: {
    minWidth: 275,
    maxWidth: 500,
    margin: '24px'
  },
  search: {
    minWidth: 300,
    maxWidth: 600,
    margin: "24px;"
  },
 
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function App() {
  const classes = useStyles()
  
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
        <form onSubmit={e => getMovies(e.target.value)}>
          <TextField label="Title" placeholder="Enter Title" onChange={e =>  getMovies(e)}>
          </TextField>
        </form>
        {nominations.length === 5 
        ? 
        <Card>
          <CardContent>
            Congratulations, you have nominated 5 movies!
          </CardContent>
        </Card>
      : 
      null
      }
          {(movies)
          ? 
          <Card className={classes.search}>
            {movies.map(movie => <Card><CardContent><Typography>{movie.Title}</Typography><Typography>{movie.Year}</Typography>
          <CardActions>{nominations.includes(movie) ? <Button disabled size="small" onClick={e => addNomination(movie)}>Nominate</Button> : <Button size="small" onClick={e => addNomination(movie)}>Nominate</Button>} </CardActions></CardContent></Card>)}
          </Card>
        :
        null}
       
        {<div> {nominations.length > 0
          ? 
          nominations.map(nomination =>  <Card className={classes.nomination}>
            <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom> {nomination.Title}</Typography> 
          <Typography variant="h5" component="h2"> {nomination.Year}</Typography>
          <Typography className={classes.pos} color="textSecondary"> {nomination.imdbRating}</Typography>
          <Typography variant="body2" component="p">
       
          <br />
          <CardActions><Button size="small" onClick={e => removeNomination(nomination)}>Remove Nomination</Button> </CardActions>
          </Typography>
          </CardContent>
         
          </Card>)
         
          : null} 
          </div >}
    </div>
  );
}

export default App;
