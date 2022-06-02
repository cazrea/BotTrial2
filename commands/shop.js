const { MessageEmbed, User } = require("discord.js");
const profileModel = require("../models/profileSchema");
const ms = require('ms');
const { values } = require("../storeitems");
const items = require("../storeitems.js");

module.exports = {
    name: 'shop',
    aliases: ['sh', 'buy'],
    async execute(message, args, cmd, client, Discord, profileData) {
        
        const shopList = items.map((values, index));

        const foodshopEmbed = new MessageEmbed()
          .setColor('#CD7F32')
          .setTitle('Hello!')
          .setDescription(`**${index}** ${value.name} | ${value.price} Micro Brain Cell | ${value.food} Qty Food`)
          .setFooter({text: 'Use ~help to check out my commands!'});

        message.channel.send({embeds: [foodshopEmbed]})



        
        





        //end
    }
}