const teamPhotoInfo = (sequelize, Sequelize) => {
    const TeamPhotoInfo = sequelize.define('teamPhotoInfo', {
        // id 자동생성
        imageUrl: {
            // @TODO: 상세정보 길이 논의 필요
            type: Sequelize.STRING(500),
            allowNull: false,
            defaultValue: '',
        },
        sortNo: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
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
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        freezeTableName: true,
    });

    TeamPhotoInfo.associate = models => {
        TeamPhotoInfo.belongsTo(models.teamInfo);
    }

    return TeamPhotoInfo;
};

module.exports = teamPhotoInfo;
