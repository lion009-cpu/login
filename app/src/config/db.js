const mysql = require("mysql");
// const env = process.env.NODE_ENV || 'development';
// const config = require('../../config/config')[env];
// const Sequelize = require('sequelize');
// const db = {};
// const sequelize = new Sequelize(config.database, config.username, config.password, config,)

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const logger = require("../config/logger");
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

db.connect((err) => {  
    if(!err) {  
        logger.info("Database is connected ... \n\n");    
    } else {  
        logger.info("Error connecting database ... \n\n");  
    }  
});

module.exports = db;