const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const profileModel = require("../models/profileSchema");
const inventory = require("../models/inventorySchema");

module.export = {
    name: 'inventory',
    aliases: ['inv', 'in'],

    async export(message, args, cmd, client, Discord, profileData) {
        inventory.findOne({
            Guild: message.guild.id,
            User: message.author.id,
        },
        
        async(err, data) => {
            if (!data) {
                message.channel.send('you have nothing')
            } else {
                const mappedData = Object.keys(data.Inventory).map((key) => {
                    return `${key}(${data.inventory[key]})`
                }).join("/n");

                message.channel.send(mappedData);
            }
        }

        )




        //end
    }
}