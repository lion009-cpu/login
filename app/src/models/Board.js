"use strict";

const BoardPrc = require("./BoardPrc");

class Board {
    constructor(body) {
        this.body = body;
    }

    async upload() {
        try {            
            const response = await BoardPrc.save(this.body);
            return response;
        } catch(err) {
            return {success : false, err};
        }
    }
}

module.exports = Board;