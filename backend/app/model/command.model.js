module.exports = (sequelize, Sequelize) => {
    var Command = sequelize.define(
        'command', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            name: {
                type: Sequelize.STRING(50), // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(750), // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            },
            code_example_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            category_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            date: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            verified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        });

    // Определяем связи таблицы user с другими таблицами
    Command.associate = (models) => {
        // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
        Command.hasMany(models.command_tag, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'command_id'
        });
        Command.belongsTo(models.category, {
            foreignKey: 'category_id'
        });
        Command.belongsTo(models.code_example, {
            foreignKey: 'code_example_id'
        });
        Command.hasMany(models.rating, {
            onUpdate: 'CASCADE',
            foreignKey: 'command_id'
        });
        Command.hasMany(models.comment, {
            onUpdate: 'CASCADE',
            foreignKey: 'command_id'
        });
        Command.hasMany(models.user_command, {
            onUpdate: 'CASCADE',
            foreignKey: 'command_id'
        });
        Command.hasMany(models.favourite, {
            onUpdate: 'CASCADE',
            foreignKey: 'command_id'
        });
        Command.hasMany(models.history, {
            onUpdate: 'CASCADE',
            foreignKey: 'command_id'
        });
    };
    return Command;
};