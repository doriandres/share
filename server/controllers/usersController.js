const route = require('./../route/route');
const sendJson = require('../helpers/sendJson');
const User = require('./../models/User');

module.exports = [
    route('user/save', async (req, res) => {
        let userData = req.body;
        let user = new User(userData);
        try{
        user = await user.save(userData);
        if (user._id) {
            sendJson(res, user);
        } else {
            sendJson(res, {
                error: 'could not save user'
            });
        }
        }catch{
            res.status(500).send('Use already exists');
        }
    }, 'post'),
    route('users', async (req, res) => {
        let data = await User.find()
            .populate('followers')
            .populate('following')
            .populate('posts')
            .exec();
        sendJson(res, data);
    }),
    route('user/:id', async (req, res) => {
        let user = await User.findOne({
                _id: (req.params.id)
            })
            .populate('followers')
            .populate('following')
            .populate('posts')
            .exec();
        if (user) {
            sendJson(res, user);
        } else {
            sendJson(res, {
                error: 'not found'
            });
        }
    }),
    route('user/update', async (req, res) => {
        let userId = req.body._id;
        delete req.body._id;
        let userUpdates = req.body;
        try {
            let user = await User.findOneAndUpdate({
                    _id: userId
                }, {
                    $set: userUpdates
                }, {
                    new: true
                })
                .populate('followers')
                .populate('following')
                .populate('posts')
                .exec();
            sendJson(res, user);
        } catch (e) {
            sendJson(res, {
                error: 'could not update user'
            });
        }
    }, 'put'),
    route('user/validate', async (req, res) => {
        let user = await User.findOne({email : req.body.email, password : req.body.password})
            .populate('followers')
            .populate('following')
            .populate('posts')
            .exec();
        if (user) {
            sendJson(res, user);
        } else {
            sendJson(res, {
                error: 'not found'
            });
        }
    }, 'post')
];