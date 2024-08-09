var db = require("../config/db.config.js");
var { Op } = require("sequelize");
var globalFunctions = require("../config/global.functions.js");
var History = db.history;
var User = db.user;
var Command = db.command;
exports.findAll = (req, res) => {
    History.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление пользователя
exports.create = (req, res) => {
    History.create({
        user_id : req.body.user_id,
        command_id : req.body.command_id,
        date : req.body.date,
        action : req.body.action
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};


// Обновление данных по id
exports.update = (req, res) => {
    History.update({
            user_id : req.body.user_id,
            command_id : req.body.command_id,
            date : req.body.date,
            action : req.body.action
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
    History.destroy({
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
    History.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


// // Получение закрепленных команд пользователя
// exports.findFavouriteForUser = (req, res) => {
//     Favourite.findAll({
//         include: [
//             {
//                 model: User,
//                 required: true, // INNER JOIN
//                 where: {
//                     id: req.params.user_id
//                 }
//             },
//             {
//                 model: Command,
//                 required: true, // INNER JOIN
//             }
//         ]
//     })
//         .then(objects => {
//             globalFunctions.sendResult(res, objects);
//         })
//         .catch(err => {
//             globalFunctions.sendError(res, err);
//         })
// };



