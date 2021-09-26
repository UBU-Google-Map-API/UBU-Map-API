const db = require('../util/database');
const dateFormat = require('dateformat');
module.exports = class Post {
    constructor(
        Id,
        Name,
        Address,
        Province,
        Study_Plants,
        Status,
        School_Web,
        Register_date,
        Certificate_date1,
        Certificate_date2,
        Category,
        Vdo,
        Latitude,
        Longitude,
        Picture_1,
        Picture_2,
        Picture_3,
        Picture_4,
        Picture_5,
        Picture_6,
        Picture_7,
        Picture_8,
        Picture_9,
        Picture_10,
        updated_at,
        created_at
    ) {
        this.Id = Id;
        this.Name = Name;
        this.Address = Address;
        this.Province = Province;
        this.Study_Plants = Study_Plants;
        this.Status = Status;
        this.School_Web = School_Web;
        this.Register_date = Register_date;
        this.Certificate_date1 = Certificate_date1;
        this.Certificate_date2 = Certificate_date2;
        this.Category = Category;
        this.Vdo = Vdo;
        this.Latitude = Latitude;
        this.Longitude = Longitude;
        this.Picture_1 = Picture_1;
        this.Picture_2 = Picture_2;
        this.Picture_3 = Picture_3;
        this.Picture_4 = Picture_4;
        this.Picture_5 = Picture_5;
        this.Picture_6 = Picture_6;
        this.Picture_7 = Picture_7;
        this.Picture_8 = Picture_8;
        this.Picture_9 = Picture_9;
        this.Picture_10 = Picture_10;
        this.updated_at = updated_at;
        this.created_at = created_at;
    }

    static fetchAll(name) {
        // console.log(id);
        return db.execute('SELECT * FROM users LEFT JOIN abt ON users.name = abt.Name WHERE users.name = ?', [name]);
    }

    static save(post) {
        const day = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
        const uploadpost = db.execute('INSERT INTO `abt`(`Id`, `Name`, `Address`, `Province`, `Status`,`School_Web`, `Register_date`, `Certificate_date1`, `Certificate_date2`, `Category`, `Latitude`, `Longitude`, `Picture_1`, `Picture_2`, `Picture_3`, `Picture_4`, `Picture_5`, `Picture_6`, `Picture_7`, `Picture_8`, `Picture_9`, `Picture_10`, `Vdo`, `Study_Plants`)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [post.Id, post.Name, post.Address, post.Province, post.Status, post.School_Web, post.Register_date, post.Certificate_date1, post.Certificate_date2, post.Category, post.Latitude, post.Longitude, post.Picture_1, post.Picture_2, post.Picture_3, post.Picture_4, post.Picture_5, post.Picture_6, post.Picture_7, post.Picture_8, post.Picture_9, post.Picture_10, post.Vdo, post.Study_Plants]);
        const dateset = db.execute('UPDATE abt SET created_at= ?', [day]);
        return uploadpost, dateset;
        // return db.execute('INSERT INTO `abt`(`Id`, `Name`, `Address`, `Province`, `Status`, `Register_date`, `Certificate_date1`, `Certificate_date2`, `Category`, `Latitude`, `Longitude`, `Picture_1`, `Picture_2`, `Picture_3`, `Picture_4`, `Picture_5`, `Picture_6`, `Picture_7`, `Picture_8`, `Picture_9`, `Picture_10`, `Vdo`)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [post.Id, post.Name, post.Address, post.Province, post.Status, post.Register_date, post.Certificate_date1, post.Certificate_date2, post.Category, post.Latitude, post.Longitude, post.Picture_1, post.Picture_2, post.Picture_3, post.Picture_4, post.Picture_5, post.Picture_6, post.Picture_7, post.Picture_8, post.Picture_9, post.Picture_10, post.Vdo, ]);
    }
    static updatedate() {
        const day = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
        return db.execute(
            'UPDATE abt SET updated_at= ?', [day]
        );
    }
    static Update(name, post) {
        // console.log('name', name);
        // console.log('post', post);
        return db.execute('UPDATE abt SET Id = ?, Name = ?, Address = ?, Province = ?, Status = ?, School_Web = ?, Register_date = ?, Certificate_date1 = ?, Certificate_date2 = ?, Category = ?, Latitude = ?, Longitude = ?, Picture_1 = ?, Picture_2 = ?, Picture_3 = ?, Picture_4 = ?, Picture_5 = ?, Picture_6 = ?, Picture_7 = ?, Picture_8 = ?, Picture_9 = ?, Picture_10 = ?, Vdo = ?, Study_Plants = ? WHERE Name = ?', [post.Id, post.Name, post.Address, post.Province, post.Status, post.School_Web, post.Register_date, post.Certificate_date1, post.Certificate_date2, post.Category, post.Latitude, post.Longitude, post.Picture_1, post.Picture_2, post.Picture_3, post.Picture_4, post.Picture_5, post.Picture_6, post.Picture_7, post.Picture_8, post.Picture_9, post.Picture_10, post.Vdo, post.Study_Plants, name]);
        // return db.execute('UPDATE posts SET title = ?, body = ?, author = ? WHERE id = ?', [post.title, post.body, post.author, id]);
        // return db.execute(
        //   'INSERT INTO abt (title, body, user) VALUES (?, ?, ?)',
        //   [post.title, post.body, post.user]
        // );
    }

    static delete(id) {
        return db.execute('DELETE FROM posts WHERE id = ?', [id]);
    }

    static SaveIMG(files) {
        try {
            const p1 = files.Picture_1.originalname;
            const p2 = files.Picture_2.originalname;
            const p3 = files.Picture_3.originalname;
            const p4 = files.Picture_4.originalname;
            const p5 = files.Picture_5.originalname;
            const p6 = files.Picture_6.originalname;
            const p7 = files.Picture_7.originalname;
            const p8 = files.Picture_8.originalname;
            const p9 = files.Picture_9.originalname;
            const p10 = files.Picture_10.originalname;
            return db.execute('INSERT INTO `abt` (`Picture_1`, `Picture_2`, `Picture_3`, `Picture_4`, `Picture_5`, `Picture_6`, `Picture_7`, `Picture_8`, `Picture_9`, `Picture_10`) VALUES (?,?,?,?,?,?,?,?,?,?)', [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10])
        } catch (err) {
            console.log(err);
        }

    }
    static GETIMAGE(name) {
        // console.log('name', name);
        return db.execute('SELECT `Picture_1`, `Picture_2`, `Picture_3`, `Picture_4`, `Picture_5`, `Picture_6`, `Picture_7`, `Picture_8`, `Picture_9`, `Picture_10`FROM `abt` WHERE Name = ?', [name])
    }

    static DELETEIMAGE(name) {
        const Name0 = name.split('-')[0];
        // console.log('Name0', Name0);
        const Name1 = name.split('-')[1];
        // console.log('Name1', Name1);
        const Picture = Name1.split('.')[0];
        // console.log(Picture);
        // console.log('Picture', Picture);
        // console.log('name', name);
        const image = db.execute('SELECT `Picture_1`, `Picture_2`, `Picture_3`, `Picture_4`, `Picture_5`, `Picture_6`, `Picture_7`, `Picture_8`, `Picture_9`, `Picture_10`FROM `abt` WHERE Name = ?', [Name0])
        image.then(res => {
                // console.log(Picture);
                const img = res[0][0][Picture];
                // console.log(img);
                db.execute('UPDATE abt SET `' + Picture + '` = ? WHERE Name = ?', ['NoImageFound.png', Name0])
            })
            // const IMG = db.execute('SELECT `Picture_1`, `Picture_2`, `Picture_3`, `Picture_4`, `Picture_5`, `Picture_6`, `Picture_7`, `Picture_8`, `Picture_9`, `Picture_10`FROM `abt` WHERE Picture_1 = ?', [name])
            // return db.execute('UPDATE abt SET Picture_1 = ?, Picture_2 = ?, Picture_3 = ?, Picture_4 = ?, Picture_5 = ?, Picture_6 = ?, Picture_7 = ?, Picture_8 = ?, Picture_9 = ?, Picture_10 = ? WHERE Name = ?', [Picture,Picture,Picture,Picture,Picture,Picture,Picture,Picture,Picture,PictureName0])
    }
};