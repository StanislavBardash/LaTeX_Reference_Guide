module.exports = (app) => {

    const history = require('../controller/history.controller');
    
    app.get('/api/histories', history.findAll);
    // Добавление пользователя
    app.post('/api/addHistory', history.create);

    // Обновление данных пользователя по id
    app.post('/api/updateHistory/:id', history.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteHistory/:id', history.delete);

    // Получение пользователя по id
    app.get('/api/history/:id', history.findById);

    // // Получение пользователя по username
    // app.get('/api/tag/name/:name', rating.findByName);
};