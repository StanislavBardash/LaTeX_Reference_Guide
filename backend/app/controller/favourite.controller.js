var db = require("../config/db.config.js");
var { Op } = require("sequelize");
var globalFunctions = require("../config/global.functions.js");
var Favourite = db.favourite;
var User = db.user;
var Command = db.command;
exports.findAll = (req, res) => {
    Favourite.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление пользователя
exports.create = (req, res) => {
    Favourite.create({
        user_id : req.body.user_id,
        command_id : req.body.command_id,
        date : req.body.date
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};


// Обновление данных по id
exports.update = (req, res) => {
    Favourite.update({
            user_id : req.body.user_id,
            command_id : req.body.command_id,
            date : req.body.date
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
    Favourite.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};


// Получение данных по id
exports.findById = (req, res) => {
    Favourite.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


exports.findFavouriteForUser = (req, res) => {
db.sequelize.query(
    `SELECT c.* FROM command c JOIN favourite f
     ON c.id = f.command_id WHERE f.user_id = ?`,
    {
        type: db.sequelize.QueryTypes.SELECT,
        replacements: [req.params.user_id] // подстановка параметров
    })
.then(objects => {
globalFunctions.sendResult(res, objects);
})
.catch(err => {
globalFunctions.sendError(res, err);
})
};
exports.findFavouriteForUserAndCommand = (req, res) => {
    db.sequelize.query(
        `SELECT f.* FROM favourite f WHERE f.user_id=? AND f.command_id=?`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.user_id, req.params.command_id],  // подстановка параметров
        })
    .then(objects => {
    globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
    globalFunctions.sendError(res, err);
    })
    };
