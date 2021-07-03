"use strict";

const fs = require("fs").promises;

class UserStorage {
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx= users.id.indexOf(id);
        const userInfo = Object.keys(users).reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});

        return userInfo;
    }

    static #getUsers(data, isAll, columns) {
        const users = JSON.parse(data);
        if(isAll) return users;
        const newUsers = columns.reduce((newUsers, column) => {
            if(users.hasOwnProperty(column)) {
                newUsers[column] = users[column];
            }
            return newUsers;
        }, {});
        
        return newUsers;
    }

    static getUsers(isAll,...columns) {
        return fs.readFile("./src/databases/users.json")
            .then((data) => {
                return this.#getUsers(data, isAll, columns);
            })
            .catch(console.error);        
    }

    static getUserInfo(id) {
        return fs.readFile("./src/databases/users.json")
            .then((data) => {
                return this.#getUserInfo(data, id);
            })
            .catch(console.error);
    }

    static async save(userInfo) {
        const users = await this.getUsers(true);
        if(users.id.includes(userInfo.id)) {
            // throw "이미 존재하는 닉네임입니다.";
            return {success: false, msg : "이미 존재하는 닉네임입니다."};
        }
        users.id.push(userInfo.id);
        users.pwd.push(userInfo.pwd);
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));
        return {success: true};
    }
}

module.exports = UserStorage;