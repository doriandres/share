const route = require('./../route/route');
const sendJson = require('../helpers/sendJson');
const Like = require('./../models/Like');
const Post = require('./../models/Post');

module.exports = [
    route('like/save', async (req, res) => {
        let likeData = req.body;
        let like = new Like(likeData);
        like = await like.save(likeData);
        if (like) {
            let post = await Post.findById(like.post).exec();
            post.likes.push(like._id);
            await post.save();
            sendJson(res, like);
        } else {
            sendJson(res, {
                error: 'could not save like'
            });
        }
    }, 'post'),

    
    route('like/:id', async (req, res) => {
        try {
            let like = await Like.findById(req.params.id).exec();
            let post = await Post.findById(like.post).exec();

            post.likes.splice(post.likes.indexOf(like._id), 1);
            await post.save();
            await like.remove();

            sendJson(res, {
                done: true
            });
        } catch {
            sendJson(res, {
                error: 'could not delete like'
            });
        }
    }, 'delete')
];