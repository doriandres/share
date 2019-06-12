export default (url) => {
    window.history.pushState(null, null, url);
    window.dispatchEvent(new PopStateEvent('popstate'));
}