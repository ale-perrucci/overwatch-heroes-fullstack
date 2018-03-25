import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import heroes from '../reducers/heroes';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      heroes
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
