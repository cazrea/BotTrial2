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
                    .setTitle(`Oops! ${message.member.displayName} has already done their chores for now!`)
                    .setDescription(`Try again in a few hours. You'll know when we message you!`)
                    .setFooter({text: 'Use ~help to check out my commands!'});

            message.channel.send({embeds: [cdforEmbed]});

            } else {
                const itemName = args[0].toLowerCase();
                const findItem = !!items.find((item) => item.name.toLowerCase() === itemName);

                if (!itemName) {

                    const whatToolEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Hmm...`)
                    .setDescription(`What tool did you want to use, ${message.member.displayName}`)
                    .setFooter({text: 'Use ~inv to check out your inventory!'});

                    message.channel.send({embeds: [whatToolEmbed]});

                } else  
                
                if (!findItem) {

                    const noToolEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Hmm...`)
                    .setDescription(`That isn't a tool you can use, ${message.member.displayName}`)
                    .setFooter({text: `Use ~shop to check what's available!`});

                    message.channel.send({embeds: [noToolEmbed]});

                } else {
                    const params = {
                        Guild: message.guild.id,
                        User: message.author.id
                    }
        
                    inventory.findOne(params, async(err, data) => {
                        if (data) {
                            const haveItem = Object.keys(data.inventory).includes(itemName);
        
                            if(!haveItem) {

                               const notOnHandEmbed = new MessageEmbed()
                                .setColor('#800020')
                                .setTitle(`Sorry, ${message.member.displayName}!`)
                                .setDescription(`You don't have that in your storage.`)
                                .setFooter({text: `Use ~inv to see what's in your storage or ~shop to buy some!`});
            
                                message.channel.send({embeds: [notOnHandEmbed]});
    
    
                            } else 
                            
                            if (data.inventory[itemName] < 1) {


                                const notOnHandEmbed = new MessageEmbed()
                                .setColor('#800020')
                                .setTitle(`Sorry, ${message.member.displayName}!`)
                                .setDescription(`You don't have that in your storage.`)
                                .setFooter({text: `Use ~inv to see what's in your storage or ~shop to buy some!`});
            
                                message.channel.send({embeds: [notOnHandEmbed]});
                                
                            } else {
    
                                data.inventory[itemName] -= 1;
                                const randMBC = Math.floor(Math.random() * (7000-5000+1)+5000);
                                await profileModel.findOneAndUpdate(
                                    {userID: message.author.id},
                                    {$inc: {
                                        MBC: randMBC,
                                    }
                                });

                                
                               const choreSuccEmbed = new MessageEmbed()
                               .setColor('#CD7F32')
                               .setTitle(`Yay, ${message.member.displayName}!`)
                               .setDescription(`You did your chores for today with a/an ${itemName} and acquired ${randMBC}!`)
                               .setFooter({text: `Check your ~balance to confirm and ~inv to see what's in your storage!`});
           
                               message.channel.send({embeds: [choreSuccEmbed]});
                                
                                const hourTime = 1000 * 60 * 60 * 6;


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

                            const noInvEmbed = new MessageEmbed()
                            .setColor('#800020')
                            .setTitle(`Sorry, ${message.member.displayName}!`)
                            .setDescription(`Maybe you should buy something from the shop.`)
                            .setFooter({text: `Use ~shop to buy something!`});
        
                            message.channel.send({embeds: [noInvEmbed]});
                        }
                }

           )}
      }
    }
}