import {
    LitElement,
    html,
    css
} from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-button/vaadin-button';
import store from '../redux/store';
import { connect } from 'pwa-helpers/connect-mixin';
import {
    defineComponent
} from '../helper/components-definer';
import { getUserById } from '../redux/users/selectors';

export default class FeedItem extends connect(store)(LitElement) {
    constructor() {
        super();
        this.post = {};
    }
    static get name() {
        return 'feed-item';
    }
    static get styles() {
        return css `
            vaadin-horizontal-layout > * {
                margin-right: 20px;
            }
        `;
    }
    static get properties() {
        return {
            post: Object
        };
    }

    get userName(){
        let user = getUserById(store.getState(), this.post.user);
        return user.name + ' ' + user.lastName;
    }

    render() {
        return html `
                <vaadin-vertical-layout>
                    <vaadin-horizontal-layout>
                        <img src="https://png.pngtree.com/svg/20160307/52c66f1f8b.png" width="50px">
                        <p>
                            ${this.userName}
                        </p>
                    </vaadin-horizontal-layout>
                    <p>
                        ${this.post.content}
                    </p>
                    <div style="text-align:center; width:100%">
                        <img src="${`http://localhost:3000/api/image/${this.post.image}`}" style="max-width: 100%; margin-bottom: 10px">
                    </div>                    
                    <vaadin-horizontal-layout>
                        <vaadin-button  theme="success">Like (${this.post.likes.length})</vaadin-button>
                        <vaadin-button>Comment (${this.post.comments.length})</vaadin-button>
                    </vaadin-horizontal-layout>                    
                </vaadin-vertical-layout>
      `;
    }
    stateChanged(state) {
    }
}

defineComponent(FeedItem);