const { MessageEmbed, User } = require("discord.js");
const profileModel = require("../models/profileSchema");
const ms = require('ms');
const items = require("../Store Items/MBCItems");
const food = require("../Store Items/fooditems");
const seeds = require("../Store Items/seeds");
const supplies = require("../Store Items/Cleaningitems");
const trees = require("../Store Items/trees");
const utilities = require("../Store Items/utilityitems");
const braincells = require("../Store Items/BrainCells");


module.exports = {
    name: 'shop',
    aliases: ['sh', 'store'],
    async execute(message, args, cmd, client, Discord, profileData) {
        if (items.length === 0) {
            message.channel.send('there are no items for sale')
        } else {
            const itemList = items.map((value, index) => {
                return `${value.emoji} **${value.label}** - ${value.price} MBC - ${value.value} ${value.title}`
            }).join(`\n`);

            const foodList = food.map((value, index) => {
                return `${value.emoji} **${value.label}** - ${value.price} MBC - ${value.value} ${value.title}`
            }).join(`\n`);

            const seedsList = seeds.map((value, index) => {
                return `${value.emoji} **${value.label}**  ${value.title}s - ${value.price} MBC - ${value.value} ${value.title}`
            }).join(`\n`);

            const suppliesList = supplies.map((value, index) => {
                return `${value.emoji} **${value.label}** - ${value.price} MBC - ${value.value} ${value.title}`
            }).join(`\n`);

            const treesList = trees.map((value, index) => {
                return `${value.emoji} **${value.label} ${value.title}s** - ${value.price} MBC - ${value.value} ${value.title}`
            }).join(`\n`);

            const utilitiesList = utilities.map((value, index) => {
                return `${value.emoji} **${value.label}** ${value.title} - ${value.price} MBC - ${value.value} ${value.title}`
            }).join(`\n`);

            const bcList = braincells.map((value, index) => {
                return `${value.emoji} **${value.label}** - ${value.price} MBC - ${value.value} ${value.title}`
            }).join(`\n`);

            const shopEmbed = new MessageEmbed()
                .setColor('#CD7F32')
                .setTitle('Welcome to my shop!')
                .setDescription("Here are the available items!")
                .addFields(
                    {
                        name: 'Food Items || ~buy [bolded name]', 
                        value: foodList
                    },

                    {
                        name: 'Maintenance || ~buy [bolded name]', 
                        value: suppliesList
                    },

                    {
                        name: 'Seeds || ~frm [bolded name]', 
                        value: seedsList
                    },

                    {
                        name: 'Trees || ~tree [bolded name]', 
                        value: treesList
                    },
                    {
                        name: 'Pets || ~buy [bolded name]', 
                        value: utilitiesList
                    },
                    {
                        name: 'Brain Cells || ~buy [bolded name]', 
                        value: bcList
                    },
                )
                .setFooter({text: 'Use ~help to check out my commands!'});

            message.channel.send({embeds: [shopEmbed]})

        };

        //end
    }
}