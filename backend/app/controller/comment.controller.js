var db = require("../config/db.config.js");
var { Op } = require("sequelize");
var globalFunctions = require("../config/global.functions.js");
var Comment = db.comment;
var User = db.user;
exports.findAll = (req, res) => {
    Comment.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление пользователя
exports.create = (req, res) => {
    Comment.create({
        content: req.body.content,
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
    Comment.update({
            content: req.body.content,
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
    Comment.destroy({
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
    Comment.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


exports.findUserForComment = (req, res) => {
    db.sequelize.query(
        `SELECT u.* FROM user u JOIN comment c
         ON u.id = c.user_id WHERE c.id = ?`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.comment_id] // подстановка параметров
        })
    .then(objects => {
    globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
    globalFunctions.sendError(res, err);
    })
    };

exports.findCommentForCategory = (req, res) => {
    db.sequelize.query(
        `SELECT c.* FROM comment c JOIN command cm
         ON c.command_id = cm.id WHERE c.command_id = ?
         ORDER BY c.date ${req.query.sort === 'desc' ? 'DESC' : 'ASC'}`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.command_id] // подстановка параметров
        })
    .then(objects => {
    globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
    globalFunctions.sendError(res, err);
    })
    };


