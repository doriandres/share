const {
    Schema,
    model
} = require("mongoose");

const CommentModel = new Schema({
    post : {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content : String,
    date : Date
});

function queryPopulate() {
    this.sort('-_id');
    this.populate('post');
    this.populate('user');
}

CommentModel.pre('find', queryPopulate);
CommentModel.pre('findOne', queryPopulate);

module.exports = model('Comment', CommentModel);