import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllMovies, selectLikedIds, selectMoviesStatus, STATUS, fetchMovies, toggleLike } from "../store/moviesSlice";
import Card from '../components/Card';
import './styles.css';

const Home = () => {
  const movies = useSelector(selectAllMovies);
  const likedIds = useSelector(selectLikedIds);
  const moviesStatus = useSelector(selectMoviesStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (moviesStatus === STATUS.IDLE) {
      dispatch(fetchMovies());
    }
  }, [moviesStatus, dispatch]);

  const handleLikeToggle = (movieId) => {
    dispatch(toggleLike(movieId));
  };

  return (
    <div className="container">
      <h1>All Movies</h1>
      {movies.length ? (
        <ul className="movie-list">
          {movies.map((item) => {
            return (
              <Card
                key={item.id}
                movie={item}
                liked={likedIds.includes(item.id)}
                onLikeToggle={handleLikeToggle}
              />
            );
          })}
        </ul>
      ) : (
        <h3>No movie found. Please refresh the page.</h3>
      )}
    </div>
  );
};

export default Home;
