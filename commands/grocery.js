const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventorySchema");
const items = require("../Store Items/Cleaningitems");


module.exports = {
    name: 'maintenance',
    aliases: ['maint', 'mnt'],

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

                if (itemPrice > profileData.MBC) {

                    message.channel.send('not enough money for item')
    
                } else {
                    const params = {
                        Guild: message.guild.id,
                        User: message.author.id
                    }
        
                    inventory.findOne(params, async(err, data) => {
                        if (data) {
    
                            const haveItem = Object.keys(data.inventory).includes(itemName);
        
                            if(!haveItem) {
    
                                data.inventory[itemName] = 1;
    
                            } else {
    
                                data.inventory[itemName]++
    
                            }
    
                            console.log(data);
    
                            await inventory.findOneAndUpdate(params, data);
    
                        } else {
                            new inventory({
    
                                Guild: message.guild.id,
                                User: message.author.id,
                               
                                inventory:{
                                    [itemName]: 1,
                                },
                                    
                            }).save();
                        }
                        message.channel.send(`bought item for ${itemPrice}`);
                    });
    
                    await profileModel.findOneAndUpdate(
                        {userID: message.author.id},
                        {$inc: {
                            MBC: -itemPrice,
                        }
                    });
                }

            }
            

        }
        //end
    }
}