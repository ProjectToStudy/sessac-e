const userLoginHistory = (sequelize, Sequelize) => {
    const UserLoginHistory = sequelize.define('userLoginHistory', {
        // id 자동생성
        // userId: {
        //     type: Sequelize.NUMBER,
        //     allowNull: false,
        // },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        freezeTableName: true,
    });

    UserLoginHistory.associate = models => {
        UserLoginHistory.belongsTo(models.userRequiredInfo);
    };

    return UserLoginHistory;
}

module.exports = userLoginHistory;
