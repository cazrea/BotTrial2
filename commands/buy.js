const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventorySchema");

const items = require("../Store Items/MBCItems");


module.exports = {
    name: 'buy',
    aliases: ['b', 'by'],

    async execute(message, args, cmd, client, Discord, profileData) {
        const purchaseItem = args[0].toLowerCase();
        const validItem = !!items.find((val) => val.item.toLowerCase() === purchaseItem);
        const itemPrice = items.find((val) => val.item.toLowerCase() === purchaseItem).price;

        if (!args[0]) {
            message.channel.send('no item');
        } else 
        
        if (!validItem) {
            message.channel.send('not valid item');
        } else

        if (itemPrice > profileData.MBC) {
            message.channel.send('not enough money');
        } else {
            const params = {
                Guild: message.guild.id,
                User: message.author.id
            }

            inventory.findOne(params, async(err, data) => {
                if(data) {
                    const haveItem = Object.keys(data.Inventory).includes(purchaseItem);

                    if(!haveItem) {
                        data.Inventory[purchaseItem] = 1;
                    } else {
                        data.Inventory[purchaseItem]++
                    }
                    console.log(data);
                    await inventory.findOneAndUpdate(params, data);
                } else {
                    new inventory({
                        Guild: message.guild.id,
                        User: message.author.id,
                        inventory:{
                            [purchaseItem]: 1,
                        },
                            
                    }).save();
                }
                message.channel.send('bought item');
            });
        }
        //end
    }
}