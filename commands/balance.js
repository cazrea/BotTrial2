const { MessageEmbed } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');

module.exports = {
    name: 'balance',
    aliases: ['bal', 'bl'],
    execute(message, args, cmd, client, discord, profileData) {
        const greetEmbed = new MessageEmbed()
          .setColor('#CD7F32')
          .setTitle('Checking your Brain Bank™')
          .setDescription(`You have ${profileData.BrainCells} on you and ${profileData.bank} stored.`)
          .setFooter({text: 'Use ~help to check out my commands!'});

          message.channel.send({embeds: [greetEmbed]});
    }
        
}
