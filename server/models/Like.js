const {
    Schema,
    model
} = require("mongoose");

const LikeModel = new Schema({
    post : {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date : Date    
});

function queryPopulate() {
    this.sort('-_id');
    this.populate('post');
    this.populate('user');
}

LikeModel.pre('find', queryPopulate);
LikeModel.pre('findOne', queryPopulate);

module.exports = model('Like', LikeModel);