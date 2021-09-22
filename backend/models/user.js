const db = require('../util/database');
const dateFormat = require('dateformat');
module.exports = class User {

    constructor(name, username, password, roles) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.roles = roles;

    }

    static find(username) {
        return db.execute('SELECT * FROM users WHERE username = ?', [username]);
    }

    static save(user) {
        const day = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
        return db.execute(
            'INSERT INTO users(name, username, password, remember_token, created_at, updated_at) VALUES( ? , ? , ? , ? , ? , ? )', [user.name, user.username, user.password, null, day, null]
        );
    }
    static GetMaxRoles() {
        return db.execute('SELECT id FROM users WHERE id = (SELECT max(id) FROM users)');
    }

    static saverole(thisRole, model_type, mx) {
        // const day = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
        // console.log('thisRole', thisRole);
        // console.log('model_type', model_type);
        // console.log('Max', mx);
        return db.execute('INSERT INTO model_has_roles (role_id,model_type, model_id) VALUES(?,?,?)', [thisRole, model_type, mx]);
        // return db.execute('UPDATE model_has_roles SET (role_id, model_id) VALUES(?,?)', [thisRole, m]);
    }
    static DELETEROLE(id) {
        return db.execute('DELETE FROM `model_has_roles` WHERE model_id = ?', [id]);
    }

    static update(user) {
        // console.log('USER', user);
        const day = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
        return db.execute(
            'UPDATE users SET updated_at= ?', [day]
        );
    }

    static checkRole(id, user) {
        // console.log('id', id);
        // console.log('USER', user);
        return db.execute(
            'SELECT role_id FROM model_has_roles WHERE model_id = ? ', [id]
        );
    }

    static Roles(id) {
        // console.log('id', id);
        return db.execute(
            'SELECT * FROM roles WHERE id = ? ', [id]
        );
    }

    static allRoles() {
        return db.execute(
            // 'SELECT id,name,username,role_id FROM users INNER JOIN model_has_roles ON users.id = model_has_roles.model_id'
            'SELECT id,name,username,role_id FROM users LEFT JOIN model_has_roles ON users.id = model_has_roles.model_id'

        );
    }

    static ModelRole() {
        return db.execute(
            'SELECT * FROM model_has_roles'
        );
    }


    static getAllUser() {
        return db.execute(
            'SELECT * FROM users'
        );
    }

    static UpdateUser(id, User) {
        return db.execute('UPDATE `users` SET `name`=?, `username`=? WHERE id =?', [User.name, User.username, id]);
    }

    static DeleteUser(id) {
        return db.execute('DELETE FROM `users` WHERE id = ?', [id]);
    }
};