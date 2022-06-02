const { MessageEmbed, User } = require("discord.js");
const profileModel = require("../models/profileSchema");
const ms = require('ms');
const { mapReduce } = require("../models/profileSchema");

const itemlist = [
    {name: Leaves, price: 5, food: 1},
    {name: Berries, price: 10, food: 3},
    {name: Fruit, price: 12, food: 7},
    {name: Salad, price: 15, food: 10},
    {name: Meal, price: 20, food: 20},
]

module.exports = {
    name: 'shop',
    aliases: ['sh', 'buy'],
    async execute(message, args, cmd, client, Discord, profileData) {
        
        const shopList = itemlist.map((value, index)); 

        const shopEmbed = new MessageEmbed()
          .setColor('#CD7F32')
          .setTitle('Hello!')
          .setDescription(`**${index}** ${value.name} | ${value.price} Micro Brain Cells | ${value.food} Amount of Food`)
          .setFooter({text: 'Use ~help to check out my commands!'});

        message.channel.send({embeds: [shopEmbed]});

        
        





        //end
    }
}