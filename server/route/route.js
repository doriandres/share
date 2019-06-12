const route = (url, handler, method = 'get') => ({url : `/api/${url}`, handler, method : method.toLowerCase()});
module.exports = route;