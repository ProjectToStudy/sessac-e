const teamCategoryInfo = (sequelize, Sequelize) => {
    const TeamCategoryInfo = sequelize.define('teamCategoryInfo', {
        // id 자동생성
        categoryName: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        teamInfoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        freezeTableName: true,
    });

    return TeamCategoryInfo;
};

module.exports = teamCategoryInfo;
