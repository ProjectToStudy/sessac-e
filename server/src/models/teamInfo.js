const {DataTypes} = require("sequelize");
const teamInfo = (sequelize, Sequelize) => {
    const TeamInfo = sequelize.define('teamInfo', {
        // id 자동생성
        createdUserId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(22),
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
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: [1, 0],
        },
        capacity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 2,
        },
        sessionCount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        isApproval: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        // 모집 시작 기간
        recruitStartDate: {
            type: 'TIMESTAMP',
            allowNull: true,
        },
        // 모집 마감 기간
        recruitEndDate: {
            type: 'TIMESTAMP',
            allowNull: true,
        },
        // 모집 진행중 여부
        isRecruit: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        // 스터디 시작 기간
        startDate: {
            type: 'TIMESTAMP',
            allowNull: true,
        },
        // 스터디 마감 기간
        endDate: {
            type: 'TIMESTAMP',
            allowNull: true,
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

    teamInfo.associate = models => {
        teamInfo.belongsTo(models.teamAreaInfo);
    }

    // teamInfo.associate = models => {
    //     teamInfo.belongsTo(models.teamStatusInfo);
    // }

    TeamInfo.associate = models => {
        TeamInfo.hasOne(models.teamAdditionalInfo);
    }

    TeamInfo.associate = models => {
        TeamInfo.hasMany(models.teamPhotoInfo);
    }

    return TeamInfo;
};

module.exports = teamInfo;
