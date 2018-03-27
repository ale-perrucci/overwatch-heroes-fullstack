import axios from 'axios';

export const LOAD_START = 'heroes/LOAD_START';
export const LOAD_SUCCESS = 'heroes/LOAD_SUCCESS';
export const LOAD_FAILURE = 'heroes/LOAD_FAILURE';
export const FILTER = 'heroes/FILTER';

export const loadHeroesStart = (filter, lastname) => ({
  type: LOAD_START,
  payload: { filter, lastname }
});

export const loadHeroesSuccess = (heroes, done, filtered) => ({
  type: LOAD_SUCCESS,
  payload: { list: heroes, done, filtered }
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
  const { filter, lastname } = getState().heroes;
  dispatch(loadHeroesStart(filter, lastname));
  axios.get('/api/heroes', {
    params: {
      filter,
      lastname,
      limit
    }
  })
  .then(res => {
    dispatch(loadHeroesSuccess(res.data.heroes, res.data.done, filter.length > 0));
  })
  .catch(error => {
    dispatch(loadHeroesFailure(error));
  });
};


export const filterHeroes = (text) => async (dispatch, getState) => {
  await dispatch(filterByName(text));

  const { lastname, allHeroesLoaded } = getState().heroes;
  if (!allHeroesLoaded && text.length > 0 && text.toLowerCase() >= lastname.toLowerCase().slice(0, text.length))
    dispatch(loadHeroes());
};
