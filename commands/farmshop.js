const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventorySchema");
const items = require("../Store Items/seeds");


module.exports = {
    name: 'farmshop',
    aliases: ['fs', 'frm'],

    async execute(message, args, cmd, client, discord, profileData) {
        var farmQty = +(args.slice(1).join(' '));
        var farmItem = args[0];

        if (!farmItem) {

            const  noItemEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Hmm...')
                .setDescription(`What did you wanna buy?`)
                .setFooter({text: 'Check the ~shop list!'});

            message.channel.send({embeds: [noItemEmbed]});

        } else 
        
        if (!farmQty || farmQty < 1) {

            const  noQtyEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Hmm...')
                .setDescription(`How many did you wanna buy?`)
                .setFooter({text: 'Start from 1!'});

            message.channel.send({embeds: [noQtyEmbed]});

        } else
        
        {
            const itemName = args[0].toLowerCase();
            const findItem = !!items.find((item) => item.name.toLowerCase() === itemName);
            
            if (!findItem) {

                const  noExistEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle('Hmm...')
                    .setDescription(`I don't think that's available.`)
                    .setFooter({text: 'Check the ~shop list!'});

                message.channel.send({embeds: [noExistEmbed]});

            } else {
                const itemPrice = items.find((item) => (item.name.toLowerCase()) === itemName).price;
                var itemTotal = itemPrice * farmQty;

                if (itemTotal > profileData.MBC) {

                    const  notEnoughEmbed = new MessageEmbed()
                        .setColor('#800020')
                        .setTitle('Oh no!')
                        .setDescription(`You don't have enough 🧫MBC for this! You only have 🧫${profileData.MBC} but needed 🧫${itemTotal}...`)
                        .setFooter({text: 'Check your ~bal!'});

                    message.channel.send({embeds: [notEnoughEmbed]});
    
                } else {
                    const params = {
                        Guild: message.guild.id,
                        User: message.author.id
                    }
        
                    inventory.findOne(params, async(err, data) => {
                        if (data) {
    
                            const haveItem = Object.keys(data.inventory).includes(itemName);
        
                            if(!haveItem) {
    
                                data.inventory[itemName] = parseInt(farmQty);
    
                            } else {
    
                                data.inventory[itemName] += parseInt(farmQty);
    
                            }
    
                            console.log(data);
    
                            await inventory.findOneAndUpdate(params, data);
    
                        } else {
                            new inventory({
    
                                Guild: message.guild.id,
                                User: message.author.id,
                               
                                inventory:{
                                    [itemName]: parseInt(farmQty),
                                },
                                    
                            }).save();
                        }

                        const  boughtEmbed = new MessageEmbed()
                        .setColor('#CD7F32')
                        .setTitle('Congrats!')
                        .setDescription(`You bought ${itemName} seeds (x${farmQty}) for 🧫${itemTotal}!`)
                        .setFooter({text: 'Please check your inventory by typing ~inv!'});

                        message.channel.send({embeds: [boughtEmbed]});
                    });
    
                    await profileModel.findOneAndUpdate(
                        {userID: message.author.id},
                        {$inc: {
                            MBC: -itemTotal,
                        }
                    });
                }

            }
            

        }
        //end
    }
}