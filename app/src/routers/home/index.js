"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/hello", ctrl.output.hello);
router.get("/", ctrl.output.navigation);
router.get('/login', ctrl.output.login);
router.get('/register', ctrl.output.register);
router.get('/navigation/', ctrl.output.navigation);
router.get('/symptom/', ctrl.output.symptom);
router.get('/upload', ctrl.output.upload);

router.post('/hello', ctrl.process.hello);
router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);
router.post('/navigation', ctrl.process.navigation);
router.post('/upload', ctrl.process.upload);


module.exports = router;