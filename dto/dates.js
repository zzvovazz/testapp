const fs = require('fs');
const Sequelize = require('sequelize');
const config = JSON.parse(fs.readFileSync('.config'));

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    dialect: 'mysql',
    host: config.db.host,
    port: config.db.port,
});

module.exports = sequelize.define('dates', {
    date: {
        primaryKey: true,
        type: Sequelize.STRING
    },
    origin_date: {
        type: Sequelize.STRING
    },
    CR: {
        type: Sequelize.STRING
    },
    EPC: {
        type: Sequelize.STRING
    },
    apprComm: {
        type: Sequelize.STRING
    },
    apprLeadCount: {
        type: Sequelize.STRING
    },
    apprSaleAmount: {
        type: Sequelize.STRING
    },
    apprSaleCount: {
        type: Sequelize.STRING
    },
    bonusComm: {
        type: Sequelize.STRING
    },
    bonusCount: {
        type: Sequelize.STRING
    },
    clickCount: {
        type: Sequelize.STRING
    },
    commClickCount: {
        type: Sequelize.STRING
    },
    dispComm: {
        type: Sequelize.STRING
    },
    dispLeadCount: {
        type: Sequelize.STRING
    },
    dispSaleAmount: {
        type: Sequelize.STRING
    },
    dispSaleCount: {
        type: Sequelize.STRING
    },
    grossComm: {
        type: Sequelize.STRING
    },
    grossLeadCount: {
        type: Sequelize.STRING
    },
    grossSaleAmount: {
        type: Sequelize.STRING
    },
    grossSaleCount: {
        type: Sequelize.STRING
    },
    impCount: {
        type: Sequelize.STRING
    },
    netComm: {
        type: Sequelize.STRING
    },
    netLeadCount: {
        type: Sequelize.STRING
    },
    netSaleAmount: {
        type: Sequelize.STRING
    },
    netSaleCount: {
        type: Sequelize.STRING
    },
    pendComm: {
        type: Sequelize.STRING
    },
    pendLeadCount: {
        type: Sequelize.STRING
    },
    pendSaleAmount: {
        type: Sequelize.STRING
    },
    pendSaleCount: {
        type: Sequelize.STRING
    },
    totalComm: {
        type: Sequelize.STRING
    },
}, {});

sequelize.sync();

