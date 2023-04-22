const userCertificationHistory = (sequelize, Sequelize) => {
    const UserCertificationHistory = sequelize.define('userCertificationHistory', {
        // id 자동생성
        phone: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        certificationNumber: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        failCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        isCertified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
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

    return UserCertificationHistory;
};

module.exports = userCertificationHistory;
