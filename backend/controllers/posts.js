const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.fetchAll = async(req, res, next) => {
    // const id = req.params.id;
    // console.log(req.params.id);
    const name = req.params.name;
    console.log('name', name);
    try {
        const [allPosts] = await Post.fetchAll(name);
        res.status(200).json(allPosts);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updatePost = async(req, res, next) => {
    // const id = req.params.id;
    const name = req.params.name;
    console.log(name);

    const errors = validationResult(req);

    if (!errors.isEmpty()) return;

    const Id = req.body.Id;
    const Name = req.body.Name;
    const Address = req.body.Address;
    const Province = req.body.Province;
    const Status = req.body.Status;
    const Register_date = req.body.Register_date;
    const Certificate_date1 = req.body.Certificate_date1;
    const Certificate_date2 = req.body.Certificate_date2;
    const Category = req.body.Category;
    const Vdo = req.body.Vdo;
    const Latitude = req.body.Latitude;
    const Longitude = req.body.Longitude;
    const Picture_1 = req.body.image0;
    const Picture_2 = req.body.image1;
    const Picture_3 = req.body.image2;
    const Picture_4 = req.body.image3;
    const Picture_5 = req.body.image4;
    const Picture_6 = req.body.image5;
    const Picture_7 = req.body.image6;
    const Picture_8 = req.body.image7;
    const Picture_9 = req.body.image8;
    const Picture_10 = req.body.image9;

    try {
        const post = {
            Id: Id,
            Name: Name,
            Address: Address,
            Province: Province,
            Status: Status,
            Register_date: Register_date,
            Certificate_date1: Certificate_date1,
            Certificate_date2: Certificate_date2,
            Category: Category,
            Vdo: Vdo,
            Latitude: Latitude,
            Longitude: Longitude,
            Picture_1: Picture_1,
            Picture_2: Picture_2,
            Picture_3: Picture_3,
            Picture_4: Picture_4,
            Picture_5: Picture_5,
            Picture_6: Picture_6,
            Picture_7: Picture_7,
            Picture_8: Picture_8,
            Picture_9: Picture_9,
            Picture_10: Picture_10,
        };
        const result = await Post.Update(name, post);
        res.status(201).json({ message: 'Posted!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.postPost = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return;

    const Id = req.body.Id;
    const Name = req.body.Name;
    const Address = req.body.Address;
    const Province = req.body.Province;
    const Status = req.body.Status;
    const Register_date = req.body.Register_date;
    const Certificate_date1 = req.body.Certificate_date1;
    const Certificate_date2 = req.body.Certificate_date2;
    const Category = req.body.Category;
    const Vdo = req.body.Vdo;
    const Latitude = req.body.Latitude;
    const Longitude = req.body.Longitude;
    const Picture_1 = req.body.image0;
    const Picture_2 = req.body.image1;
    const Picture_3 = req.body.image2;
    const Picture_4 = req.body.image3;
    const Picture_5 = req.body.image4;
    const Picture_6 = req.body.image5;
    const Picture_7 = req.body.image6;
    const Picture_8 = req.body.image7;
    const Picture_9 = req.body.image8;
    const Picture_10 = req.body.image9;

    try {
        const post = {
            Id: Id,
            Name: Name,
            Address: Address,
            Province: Province,
            Status: Status,
            Register_date: Register_date,
            Certificate_date1: Certificate_date1,
            Certificate_date2: Certificate_date2,
            Category: Category,
            Vdo: Vdo,
            Latitude: Latitude,
            Longitude: Longitude,
            Picture_1: Picture_1,
            Picture_2: Picture_2,
            Picture_3: Picture_3,
            Picture_4: Picture_4,
            Picture_5: Picture_5,
            Picture_6: Picture_6,
            Picture_7: Picture_7,
            Picture_8: Picture_8,
            Picture_9: Picture_9,
            Picture_10: Picture_10,
        };
        const result = await Post.save(post);
        // const dateupdate = await Post.updatedate();
        res.status(201).json({ message: 'Posted!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// exports.deletePost = async (req, res, next) => {
//   try {
//     const deleteResponse = await Post.delete(req.params.id);
//     res.status(200).json(deleteResponse);
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };