"use strict";

class UserStorage {
    static #users = {
        id: ["xiu", "juno", "adrian"],
        pwd: ["12341234", "12341234", "123"],
        name: ["xiu", "juno", "adrian"],
    };

    static getUsers(...columns) {
        const users = this.#users;
        const newUsers = columns.reduce((newUsers, column) => {
            if(users.hasOwnProperty(column)) {
                newUsers[column] = users[column];
            }
            return newUsers;
        }, {});
        
        return newUsers;
    }
}

module.exports = UserStorage;