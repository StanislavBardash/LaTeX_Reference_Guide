module.exports = (app) => {

    const user_command = require('../controller/user_command.controller');
    
    app.get('/api/findCommandsForUser/userId=:user_id', user_command.findCommandsForUser);
    app.get('/api/findUsersForCommand/commandId=:command_id', user_command.findUsersForCommand);
    // Получение всех пользователей
    app.get('/api/UserCommands', user_command.findAll);
    // Добавление пользователя
    app.post('/api/addUserCommand', user_command.create);

    // Обновление данных пользователя по id
    app.post('/api/updateUserCommand/:id', user_command.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteUserCommand/:id', user_command.delete);

    // Получение пользователя по id
    app.get('/api/UserCommand/:id', user_command.findById);

    // // Получение пользователя по username
    // app.get('/api/user/username/:username', user.findByUsername);
};