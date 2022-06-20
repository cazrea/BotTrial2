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
                    .setTitle(`Oops! ${message.member.displayname} is already growing something!`)
                    .setDescription(`Try again once they've grown. You'll know when we message you!`)
                    .setFooter({text: 'Use ~help to check out my commands!'});

            message.channel.send({embeds: [cdforEmbed]});

            } else {
                const itemName = args[0].toLowerCase();
                const findItem = !!items.find((item) => item.name.toLowerCase() === itemName);

                if (!itemName) {


                    const noItemEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Hmm...`)
                    .setDescription(`What did you want to grow, ${message.member.displayname}?`)
                    .setFooter({text: 'Use ~inv to check your inventory!'});

                    message.channel.send({embeds: [noItemEmbed]});

                } else  
                
                if (!findItem) {

                    const notExistingEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Oh no, ${message.member.displayname}!`)
                    .setDescription(`Are you sure you're planting the right seed?`)
                    .setFooter({text: 'Use ~shop to check available plant seeds!'});

                    message.channel.send({embeds: [notExistingEmbed]});

                } else {
                    const params = {
                        Guild: message.guild.id,
                        User: message.author.id
                    }
        
                    inventory.findOne(params, async(err, data) => {
                        if (data) {
                            const haveItem = Object.keys(data.inventory).includes(itemName);
        
                            if(!haveItem) {

                                const noItemEmbed = new MessageEmbed()
                                .setColor('#800020')
                                .setTitle(`Hmm...`)
                                .setDescription(`Maybe you should buy some ${itemName} seeds from the shop, ${message.member.displayname}.`)
                                .setFooter({text: 'Use ~inv to check your inventory, ~shop for to check what you can buy!'});
            
                                message.channel.send({embeds: [noItemEmbed]});
    
                            } else 
                            
                            if (data.inventory[itemName] < 1) {

                                const noItemEmbed = new MessageEmbed()
                                .setColor('#800020')
                                .setTitle(`Hmm...`)
                                .setDescription(`Maybe you should buy some ${itemName} seeds from the shop, ${message.member.displayname}.`)
                                .setFooter({text: 'Use ~inv to check your inventory, ~shop for to check what you can buy!'});
            
                                message.channel.send({embeds: [noItemEmbed]});
                                
                            } else {
    
                                data.inventory[itemName] -= 1;

                                const growthEmbed = new MessageEmbed()
                                .setColor('#8A9A5B')
                                .setTitle(`Congrats, ${message.member.displayname}!`)
                                .setDescription(`You've successfully planted a ${itemName} seed! We'll message you when it's fully grown.`)
                                .setFooter({text: `Send ~inv to confirm and ~bal to see your current balance for when it grows!`});
            
                                message.channel.send({embeds: [growthEmbed]});

                                const minuteTime = 1000 * 60 * 30;


                            // Adds the user to the set so that they can't plant for a minute
                                plantedRecently.add(message.author.id);

                            // Removes the user from the set after a minute & sends a message


                            var foodTimer = setTimeout(growthTimer, minuteTime);
                            const randFood = Math.floor(Math.random() * (100-80+1)+80);
    
                             async function growthTimer() {
                                await profileModel.findOneAndUpdate(
                                    {userID: message.author.id},
                                    {$inc: {
                                        food: randFood,
                                    }
                                });
                             }

                             setTimeout(() => {
                                plantedRecently.delete(message.author.id);
                                message.author.send(`Hello! Your plant has grown and has given you ${randFood} food!`)
                            }, minuteTime)
    
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