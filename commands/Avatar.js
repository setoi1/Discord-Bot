module.exports = {

    name: 'avatar',
    description: 'random avatar',
    guildOnly: true,

    execute(message) {

        message.reply({

            files: ['https://cdn.discordapp.com/attachments/755675111792574565/766122200594907188/ugly.jpg'],

        });

    },

};