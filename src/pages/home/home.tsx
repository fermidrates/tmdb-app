import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const API_KEY: string = "9f8447ca9d50e28a63db5aefbe109758";
  const [movieList, setMovieList] = useState<any>();

  useEffect(() => {
    fetchLatestMovies();
  }, []);

  const fetchLatestMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovieList(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* header */}
      <header>
        <img src={"logo192.png"} alt="logo" width="50" />
        <button onClick={() => navigate("/")}>Logout</button>
      </header>

      {/* content */}
      <section>
        <h1>Most Popular Movies</h1>
        {movieList?.map((movie: any, index: number) => (
          <div key={movie.id}>
            <h4>{`${index + 1}. ${movie.title}`}</h4>
            <p>Popularity: {movie.popularity}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;
