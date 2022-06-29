import { useSelector, useDispatch } from "react-redux";
import { selectLikedMovies, toggleLike } from "../store/moviesSlice";
import Card from '../components/Card';
import './styles.css';

const Likes = () => {
  const likedMovies = useSelector(selectLikedMovies);
  const dispatch = useDispatch();

  const handleLikeToggle = (movieId) => {
    dispatch(toggleLike(movieId));
  };

  return (
    <div className="container">
      <h1>Liked Movies</h1>
      {likedMovies.length ? (
        <ul className="movie-list">
          {likedMovies.map((item) => {
            return (
              <Card
                key={item.id}
                movie={item}
                liked={true}
                onLikeToggle={handleLikeToggle}
              />
            );
          })}
        </ul>
      ) : (
        <h3>You don't have any liked movies.</h3>
      )}
    </div>
  );
};

export default Likes;
