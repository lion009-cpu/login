"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");
const Hint = require("../../models/Hint");
const Symptom = require("../../models/Symptom");
const Board = require('../../models/Board');
const crypto = require('crypto');
const { data } = require("../../config/logger");
let main = {
    question_id:"",
    id: "",
    creat_dt: "",
    read_cnt: "",
    reply_cnt: "",
    title: "",
    symp_code: "",
    contents: "",
    symp_com: "",
};
let temp = {
    body: main,
};
let like_stat = {
    data : [],
    date : "",
    none_like : "far fa-thumbs-up",
    like : "fas fa-thumbs-up",
};

async function loadNavi(req, res) {
    const hint = new Hint();
    const response = await hint.navigation();
    const navi = JSON.stringify(response);
    
    logger.info(`GET /navigation 304 "안내 화면으로 이동"`);
    res.render("home/navigation", {data:response});
}

async function loadSymptom(req, res) {
    const symptom = new Symptom();
    const response = await symptom.navigation();            

    logger.info(`GET /symptom 304 "대표증상 화면으로 이동"`);
    res.render("home/symptom", {data:response});
}

async function loadUpload(req, res) {          

    logger.info(`GET /upload 304 "글쓰기 화면으로 이동"`);
    res.render("home/upload", {nick:req.session.user.body.id, symptom_code:req.session.symptom_code, direction: req.session.direction});
}

async function loadReply(req, res) {           

    logger.info(`GET /reply 304 "글쓰기 화면으로 이동"`);
    res.render("home/reply", {nick:req.session.user.body.id, symptom_code:req.session.symptom_code, direction: req.session.direction});
}

async function loadLogin(req, res) {
    
    if(await isAuthOwner(req, res)) {
        await loadNavi(req, res);
    } else {
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render("home/login");
    }
}

async function isAuthOwner(req, res) {
    if(req.session.hasOwnProperty('isLogined') && req.session.isLogined) {
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
        console.log(req.session);
        await loadLogin(req, res);
    },

    register: (req, res) => {
        logger.info(`GET /register 304 "가입 화면으로 이동"`);
        res.render("home/register");
    },

    main: async (req, res) => {
        var isLogined = "";
        if(isLogined = await isAuthOwner(req, res)) {
            req.body.id = req.session.user.body.id;             
        } else {
            delete req.session.isLogined;
            isLogined = false;
        }
        
        req.body.symptom_id = symptom_code;
        const board = new Board(req.body);  
        const response = await board.search(); 
        // console.log(response);

        logger.info(`GET /main 304 "홈 화면으로 이동"`);
        res.render("home/main", {data : response, symp_nm : symptom_nm, howami: isLogined});
    },

    home: async (req, res) => {
        const board = new Board(symptom_code);        
        const response = await board.search();

        logger.info(`GET /home 304 "홈 화면으로 이동"`);
        res.render("home/home", {data : response});
    },

    board: (req, res) => {
        logger.info(`GET /board 304 "게시판 화면으로 이동"`);
        res.render("home/board");
    },

    listview: (req, res) => {
        logger.info(`GET /listview 304 "게시판 조회 화면으로 이동"`);
        res.render("home/listview");
    },

    upload: async (req, res) => {

        if(req.session.hasOwnProperty('direction') && req.session.direction !=="") {
            if(req.session.hasOwnProperty('symptom_code') && req.session.symtom_code !=="") {
                if(await isAuthOwner(req, res)) {
                    await loadUpload(req, res);
                } else {
                    alert('로그인이 필요합니다');
                    await loadLogin(req, res);
                }
            } else {
                alert('병증을 선택해야 합니다.');
                await loadSymptom(req, res);
            }
        } else {
            alert('먼저 어떻게 참여할지 결정하세요');
            await loadNavi(req, res);
        }
    },

    reply: async (req, res) => {

        if(req.session.hasOwnProperty('direction') && req.session.direction !=="") {
            if(req.session.hasOwnProperty('symptom_code') && req.session.symtom_code !=="") {
                if(await isAuthOwner(req, res)) {
                    await loadReply(req, res);
                } else {
                    await loadLogin(req, res);
                }
            } else {
                await loadSymptom(req, res);
            }
        } else {
            await loadNavi(req, res);
        }
    },

    navigation: async (req, res) => {
        var isLogined = "";
        const hint = new Hint();
        const response = await hint.navigation();

        if(isLogined = await isAuthOwner(req, res)) {
        } else {
            delete req.session.isLogined;
            isLogined = false;    
        }   

        logger.info(`GET /navigation 304 "안내 화면으로 이동"`);
        res.render("home/navigation", {data : response, howami: isLogined});
    },

    symptom: async (req, res) => {        
        var isLogined = "";
        console.log(req.session.isLogined);
        console.log(req.session.hasOwnProperty('direction'));
        if(isLogined = await isAuthOwner(req, res)) {
        } else {
            delete req.session.isLogined;
            isLogined = false;
        }
        if(req.session.hasOwnProperty('direction')) {
            await loadSymptom(req, res, isLogined);
        } else {
            await loadNavi(req, res);            
        }
    },

    readboard: async (req, res) => {

        logger.info(`GET /readboard 304 "게시글 읽기 화면으로 이동"`);
        res.render("home/readboard", {data:temp.body});
    },

    likers: async (req, res) => {

        logger.info(`GET /likers 304 "좋아요 목록 화면으로 이동"`);
        res.render("home/likers");
    },
}

const process = {

    hello: async (req, res) => {

        logger.info(`POST / 304 "홈 화면으로 이동"`);       
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
        // category = req.body.direction;
        if(req.body.hasOwnProperty('direction') && req.body.direction != "") {
            req.session.direction = req.body.direction;
        } else {
            delete req.session.direction;
        }

        return res.status('201').json({success: true});   
    },

    upload: async (req, res) => {  

        req.body.direction = req.session.direction;//참여형태
        req.body.id = req.session.user.body.id;
        req.body.symp_code = symptom_code;

        console.log(req.body);
        console.log(symptom_nm);
        const board = new Board(req.body);
        
        const response = await board.upload();

        const url = {
            method: "POST",
            path: "/upload",
            status: response.err ? 400 : 201,
        };

        return res.status(url.status).json(response);        
    },

    reply: async (req, res) => {  

        req.body.direction = req.session.direction;//참여형태
        req.body.id = req.session.user.body.id;//nick name
        req.body.symp_code = symptom_code;//증상유형

        console.log(req.body);
        const board = new Board(req.body);
        
        const response = await board.reply();

        const url = {
            method: "POST",
            path: "/upload",
            status: response.err ? 400 : 201,
        };

        return res.status('201').json({success: true});    
    },

    getReply: async (req, res) => {
        if(req.body.hasOwnProperty('question_id') && req.body.question_id !== "") {
            console.log(req.body.question_id)
            var board = new Board(req.body);        
            var response = await board.getReply();
        } 
        
        // const url = {
        //     method: "POST",
        //     path: "/getReply",
        //     status: response.err ? 400 : 201,
        // };
        
        return res.status('201').json({success: true, result: response});     
    },

    symptom: async (req, res) => {
        if(req.body.hasOwnProperty('key_code') && req.body.key_code !== "") {
            req.session.symptom_code = req.body.key_code;
            symptom_code = req.body.key_code;
            symptom_nm = req.body.key_nm;
        } else {
            delete req.session.symptom_code;
        }       
        
        return res.status('201').json({success: true});     
    },

    readboard: async (req, res) => {
        
        return res.status('201').json({success: true});     
    },

    main: async (req, res) => {
        temp.body = req.body;                
        return res.status('201').json({success: true});     
    },

    like: async (req, res) => {
        if(await isAuthOwner(req, res)) {
            req.body.id=req.session.user.body.id;
            const board = new Board(req.body);
            console.log(req.body);
            let response="";
            if(req.body.liked === "0") {
                response = await board.like(); 
            } else {
                response = await board.cancle();
            }
            
            const url = {
                method: "POST",
                path: "/upload",
                status: response.err ? 400 : 201,
            };
    
            // log(response, url);
            // return res.status(url.status).json(response); 
            
            console.log(response);

            if(response.success) { 
                if(req.body.liked === "0") {
                    return res.status('201').json({success:true, liked:'1', lik_cd:'fas fa-thumbs-up'});
                } else {
                    return res.status('201').json({success:true, liked:'0', lik_cd:'far fa-thumbs-up'});
                }
            } else {
                return res.status('201').json({success: false, err});
            }
        } else {
            return res.status('201').json({success: false, msg:"로그인이 필요합니다."});
        }
    },

    unlike: async (req, res) => {
        
        if(await isAuthOwner(req, res)) {
            req.body.id=req.session.user.body.id;
            const board = new Board(req.body);        
            const response = await board.like(); 

            if(response.success) { 
                if(req.body.liked === "0") {
                    return res.status('201').json({success:true, like_cnt:response.data[0].like_cnt, liked:'1', lik_cd:'fas fa-thumbs-up'});
                } else {
                    console.log(response.data[0].like_cnt);
                    return res.status('201').json({success:true, like_cnt:response.data[0].like_cnt, liked:'0', lik_cd:'far fa-thumbs-up'});
                }
            } else {
                return res.status('201').json({success: false});
            }
        } else {
            logger.info(`GET /login 304 "로그인 화면으로 이동"`);
            res.render("home/login");
        }
    },

    likers: async (req, res) => {
        
        if(await isAuthOwner(req, res)) {
            req.body.id=req.session.user.body.id;            
        }
        console.log(req.body);
        const board = new Board(req.body);        
        const response = await board.likers(); 

        console.log(response);

        return res.status('201').json({success:true, likers:response});

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