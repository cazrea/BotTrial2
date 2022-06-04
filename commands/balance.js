const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'balance',
    aliases: ['bal', 'bl'],
    execute(message, args, cmd, client, discord, profileData) {
        const balEmbed = new MessageEmbed()
          .setColor('#CD7F32')
          .setTitle('Checking your Brain Bank™')
          .addFields(
            {name: 'Micro Brain Cells', value: `You have 🧫${profileData.MBC} Micro Brain Cells on you and 🧫${profileData.MBBank} stored.`},
            {name: 'Brain Cells', value: `You have 🦠${profileData.BrainCells} Brain Cells on you and 🦠${profileData.bank} stored.`},
            {name: 'Food', value: `You have 🥮${profileData.food} stored.`},
            )
          .setFooter({text: 'Use ~help to check out my commands!'});

          message.channel.send({embeds: [balEmbed]});
    }
        
}