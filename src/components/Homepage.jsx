import React from "react";
import { Link } from 'react-router-dom';


let api_key="352e0ecc23d7ee370efe13a52b7bdb61";
let genres_list_http="https://api.themoviedb.org/3/genre/movie/list?";
let movie_genres_http="https://api.themoviedb.org/3/discover/movie?";
let img_url="https://image.tmdb.org/t/p/w500";

const setupScrolling=()=>{
    const conainter=[...document.querySelectorAll('.movie-container')];
    const nxtBtn =[...document.querySelectorAll('.nxt-btn')];
    const preBtn =[...document.querySelectorAll('.pre-btn')];

    conainter.forEach((item,i)=>{
        let containerDimensions=item.getBoundingClientRect();
        let containerwidth=containerDimensions.width;

        nxtBtn[i].addEventListener('click',()=>{
            item.scrollLeft+=containerwidth;
        })
        preBtn[i].addEventListener('click',()=>{
            item.scrollLeft-=containerwidth;
        })
    })
}

const main = document.querySelector('.content');

fetch(genres_list_http + new URLSearchParams({
    api_key: api_key
}))
    .then(res => res.json())
    .then(data => {
        data.genres.forEach(item => {
            fetchMoviesListByGenres(item.id, item.name);
        })
    });

const fetchMoviesListByGenres = (id, genres) => {
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1
    }))
        .then(res => res.json())
        .then(data => {
            makeCategoryElement(`${genres}_movies`, data.results)
        })
        .catch(err => console.log(err));
}

const makeCards = (id, data) => {
    const movieContainer = document.getElementById(id);
    data.forEach((item, i) => {
        if (item.backdrop_path == null) {
            item.backdrop_path = item.poster_path;
            if (item.backdrop_path == null) {
                return;
            }
        }
        movieContainer.innerHTML += `
        <div className="movie" onclick="location.href='/${item.id}'">
            <img src=${img_url}${item.backdrop_path} alt="none" />
            <p className="movie-title">${item.title}</p>
        </div>
        `;
        
        if(i===data.length-1){
            setTimeout(()=>{
                setupScrolling();
            },100);
        }
    })
}

const makeCategoryElement = (category, data) => {
    main.innerHTML += `         
    <div className="movie-list">
            <button className="pre-btn"><i className="fas fa-chevron-left"></i></button>
            <h1 className="movie-category">${category.split("_").join(" ")}</h1>
            <div className="movie-container" id={category}></div>
            <button className="nxt-btn"><i className="fas fa-chevron-right"></i></button>
    </div>
    `

    makeCards(category, data);
}


export default function Homepage() {
    return (
        <>
            <header className="main">
                <h1 className="heading">movies</h1>
                <p className="info">Movies move us like nothing else can, whether they're scary, funny, <br /> dramatic, romantic or
                    anywhere in-between. So manny titles, so much to expreience</p>
            </header>
            <div className="content"></div>
            <Link to="/about">Go to about page</Link>
        </>
    )
}
