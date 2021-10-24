export default function About() {
    let movie_id = window.location.pathname;
    let api_key="352e0ecc23d7ee370efe13a52b7bdb61";
    let img_url="https://image.tmdb.org/t/p/w500";
    let movie_detail_http ="https://api.themoviedb.org/3/movie";
    let original_img_url="https://image.tmdb.org/t/p/original";

    // console.log(movie_id);

    //fetching movie details
    fetch(`${movie_detail_http}${movie_id}?` + new URLSearchParams({
        api_key: api_key
    }))

        .then(res => res.json())
        .then(data => {
            setupMovieInfo(data);
        })

    const setupMovieInfo = (data) => {
        const movieName = document.querySelector('.movie-name');
        const genres = document.querySelector('.genres');
        const des = document.querySelector('.des');
        const title = document.querySelector('title');
        const backdrop = document.querySelector('.movie-info');

        title.innerHTML = movieName.innerHTML = data.title;
        genres.innerHTML = `${data.release_date.split('-')[0]} | `;
        for (let i = 0; i < data.genres.length; i++) {
            genres.innerHTML += data.genres[i].name + formatString(i, data.genres.length);
        }
        if (data.adult === true) {
            genres.innerHTML += ' | +18';
        }
        if (data.backdrop_path == null) {
            data.backdrop_path = data.poster_path;
        }
        des.innerHTML = data.overview.substring(0, 200) + '...';

        backdrop.style.backgroundImage = `url(${original_img_url}${data.backdrop_path})`;
    }

    const formatString = (currentIndex, maxIndex) => {
        return (currentIndex === maxIndex - 1) ? '' : ', ';
    }

    //CASTE INFO

    fetch(`${movie_detail_http}${movie_id}/credits?` + new URLSearchParams({
        api_key: api_key
    }))
        .then(res => res.json())
        .then(data => {

            const cast = document.querySelector('.starring');
            for (let i = 0; i < 5; i++) {
                cast.innerHTML += data.cast[i].name + formatString(i, 5);
            }
        })


    //video clips
    fetch(`${movie_detail_http}${movie_id}/videos?` + new URLSearchParams({
        api_key: api_key
    }))
        .then(res => res.json())
        .then(data => {

            let trailerContainer = document.querySelector('.trailer-container');

            let maxClips = (data.results.length > 4) ? 4 : data.results.length;

            for (let i = 0; i < maxClips; i++) {
                trailerContainer.innerHTML += `
            <iframe src="https://youtube.com/embed/${data.results[i].key}" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        `;
            }
        })

    //Fetch REcomendation
    fetch(`${movie_detail_http}${movie_id}/recommendations?` + new URLSearchParams({
        api_key: api_key
    }))
        .then(res => res.json())
        .then(data => {
            let container = document.querySelector('.recommendation-container');
            for (let i = 0; i < 16; i++) {
                if (data.results[i].backdrop_path == null) {
                    i++;
                }
                container.innerHTML += `
        <div className="movie" onclick="location.href='/${data.results[i].id}'">
                <img src="${img_url}${data.results[i].backdrop_path}" alt="">
                <p className="movie-title">${data.results[i].title}</p>
        </div>
        `;
            }
        })

    return (
        <>
           
        </>
    )
}