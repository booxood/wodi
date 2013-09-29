
/*
 * GET users listing.
 */
 var fs = require('fs');
 var config = require('../config');

exports.list = function(req, res){
    fs.stat(config.logPath, function(err, stats){
        if(err){
            return res.end('read log error..');
        }
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length',stats.size);
        res.writeHead(200, 'ok');
        fs.createReadStream(config.logPath).pipe(res);    
    });
};
