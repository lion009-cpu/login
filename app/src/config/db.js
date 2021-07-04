const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const logger = require("../config/logger");

db.connect((err) => {  
    if(!err) {  
        logger.info("Database is connected ... \n\n");    
    } else {  
        logger.info("Error connecting database ... \n\n");  
    }  
});

module.exports = db;