const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const Post = require('../models/post');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/images/');
        // if (fs.existsSync('./public/images/')) {
        //     console.log('FileName1');
        //     // callback(null, './public/images');
        // } else {
        //     console.log('FileName2');
        //     // callback(null, './public/images');
        // }

    },
    filename: function(req, file, callback) {
        // if (fs.readFileSync('./public/images/' + file.originalname)) {
        //     console.log('FileName1');
        //     callback(null, file.originalname);
        // } else {
        //     console.log('FileName2');
        //     // callback(null, file.originalname);
        // }
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: function(req, file, callback) {
        checkFileType(file, callback);
    }
});

function checkFileType(file, callback) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|svg|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return callback(null, true);
    } else {
        callback('Error: Images Only!');
    }
}

// router.post('/single', upload.single('file'), (req, res, next) => {
//     const file = req.file;
//     // console.log(file.filename);
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         const error = new Error('No file');
//         error.httpStatusCode = 400;
//         return next(error);
//     }
//     res.send(file);
// })


router.post('/multipleFile', upload.array('files'), async(req, res, next) => {
    const files = req.files;
    // if (!errors.isEmpty()) return;

    // if (!files) {
    //     const error = new Error('No file');
    //     error.httpStatusCode = 400;
    //     return next(error);
    // }

    try {
        const Picture_1 = files[0];
        const Picture_2 = files[1];
        const Picture_3 = files[2];
        const Picture_4 = files[3];
        const Picture_5 = files[4];
        const Picture_6 = files[5];
        const Picture_7 = files[6];
        const Picture_8 = files[7];
        const Picture_9 = files[8];
        const Picture_10 = files[9];

        const SaveFile = {
            Picture_1: Picture_1,
            Picture_2: Picture_2,
            Picture_3: Picture_3,
            Picture_4: Picture_4,
            Picture_5: Picture_5,
            Picture_6: Picture_6,
            Picture_7: Picture_7,
            Picture_8: Picture_8,
            Picture_9: Picture_9,
            Picture_10: Picture_10
        }
        const result = await Post.SaveIMG(SaveFile);
        // console.log(result);
        res.send({ status: 'OK' });
    } catch (error) {
        console.log(error);
        res.send(400);
    }

})

router.get('/getImage:name', async(req, res, next) => {
    const name = req.params.name;
    try {
        const image = await Post.GETIMAGE(name);

        res.status(200).json(image);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
})

router.delete('/deleteImage/:name', async(req, res, next) => {
    const name = req.params.name;
    try {
        const image = await Post.DELETEIMAGE(name);
        fs.unlinkSync('./public/images/' + name);
        res.status(201).send({ message: "Image deleted" });
        // res.status(200).json(image);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

})

module.exports = router;