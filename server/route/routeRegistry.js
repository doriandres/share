const register = (name) => require(`./../controllers/${name}Controller`)
module.exports = ([
    ...register('users'),
    ...register('posts'),
    ...register('comments'),
    ...register('likes'),
    ...register('images')
]);