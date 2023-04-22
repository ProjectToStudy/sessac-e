const teamCategoryInfo = (sequelize, Sequelize) => {
    const TeamCategoryInfo = sequelize.define('teamCategoryInfo', {
        // id 자동생성
        categoryName: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        teamId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: 'TIMESTAMP',
            allowNull: true,
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
        freezeTableName: true,
    });

    return TeamCategoryInfo;
};

module.exports = teamCategoryInfo;
