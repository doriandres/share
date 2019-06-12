import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import sagaRegistry from './registry/sagaRegistry';
import reducerRegistry from "./registry/reducerRegistry";
import defaultState from "./defaultState";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducerRegistry, defaultState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagaRegistry);

window.store = store;

export default store;