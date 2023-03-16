import { createStore, compose, applyMiddleware } from 'redux';
// import { logger } from 'redux-logger'

//root reducer
import { rootReducer } from './root-reducer';

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('Type: ', action.type);
    console.log('Payload: ', action.payload);
    console.log('CurrentState: ', store.getState());

    next(action);

    console.log('NextState: ', store.getState())
}

const middlewares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(rootReducer, undefined, composedEnhancers);
