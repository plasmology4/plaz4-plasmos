import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import persistState from 'redux-localstorage'
import rootReducer from '../reducers';

export default function configureStore(initialState) {

  const paths = ['session', 'qboAuth'];
  
  const STORAGE_NAME = 'plaz4-plasmos'
  //const STORAGE_TYPE = 'localStorage'
  
  const config = {
    key: STORAGE_NAME
  };

  const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(logger),
    persistState(paths, config),
  )

  //const storage = smoothStorage(STORAGE_NAME, STORAGE_TYPE)

//const storage = smoothStorage(STORAGE_NAME, STORAGE_TYPE)
//const initialState = {}
// destructure here
// const {  watch,
// hydrateState
// } = storage


// const middleware = process.env.NODE_ENV === 'production' ?
// [watch, thunk] :
// [watch, logger(), thunk ]


//const store = applyMiddleware(...middleware)(createStore)(rootReducer, hydrateState() || initialState )



  return createStore(
    rootReducer,
    initialState,
    enhancer
  );

}