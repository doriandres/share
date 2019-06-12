import {
    Router
} from '@vaadin/router';

import SignIn from './../views/sign-in';
import SignUp from './../views/sign-up';
import NotFound from './../views/not-found';
import NewsFeed from '../views/news-feed';
import UserProfile from '../views/user-profile';
import { isSignedIn } from './selectors';
import store from '../redux/store';

const outlet = document.querySelector('app-layout');
const router = new Router(outlet);

const route = (path, component, action) => ({
    path,
    component : component.name,
    action
});

router.setRoutes([
    route('/', SignIn, (req, {component, redirect})=>{
        if(isSignedIn(store.getState())){
            return redirect('/profile');
        }
    }),
    route('/signup', SignUp, (req, {component, redirect})=>{
        if(isSignedIn(store.getState())){
            return redirect('/profile');
        }
    }),
    route('/feed', NewsFeed,  (req, {component, redirect})=>{
        if(!isSignedIn(store.getState())){
            return redirect('/');
        }
    }),
    route('/profile', UserProfile, (req, {component, redirect})=>{
        if(!isSignedIn(store.getState())){
            return redirect('/');
        }
    }),
    route('(.*)', NotFound)
]);
