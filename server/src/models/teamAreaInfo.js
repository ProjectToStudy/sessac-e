const teamAreaInfo = (sequelize, Sequelize) => {
    const TeamAreaInfo = sequelize.define('teamAreaInfo', {
        // id 자동생성
        // @TODO: 주소 어떻게 넣을건지 논의 필요
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

    TeamAreaInfo.associate = models => {
        TeamAreaInfo.hasMany(models.teamInfo);
    }

    return TeamAreaInfo;
};

module.exports = teamAreaInfo;
