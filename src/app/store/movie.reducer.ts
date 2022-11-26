/* eslint-disable @typescript-eslint/naming-convention */
import * as movieActions from './movie.actions';
import { Movie } from './movie.model';

const initalState = {
  movies: [
    // {
    //   adult: false,
    //   backdrop_path: '/yizL4cEKsVvl17Wc1mGEIrQtM2F.jpg',
    //   genre_ids: [28, 878, 12],
    //   id: 588228,
    //   original_language: 'en',
    //   original_title: 'The Tomorrow War',
    //   overview: 'sdfsdfsdfsdfs',
    //   popularity: 4564.402,
    //   poster_path: '/34nDCQZwaEvsy4CFO5hkGRFDCVU.jpg',
    //   release_date: '2021-09-03',
    //   title: 'The Tomorrow War',
    //   video: false,
    //   vote_average: 8,
    //   vote_count: 199,
    // },
  ],
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function movieReducer(
  state = initalState,
  action: movieActions.GetMovies
) {
  switch (action.type) {
    case movieActions.GET_MOVIES:
      return {
        ...state,
        movies: [...action.payload],
      };
    default:
      return state;
  }
}
