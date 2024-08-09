var db = require("../config/db.config.js");
var { Op } = require("sequelize");
var globalFunctions = require("../config/global.functions.js");
var User = db.user;
exports.findAll = (req, res) => {
    User.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление пользователя
exports.create = (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        password: req.body.password,
        register_date: req.body.register_date,
        admin: req.body.admin,
        login: req.body.login
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};


// Обновление данных пользователя по id
exports.update = (req, res) => {
    User.update({
            username: req.body.username,
            password: req.body.password,
            password: req.body.password,
            register_date: req.body.register_date,
            admin: req.body.admin,
            login: req.body.login
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Удаление пользователя по id
exports.delete = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};


// Получение данных пользователя по id
exports.findById = (req, res) => {
    User.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


// Получение данных пользователя по username
exports.findByUsername = (req, res) => {
    User.findAll({
        where: {
            username: { [Op.like]: `%${req.params.username}%` }
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};



