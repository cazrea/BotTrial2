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

        if (!args[0]) {
            message.channel.send('specify item')
        } else {
            const purchaseItem = args[0].toLowerCase;

            const validItem = !!items.find((val) => val.items === purchaseItem).name;
            if (!validItem) {
                message.channel.send ('no items found')
            } else {
                const itemPrice = items.find((val) => val.items === purchaseItem).price;
            }


            

        }

        
        
        
        

        if (!purchaseItem) {
            message.channel.send('no item');
        };
        
        
        
        
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