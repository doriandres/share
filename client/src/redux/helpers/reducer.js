import produce from "immer";

export default (actionType, reducer) => (state, action) => {
    let reduce = false;
    if(Array.isArray(actionType) && actionType.includes(action.type)  || actionType === action.type ){
        reduce = true;
    }
    if(reduce){
        return produce(state, (draft) => reducer(state, draft, action.payload));
    }else{
        return state;
    }
};