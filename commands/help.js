const { MessageEmbed } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');

const wildColors = [
    '#7393B3', // blue gray from htmlcolorcodes.com
    '#8A9A5B', // sage green
    '#E4D00A', // citrine
    '#E5E4E2', // platinum
    '#FBCEB1', // apricot
    '#FFC0CB', // pink
    '#BDB5D5', // wisteria
    '#E9DCC9', // linen
    '#FFDB58', // mustard yellow
    '#B4C424', // peridot
    '#F4C430', // saffron
    '#A95C68', // puce
    '#FAA0A0', // pastel red
]


module.exports = {
    name: 'help',
    aliases: ["h", "hp"],
    execute(message, args, cmd, client, Discord, profileData) {
        const helpGuide = new MessageEmbed()
                .setColor('#E5E4E2')
                .setTitle('⚙️ Utility Commands ⚙️')
                .addFields(
                    {name: 'Prefix', value: 'Start every command with the Tilde (~) symbol.', inline: true},
                    {name: '~join, ~start, ~account', value: 'All commands will make you an account, these are for future use.'},
                    {name: '~hi, ~hello, ~bye', value: 'Makes sure the bot is running.'},
                    {name: '~help, ~h, ~hp', value: 'Brings this list back up!'},
                    {name: '~off, ~o, ~sd', value: 'Turns the bot off. *ONLY ROBIN CAN USE THIS'},
                    
                )
                .setFooter({text: 'Remember to always put ~ before the command!'});

        message.channel.send({embeds:[helpGuide]});

        const gameGuide = new MessageEmbed()
                .setColor('#8A9A5B')
                .setTitle('🦄 Wildlife & House Commands 🦄')
                .addFields(
                    {name: '~forage, ~for, ~fg', value: 'Forage the forest to gain more 🧫Micro Brain Cells.'},
                    {name: '~feed (# time in s) (# of food portions)', value: 'Sets up the autofeeders for visitors. You can use f or fd instead of feed.'},
                    {name: '~plant name, ~plt name, ~pt name', value: 'Plants a seed of your choice that grows into 🥮Food.'},
                    {name: '~chores name, ~chr name, ~ch name', value: 'Use a maintenance tool to do chores that will give you 🧫Micro Brain Cells.'},                           
                )
                .setFooter({text: 'Remember to always put ~ before the command!'});

        message.channel.send({embeds:[gameGuide]});

        const shopGuide = new MessageEmbed()
        .setColor('#E4D00A')
        .setTitle('🛍️ Shopping Commands 🛍️')
        .addFields(
            {name: '~shop, ~sh, ~store', value: 'List of all items'},
            {name: '~food name, ~fd name, ~bf name', value: 'Buy food at the shop!'},
            {name: '~farmshop name, ~frm name, ~fs name', value: 'Buy farming items at the warehouse!'},
            {name: '~treeshop name, ~tree name, ~ts name', value: 'Buy trees at the plant nursery! *item non-functional'},
            {name: '~petshop name, ~pet name, ~ps name', value: 'Buy helpers at the pet shop! *item non-functional'},
            {name: '~maintenance name, ~maint name, ~mnt name', value: 'Buy supplies at the grocery!'},           
            {name: 'BC Store', value: 'Still being set up!'},             
        )
        .setFooter({text: 'Remember to always put ~ before the command!'});

        message.channel.send({embeds:[shopGuide]});

        const bankGuide = new MessageEmbed()
        .setColor('#FBCEB1')
        .setTitle('🧠 Brain Bank™ 🧠')
        .addFields(  
            {name: '~balance, ~bal, ~bl', value: 'Checks how much MBC, BC and Food you have on hand and in your brain bank.'},
            {name: '~dm, ~dmbc, ~depositmbc', value: 'Deposit Micro Brain Cells 🧫 to the Brain Bank.'},
            {name: '~wm, ~wmbc, ~withdrawmbc', value: 'Withdraw Micro Brain Cells 🧫 to the Brain Bank.'},
            {name: '~db, ~dbc, ~depositbc', value: 'Deposit Brain Cells 🦠 to the Brain Bank.'},
            {name: '~wb, ~wbc, ~withdrawbc', value: 'Withdraw Brain Cells 🦠 to the Brain Bank.'},
        )
        .setFooter({text: 'Remember to always put ~ before the command!'});

        message.channel.send({embeds:[bankGuide]});

    }

}