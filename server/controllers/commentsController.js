const route = require('./../route/route');
const sendJson = require('../helpers/sendJson');
const Comment = require('./../models/Comment');
const Post = require('./../models/Post');
module.exports = [
    route('comments/save', async (req, res) => {
        let commentData = req.body;
        let comment = new Comment(commentData);
        comment = await comment.save(commentData);
        if (comment) {
            let post = await Post.findById(comment.post).exec();
            post.comments.push(comment._id);
            await post.save();
            sendJson(res, comment);
        } else {
            sendJson(res, {
                error: 'could not save comment'
            });
        }
    }, 'post'),
    route('comments/post/:postId', async (req, res) => {
        let data = await Comment.find({
            post: (req.params.postId)
        }).exec();
        sendJson(res, data);
    })
];