import {
    LitElement,
    html,
    css
} from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';

import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-upload/vaadin-upload';
import {
    defineComponent
} from './../helper/components-definer';
import './../components/feed-item';
import store from '../redux/store';
import { connect } from 'pwa-helpers/connect-mixin';
import { getSignedUser } from '../redux/users/selectors';
import dateFormatter from '../helper/dateFormatter';
import './../components/post-creator';
import { getSignedUserPosts } from '../redux/posts/selectors';

export default class UserProfile extends connect(store)(LitElement) {
    constructor() {
        super();

        let user = getSignedUser(store.getState());
        
        this.userName = user.name;
        this.userLastName = user.lastName;
        this.userFollowers = user.followers;
        this.userFollowing = user.following;
        this.userBirthday = user.birthday;
        this.userGender = user.gender;
        this.userPosts = [];
    }
    static get name() {
        return 'user-profile';
    }
    static get styles() {
        return css `
            vaadin-vertical-layout > *{
                min-width:100%;
            }
            feed-item{
                margin-bottom:50px;
            }
            vaadin-horizontal-layout > * {
                margin-right: 20px;
            }
        `;
    }
    static get properties() {
        return {
            userName : {type : String },
            userLastName : {type : String },
            userFollowers : {type : Array },
            userFollowing : {type : Array },
            userBirthday : {type : Date },
            userGender : {type : String },
            userPosts : {type: Array}
        };
    }    
    

    render() {
        return html `
        <vaadin-horizontal-layout>
            <div style="min-width:25%"></div>
            <vaadin-vertical-layout style="min-width:50%">
                <vaadin-horizontal-layout style="margin-bottom:40px;">
                    <vaadin-vertical-layout>
                        <img src="https://png.pngtree.com/svg/20160307/52c66f1f8b.png" style="max-width:150px; max-height:150px;">
                        <vaadin-button theme="primary" style="width:100%" disabled>
                            Follow                            
                        </vaadin-button>
                    </vaadin-vertical-layout>
                    
                    <vaadin-vertical-layout>
                        <vaadin-horizontal-layout>
                            <p>
                                ${this.userName} ${this.userLastName}
                            </p>
                            <vaadin-button>
                                Edit Profile
                            </vaadin-button>
                        </vaadin-horizontal-layout>

                        <b>Information</b>
                        <span>${this.userGender}</span>
                        <span>${ dateFormatter(this.userBirthday) }</span>

                        <vaadin-horizontal-layout style="margin-top:20px">
                            <vaadin-button>
                                ${this.userFollowers.length} Followers
                            </vaadin-button>
                            <vaadin-button>
                            ${this.userFollowing.length} Following
                            </vaadin-button>
                        </vaadin-horizontal-layout>
                    </vaadin-vertical-layout>
                </vaadin-horizontal-layout>

                <post-creator style="width:100%"></post-creator>

                <vaadin-vertical-layout>
                    ${
                        this.userPosts.map( p => html`<feed-item .post="${p}"></feed-item>`)
                    }                                        
                </vaadin-vertical-layout>
            </vaadin-vertical-layout>
            <div style="min-width:25%"></div>
      `;
    }
    stateChanged(state) {
        let posts = getSignedUserPosts(state);
        if(posts.length !== this.userPosts.length){
            this.userPosts = posts;
        }
    }
}

defineComponent(UserProfile);