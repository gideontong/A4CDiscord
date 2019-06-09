const Discord = require("discord.js");
var fs = require('fs');
const bot = new Discord.Client();

const config = require("./config/config.json");
bot.login(config.token);

require("./scripts/events.js")(bot);

/* 
 * On 2019 Jun 8 all Easter Eggs were disabled, including ones that may include
 * trolls with Paul. It has been a good run, but I do appreciate the feedback
 * that I recieved from it!
 */
// require("./scripts/wheat.js")(bot);

/*
var timestamp = new Date().toISOString().replace("T", "-").replace(/[:]/g, "-").substring(0, 19);
var access = fs.createWriteStream('/logs/' + timestamp + '.log');
process.stdout.write = process.stderr.write = access.write.bind(access);

process.on('uncaughtException', function (err) {
    console.error((err && err.stack) ? err.stack : err);
});
*/

bot.on("ready", function () {
    console.log('[Info] The Discord bot has begun startup...')
    console.log(`[Info] Connected to Discord as: ${bot.user.tag} with the id: ${bot.user.id}! Prefix: ${config.prefix}, branch: ${config.branch}, version: ${config.version}`)
    bot.user.setActivity('the throne of God', { type: 'WATCHING' })
        .then(presence => console.log(`[Info] Activity set to ${presence.game ? presence.game.name : 'none'}`))
        .catch(console.error);
    require('child_process').exec('cd dashboard && node WebServer.js', (err, stdout, stderr) => {
        // stdout.write = stderr.write = access.write.bind(access);
    })
});