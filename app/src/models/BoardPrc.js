"use strict";

const db = require("../config/db");
const logger = require("../config/logger");

class BoardPrc {

    static async save(content) {
        return new Promise((resolve, reject) => {            
            const query = 
            "INSERT INTO user_board(id, section_id, navi_id, symptom_id, creat_dt, title, contents, read_cnt, reply_cnt) VALUES(?,?,?,?,date_format(now(), '%Y%m%d'),?,?,?,?);";
            db.query(query, [content.id, 'a', 
                     content.direction, 'b', content.title, content.content, '0', '0'], (err) => {
                if(err) reject(`${err}`);
                else resolve({success: true});
            });  
        });
    }
}

module.exports = BoardPrc;