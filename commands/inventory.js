const { MessageEmbed, User } = require("discord.js");
const ms = require('ms');
const inventory = require("../models/inventorySchema");

module.exports = {
    name: "inventory",
    aliases: ["inv", "in"],

    async execute(message, args, cmd, client, discord, profileData) {
        inventory.findOne({
            Guild: message.guild.id,
            User: message.author.id,
        },
        
        async(err, data) => {
            if (!data) return message.channel.send('you have nothing'); 
            const mappedData = Object.keys(data.inventory).map((key) => {
                        return `**${key}** x(${data.inventory[key]})`;
                    })      
                    .join(`\n`);

            const invEmbed = new MessageEmbed()
                    .setColor('#CD7F32')
                    .setTitle('Checking your Storage')
                    .setDescription(mappedData)
                    .setFooter({text: 'Use ~help to check out my commands!'});

            message.channel.send({embeds: [invEmbed]});

            }   
        )    
        //end

    }
}