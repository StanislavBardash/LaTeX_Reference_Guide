var db = require("../config/db.config.js");
var { Op } = require("sequelize");
var globalFunctions = require("../config/global.functions.js");
var CodeExample = db.code_example;

exports.findCodeExampleForCommand = (req, res) => {
    db.sequelize.query(
        `SELECT cd.* FROM code_example cd JOIN command c
         ON cd.id = c.code_example_id WHERE c.id = ?`,
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


exports.findAll = (req, res) => {
    CodeExample.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление пользователя
exports.create = (req, res) => {
    CodeExample.create({
        content: req.body.content
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};


// Обновление данных по id
exports.update = (req, res) => {
    CodeExample.update({
            content: req.body.content
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
    CodeExample.destroy({
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
    CodeExample.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};





