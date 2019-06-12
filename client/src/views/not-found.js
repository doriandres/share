import {
    LitElement,
    html,
    css
} from 'lit-element';

import {
    defineComponent
} from './../helper/components-definer';
import store from '../redux/store';
import { connect } from 'pwa-helpers/connect-mixin';

export default class NotFound extends connect(store)(LitElement) {
    constructor() {
        super();
    }
    static get name() {
        return 'not-found';
    }
    static get styles() {
        return css ``;
    }
    static get properties() {
        return {
            myProp: String
        };
    }
    render() {
        return html `
        <h1>
            Not Found
        </h1>
      `;
    }
    stateChanged(state) {
    }
}

defineComponent(NotFound);