import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'
import { rootSaga } from '../sagas/index';
// export default function configureStore(initialState){
//     const store =  createStore(rootReducer,initialState)
//     return store
// }


const sagaMiddleware = createSagaMiddleware();
// Redux: Store
const store = createStore(
  rootReducer,
  applyMiddleware(
    sagaMiddleware
  ),
);


// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);
export {
    store
  }