import {
    LitElement,
    html,
    css
} from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import store from '../redux/store';
import {
    connect
} from 'pwa-helpers/connect-mixin';
import {
    requestSignIn,
    signInInProgress,
    restoreSignIn
} from './../redux/users/actions'

import {
    defineComponent
} from './../helper/components-definer';

import '@vaadin/vaadin-dialog/vaadin-dialog';
import {
    signInRequestResult
} from '../redux/users/selectors';
import showDialog from '../helper/showDialog';
import redirect from '../helper/redirect';

export default class SignIn extends connect(store)(LitElement) {
    constructor() {
        super();
    }
    static get name() {
        return 'sign-in';
    }
    static get styles() {
        return css `
            vaadin-button{
                margin-top: 25px;
            }
        `;
    }

    get emailField() {
        return this.shadowRoot.querySelector('vaadin-email-field');
    }
    get passwordField() {
        return this.shadowRoot.querySelector('vaadin-password-field');
    }
    get emailValue() {
        return (this.emailField || {}).value || '';
    }
    get passwordValue() {
        return (this.passwordField || {}).value || '';
    }

    get dialog() {
        return this.shadowRoot.querySelector('vaadin-dialog');
    }

    isValid() {

        if (!this.emailField.checkValidity()) {
            return false;
        }
        if (!this.passwordField.checkValidity()) {
            return false;
        }

        return true;
    }
    submit() {
        if (this.isValid()) {
            store.dispatch(requestSignIn({
                email: this.emailValue,
                password: this.passwordValue,
            }))
        }
    }

    showError() {
        this.dialog.renderer = this.buildErrorDialog;
        this.dialog.opened = true;
    }

    render() {
        return html `
                <vaadin-horizontal-layout>
                    <div style="min-width: 35%;"></div>
                    <div style="min-width: 30%;">
                        <h1>Sign In</h1>
                        <vaadin-form-layout >
                            <vaadin-email-field  label="Email" name="email"  placeholder="Enter email" error-message="Please enter a valid email address" clear-button-visible required></vaadin-email-field>
                            <vaadin-password-field  label="Password" placeholder="Enter password" value="" required></vaadin-password-field>                            
                            <vaadin-button  theme="primary" @click=${this.submit}>Sign In</vaadin-button>
                            <span style="text-align:center; margin-top: 15px; color:#1676f3;"><a href="/signup">Sign Up</a></span>
                            
                        </vaadin-form-layout>
                    </div>
                    <div style="min-width: 35%;"></div>
                </vaadin-horizontal-layout>
                <vaadin-dialog no-close-on-esc no-close-on-outside-click></vaadin-dialog>
      `;
    }
    stateChanged(state) {
        if (signInInProgress(state) && signInRequestResult(state)) {
            store.dispatch(restoreSignIn());
            if (signInRequestResult(state) === 'succeded') {
                redirect('/profile');
            } else {
                showDialog(this.dialog, 'Invalid credentials');
            }
        }
    }
}

defineComponent(SignIn);