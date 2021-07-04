const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {  
    if(!err) {  
        console.log("Database is connected ... \n\n");    
    } else {  
        console.log("Error connecting database ... \n\n");  
        console.log(db);
    }  
});

module.exports = db;