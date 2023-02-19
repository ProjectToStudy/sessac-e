const teamInfo = (sequelize, Sequelize) => {
    const TeamInfo = sequelize.define('teamInfo', {
        // id 자동생성
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        category: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: []
        },
        description: {
            type: Sequelize.STRING(50),
            allowNull: false,
            defaultValue: '',
        },
        channel: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        capacity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 2,
        },
        isApproval: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
        freezeTableName: true,
    });

    teamInfo.associate = models => {
        teamInfo.belongsTo(models.teamAreaInfo);
    }

    teamInfo.associate = models => {
        teamInfo.belongsTo(models.teamStatusInfo);
    }

    TeamInfo.associate = models => {
        TeamInfo.hasOne(models.teamAdditionalInfo);
    }

    TeamInfo.associate = models => {
        TeamInfo.hasMany(models.teamPhotoInfo);
    }

    return TeamInfo;
};

module.exports = teamInfo;
