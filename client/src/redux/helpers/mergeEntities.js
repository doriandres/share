export default (target, source) => {
    for(let e in source){
        if(!target.hasOwnProperty(e)){
            continue;
        }
        Object.assign(target[e], source[e]);
    }
    return target;
}