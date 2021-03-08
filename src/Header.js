import React, { useEffect, useState } from 'react'
import requests from './requests'
import axios from './axios'
import './Header.css'

const baseURL = "https://image.tmdb.org/t/p/original/";

function Header() {
    
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function getMovie() {
            const request = await axios.get(requests.fetchTrending)
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length)])
        }
        getMovie();
    }, [])

    const truncate = (text, text_size) => {
        return text?.length > text_size-3? text.slice(0,text_size-3) + "...": text
    }

    return (
        <header
            className="banner"
            style = {{ 
                backgroundSize: "cover",
                backgroundImage: `url(${baseURL}${movie?.backdrop_path})`,
                backgroundPosition: "center center"
            }}
        >
            <div className="banner_content">
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>

                <div className="banner_btns">
                    <button className="banner_btn">Play</button>
                    <button className="banner_btn">My List</button>
                </div>

                <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner_fadeBottom"></div>
        </header>
    )
}

export default Header
