module.exports = (sequelize, Sequelize) => {
    var CodeExample = sequelize.define(
        'code_example', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            content: {
                type: Sequelize.STRING(750), // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            }
        });

    // Определяем связи таблицы user с другими таблицами
    CodeExample.associate = (models) => {
        // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
        CodeExample.hasOne(models.command, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'code_example_id'
        });
    };
    return CodeExample;
};