"use strict";

const output = {
    hello: (req, res) =>{
        res.render("home/index");
    },    
    login: (req, res) => {
        res.render("home/login");
    },
}

const users = {
    id: ["xiu", "juno", "adrian"],
    pwd: ["12341234", "12341234", "123"],
};

const process = {
    login: (req, res) => {
        const id= req.body.id,
            pwd= req.body.pwd;
        
        if(users.id.includes(id)) {
            const idx = users.id.indexOf(id);
            if(users.pwd[idx] === pwd) {
                return res.json({
                    success: true,
                });
            }
        }
        
        return res.json({
            success: false,
            msg: "로그인에 실패하였습니다.",
        })
    },
}

module.exports = {
    output,
    process,
}