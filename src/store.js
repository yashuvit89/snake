import { createStore } from 'redux'
import rootReducer from './reducers/index'
import {startGame, stopGame} from './actions/actionCreators'


let store = createStore(rootReducer);

console.log(store.getState());

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)


store.dispatch(startGame());
store.dispatch(stopGame());

unsubscribe();

export default store;
