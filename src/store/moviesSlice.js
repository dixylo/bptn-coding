import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};

const initialState = {
  items: [],
  likedIds: [],
  status: STATUS.IDLE,
  error: null,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const endpoint = 'https://api.themoviedb.org/3/movie/popular?api_key=d0f5f2e135336200362af8a1a73acb17';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.results;    
  } catch (error) {
    console.log(error);
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const movieId = action.payload;
      const index = state.likedIds.findIndex((item) => item === movieId);
      if (index > -1) {
        state.likedIds.splice(index, 1);
      } else {
        state.likedIds.push(movieId);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { toggleLike } = moviesSlice.actions;

export const selectAllMovies = (state) => state.movies.items;

export const selectLikedIds = (state) => state.movies.likedIds;

export const selectLikedMovies = (state) => state.movies.items.filter(item => state.movies.likedIds.includes(item.id));

export const selectMoviesStatus = (state) => state.movies.status;

export default moviesSlice.reducer;
