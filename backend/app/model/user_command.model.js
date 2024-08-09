module.exports = (sequelize, Sequelize) => {
    var UserCommand = sequelize.define(
        'user_command', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            user_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            command_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            }
        });

    // Определяем связи таблицы user с другими таблицами
    UserCommand.associate = (models) => {
        // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
        UserCommand.belongsTo(models.command, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'command_id'
        });
        UserCommand.belongsTo(models.user, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'user_id'
        });
    };
    return UserCommand;
};