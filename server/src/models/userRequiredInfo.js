const userRequiredInfo = (sequelize, Sequelize) => {
    const UserRequiredInfo = sequelize.define('userRequiredInfo', {
        // id 자동생성
        phone: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
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

    UserRequiredInfo.associate = models => {
        UserRequiredInfo.hasOne(models.userAdditionalInfo);
    };

    return UserRequiredInfo;
};

module.exports = userRequiredInfo;
