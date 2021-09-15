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
    static async reply(content) {
        return new Promise((resolve, reject) => {            
            const query = 
            "INSERT INTO reply_board(parent_id, navi_id, symptom_id, user_id, creat_dt, " 
            + "contents, read_cnt, reply_cnt, like_cnt) "
            + "VALUES(?,?,?,?,date_format(now(), '%Y%m%d'),?,?,?,?);";
            db.query(query, [content.question_id,  
                     content.direction, content.symp_code, content.id, content.content, '0', '0', '0'], (err) => {
                if(err) reject(`${err}`);
                else resolve({success: true});
            });  
        });
    }
    static async getReply(body) {
        
        return new Promise((resolve, reject) => {
            const query = "WITH RECURSIVE temp (question_id, parent_id, navi_id, symptom_id, user_id, contents) as ("
                + "SELECT x.question_id, x.parent_id, x.navi_id, x.symptom_id, x.user_id, x.contents "
                + "FROM reply_board x "
                + "WHERE parent_id = ?"
                + "UNION ALL "
                + "SELECT y.question_id, y.parent_id, y.navi_id, y.symptom_id, y.user_id, y.contents "
                + "FROM reply_board y "
                + "INNER JOIN temp ON y.parent_id = temp.question_id "
                + "limit 1000 "
                + ") "
                + "SELECT * "
                + "FROM temp "
                + "order by CAST(substring(question_id, 2) AS UNSIGNED);";

                db.query(query, [body.question_id], (err, reply) => {
                    if(err) reject(`${err}`);
                    resolve(reply);
                });
        }); 
    }

    static async search(body) {
        return new Promise((resolve, reject) => {            
            const query = 
            "WITH user_reply as ("
            +"SELECT a.question_id board_key_id, "
            +"       a.id board_user_id, a.navi_id, " 
            +"       a.symptom_id, a.title, a.creat_dt, a.contents, "
            +"       sum(if(b.parent_id is null, 0, 1)) reply_cnt "
            +"FROM user_board a "
            +"     left outer join reply_board b on a.question_id = b.parent_id "
            +"WHERE a.symptom_id = ? "
            +"group by a.question_id, "
            +"       a.id, a.navi_id, "
            +"       a.symptom_id, a.title, a.creat_dt, a.contents "
            +"), user_like as   ( "
            +"SELECT a.question_id board_key_id, "
            +"       if(d.id is null, '0', '1') liked, "
            +"       if(d.id is null, 'far fa-thumbs-up', 'fas fa-thumbs-up') lik, "
            +"       sum(if(c.question_id is null, 0, 1)) like_cnt "
            +"FROM user_board a "
            +"     left outer join like_board c on a.question_id = c.question_id "
            +"     left outer join like_board d on a.question_id = d.question_id and d.id = ? "
            +"group by a.question_id ) "
            +"select a.*, b.liked, b.lik, b.like_cnt "
            +"from user_reply a, user_like b "
            +"where a.board_key_id = b.board_key_id;";
            
            // console.log(query);
            
            db.query(query, [body.symptom_id, body.id], (err, data) => {
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
                console.log(query);
                if(err) reject(`${err}`);
                else resolve({success: true});
            });      
        });
    }

    static async cancle(body) {
        return new Promise((resolve, reject) => { 
            const query = "DELETE FROM like_board WHERE id = ? and question_id = ?;";
            db.query(query, [body.id, body.question_id], (err) => {
                if(err) reject(`${err}`);
                else resolve({success: true});
            });          
        });
    }
}

module.exports = BoardStorage;