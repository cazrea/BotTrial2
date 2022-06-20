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
        var foodQty = +(args.slice(1).join(' '));
        var foodItem = args[0];

        if (!foodItem) {

            const  noItemEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Hmm...')
                .setDescription(`What did you wanna buy, ${message.author.displayname}?`)
                .setFooter({text: 'Check the ~shop list!'});

            message.channel.send({embeds: [noItemEmbed]});

        } else 

        if (!foodQty || foodQty < 1) {

            const  noQtyEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Hmm...')
                .setDescription(`How many did you wanna buy, ${message.author.displayname}?`)
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
                    .setDescription(`I don't think that's available, ${message.author.displayname}.`)
                    .setFooter({text: 'Check the ~shop list!'});

                message.channel.send({embeds: [noExistEmbed]});

            } else {
                const itemPrice = items.find((item) => (item.name.toLowerCase()) === itemName).price;
                const itemValue = items.find((item) => (item.name.toLowerCase()) === itemName).value;

                var itemTotal = itemPrice * foodQty;
                var foodTotal = itemValue * foodQty;

                if (itemTotal > profileData.MBC) {

                    const  notEnoughEmbed = new MessageEmbed()
                        .setColor('#800020')
                        .setTitle('Oh no!')
                        .setDescription(`You don't have enough 🧫MBC for this! You only have 🧫${profileData.MBC} but needed 🧫${itemTotal}...`)
                        .setFooter({text: 'Check your ~bal!'});

                    message.channel.send({embeds: [notEnoughEmbed]});
    
                } else {
                    await profileModel.findOneAndUpdate(
                        {userID: message.author.id},
                        {$inc: {
                            MBC: -itemTotal,
                            food: foodTotal,
                        }
                    });

                    const  boughtEmbed = new MessageEmbed()
                        .setColor('#CD7F32')
                        .setTitle(`Congrats, ${message.author.displayname}!`)
                        .setDescription(`You bought ${itemName} for 🧫${itemTotal}!`)
                        .setFooter({text: 'Please check how much food you have by typing ~bal!'});

                    message.channel.send({embeds: [boughtEmbed]});
                }

            }
            

        }
        //end
    }
}