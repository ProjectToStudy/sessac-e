const teamStatusInfo = (sequelize, Sequelize) => {
    const TeamStatusInfo = sequelize.define('teamStatusInfo', {
        // id 자동생성
        status: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
        freezeTableName: true,
    });
    //
    // TeamStatusInfo.associate = models => {
    //     TeamStatusInfo.hasMany(models.teamInfo);
    // }

    return TeamStatusInfo;
};

module.exports = teamStatusInfo;
