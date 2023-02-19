const teamCategoryInfo = (sequelize, Sequelize) => {
    const TeamCategoryInfo = sequelize.define('teamCategoryInfo', {
        // id 자동생성
        categoryName: {
            type: Sequelize.STRING(20),
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

    TeamCategoryInfo.associate = models => {
        TeamCategoryInfo.hasMany(models.teamInfo);
    }

    return TeamCategoryInfo;
};

module.exports = teamCategoryInfo;
