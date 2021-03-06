const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventorySchema");
const items = require("../Store Items/utilityitems");


module.exports = {
    name: 'petshop',
    aliases: ['pt', 'pet'],

    async execute(message, args, cmd, client, discord, profileData) {
        var petQty = +(args.slice(1).join(' '));
        var petItem = args[0];

        if (!petItem) {
            const  noItemEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Hmm...')
                .setDescription(`What did you wanna buy, ${message.member.displayName}?`)
                .setFooter({text: 'Check the ~shop list!'});

            message.channel.send({embeds: [noItemEmbed]});

        } else 

        if (!petQty || petQty < 1) {

            const  noQtyEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Hmm...')
                .setDescription(`How many did you wanna buy, ${message.member.displayName}?`)
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
                    .setDescription(`I don't think that's available, ${message.member.displayName}.`)
                    .setFooter({text: 'Check the ~shop list!'});

                message.channel.send({embeds: [noExistEmbed]});
            } else {
                const itemPrice = items.find((item) => (item.name.toLowerCase()) === itemName).price;
                var itemTotal = itemPrice * petQty;

                if (itemTotal > profileData.MBC) {

                    const  notEnoughEmbed = new MessageEmbed()
                        .setColor('#800020')
                        .setTitle(`Oh no, ${message.member.displayName}!`)
                        .setDescription(`You don't have enough ????MBC for this! You only have ????${profileData.MBC} but needed ????${itemTotal}...`)
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
    
                                data.inventory[itemName] = parseInt(petQty);
    
                            } else {
    
                                data.inventory[itemName]+= parseInt(petQty);
    
                            }
    
                            console.log(data);
    
                            await inventory.findOneAndUpdate(params, data);
    
                        } else {
                            new inventory({
    
                                Guild: message.guild.id,
                                User: message.author.id,
                               
                                inventory:{
                                    [itemName]: parseInt(petQty),
                                },
                                    
                            }).save();
                        }
                    const  boughtEmbed = new MessageEmbed()
                        .setColor('#CD7F32')
                        .setTitle(`Congrats, ${message.member.displayName}!`)
                        .setDescription(`You bought ${itemName} (x${petQty}) for ????${itemTotal}!`)
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