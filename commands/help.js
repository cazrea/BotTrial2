const { MessageEmbed } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');

module.exports = {
    name: 'help',
    aliases: ["h", "hp"],
    execute(client, message, args, Discord) {
        const helpGuide = new MessageEmbed()
                .setColor('#CD7F32')
                .setTitle('Here are the list of codes and what they do!')
                .addFields(
                    {name: 'Prefix', value: 'Start every command with the Tilde (~) symbol.'},
                    {name: '~hi, ~hello, ~bye', value: 'Makes sure the bot is running.'},
                    {name: '~feed (# time in s) (# of food portions)', value: 'Sets up the autofeeders for visitors. You can use f or fd instead of feed.'},
                    {name: '~help, ~h, ~hp', value: 'Brings this list back up!'},
                    {name: '~off, ~o, ~sd', value: 'Turns the bot off. *ONLY ROBIN CAN USE THIS'},
                )
                .setFooter({text: 'Remember to always put ~ before the command!'});

        message.channel.send({embeds:[helpGuide]});
    }

}