"use strict";

const BoardStorage = require("./BoardStorage");

class Board {
    constructor(body) {
        this.body = body;
    }

    async upload() {
        try {            
            const response = await BoardStorage.save(this.body);
            return response;
        } catch(err) {
            return {success : false, err};
        }
    }

    async search() {        
        try {            
            const response = await BoardStorage.search(this.body);
            return response;
        } catch(err) {
            return {success : false, err};
        }
    }

    async likers() {
        try {         
            const response = await BoardStorage.likers(this.body);
            return response;
        } catch(err) {
            return {success : false, err};
        }
    }

    async like() {
        try {    
            const response = await BoardStorage.like(this.body);
            return response;
        } catch(err) {
            return {success : false, err};
        }
    }   
    
    async cancle() {
        try {    
            const response = await BoardStorage.cancle(this.body);
            return response;
        } catch(err) {
            return {success : false, err};
        }
    }   

    async likers() {
        try {         
            const response = await BoardStorage.likers(this.body);
            return response;
        } catch(err) {
            return {success : false, err};
        }
    }
}

module.exports = Board;