module.exports = (app) => {

    const user = require('../controller/user.controller');
    var { authJwt } = require("../middleware");
    // Получение всех пользователей
    // app.get('/api/users', user.findAll);
    // Добавление пользователя
    app.post('/api/addUser', user.create);

    // Обновление данных пользователя по id
    app.post('/api/updateUser/:id', user.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteUser/:id', user.delete);

    // Получение пользователя по id
    app.get('/api/user/:id', user.findById);

    // Получение пользователя по username
    app.get('/api/user/username/:username', user.findByUsername);

    app.get('/api/users', [authJwt.verifyToken], user.findAll);
};