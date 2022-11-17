const userAdditionalInfo = (sequelize, Sequelize) => {
    const UserAdditionalInfo = sequelize.define('userAdditionalInfo', {
        // id 자동생성
        // userId: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        // },
        career: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: [],
        },
        purpose: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: [],
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

    UserAdditionalInfo.associate = models => {
        UserAdditionalInfo.belongsTo(models.userRequiredInfo);
    };

    return UserAdditionalInfo;
};

module.exports = userAdditionalInfo;
