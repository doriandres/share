const route = require('./../route/route');
const sendJson = require('../helpers/sendJson');
const Post = require('./../models/Post');
const User = require('./../models/User');
module.exports = [
    route('post/save', async (req, res) => {
        let postData = req.body;
        let post = new Post(postData);
        post = await post.save(postData);
        if (post) {
            let user = await User.findById(post.user).exec();
            user.posts.push(post);
            await user.save();
            sendJson(res, post);
        } else {
            sendJson(res, {
                error: 'could not save user'
            });
        }
    }, 'post'),
    route('posts/user/:userId', async (req, res) => {
        let data = await Post.find({
                user: (req.params.userId)
            })
            .populate('user')
            .populate('likes')
            .populate('comments')
            .exec();
        sendJson(res, data);
    }),
    route('posts/users', async (req, res) => {
        let data = await Post.find({
                user: {
                    $in: req.body
                }
            })
            .populate('user')
            .populate('likes')
            .populate('comments')
            .exec();
        sendJson(res, data);
    }, 'post'),
];