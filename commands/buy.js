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

            message.channel.send('specify item');

        } else {

            const itemName = args[0].toLowerCase();
            const purchasedItem = items.find(item => item.name.toLowerCase() === itemName);
            const itemPrice = purchasedItem.price;
            

            if (!!itemName) {
                message.channel.send ('no items found')

            } else 
            
            if (itemPrice > profileData.MBC) {

                message.channel.send('no money for item')

            } else 
            
            {
                const params = {
                    Guild: message.guild.id,
                    User: message.author.id
                }
    
                inventory.findOne(params, async(err, data) => {
                    if (data) {

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

                await profileModel.findOneAndUpdate(
                    {userID: message.author.id},
                    {$inc: {
                        BC: -itemPrice,
                    }
                });
            }
        }
        //end
    }
}