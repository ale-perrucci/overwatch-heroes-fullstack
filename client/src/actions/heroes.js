import axios from 'axios';

export const LOAD_START = 'heroes/LOAD_START';
export const LOAD_SUCCESS = 'heroes/LOAD_SUCCESS';
export const LOAD_FAILURE = 'heroes/LOAD_FAILURE';
export const FILTER = 'heroes/FILTER';

export const loadHeroesStart = () => ({
  type: LOAD_START
});

export const loadHeroesSuccess = (heroes, filter, allHeroesLoaded) => ({
  type: LOAD_SUCCESS,
  payload: {list: heroes, filter, allHeroesLoaded}
});

export const loadHeroesFailure = (error) => ({
  type: LOAD_FAILURE,
  payload: error
});

export const filterByName = (filter) => ({
  type: FILTER,
  payload: filter
});

export const loadHeroes = (limit) => async (dispatch, getState) => {
  dispatch(loadHeroesStart());
  const { filter, lastname } = getState().heroes;
  axios.get('/api/heroes', {
    params: {
      filter,
      lastname,
      limit
    }
  })
  .then(res => {
    dispatch(loadHeroesSuccess(res.data.heroes, res.data.done));
  })
  .catch(error => {
    dispatch(loadHeroesFailure(error));
  });
};


export const filterHeroes = (text) => async (dispatch, getState) => {
  await dispatch(filterByName(text));
  dispatch(loadHeroes(3));
};
