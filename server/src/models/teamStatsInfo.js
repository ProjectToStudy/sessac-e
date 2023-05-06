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
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: 'TIMESTAMP',
            allowNull: true,
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
            type: 'TIMESTAMP',
            allowNull: true,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['userId', 'teamInfoId', 'type', 'isValid']
            },
        ],
        freezeTableName: true,
    });
    //
    // TeamStatusInfo.associate = models => {
    //     TeamStatusInfo.hasMany(models.teamInfo);
    // }

    return TeamStatsInfo;
};

module.exports = teamStatsInfo;
