//отримання основних модулів
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var User   = require('./app/models/user');
var cookieParser = require('cookie-parser');
var db = mongoose.connect(config.database);//під"єднання до бази данних
var auth = require('./app/auth');
var registration = require('./app/registration');
//налаштування сервера

app.use(express.static('public')); //папка яка буде кореневою (__dirname = public)
app.set('superSecret', config.password);
//налаштування bodyParser модуля
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser(config.password));

//REST роути сервера

app.use('/register', registration);
app.use('/', auth);
//POST запид до login адресси, авторизація користувача
app.get('/setup', function(req, res) {

    // create a sample user
    var nick = new User({
        firstName: "Andriy",
        secondName: 'Skolotianyi',
        phone: "380501870402",
        city: "Lviv"
    });

    // save the sample user
    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});




app.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

app.get("*", function (req, res) {//у випадку будь якого GET запиту який не має роута
    res.sendFile('public/views/login.html', { //відправити в браузер файл index.html
        root: __dirname //використовувавти для файлу index.html public папку яу корневу (__dirname вказується за допомогою app.use(express.static('public'));)
    });
});

/* serves main page */


app.listen(3000);
