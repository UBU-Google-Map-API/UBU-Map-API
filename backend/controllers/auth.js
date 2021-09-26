const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
// const { Roles } = require('../models/user');

exports.signup = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return;

    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const roles = req.body.roles;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const userDetails = {
            name: name,
            username: username,
            password: hashedPassword,
            roles: roles,
        };

        // const result = await User.save(userDetails);

        thisRole = 0;
        model_type = '';
        if (roles == "super-admin") {
            thisRole += 1;
            model_type = 'App/Admin';
        } else if (roles == "Author") {
            thisRole += 3;
            model_type = 'App/User';
        }

        const result = await User.save(userDetails);
        // res.status(201).json({ message: 'user registered successfully' });

        const maxrole = await User.GetMaxRoles();
        const mx = maxrole[0][0].id
            // console.log(mx);
        const result2 = await User.saverole(thisRole, model_type, mx);
        res.status(201).json({ message: 'user registered successfully AND Set Role success' });

        // res.status(201).json(result);
        // res.status(201).json(result2);
        // const deleterole = await User.DELETEROLE(test);
        // res.status(201).json({ message: 'User registered!' });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await User.find(username);
        // console.log("user", user);

        if (user[0].length !== 1) {
            const error = new Error('A user with this username could not be found.');
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0][0];
        // console.log("storedUser", storedUser);
        const isEqual = await bcrypt.compare(password, storedUser.password);
        // console.log("isEqual", isEqual);

        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        // const passtoken = jwt.sign({ password: storedUser.password }, 'secretkey', { expiresIn: '1h' });
        // console.log("passtoken", passtoken);
        const token = jwt.sign({
                username: storedUser.username,
                userId: storedUser.id,
            },
            'secretfortoken', { expiresIn: '1h' }
        );
        // console.log("token", token);
        const check = await User.checkRole(storedUser.id, username);
        // console.log('check', check);

        const result = await User.update(username);
        const Role = check[0][0].role_id;
        // console.log('check', Role);
        const RolesCheck = await User.Roles(Role);
        // console.log('Roles', RolesCheck);
        const roles = RolesCheck[0][0].name;
        // console.log('roles', roles);
        const alluser = await User.getAllUser();

        // if (roles == "super-admin") {
        //     // console.log('alluser', alluser);
        //     res.status(200).json({ username: username, roles: roles, token: token, userId: storedUser.id, alluser: alluser });
        // } else if (roles == "Author") {
        //     res.status(200).json({ username: username, roles: roles, token: token, userId: storedUser.id });
        // }
        res.status(200).json({ username: username, roles: roles, token: token, userId: storedUser.id, name: storedUser.name });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};