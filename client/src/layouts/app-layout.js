import {
    LitElement,
    html,
    css
} from 'lit-element';
import {
    defineComponent
} from './../helper/components-definer';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import { connect } from 'pwa-helpers/connect-mixin';
import {isSignedIn} from './../routing/selectors';
import store from '../redux/store';
import { signOut } from '../redux/users/actions';
import redirect from './../helper/redirect';

export default class AppLayout extends connect(store)(LitElement) {
    constructor() {
        super();
        this.isUserSignedIn = isSignedIn(store.getState());
    }
    static get name() {
        return 'app-layout';
    }
    static get styles() {
        return css `
        .content {
            padding: 50px;
        }

        h3 {
            text-align: center;
        }       
        a{
            text-decoration: none;
        }

        vaadin-tab{
            margin-top: 8px;
        }
        `;
    }
    static get properties() {
        return {
            isUserSignedIn: {
                type : Boolean
            }
        };
    }

    handleSignOut(){
        store.dispatch(signOut());
        redirect('/');
    }
    render() {
        return html `
            <vaadin-app-layout>
            <!-- <img slot="branding" referrerpolicy="no-referrer" src="http://www.pngall.com/wp-content/uploads/2/Share-PNG-Free-Download.png" alt="Share Logo" width="75"> -->
            <vaadin-tabs slot="menu">

                ${
                    !this.isUserSignedIn ?

                    html`<a href="/">
                            <vaadin-tab theme="icon-on-top">
                                Sign In
                            </vaadin-tab>
                        </a>
                        <a href="/signup">
                            <vaadin-tab theme="icon-on-top">                
                                Sign Up
                            </vaadin-tab>
                        </a>`
                    : 

                    html`<a href="/feed">
                            <vaadin-tab theme="icon-on-top">                                    
                                Feed                    
                            </vaadin-tab>
                        </a>
                        <a href="/profile">
                            <vaadin-tab theme="icon-on-top">                                    
                                    Profile                    
                            </vaadin-tab>
                        </a>
                        <vaadin-button @click=${this.handleSignOut} theme="tertiary">
                            Sign Out
                        </vaadin-button>
                        `
                }
                
                
            </vaadin-tabs>

            <div class="content">
                <slot></slot>
            </div>
            </vaadin-app-layout>
      `;
    }

    stateChanged(state) {        
        if(isSignedIn(state) !== this.isUserSignedIn){
            this.isUserSignedIn = isSignedIn(state);
        }
    }
}

defineComponent(AppLayout);