import {applyMiddleware, createStore, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk), DevTools.instrument())
    );

    return store;
}
