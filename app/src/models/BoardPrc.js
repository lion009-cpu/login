"use strict";

const db = require("../config/db");
const logger = require("../config/logger");

class BoardPrc {

    static async save(content) {
        return new Promise((resolve, reject) => {            
            const query = 
            "INSERT INTO user_board(id, section_id, navi_id, symptom_id, creat_dt, title, contents, read_cnt, reply_cnt) VALUES(?,?,?,?,date_format(now(), '%Y%m%d'),?,?,?,?);";
            db.query(query, [content.id, 'a', 
                     content.direction, content.symp_code, content.title, content.content, '0', '0'], (err) => {
                if(err) reject(`${err}`);
                else resolve({success: true});
            });  
        });
    }

    static async search(symptom_id) {
        return new Promise((resolve, reject) => {            
            const query = 
            "SELECT question_id, id, section_id, navi_id, symptom_id, creat_dt, title, contents, read_cnt, reply_cnt FROM user_board where symptom_id = ?;";
            db.query(query, [symptom_id], (err, data) => {
                if(err) reject(`${err}`);
                else resolve(data);
            });  
        });
    }
}

module.exports = BoardPrc;