"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        try {
            const {id, user_password} = await UserStorage.getUserInfo(client.id);
            console.log(user_password);
            if(id) {
                if(id === client.id && user_password === client.pwd) {
                    return {success: true};
                }
                return {success: false, msg: "비밀번호가 틀렸습니다."};
            }
            return {success: false, msg: "존재하지 않는 id 입니다."};
        } catch(err) {
            return { success: false, msg: err};
        }
    }

    async register() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch(err) {
            return {success : false, msg : err};
        }
    }
}

module.exports = User;