"use strict";

const db = require("../config/db");

class UserStorage {

    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users where id = ?;"
            db.query(query, [id], (err, data) => {
                if(err) reject(`${err}`);
                else resolve(data[0]);
            });  
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, eff_end_dt, user_password, e_mail, gender, age, grade, eff_sta_dt) VALUES(?,?,?,?,?,?,?,date_format(now(), '%Y%m%d'));";
            db.query(query, [userInfo.id, '99991231', 
                     userInfo.pwd, 'a@a.com', 'F', '30', '1'], (err) => {
                if(err) reject(`${err}`);
                else resolve({success: true});
            });  
        });
    }
}

module.exports = UserStorage;