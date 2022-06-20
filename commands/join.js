const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");

module.exports = {
    name: 'join',
    aliases: ["start", "account"],
    execute(message, args, cmd, client, Discord, profileData) {      
        const welcEmbed = new MessageEmbed()
          .setColor('#CD7F32')
          .setTitle(`Hello, ${message.author.displayname}!`)
          .setDescription("Any command will make you an account for now!")
          .setFooter({text: 'Use ~help to check out my commands!'});

      message.channel.send({embeds: [welcEmbed]})
    }
};