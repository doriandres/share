import {
    LitElement,
    html,
    css
} from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-button/vaadin-button';
import store from '../redux/store';
import {
    connect
} from 'pwa-helpers/connect-mixin';
import {
    defineComponent
} from '../helper/components-definer';
import { requestPostSave, restorePostSave } from '../redux/posts/actions';
import { getSignedUser } from '../redux/users/selectors';
import { isPostSaveInProgress, postSaveRequestResult } from '../redux/posts/selectors';

export default class PostCreator extends connect(store)(LitElement) {
    constructor() {
        super();
        this.showImagePreview = false;
        this.imagePreviewSource = '';
    }
    static get name() {
        return 'post-creator';
    }
    static get styles() {
        return css `
            vaadin-horizontal-layout > * {
                margin-right: 20px;
            }
            vaadin-vertical-layout > *{
                min-width:100%;
            }
        `;
    }
    static get properties() {
        return {
            showImagePreview: {
                type: Boolean
            },
            imagePreviewSource: {
                type: String
            }
        };
    }
    get uploadField() {
        return this.shadowRoot.querySelector('vaadin-upload');
    }

    get contentField() {
        return this.shadowRoot.querySelector('vaadin-text-area');
    }

    validate() {
        if (!this.contentField.value || !this.imagePreviewSource) {
            return false;
        }
        return true;
    }

    submitPost() {
        if(this.validate()){
            let post = {
                content : this.contentField.value,
                date : new Date(),
                image : this.imagePreviewSource,
                user : getSignedUser(store.getState())._id
            }
            if(!post.image){
                delete post.image;
            }
            store.dispatch(requestPostSave(post));
        }
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            if (file) {
                var reader = new FileReader();
                reader.addEventListener("load", () => resolve(reader.result), false);
                reader.readAsDataURL(file);
            } else {
                reject('no file');
            }
        })
    }

    async uploadRequest(event) {
        event.preventDefault();
        const {
            detail
        } = event;
        let base64 = await this.getBase64(detail.file);
        detail.xhr.setRequestHeader('Content-Type', 'application/json');
        detail.xhr.send(JSON.stringify({
            isBase64: true,
            source: base64
        }));
    }

    removeFile(){
        this.displayImagePreview('');
    }

    uploadResponse(event) {
        const { detail } = event;
        let res = JSON.parse(detail.xhr.responseText);
        if (res._id) {
            this.displayImagePreview(res._id)
        }
    }

    displayImagePreview(source) {
        this.imagePreviewSource = source;
        this.showImagePreview = !!source;
    }

    render() {
        return html `
                <vaadin-vertical-layout style="margin-bottom:100px;">
                    <vaadin-horizontal-layout>
                        <vaadin-text-area colspan="2" value="" placeholder="Share something with your followers" style="min-width:90%"></vaadin-text-area>
                        <vaadin-button theme="primary" @click=${this.submitPost}>
                            Share
                        </vaadin-button>
                    </vaadin-horizontal-layout>
                     <vaadin-upload accept="image/*" maxFiles="1" target="/api/image/save" @upload-request="${this.uploadRequest}" @upload-success="${this.uploadResponse}" @file-remove="${this.removeFile}"></vaadin-upload>
                    ${
                        this.showImagePreview ? 
                            html`
                                <div style="text-align:center;">
                                    <img style="max-width:100%; max-height:250px;" src=${`/api/image/${this.imagePreviewSource}`}>
                                </div>
                            `
                            :

                            html``
                    }
                </vaadin-vertical-layout>
      `;
    }
    stateChanged(state) {
        if(isPostSaveInProgress(state) && postSaveRequestResult(state)){
            store.dispatch(restorePostSave());
            this.removeFile();
            this.contentField.value = '';
        }
    }
}

defineComponent(PostCreator);