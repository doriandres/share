import {
    LitElement,
    html,
    css
} from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import {
    defineComponent
} from './../helper/components-definer';
import './../components/feed-item';
import store from '../redux/store';
import {
    connect
} from 'pwa-helpers/connect-mixin';

export default class NewsFeed extends connect(store)(LitElement) {
    constructor() {
        super();
    }
    static get name() {
        return 'news-feed';
    }
    static get styles() {
        return css `
        feed-item{
            min-width:100%;
        }
        feed-item{
            margin-bottom:50px;
        }
        `;
    }
    static get properties() {
        return {
            myProp: String
        };
    }
    render() {
        return html `
            <vaadin-horizontal-layout>
            <div style="min-width:25%"></div>
            <vaadin-vertical-layout style="min-width:50%">
                <!-- <feed-item></feed-item>
                <feed-item></feed-item>
                <feed-item></feed-item>
                <feed-item></feed-item>
                <feed-item></feed-item>
                <feed-item></feed-item> -->
            </vaadin-vertical-layout>
            <div style="min-width:25%"></div>
            </vaadin-horizontal-layout>
      `;
    }

    stateChanged(state) {
    }
}

defineComponent(NewsFeed);