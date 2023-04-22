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
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: 'TIMESTAMP',
            allowNull: true,
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        deletedAt: {
            type: 'TIMESTAMP',
            allowNull: true,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
        freezeTableName: true,
    });

    TeamPhotoInfo.associate = models => {
        TeamPhotoInfo.belongsTo(models.teamInfo);
    }

    return TeamPhotoInfo;
};

module.exports = teamPhotoInfo;
