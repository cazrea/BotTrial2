const { MessageEmbed, User } = require("discord.js");
const profileModel = require("../models/profileSchema");
const ms = require('ms');
const items = require("../Store Items/MBCItems");

module.exports = {
    name: 'shop',
    aliases: ['sh', 'store'],
    async execute(message, args, cmd, client, Discord, profileData) {
        if (items.length === 0) {
            message.channel.send('there are no items for sale')
        } else {
            const itemList = items.map((value, index) => {
                return `${value.emoji}) ${value.name}  ${value.price} MBC | ${value.value} ${value.title}`
            }).join(`\n`);

            message.channel.send(`${itemList}`);

        };

        //end
    }
}