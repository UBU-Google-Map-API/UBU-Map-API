const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const mapRoutes = require('./routes/map');
const fileRoutes = require('./routes/file');
const errorController = require('./controllers/error');
const app = express();
const ports = process.env.PORT || 3000;

app.use(express.static('public'))
app.use(express.static('files'))
const path = require('path');
const router = require('./routes/posts');
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
// const multer = require('multer');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Accept, X-Custom-Header, Authorization'
    );
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use('/auth', authRoutes);
app.use('/post', postsRoutes);
app.use('/post/:name', postsRoutes);


app.use('/mapmaker', mapRoutes);
app.use('/users', usersRoutes);
app.use('/users/:id', usersRoutes);

app.use('/file', fileRoutes);

// const storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         callback(null, './public/images');
//     },
//     filename: function(req, file, callback) {
//         callback(null, file.originalname);
//     }
// });

// var upload = multer({ storage: storage });

// app.post('/file', upload.single('file'), (req, res, next) => {
//     const file = req.file;
//     console.log(file.filename);
//     if (!file) {
//         const error = new Error('No file');
//         error.httpStatusCode = 400;
//         return next(error);
//     }
//     res.send(file);
// })


app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`));