const profileModel = require("../models/profileSchema");
const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const talkedRecently = new Set();

module.exports = {
    name: 'forage',
    aliases: ['for', 'fg'],
    async execute(message, args, cmd, client, discord, profileData) {

        if (talkedRecently.has(message.author.id)) {

            const cdforEmbed = new MessageEmbed()
                    .setColor('#CD7F32')
                    .setTitle(`Oops! ${message.author.username} send that too fast!`)
                    .setDescription(`Try again in 2 seconds`)
                    .setFooter({text: 'Use ~help to check out my commands!'});

            message.channel.send({embeds: [cdforEmbed]});


            } else {
                const randomNum = Math.round(Math.random());
                const resp = await profileModel.findOneAndUpdate({
                userID: message.author.id,
                }, {
                     $inc: {
                     BrainCells: randomNum,
                     },
                });

                const forageEmbed = new MessageEmbed()
                    .setColor('#CD7F32')
                    .setTitle(`Looking for some Brain Cells for ${message.author.username}...`)
                    .setDescription(`You acquired ${randomNum} brain cells.`)
                    .setFooter({text: 'Use ~help to check out my commands!'});

                message.channel.send({embeds: [forageEmbed]});

              // Adds the user to the set so that they can't talk for a minute
                talkedRecently.add(message.author.id);
                setTimeout(() => {
             // Removes the user from the set after a minute
                 talkedRecently.delete(message.author.id);
                }, 2000);
        }

    }
}