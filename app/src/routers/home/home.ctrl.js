"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");
const Hint = require("../../models/Hint");
const Symptom = require("../../models/Symptom");
const Board = require('../../models/Board');
const crypto = require('crypto');

async function loadNavi(req, res) {
    const hint = new Hint();
    const response = await hint.navigation();
    const navi = JSON.stringify(response);
    
    logger.info(`GET /navigation 304 "안내 화면으로 이동"`);
    res.render("home/navigation", {data:response});
}

async function isAuthOwner(req, res) {
    if(req.session.isLogined) {
        return true;
    } else {
        return false;
    }
}

const output = {
    hello: (req, res) =>{
        logger.info(`GET / 304 "홈 화면으로 이동"`);
        res.render("home/index");
    },

    login: async (req, res) => {
        if(await isAuthOwner(req, res)) {
            await loadNavi(req, res);
        } else {
            logger.info(`GET /login 304 "로그인 화면으로 이동"`);
            res.render("home/login");
        }
    },

    register: (req, res) => {
        logger.info(`GET /register 304 "가입 화면으로 이동"`);
        res.render("home/register");
    },

    upload: (req, res) => {
        if(isAuthOwner(req, res)) {
            logger.info(`GET /upload 304 "글쓰기 화면으로 이동"`);
            res.render("home/upload");
        } else {
            logger.info(`GET /login 304 "로그인 화면으로 이동"`);
            res.render("home/login");
        }
    },

    navigation: async (req, res) => {
        const hint = new Hint();
        const response = await hint.navigation();
        const navi = JSON.stringify(response); 

        logger.info(`GET /navigation 304 "안내 화면으로 이동"`);
        res.render("home/navigation");
    },

    symptom: async (req, res) => {
        const symptom = new Symptom();
        const response = await symptom.navigation();
        const navi = JSON.stringify(response); 

        logger.info(`GET /symptom 304 "대표증상 화면으로 이동"`);
        res.render("home/symptom", {data:response});
    },
}

const process = {

    hello: async (req, res) => {

        logger.info(`POST / 304 "홈 화면으로 이동"`);        
        console.log(req.body);        
        res.render("home/index");
    },

    login: async (req, res) => {
        try {
            req.body.pwd = await crypto.createHash('sha512').update(req.body.pwd).digest('base64');
        } catch (err) {
            logger.error(err);
            return {success : false, err};
        }

        const user = new User(req.body);        
        const response = await user.login();
        req.session.user = user;
        console.log(req.session.user);
        console.log(response);
        req.session.isLogined = true;
        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200,
        };

        log(response, url);
        return res.status(url.status).json(response);         
    },

    register: async (req, res) => {
        try {
            req.body.pwd = await crypto.createHash('sha512').update(req.body.pwd).digest('base64');
        } catch (err) {
            return {success : false, err};
        }
        
        const user = new User(req.body);
        const response = await user.register();

        const url = {
            method: "POST",
            path: "/register",
            status: response.err ? 400 : 201,
        };        

        log(response, url);
        return res.status(url.status).json(response);        
    },

    navigation: async (req, res) => {  
        category = req.body.direction;

        return res.status('201').json({success: true});   
    },

    upload: async (req, res) => {  
        req.body.direction = category;
        req.body.id = req.session.user.body.id;
        
        const board = new Board(req.body);
        const response = await board.upload();

        const url = {
            method: "POST",
            path: "/upload",
            status: response.err ? 400 : 201,
        };

        log(response, url);
        return res.status(url.status).json(response);        
    },
}

module.exports = {
    output,
    process,
}

const log = (response, url) => {
    if(response.err)
        logger.error(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}`
        );
    else
        logger.info(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.msg || ""}`
        );
}