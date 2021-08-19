"use strict";

const db = require("../config/db");
const logger = require("../config/logger");

class SymptomStorage {

    static async getSymptomInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "select substr(a.code_id,4) code_id, a.code_nm from code_lst a where a.code_grp_id = 'X01' order by a.code_id;";
            db.query(query, (err, data) => {
                if(err) reject(`${err}`);
                else resolve(data);
            });  
        });
    }
}

module.exports = SymptomStorage;