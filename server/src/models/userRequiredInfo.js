const userRequiredInfo = (sequelize, Sequelize) => {
    const UserRequiredInfo = sequelize.define('userRequiredInfo', {
        id: {
            type: Sequelize.NUMBER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
    });

    return UserRequiredInfo;
}

module.exports = userRequiredInfo;
