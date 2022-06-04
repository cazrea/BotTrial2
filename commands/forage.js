const profileModel = require("../models/profileSchema");
const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const talkedRecently = new Set();

const fItems = [
    {name: 'Juneberries', value: 5},
    {name: 'Hazelnuts', value: 5},
    {name: 'Chestnuts', value: 2},
    {name: 'Walnuts', value: 2},
    {name: 'Hops', value: 2},
    {name: 'Cherries', value: 2},
    {name: 'Limes', value: 2},
    {name: 'Nettles', value: 2},
    {name: 'Mulberries', value: 2},
    {name: 'Oranges', value: 2},
    {name: 'Apples', value: 2},
    {name: 'Guava', value: 2},
    {name: 'Elderberries', value: 2},
    {name: 'Leaves', value: 1},
    {name: 'Tangerine', value: -5},
];

module.exports = {
    name: 'forage',
    aliases: ['for', 'fg'],
    async execute(message, args, cmd, client, discord, profileData) {

        if (talkedRecently.has(message.author.id)) {

            const cdforEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Oops! ${message.author.username} send that too fast!`)
                    .setDescription(`Try again in 5 seconds`)
                    .setFooter({text: 'Use ~help to check out my commands!'});

            message.channel.send({embeds: [cdforEmbed]});

            } else {
                const randForage = Math.floor(Math.random() * fItems.length);
                var forageResult = fItems[randForage];
                

                const resp = await profileModel.findOneAndUpdate({
                userID: message.author.id,
                }, {
                    $inc: {
                    MBC: parseInt(forageResult.value),
                    },
                });

                const forageEmbed = new MessageEmbed()
                    .setColor('#CD7F32')
                    .setTitle(`Looking for some 🧫 Micro Brain Cells for ${message.author.username}...`)
                    .setDescription(`You found some ${forageResult.name} and got ${forageResult.value} 🧫MBC.`)
                    .setFooter({text: 'Use ~help to check out my commands!'});

                message.channel.send({embeds: [forageEmbed]});

              // Adds the user to the set so that they can't talk for a minute
                talkedRecently.add(message.author.id);
                setTimeout(() => {
             // Removes the user from the set after a minute
                 talkedRecently.delete(message.author.id);
                }, 5000);
        }

    }
}