module.exports = (app) => {

    const command = require('../controller/command.controller');
    
    app.get('/api/commands', command.findAll);
    // Добавление пользователя
    app.post('/api/addCommand', command.create);

    // Обновление данных пользователя по id
    app.post('/api/updateCommand/:id', command.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteCommand/:id', command.delete);

    // Получение пользователя по id
    app.get('/api/command/:id', command.findById);

    app.get('/api/command/name/:name', command.findByName);
    app.get('/api/findCategoryForCommand/commandId=:command_id', command.findCategoryForCommand);
    app.get('/api/findTagsForCommand/commandId=:command_id', command.findTagsForCommand);
    app.get('/api/findAllVerified', command.findAllVerified);
    app.get('/api/findAllUnverified', command.findAllUnverified);
    app.get('/api/findCommandsWithSearch/categorySearchQuery=:categorySearchQuery', command.findCommandsWithSearch);
    
};