import defaultState from './../defaultState';
import userReducers from '../users/reducers';
import postReducers from '../posts/reducers'


const reducers = [
    ...userReducers,
    ...postReducers
];

export default (state = defaultState, action) => {    
    for(let reducer of reducers){
        state = reducer(state, action);        
    }
    return state;
};