const route = require('./../route/route');
const sendJson = require('../helpers/sendJson');
const Image = require('./../models/Image');

module.exports = [
    route('image/save', async (req, res) => {
        let imageData = req.body;
        let image = new Image(imageData);
        image = await image.save(imageData);
        if (image._id) {
            sendJson(res, {
                _id : image._id
            });
        } else {
            sendJson(res, {
                error: 'could not save image'
            });
        }
    }, 'post'),
    route('image/:id', async (req, res) => {
        let image = await Image.findOne({
            _id: (req.params.id)
        }).exec();
        if (image) {
            if (image.isBase64) {
                let parts = image.source.split(';base64,');
                let base64 = parts[1];
                let type = parts[0].replace('data:', '');
                res.contentType(type);
                res.send(new Buffer(base64, 'base64'));                
            } else {
                res.redirect(image.source);
            }
        } else {
            res.status(404).send('Not found');
        }
    })
];