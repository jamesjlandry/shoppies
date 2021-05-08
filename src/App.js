
import './App.css';
import { useState } from "react"
import film from './film.mp4'
import { TextField } from '@material-ui/core'


function App() {
 
  
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
        <div className="nominate_wrapper">
        <form className="search"  onSubmit={e => getMovies(e.target.value)}>
        <TextField label="Film Search" placeholder="Enter Title" onChange={e =>  getMovies(e)}>
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
            {movies.map(movie => <div><div><div>{movie.Title}</div><div>{movie.Year}</div>
          <div>{nominations.includes(movie) ? <button disabled size="small" onClick={e => addNomination(movie)}>Nominate</button> : <button size="small" onClick={e => addNomination(movie)}>Nominate</button>} </div></div></div>)}
          </div>
        :
        null}
       
        {<div> {nominations.length > 0
          ? 
          nominations.map(nomination =>  <div className="nomination">
            <div>
          <div className="title" color="textSecondary" gutterBottom> {nomination.Title}</div> 
          <div variant="h5" component="h2"> {nomination.Year}</div>
          <div color="textSecondary"> {nomination.imdbRating}</div>
          <div variant="body2" component="p">
       
          <br />
          <div><button size="small" onClick={e => removeNomination(nomination)}>Remove Nomination</button> </div>
          </div>
          </div>
         
          </div>)
         
          : null} 
          </div >}
          </div>
    </div>
  );
}

export default App;
