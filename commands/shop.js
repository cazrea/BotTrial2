const { MessageEmbed, User } = require("discord.js");
const profileModel = require("../models/profileSchema");
const ms = require('ms');
const items = require("../Store Items/MBCItems");



module.exports = {
    name: 'shop',
    aliases: ['sh', 'store'],
    async execute(message, args, cmd, client, Discord, profileData) {
        if (items.length === 0) {
            message.channel.send('there is no items for sale')
        };

        const itemList = items.map((value, index) => {
            return `**${index + 1}** - ${value.name} | ${value.price} Micro Brain Cells | ${value.value} ${value.title}`
        });
        
        message.channel.send(itemList);
        //end
    }
}