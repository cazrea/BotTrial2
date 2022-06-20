const { MessageEmbed, User } = require("discord.js");
const profileModel = require("../models/profileSchema");
const ms = require('ms');

module.exports = {
    name: 'wmbc',
    aliases: ["wm", "withdrawmbc"],
    async execute(message, args, cmd, client, Discord, profileData) {
        var amount = args[0];

        if (amount % 1 != 0 || amount <= 0) {
            const notAWholewwNumEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle(`Oops, ${message.author.displayname}! The transaction went wrong!`)
                .setDescription('The number must be a whole number!')
                .setFooter({text: 'Try withdrawing again.'});

            message.channel.send({embeds: [notAWholewwNumEmbed]});
            } 
            
            else if (amount > profileData.bank) {
                const tooManywwEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Oh no, ${message.author.displayname} doen't have that many 🦠Brain Cells!`)
                    .setDescription(`You currently have ${profileData.bank} Brain Cell/s available to withdraw.`)
                    .setFooter({text: 'Try withdrawing again.'});

                message.channel.send({embeds: [tooManywwEmbed]});
            } 
            
            else {         
                await profileModel.findOneAndUpdate(
                    {userID: message.author.id}, 
                    {$inc: {
                            BrainCells: amount,
                            bank: -amount,
                            }
                    });  
    
                const dBSSuccEmbed = new MessageEmbed()
                    .setColor('#CD7F32')
                    .setTitle(`Congrats, ${message.author.displayname}!`)
                    .setDescription(`You've successfully withdrawn 🦠${amount} Brain Cells from the Brain Bank!`)
                    .setFooter({text: 'Check your ~balance to confirm.'});

                message.channel.send({embeds: [dBSSuccEmbed]});   
            } 
        }
    }