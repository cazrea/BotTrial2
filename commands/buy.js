const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventorySchema");
const items = require("../Store Items/fooditems");


module.exports = {
    name: 'food',
    aliases: ['fd', 'bf'],

    async execute(message, args, cmd, client, discord, profileData) {

        if (!args[0]) {

            message.channel.send (`specify item`);

        } else {
            const itemName = args[0].toLowerCase();
            const findItem = !!items.find((item) => item.name.toLowerCase() === itemName);
            
            if (!findItem) {
                message.channel.send(`no items found`)
            } else {
                const itemPrice = items.find((item) => (item.name.toLowerCase()) === itemName).price;
                const itemValue = items.find((item) => (item.name.toLowerCase()) === itemName).value;

                if (itemPrice > profileData.MBC) {

                    message.channel.send('not enough money for item')
    
                } else {
                    await profileModel.findOneAndUpdate(
                        {userID: message.author.id},
                        {$inc: {
                            MBC: -itemPrice,
                            food: itemValue,
                        }
                    });

                    message.channel.send(`You bought ${itemName} for ${itemPrice}`)
                }

            }
            

        }
        //end
    }
}