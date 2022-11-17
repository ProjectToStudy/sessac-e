const userLoginHistory = (sequelize, Sequelize) => {
    const UserLoginHistory = sequelize.define('userLoginHistory', {
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
