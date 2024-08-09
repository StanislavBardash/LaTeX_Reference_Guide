module.exports = (sequelize, Sequelize) => {
    var CommandTag = sequelize.define(
        'command_tag', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            command_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            tag_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            }
        });

    // Определяем связи таблицы user с другими таблицами
    CommandTag.associate = (models) => {
        // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
        CommandTag.belongsTo(models.command, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'command_id'
        });
        CommandTag.belongsTo(models.tag, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'tag_id'
        });
    };
    return CommandTag;
};