const profileModel = require("../models/profileSchema");
const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const inventory = require("../models/inventorySchema");
const choredRecently = new Set();
const items = require("../Store Items/Cleaningitems");

module.exports = {
    name: 'chores',
    aliases: ['chr', 'ch'],
    async execute(message, args, cmd, client, discord, profileData) {

        if (choredRecently.has(message.author.id)) {

            const cdforEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Oops! ${message.author.username} has already done their chores for now!`)
                    .setDescription(`Try again in a few hours. You'll know when we message you!`)
                    .setFooter({text: 'Use ~help to check out my commands!'});

            message.channel.send({embeds: [cdforEmbed]});

            } else {
                const itemName = args[0].toLowerCase();
                const findItem = !!items.find((item) => item.name.toLowerCase() === itemName);

                if (!itemName) {

                    message.channel.send("what tool did you want to use?")

                } else  
                
                if (!findItem) {
                    message.channel.send("no cleaning item like that exists")

                } else {
                    const params = {
                        Guild: message.guild.id,
                        User: message.author.id
                    }
        
                    inventory.findOne(params, async(err, data) => {
                        if (data) {
                            const haveItem = Object.keys(data.inventory).includes(itemName);
        
                            if(!haveItem) {
    
                                message.channel.send(`You don't have any ${itemName}s! Maybe you should buy from the shop.`)
    
                            } else 
                            
                            if (data.inventory[itemName] < 1) {

                                message.channel.send(`You don't have any ${itemName}s! Maybe you should buy from the shop.`)
                                
                            } else {
    
                                data.inventory[itemName] -= 1;
                                const randMBC = Math.floor(Math.random() * (10000-5000+1)+5000);
                                await profileModel.findOneAndUpdate(
                                    {userID: message.author.id},
                                    {$inc: {
                                        MBC: randMBC,
                                    }
                                });

                                message.channel.send(`You used a/an ${itemName} to help around the house and acquired ${randMBC} MBC!`)
                                
                                const hourTime = 1000 * 60 * 1;


                            // Adds the user to the set so that they can't do chores for a time
                                choredRecently.add(message.author.id);

                            // Removes the user from the set & sends a message once they can do it again

                             setTimeout(() => {
                                choredRecently.delete(message.author.id);
                                message.author.send(`Hello! You can do chores again!`)
                            }, hourTime)
    
                            }
    
                            console.log(data);
    
                            await inventory.findOneAndUpdate(params, data);
    
                        } else {
                            message.channel.send(`maybe you should buy something from the shop.`)
                        }
                }

           )}
      }
    }
}