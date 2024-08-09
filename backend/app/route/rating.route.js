module.exports = (app) => {

    const rating = require('../controller/rating.controller');
    
    app.get('/api/ratings', rating.findAll);
    // Добавление пользователя
    app.post('/api/addRating', rating.create);

    // Обновление данных пользователя по id
    app.post('/api/updateRating/:id', rating.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteRating/:id', rating.delete);

    // Получение пользователя по id
    app.get('/api/rating/:id', rating.findById);

    // // Получение пользователя по username
    // app.get('/api/tag/name/:name', rating.findByName);
};