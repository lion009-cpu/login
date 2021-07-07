"use strict";

const SymptomStorage = require("./SymptomStorage");
const logger = require("../config/logger");

class Symptom {
    constructor() {
    }

    async navigation() {
        try {
            const hint = await SymptomStorage.getSymptomInfo();
            return hint;
        } catch(err) {
            return {success : false, err};
        }
    }
}

module.exports = Symptom;