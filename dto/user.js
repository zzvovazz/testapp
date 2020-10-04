const fs = require('fs');
const Sequelize = require('sequelize');
const config = JSON.parse(fs.readFileSync('.config'));

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    dialect: 'mysql',
    host: config.db.host,
    port: config.db.port,
});

module.exports = sequelize.define('user', {
    id: {
        primaryKey: true,
        type: Sequelize.BIGINT
    },
    email: {
        type: Sequelize.STRING
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING
    },
}, {});

sequelize.sync();

