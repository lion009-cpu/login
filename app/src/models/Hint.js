"use strict";

const HintStorage = require("./HintStorage");
const logger = require("../config/logger");

class Hint {
    constructor() {
    }

    async navigation() {
        try {
            const hint = await HintStorage.getHintInfo();
            return hint;
        } catch(err) {
            return {success : false, err};
        }
    }
}

module.exports = Hint;