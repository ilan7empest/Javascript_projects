const MovieDetails = ({
  Poster,
  Title,
  Genre,
  Plot,
  Awards,
  BoxOffice,
  Metascore,
  imdbRating,
  imdbVotes,
}) => {
  const totalAwards = Awards.split(' ').reduce((sum, curr) => {
    curr = parseInt(curr);
    if (!isNaN(curr)) sum += curr;

    return sum;
  }, 0);
  return `<article class="media">
        <figure class="media-left">
            <p class="image">
                <img src=${Poster} />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${Title}</h1>
                <h4>${Genre}</h4>
                <p>${Plot}</p>
            </div>
        </div>
    </article>
    <article class="notification is-primary" data-value=${totalAwards}>
        <p class="title">${Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary" data-value=${Number.parseInt(
      BoxOffice ? BoxOffice.slice(1).replace(/,/g, '') : 0
    )}>
        <p class="title">${BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary" data-value=${parseInt(Metascore)}>
        <p class="title">${Metascore}</p>
        <p class="subtitle">Meta Score</p>
    </article>
    <article class="notification is-primary" data-value=${parseFloat(
      imdbRating
    )}>
        <p class="title">${imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary" data-value=${parseInt(
      imdbVotes.replace(/,/g, '')
    )}>
        <p class="title">${imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>`;
};

export default MovieDetails;
