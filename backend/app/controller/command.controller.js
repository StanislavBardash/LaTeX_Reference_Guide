var db = require("../config/db.config.js");
var { Op } = require("sequelize");
var globalFunctions = require("../config/global.functions.js");
var Command = db.command;
exports.findAll = (req, res) => {
    Command.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findAllVerified = (req, res) => {
    db.sequelize.query(
        `SELECT c.* FROM command c WHERE c.verified = 1`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            // replacements: [req.params.command_id] // подстановка параметров
        })
.then(objects => {
    globalFunctions.sendResult(res, objects);
})
.catch(err => {
    globalFunctions.sendError(res, err);
})
};

exports.findCommandsWithSearch = (req, res) => {
    db.sequelize.query(
        `SELECT c.* FROM command c INNER JOIN category cat ON c.category_id=cat.id WHERE cat.name = ? AND c.verified = 1`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [`${req.params.categorySearchQuery}`]
            // replacements: [`${req.params.categorySearchQuery}`, `${req.params.nameSearchQuery}%`]
            //replacements: [req.params.categorySearchQuery, req.params.nameSearchQuery] // подстановка параметров
        })
.then(objects => {
    globalFunctions.sendResult(res, objects);
})
.catch(err => {
    globalFunctions.sendError(res, err);
})
};

exports.findAllUnverified = (req, res) => {
    db.sequelize.query(
        `SELECT c.* FROM command c WHERE c.verified = 0`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            // replacements: [req.params.command_id] // подстановка параметров
        })
.then(objects => {
    globalFunctions.sendResult(res, objects);
})
.catch(err => {
    globalFunctions.sendError(res, err);
})
};

// Добавление пользователя
exports.create = (req, res) => {
    Command.create({
        name: req.body.name,
        description: req.body.description,
        code_example_id: req.body.code_example_id,
        category_id: req.body.category_id,
        date: req.body.date,
        verified : req.body.verified
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};


// Обновление данных пользователя по id
exports.update = (req, res) => {
    Command.update({
            name: req.body.name,
            description: req.body.description,
            code_example_id: req.body.code_example_id,
            category_id: req.body.category_id,
            date: req.body.date,
            verified: req.body.verified
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

// Удаление комманды по id
exports.delete = (req, res) => {
    Command.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};


// Получение данных команд по id
exports.findById = (req, res) => {
    Command.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


// Получение команды по названию
exports.findByName = (req, res) => {
    Command.findAll({
        where: {
            name: req.body.name
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};



exports.findCategoryForCommand = (req, res) => {
    db.sequelize.query(
        `SELECT cat.* FROM category cat JOIN command c
         ON cat.id = c.category_id WHERE c.id = ?`,
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

exports.findTagsForCommand = (req, res) => {
    db.sequelize.query(
        `SELECT t.* FROM tag t JOIN command_tag ct
         ON t.id = ct.tag_id WHERE ct.command_id = ?`,
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