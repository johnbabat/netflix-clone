import React, { useState, useEffect } from 'react'
import axios from './axios'
import requests from './requests';
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer'
import axios2 from './axios2'

const baseUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            const moviesWithImage = request.data.results.filter(movie => isLargeRow? movie.poster_path != null : movie.backdrop_path != null)
            setMovies(moviesWithImage)
            return requests;
        }
        fetchData();
    }, [fetchUrl, isLargeRow]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            origin: 'https://www.youtube.com'
        }
    };

    async function searchMovie(name) {
        const request = await axios2.get(`${name} official trailer`);
        setTrailerUrl(request.data.items[0].id.videoId);
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("")
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_title)
            .then((url) => {
                if (!url) {
                    searchMovie(movie.name)
                } else {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }
            })
            .catch((error) => console.log('hey', error))
        }
    };

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="posters_row">
                {movies.map((movie) => (
                    <img
                        key = {movie.id}
                        onClick={() => handleClick(movie)}
                        className = {`poster ${isLargeRow && "poster_large"}`}
                        src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt = {movie.name} 
                    />
                ))}
            </div>
            
            { trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
            
        </div>
    )
}

export default Row
