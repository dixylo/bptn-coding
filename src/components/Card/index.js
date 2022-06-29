import './styles.css';

const Card = ({ movie, liked, onLikeToggle }) => {
  const baseUrl = 'https://www.themoviedb.org/t/p/w440_and_h660_face';

  const handleClick = () => {
    if (onLikeToggle) {
      onLikeToggle(movie.id);
    }
  };

  return (
    <li className='card'>
      <img src={`${baseUrl}${movie.poster_path}`} alt={movie.title} />
      <div className='text'>
        <p className='title'>{movie.title}</p>
        <div className='footer'>
          <p className='date'>{movie.release_date}</p>
          <p className='like-toggle' onClick={handleClick}>
            {liked ? <><span className='heart liked'>&#9829;</span>Unlike</> : <><span className='heart'>&#9825;</span>Like</>}
          </p>
        </div>
      </div>
    </li>
  );
};

export default Card;
