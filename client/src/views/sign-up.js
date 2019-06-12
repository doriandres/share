import {
    LitElement,
    html,
    css
} from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-select/vaadin-select';
import '@vaadin/vaadin-item/vaadin-item';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import store from '../redux/store';
import {
    connect
} from 'pwa-helpers/connect-mixin';
import {
    defineComponent
} from '../helper/components-definer';

import showDialog from '../helper/showDialog';
import redirect from '../helper/redirect';
import { requestSignUp, restoreSignUp } from '../redux/users/actions';
import { isSignUpInProgress, signUpRequestResult } from '../redux/users/selectors';

export default class SignUp extends connect(store)(LitElement) {
    constructor() {
        super();
    }
    static get name() {
        return 'sign-up';
    }
    static get styles() {
        return css `
            vaadin-button{
                margin-top: 25px;
            }
            vaadin-vertical-layout, vaadin-vertical-layout > * {
                min-width: 100%;
            }
        `;
    }
    // static get properties() {
    //     return {

    //     };
    // }

    get nameField() {
        return this.shadowRoot.querySelector('[name=first-name]');
    }
    get lastNameField() {
        return this.shadowRoot.querySelector('[name=last-name]');
    }
    get emailField() {
        return this.shadowRoot.querySelector('[name=email]');
    }
    get passwordField() {
        return this.shadowRoot.querySelector('[name=password]');
    }
    get birthdayField() {
        return this.shadowRoot.querySelector('[name=birthday]');
    }
    get genderField() {
        return this.shadowRoot.querySelector('[name=gender]');
    }
    get dialog() {
        return this.shadowRoot.querySelector('vaadin-dialog');
    }

    isValid() {
        if (!this.nameField.checkValidity()) {
            return false;
        }
        if (!this.lastNameField.checkValidity()) {
            return false;
        }
        if (!this.emailField.checkValidity()) {
            return false;
        }
        if (!this.passwordField.checkValidity()) {
            return false;
        }
        if (!this.birthdayField.checkValidity()) {
            return false;
        }
        if (!this.genderField.validate()) {
            return false;
        }
        return true;
    }

    submit() {
        if (this.isValid()) {
            store.dispatch(requestSignUp({
                name: this.nameField.value,
                lastName: this.lastNameField.value,
                email: this.emailField.value,
                password: this.passwordField.value,
                birthday: this.birthdayField.value,
                gender: this.genderField.value
            }))
        }
    }

    render() {
        return html `
                <vaadin-horizontal-layout>
                    <div style="min-width: 30%;"></div>
                    <div style="min-width: 40%;">
                        <h1>Sign Up</h1>
                        <vaadin-form-layout>
                            <vaadin-vertical-layout>
                                <vaadin-horizontal-layout >
                                    <vaadin-text-field label="First Name" name="first-name" placeholder="Enter name" value="" style="min-width: 49%;" required></vaadin-text-field>
                                    <div style="min-width: 1%;"></div>
                                    <vaadin-text-field label="Last Name" name="last-name" placeholder="Enter lastname" value="" style="min-width: 49%;" required></vaadin-text-field>
                                </vaadin-horizontal-layout>
                                <vaadin-horizontal-layout>
                                    <vaadin-email-field label="Email" name="email" placeholder="Enter email" error-message="Please enter a valid email address" clear-button-visible style="min-width: 49%;" required></vaadin-email-field>
                                    <div style="min-width: 1%;"></div>
                                    <vaadin-password-field label="Password" name="password" placeholder="Enter password" value="" style="min-width: 49%;" required></vaadin-password-field>
                                </vaadin-horizontal-layout>
                                <vaadin-horizontal-layout>
                                    <vaadin-date-picker  label="Birthday" name="birthday" placeholder="Select birthday" value="" style="min-width: 49%;" max="2010-01-01" min="1900-01-01" required></vaadin-date-picker>
                                    <div style="min-width: 1%;"></div>
                                    <vaadin-select label="Gender" style="min-width: 49%;" name="gender" placeholder="Select gender" required>
                                        <template>
                                            <vaadin-list-box>
                                                <vaadin-item>Male</vaadin-item>
                                                <vaadin-item>Female</vaadin-item>
                                                <vaadin-item>Other</vaadin-item>
                                            </vaadin-list-box>
                                        </template>
                                    </vaadin-select>
                                </vaadin-horizontal-layout>
                                
                                <vaadin-button  theme="primary" @click=${this.submit}>Sign Up</vaadin-button>
                                <span style="text-align:center; margin-top: 15px; color:#1676f3;" ><a href="/">Sign In</a></span>
                            </vaadin-vertical-layout>
                        </vaadin-form-layout>
                    </div>
                    <div style="min-width: 30%;"></div>
                </vaadin-horizontal-layout>
                <vaadin-dialog no-close-on-esc no-close-on-outside-click></vaadin-dialog>
      `;
    }
    stateChanged(state) {        
        if(isSignUpInProgress(state) && signUpRequestResult(state)){
            store.dispatch(restoreSignUp());
            if(signUpRequestResult(state) === 'succeded'){
                redirect('/profile');
            }else{                
                showDialog(this.dialog, 'User already exists');
            }            
        }
    }
}

defineComponent(SignUp);