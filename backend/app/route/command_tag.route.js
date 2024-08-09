module.exports = (app) => {

    const command_tag = require('../controller/command_tag.controller');



    app.get('/api/findTagsForCommand/commandId=:command_id', command_tag.findTagsForCommand);
    app.get('/api/CommandTags', command_tag.findAll);
    // Добавление пользователя
    app.post('/api/addCommandTag', command_tag.create);

    // Обновление данных пользователя по id
    app.post('/api/updateCommandTag/:id', command_tag.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteCommandTag/:id', command_tag.delete);

    // Получение пользователя по id
    app.get('/api/CommandTag/:id', command_tag.findById);
};