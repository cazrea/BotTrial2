const { MessageEmbed, User } = require("discord.js");
const profileModel = require("../models/profileSchema");
const ms = require('ms');

module.exports = {
    name: 'wmbc',
    aliases: ["wm", "withdrawmbc"],
    async execute(message, args, cmd, client, Discord, profileData) {
        var amount = args[0];

        if (amount % 1 != 0 || amount <= 0) {
            const notAWholewNumEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Oops! The transaction went wrong!')
                .setDescription('The number must be a whole number!')
                .setFooter({text: 'Try withdrawing again.'});

            message.channel.send({embeds: [notAWholewNumEmbed]});
            } 
            
            else if (amount > profileData.MBBank) {
                const tooManywEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Oh no, you don't have that many Micro Brain Cells!`)
                    .setDescription(`You currently have 🧫${profileData.MBBank} Micro Brain Cell/s available to withdraw.`)
                    .setFooter({text: 'Try withdrawing again.'});

                message.channel.send({embeds: [tooManywEmbed]});
            } 
            
            else {         
                await profileModel.findOneAndUpdate(
                    {userID: message.author.id}, 
                    {$inc: {
                            MBC: amount,
                            MBBank: -amount,
                            }
                    });  
    
                const dBSSuccEmbed = new MessageEmbed()
                    .setColor('#CD7F32')
                    .setTitle(`Congrats!`)
                    .setDescription(`You've successfully withdrawn 🧫${amount} Micro Brain Cells from the Brain Bank!`)
                    .setFooter({text: 'Check your ~balance to confirm.'});

                message.channel.send({embeds: [dBSSuccEmbed]});   
            } 
        }
    }