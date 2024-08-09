module.exports = (app) => {

    const tag = require('../controller/tag.controller');
    
    app.get('/api/tags', tag.findAll);
    // Добавление пользователя
    app.post('/api/addTag', tag.create);

    // Обновление данных пользователя по id
    app.post('/api/updateTag/:id', tag.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteTag/:id', tag.delete);

    // Получение пользователя по id
    app.get('/api/tag/:id', tag.findById);

    // Получение пользователя по username
    app.get('/api/tag/name/:name', tag.findByName);
};