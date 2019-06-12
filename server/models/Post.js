const {
    Schema,
    model
} = require("mongoose");

const PostModel = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date : Date,
    content : String,
    image : {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Like'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

function queryPopulate() {
    this.sort('-_id');    
}

PostModel.pre('find', queryPopulate);
PostModel.pre('findOne', queryPopulate);

module.exports = model('Post', PostModel);