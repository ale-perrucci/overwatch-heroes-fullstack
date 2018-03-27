import * as actions from '../actions/heroes';

const INITIAL_STATE = {
  list: [],
  filter: '',
  lastname: '',
  isLoading: false,
  allHeroesLoaded: false,
  filterList: [] //only the heroes found with filtered search
};

function addHeroesAndSort (list, newHeroes) {
  let newList = newHeroes.reduce((heroes, hero) => {
    if (heroes.find(h => h._id === hero._id) === undefined) {
      heroes.push(hero);
      
    }
    return heroes;
  }, [...list]);

  newList = newList.sort((a, b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });

  return newList;
}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.LOAD_START:
      return {
        ...state, isLoading: true
      };
    case actions.LOAD_SUCCESS:
      const { list, done, filtered } = action.payload;
      
      if (filtered) {
        return { ...state, isLoading: false, filterList: list };
      }

      const lastname = list.length > 0 ? list[list.length - 1].name : state.lastname;
      const newList = addHeroesAndSort(state.list, list);
      return {
        ...state, list: newList, lastname, isLoading: false, allHeroesLoaded: done
      };
    case actions.FILTER:
      return {
        ...state, filter: action.payload, filterList: action.payload.length === 0 ? [] : state.filterList
      }
    default:
      return state;
  }
};