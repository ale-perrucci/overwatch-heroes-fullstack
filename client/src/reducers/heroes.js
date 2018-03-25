import * as actions from '../actions/heroes';

const INITIAL_STATE = {
  list: [],
  filter: '',
  lastname: '',
  isLoading: false,
  allHeroesLoaded: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.LOAD_START:
      return {
        ...state, isLoading: true
      };
    case actions.LOAD_SUCCESS:
      const { list, allHeroesLoaded } = action.payload;
      const lastname = list.length > 0 ? list[list.length - 1].name : state.lastname;

      let newList = list.reduce((heroes, hero) => {
        if (heroes.find(h => h._id === hero._id) === undefined) {
          heroes.push(hero);
        }
        return heroes;
      }, [...state.list]);

      newList = newList.sort((a, b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });

      return {
        ...state, list: newList, lastname, isLoading: false, allHeroesLoaded
      };
    case actions.FILTER:
      const text = action.payload;
      const newLastname = text.startsWith(state.filter) ? state.lastname : '';
      var filteredList = state.list.filter(h => h.name.startsWith(text) || h.name_plain.startsWith(text));
      return {
        ...state, list: filteredList, filter: text, allHeroesLoaded: false, lastname: newLastname
      }
    default:
      return state;
  }
};