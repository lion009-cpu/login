"use strict";

const db = require("../config/db");
const logger = require("../config/logger");

class BoardStorage {

    static async save(content) {
        return new Promise((resolve, reject) => {            
            const query = 
            "INSERT INTO user_board(id, navi_id, symptom_id, creat_dt, title, contents, read_cnt, reply_cnt, like_cnt) VALUES(?,?,?,date_format(now(), '%Y%m%d'),?,?,?,?,?);";
            db.query(query, [content.id,  
                     content.direction, content.symp_code, content.title, content.content, '0', '0', '0'], (err) => {
                if(err) reject(`${err}`);
                else resolve({success: true});
            });  
        });
    }

    static async search(body) {
        return new Promise((resolve, reject) => {            
            const query = 
             "select a.question_id board_key_id, b.question_id reply_key_id, "
            +"c.question_id like_question_id, a.id board_user_id, a.navi_id, "
            +"a.symptom_id, a.title, a.creat_dt, c.like_id, "
            +"a.contents, c.id like_user_id, d.id my_id, "
            +"count(b.question_id) over(partition by a.question_id) reply_cnt, "
            +"count(c.question_id) over(partition by a.question_id) like_cnt, "
            +"rank() over(partition by a.question_id) rk, "
            +"if(d.id is null, '0', '1') liked, "
            +"if(d.id is null, 'far fa-thumbs-up', 'fas fa-thumbs-up') lik "
            +"from user_board a left outer join reply_board b on a.question_id = b.question_id "
            +"left outer join like_board c on a.question_id = c.question_id "
            +"left outer join like_board d on c.like_id = d.like_id and d.id = ? "
            +"where a.symptom_id = ?;";
            
            db.query(query, [body.id, body.symptom_id], (err, data) => {
                if(err) reject(`${err}`);
                else resolve(data);
            });  
        });
    }

    static async likers(body) {
        
        return new Promise((resolve, reject) => {
            const query = "SELECT id FROM like_board WHERE question_id = ?;";
                db.query(query, [body.question_id], (err, data) => {
                    if(err) reject(`${err}`);
                    resolve(data);
                });
        }); 
    }

    static async like(body) {
        return new Promise((resolve, reject) => { 
            const query = 
            "INSERT INTO like_board(question_id, id, creat_dt) VALUES(?,?,date_format(now(), '%Y%m%d'));";
            db.query(query, [body.question_id, body.id], (err) => {
                if(err) reject(`${err}`);
                else resolve({success: true});
            });      
        });
    }

    static async cancle(body) {
        return new Promise((resolve, reject) => { 
            const query = "DELETE FROM like_board WHERE like_id = ?;";
            db.query(query, [body.like_id], (err) => {
                if(err) reject(`${err}`);
                else resolve({success: true});
            });          
        });
    }
}

module.exports = BoardStorage;