module.exports = (app) => {

    const category = require('../controller/category.controller');

    app.get('/api/categories', category.findAll);
    // Добавление пользователя
    app.post('/api/addCategory', category.create);

    // Обновление данных пользователя по id
    app.post('/api/updateCategory/:id', category.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteCategory/:id', category.delete);

    // Получение пользователя по id
    app.get('/api/category/:id', category.findById);

    // Получение пользователя по username
    app.get('/api/category/name/:name', category.findByName);
    
};