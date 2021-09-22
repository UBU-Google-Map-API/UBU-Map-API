const db = require('../util/database');
// const dateFormat = require('dateformat');

module.exports = class Map {

    constructor() {}

    static getMAP() {
        return db.execute(
            'SELECT * FROM abt'
        );
    }

    static getProvince() {
        return db.execute(
            'SELECT DISTINCT Province FROM abt'
        );
    }

    static getStatus() {
        return db.execute(
            'SELECT DISTINCT Status FROM abt'
        );
    }

    // static find(username) {
    //     return db.execute('SELECT * FROM users WHERE username = ?', [username]);
    // }

    // static save(user) {
    //     const day = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
    //     return db.execute(
    //         'INSERT INTO users(name, username, password, remember_token, created_at, updated_at) VALUES( ? , ? , ? , ? , ? , ? )', [user.name, user.username, user.password, null, day, null]
    //     );
    // }
    // static update(user) {
    //     // console.log('USER', user);
    //     const day = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
    //     return db.execute(
    //         'UPDATE users SET updated_at= ?', [day]
    //     );
    // }

    // static checkRole(id, user) {
    //     // console.log('id', id);
    //     // console.log('USER', user);
    //     return db.execute(
    //         'SELECT role_id FROM model_has_roles WHERE model_id = ? ', [id]
    //     );
    // }

    // static Roles(id) {
    //     // console.log('id', id);
    //     return db.execute(
    //         'SELECT * FROM roles WHERE id = ? ', [id]
    //     );
    // }
    // static getAllUser() {
    //     return db.execute(
    //         'SELECT `Id`, `name`, `username` FROM users'
    //     );
    // }
};