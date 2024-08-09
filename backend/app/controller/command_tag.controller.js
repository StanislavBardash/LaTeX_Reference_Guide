var db = require('../config/db.config.js');
var Command = db.command;
var Tag = db.tag;
var CommandTag = db.command_tag;
var globalFunctions = require('../config/global.functions.js');

// Получение категорий пользователя
exports.findTagsForCommand = (req, res) => {
    CommandTag.findAll({
        include: [
            {
                model: Command,
                required: true, // INNER JOIN
                where: {
                    id: req.params.command_id
                }
            },
            {
                model: Tag,
                required: true, // INNER JOIN
            }
        ]
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// // Получение категорий, которые пользователь не выбрал
// exports.findCategoriesNotUser = (req, res) => {
//     db.sequelize.query(
//         `SELECT * FROM category 
//             WHERE NOT EXISTS ( 
//                 SELECT * FROM user_category 
//                 WHERE user_id = ? AND user_category.category_id = category.id
//             )`,
//         {
//             type: db.sequelize.QueryTypes.SELECT,
//             replacements: [req.params.user_id] // подстановка параметров
//         })
//         .then(objects => {
//             globalFunctions.sendResult(res, objects);
//         })
//         .catch(err => {
//             globalFunctions.sendError(res, err);
//         })
// };

// // Добавление массива категорий
// exports.createCategories = (req, res) => {
//     var categories = req.body.categories;
//     var data = [];
//     for (var i = 0; i < categories.length; i++) {
//         // сначала добавляем идентификатор категории
//         data.push(categories[i]);
//         // затем добавляем идентификатор пользователя
//         data.push(req.body.user_id);

//     }
//     var placeholders = categories.map(() => '(?,?)').join(',');
//     db.sequelize.query(
//         `INSERT INTO user_category(category_id, user_id) VALUES ` + placeholders,
//         {
//             type: db.sequelize.QueryTypes.INSERT,
//             replacements: data // подстановка параметров
//         })
//         .then(object => {
//             globalFunctions.sendResult(res, object);
//         })
//         .catch(err => {
//             globalFunctions.sendError(res, err);
//         });
// };


exports.findAll = (req, res) => {
    CommandTag.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление пользователя
exports.create = (req, res) => {
    CommandTag.create({
        command_id: req.body.command_id,
        tag_id: req.body.tag_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};


// Обновление данных пользователя по id
exports.update = (req, res) => {
    CommandTag.update({
            command_id: req.body.command_id,
            tag_id: req.body.tag_id
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
    CommandTag.destroy({
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
    CommandTag.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};
