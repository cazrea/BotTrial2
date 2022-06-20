const profileModel = require("../models/profileSchema");
const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const inventory = require("../models/inventorySchema");
const plantedRecently = new Set();
const items = require("../Store Items/seeds");

module.exports = {
    name: 'plant',
    aliases: ['plt', 'pt'],
    async execute(message, args, cmd, client, discord, profileData) {

        if (plantedRecently.has(message.author.id)) {

            const cdforEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Oops! ${message.author.username} is already growing something!`)
                    .setDescription(`Try again once they've grown. You'll know when we ping you!`)
                    .setFooter({text: 'Use ~help to check out my commands!'});

            message.channel.send({embeds: [cdforEmbed]});

            } else {
                const itemName = args[0].toLowerCase();
                const findItem = !!items.find((item) => item.name.toLowerCase() === itemName);

                if (!itemName) {

                    message.channel.send("what did you want to grow?")

                } else  
                
                if (!findItem) {
                    message.channel.send("no seed of that plant exists")

                } else {
                    const params = {
                        Guild: message.guild.id,
                        User: message.author.id
                    }
        
                    inventory.findOne(params, async(err, data) => {
                        if (data) {
                            const haveItem = Object.keys(data.inventory).includes(itemName);
        
                            if(!haveItem) {
    
                                message.channel.send(`maybe you should buy some ${itemName} seeds from the shop.`)
    
                            } else {
    
                                data.inventory[itemName] -= 1;
                                message.channel.send(`you planted a ${itemName} seed.`)
    
                            }
    
                            console.log(data);
    
                            await inventory.findOneAndUpdate(params, data);
    
                        } else {
                            message.channel.send(`maybe you should buy something from the shop.`)
                        }
        
                      // Adds the user to the set so that they can't talk for a minute
                        plantedRecently.add(message.author.id);

                        // Removes the user from the set after a minute
                        setTimeout(() => {
                         plantedRecently.delete(message.author.id);
                         message.author.send(`your plant has grown!!`)

                         const randFood = Math.floor(Math.random() * (100-80+1)+80);
                         
         
                         const resp = await profileModel.findOneAndUpdate({
                         userID: message.author.id,
                         }, {
                             $inc: {
                                food: parseInt(randFood),
                             },
                         });
                        }, 1000 * 60 * 1);

                }
                

                
        )}

    }
}
}