const {
    Schema,
    model
} = require("mongoose");

const Image = new Schema({
    source: String,
    isBase64: Boolean,
    url: {
        type: String,
        get: function () {
            return `/api/image/${(this._id + '')}`;
        }
    }
});

function queryPopulate() {
    this.sort('-_id');
}
Image.pre('find', queryPopulate);
Image.pre('findOne', queryPopulate);
module.exports = model('Image', Image);