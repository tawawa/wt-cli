var Chalk = require('chalk');
var Decode = require('jwt-decode');
var Pad = require('pad');


module.exports = printProfile;


function printProfile(profile, options) {
    var WIDTH = 12;
    
    if (!options) options = {};
    
    console.log(Chalk.blue(Pad('Profile:', WIDTH)), Chalk.green(profile.name));
    console.log(Chalk.blue(Pad('URL:', WIDTH)), profile.url);
    console.log(Chalk.blue(Pad('Container:', WIDTH)), profile.container);
    
    if (options.token) {
        console.log(Chalk.blue(Pad('Token:', WIDTH)), profile.token);
    }
    
    if (options.details) {
        try {
            var claims = Decode(profile.token);
            var keys = Object.keys(claims).sort();
            keys.forEach(function (key) {
                var name = 'Token.' + key + ':';
                console.log(Chalk.blue(Pad(name, WIDTH)), claims[key]);
            });
        } catch (__) {
            console.log(Chalk.red('Token is not a valid JWT'));
        }
    }
}
