const fs = require("fs");
// const rfs = require('rotating-file-stream');
const appRoot = require("app-root-path");

const accessLogStream = fs.createWriteStream(
    `${appRoot}/log/access.log`, 
    { flags: 'a' }
);

// const accessLogStream = rfs.createStream(
//     'access.log', 
//     {
//         interval: '1d', // rotate daily
//         path: `${appRoot}/log/`
//     }
// );

module.exports = accessLogStream;