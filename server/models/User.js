const {
    Schema,
    model
} = require("mongoose");

const UserSchema = new Schema({
    name: String,
    lastName: String,
    email: {
        type: String,
        index: {
            unique: true
        }
    },
    image : {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    password: String,
    gender: String,
    birthday: Date,
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
});

function queryPopulate() {
    this.sort('-_id');
    // this.populate('followers');
    // this.populate('following');
    // this.populate('posts');
}

UserSchema.pre('find', queryPopulate);
UserSchema.pre('findOne', queryPopulate);

module.exports = model('User', UserSchema);