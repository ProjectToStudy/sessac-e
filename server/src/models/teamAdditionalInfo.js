const teamAdditionalInfo = (sequelize, Sequelize) => {
    const TeamAdditionalInfo = sequelize.define('teamAdditionalInfo', {
        // id 자동생성
        detailDescription: {
            // @TODO: 상세정보 길이 논의 필요
            type: Sequelize.STRING(500),
            allowNull: false,
            defaultValue: '',
        },
        callOutTitle: {
            // @TODO: 상세정보 길이 논의 필요
            type: Sequelize.STRING(100),
            allowNull: false,
            defaultValue: '',
        },
        callOutContents: {
            // @TODO: 상세정보 길이 논의 필요
            type: Sequelize.STRING(500),
            allowNull: false,
            defaultValue: '',
        },
        // @TODO: 우대사항, 질문사항 어떤 방식으로 추가되는지 논의 필요
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

    TeamAdditionalInfo.associate = models => {
        TeamAdditionalInfo.belongsTo(models.teamInfo);
    }

    return TeamAdditionalInfo;
};

module.exports = teamAdditionalInfo;
