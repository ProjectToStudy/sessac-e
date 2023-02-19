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
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: 'TIMESTAMP',
            allowNull: true,
            onupdate: Sequelize.literal('CURRENT_TIMESTAMP')
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
        freezeTableName: true,
    });

    UserAdditionalInfo.associate = models => {
        UserAdditionalInfo.belongsTo(models.userRequiredInfo);
    };

    return UserAdditionalInfo;
};

module.exports = userAdditionalInfo;
