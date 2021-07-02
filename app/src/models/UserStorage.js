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
    
    static getUsers(...columns) {
        // const users = this.#users;
        const newUsers = columns.reduce((newUsers, column) => {
            if(users.hasOwnProperty(column)) {
                newUsers[column] = users[column];
            }
            return newUsers;
        }, {});
        
        return newUsers;
    }

    static getUserInfo(id) {
        return fs.readFile("./src/databases/users.json")
            .then((data) => {
                return this.#getUserInfo(data, id);
            })
            .catch(console.error);
    }

    static save(userInfo) {
        // const users = this.#users;
        users.id.push(userInfo.id);
        users.pwd.push(userInfo.pwd);     
        return {success: true};
    }
}

module.exports = UserStorage;