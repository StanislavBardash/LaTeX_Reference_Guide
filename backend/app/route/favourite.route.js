module.exports = (app) => {

    const favourite = require('../controller/favourite.controller');
    
    app.get('/api/favourites', favourite.findAll);
    // Добавление пользователя
    app.post('/api/addFavourite', favourite.create);

    // Обновление данных пользователя по id
    app.post('/api/updateFavourite/:id', favourite.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteFavourite/:id', favourite.delete);

    // Получение пользователя по id
    app.get('/api/favourite/:id', favourite.findById);
    
    app.get('/api/findFavouriteForUser/userId=:user_id', favourite.findFavouriteForUser);
    app.get('/api/findFavouriteForUserAndCommand/:user_id/:command_id', favourite.findFavouriteForUserAndCommand);
};