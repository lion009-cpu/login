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
router.get('/home', ctrl.output.home);
router.get('/board', ctrl.output.board);
router.get('/listview', ctrl.output.listview);
router.get('/main', ctrl.output.main);
router.get('/readboard', ctrl.output.readboard);
router.get('/reply', ctrl.output.reply);

router.post('/hello', ctrl.process.hello);
router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);
router.post('/navigation', ctrl.process.navigation);
router.post('/upload', ctrl.process.upload);
router.post('/symptom', ctrl.process.symptom);
router.post('/main', ctrl.process.main);
router.post('/readboard', ctrl.process.readboard);
router.post('/like', ctrl.process.like);
router.post('/unlike', ctrl.process.unlike);
router.post('/likers', ctrl.process.likers);
router.post('/reply', ctrl.process.reply);
router.post('/getReply', ctrl.process.getReply);

module.exports = router;