module.exports = (sequelize, Sequelize) => {
    var Category = sequelize.define(
        'category', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            name: {
                type: Sequelize.STRING(100), // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            }
        });

    // Определяем связи таблицы user с другими таблицами
    Category.associate = (models) => {
        // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
        Category.hasMany(models.command, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'category_id'
        });
    };
    return Category;
};