const userLoginHistory = (sequelize, Sequelize) => {
    const UserLoginHistory = sequelize.define('userLoginHistory', {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
        freezeTableName: true,
    });

    return UserLoginHistory;
};

module.exports = userLoginHistory;
