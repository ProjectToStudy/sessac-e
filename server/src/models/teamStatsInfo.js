const teamStatsInfo = (sequelize, Sequelize) => {
    const TeamStatsInfo = sequelize.define('teamStatsInfo', {
        // id 자동생성
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        teamInfoId: {
            type: Sequelize.INTEGER,
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
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        // indexes: [
        //     {
        //         unique: true,
        //         fields: ['userId', 'teamInfoId', 'type', 'isValid']
        //     },
        // ],
        freezeTableName: true,
    });
    //
    // TeamStatusInfo.associate = models => {
    //     TeamStatusInfo.hasMany(models.teamInfo);
    // }

    return TeamStatsInfo;
};

module.exports = teamStatsInfo;
