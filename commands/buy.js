const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventorySchema");
const items = require("../Store Items/fooditems");


module.exports = {
    name: 'food',
    aliases: ['fd', 'bf'],

    async execute(message, args, cmd, client, discord, profileData) {

        if (!args[0]) {

            const  noItemEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Hmm...')
                .setDescription(`What did you wanna buy?`)
                .setFooter({text: 'Check the ~shop list!'});

            message.channel.send({embeds: [noItemEmbed]});

        } else {
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
                const itemValue = items.find((item) => (item.name.toLowerCase()) === itemName).value;

                if (itemPrice > profileData.MBC) {

                    const  notEnoughEmbed = new MessageEmbed()
                        .setColor('#800020')
                        .setTitle('Oh no!')
                        .setDescription(`You don't have enough 🧫MBC for this! You only have 🧫${profileData.MBC} but needed 🧫${itemPrice}...`)
                        .setFooter({text: 'Check your ~bal!'});

                    message.channel.send({embeds: [notEnoughEmbed]});
    
                } else {
                    await profileModel.findOneAndUpdate(
                        {userID: message.author.id},
                        {$inc: {
                            MBC: -itemPrice,
                            food: itemValue,
                        }
                    });

                    const  boughtEmbed = new MessageEmbed()
                        .setColor('#CD7F32')
                        .setTitle('Congrats!')
                        .setDescription(`You bought ${itemName} for 🧫${itemPrice}!`)
                        .setFooter({text: 'Please check your inventory by typing ~inv!'});

                    message.channel.send({embeds: [boughtEmbed]});
                }

            }
            

        }
        //end
    }
}