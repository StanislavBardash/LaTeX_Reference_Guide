module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define(
        'user', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            username: {
                type: Sequelize.STRING(50), // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(150), // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            },
            register_date: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            admin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            login: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        });

    // Определяем связи таблицы user с другими таблицами
    User.associate = (models) => {
        // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
        User.hasMany(models.comment, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'user_id'
        });
        User.hasMany(models.user_command, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'user_id'
        });
        User.hasMany(models.rating, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'user_id'
        });
        User.hasMany(models.favourite, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'user_id'
        });
        User.hasMany(models.history, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'user_id'
        });
        
    };
    return User;
};