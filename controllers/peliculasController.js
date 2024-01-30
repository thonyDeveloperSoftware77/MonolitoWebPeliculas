
export async function getPeliculas() {
  const res = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1', {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjFhNTg4N2MxNzZhMzAyOTZiMGU4NzBhZGE1Njk2YyIsInN1YiI6IjY1YTVlNWYwZWI2NGYxMDEyOGY0ZTgzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OyadVEsT18O5fh26OgN1fVCrTQRsQh7zVgk0Aep30Zo',
      'accept': 'application/json'
    }
  });
  const data = await res.json();
  return data;
}


export async function getPelicula(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=221a5887c176a30296b0e870ada5696c`, {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjFhNTg4N2MxNzZhMzAyOTZiMGU4NzBhZGE1Njk2YyIsInN1YiI6IjY1YTVlNWYwZWI2NGYxMDEyOGY0ZTgzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OyadVEsT18O5fh26OgN1fVCrTQRsQh7zVgk0Aep30Zo',
      'accept': 'application/json'
    }
  })
  const data = await res.json();
  return data;
}


export async function getGenero() {
  const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=221a5887c176a30296b0e870ada5696c', {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjFhNTg4N2MxNzZhMzAyOTZiMGU4NzBhZGE1Njk2YyIsInN1YiI6IjY1YTVlNWYwZWI2NGYxMDEyOGY0ZTgzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OyadVEsT18O5fh26OgN1fVCrTQRsQh7zVgk0Aep30Zo',
      'accept': 'application/json'
    }

  })
  const data = await res.json();
  return data;
}


export async function getVideoId(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=221a5887c176a30296b0e870ada5696c`, {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjFhNTg4N2MxNzZhMzAyOTZiMGU4NzBhZGE1Njk2YyIsInN1YiI6IjY1YTVlNWYwZWI2NGYxMDEyOGY0ZTgzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OyadVEsT18O5fh26OgN1fVCrTQRsQh7zVgk0Aep30Zo',
      'accept': 'application/json'
    }
  })
  const data = await res.json();
  return data.results[0]?.key;
}



export async function getMoviesTendency(){
  const res = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key={api_key}', {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjFhNTg4N2MxNzZhMzAyOTZiMGU4NzBhZGE1Njk2YyIsInN1YiI6IjY1YTVlNWYwZWI2NGYxMDEyOGY0ZTgzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OyadVEsT18O5fh26OgN1fVCrTQRsQh7zVgk0Aep30Zo',
      'accept': 'application/json'
    }
  })
  
  const data = await res.json();
  return data;
}