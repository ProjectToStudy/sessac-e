const teamUserInfo = (sequelize, Sequelize) => {
    const TeamUserInfo = sequelize.define('teamUserInfo', {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        teamInfoId: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        status: { // 현재 상태값 - application : 1 / active : 2 / rejection : 3 / withdrawal : 4
            type: Sequelize.STRING(20),
            allowNull: false,
            defaultValue: 'wait'
        },
        createdAt: { // 가입일시
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

    return TeamUserInfo;
};

module.exports = teamUserInfo;
