const categoryInfo = (sequelize, Sequelize) => {
    const CategoryInfo = sequelize.define('categoryInfo', {
        // id 자동생성
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        category: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        isValid: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        freezeTableName: true,
    });

    return CategoryInfo;
};

module.exports = categoryInfo;
