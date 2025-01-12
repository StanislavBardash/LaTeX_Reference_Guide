var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных

db.sequelize.sync({force: false});

app.listen(3000);

var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200', // указываем, откуда будут приходить запросы
    credentials: true, // разрешаем обрабатывать запросы
    optionSuccessStatus: 200 // при успешной обработке запроса будет возвращён статус 200
};
app.use(cors(corsOptions));


var user = require('./app/route/user.route.js');
user(app);
var category = require('./app/route/category.route.js');
category(app);

var code_example = require('./app/route/code_example.route.js');
code_example(app);

var command_tag = require('./app/route/command_tag.route.js');
command_tag(app);

var command = require('./app/route/command.route.js');
command(app);

var comment = require('./app/route/comment.route.js');
comment(app);

var favourite = require('./app/route/favourite.route.js');
favourite(app);

var history = require('./app/route/history.route.js');
history(app);

var rating = require('./app/route/rating.route.js');
rating(app);

var tag = require('./app/route/tag.route.js');
tag(app);

var user_command = require('./app/route/user_command.route.js');
user_command(app);

var auth = require('./app/route/auth.route.js');
auth(app);