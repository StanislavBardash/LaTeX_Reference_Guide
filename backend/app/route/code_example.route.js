module.exports = (app) => {

    const code_example = require('../controller/code_example.controller');

    app.get('/api/CodeExamples', code_example.findAll);
    // Добавление пользователя
    app.post('/api/addCodeExample', code_example.create);

    // Обновление данных пользователя по id
    app.post('/api/updateCodeExample/:id', code_example.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteCodeExample/:id', code_example.delete);

    // Получение пользователя по id
    app.get('/api/CodeExample/:id', code_example.findById);
    app.get('/api/findCodeExampleForCommand/commandId=:command_id', code_example.findCodeExampleForCommand);
    
};