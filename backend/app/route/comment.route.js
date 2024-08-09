module.exports = (app) => {

    const comment = require('../controller/comment.controller');
    
    app.get('/api/comments', comment.findAll);
    // Добавление пользователя
    app.post('/api/addComment', comment.create);

    // Обновление данных пользователя по id
    app.post('/api/updateComment/:id', comment.update);
    
    // Удаление данных пользователя по id
    app.post('/api/deleteComment/:id', comment.delete);

    // Получение пользователя по id
    app.get('/api/comment/:id', comment.findById);

    app.get('/api/findUserForComment/commentId=:comment_id', comment.findUserForComment);
    app.get('/api/findCommentForCategory/commandId=:command_id', comment.findCommentForCategory);
    
};