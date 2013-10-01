var fs = require('fs');

var accessLogFile = fs.createWriteStream('access.log', {
    flags: 'a'
});

exports.accessLogFile = accessLogFile;
