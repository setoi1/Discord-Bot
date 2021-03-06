module.exports = {

    name: 'codmultiplayer',
    description: 'Pulls COD Tracker link from given username and tag',
    usage: '<account type> <username> <tag>',
    args: true,
    guildOnly: true,

    execute(message, args) {

        if (args[0] === 'battlenet') {
            if (args[1] === undefined || args[2] === undefined) return message.reply('Usage: -CODMultiplayer battlenet [username] [tag]');

            message.reply(`https://cod.tracker.gg/modern-warfare/profile/battlenet/${args[1]}%23${args[2]}/mp`);
        }

        if (args[0] === 'activision') {
            if (args[1] === undefined || args[2] === undefined) return message.reply('Usage: -CODMultiplayer activision [username] [tag]');

            message.reply(`https://cod.tracker.gg/modern-warfare/profile/atvi/${args[1]}%23${args[2]}/mp`);
        }

    },

};