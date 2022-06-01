const profileModel = require("../models/profileSchema");
const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');

module.exports = {
    name: 'forage',
    aliases: ['for', 'fg'],
    async execute(message, args, cmd, client, discord, profileData) {
        const randomNum = Math.round(Math.random());
        const resp = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                BrainCells: randomNum,
            },
        });

        const forageEmbed = new MessageEmbed()
          .setColor('#CD7F32')
          .setTitle(`Looking for some Brain Cells for ${message.author.username}...`)
          .setDescription(`You acquired ${randomNum} brain cells.`)
          .setFooter({text: 'Use ~help to check out my commands!'});

        message.channel.send({embeds: [forageEmbed]});

    }
}