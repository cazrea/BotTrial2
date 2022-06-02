const { MessageEmbed, User } = require("discord.js");
const profileModel = require("../models/profileSchema");
const ms = require('ms');

module.exports = {
    name: 'dmbc',
    aliases: ["dm", "depositmbc"],
    async execute(message, args, cmd, client, Discord, profileData) {
        var amount = args[0];

        if (amount % 1 != 0 || amount <= 0) {
            const notAWholeNumEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Oops! The transaction went wrong!')
                .setDescription('The number must be a whole number!')
                .setFooter({text: 'Try depositing again.'});

            message.channel.send({embeds: [notAWholeNumEmbed]});
            } 
            
            else if (amount > profileData.MBC) {
                const tooManyEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Oh no, you don't have that many Micro Brain Cells!`)
                    .setDescription(`You currently have ${profileData.MBC} Micro Brain Cell/s available to deposit.`)
                    .setFooter({text: 'Try depositing again.'});

                message.channel.send({embeds: [tooManyEmbed]});
            } 
            
            else {         
                await profileModel.findOneAndUpdate(
                    {userID: message.author.id}, 
                    {$inc: {
                            MBC: -amount,
                            MBBank: amount,
                            }
                    });  
    
                const dMSuccEmbed = new MessageEmbed()
                    .setColor('#CD7F32')
                    .setTitle(`Congrats!`)
                    .setDescription(`You've successfully deposited ${amount} Micro Brain Cells into the Brain Bank!`)
                    .setFooter({text: 'Check your ~balance to confirm.'});

                message.channel.send({embeds: [dMSuccEmbed]});   
            } 
        }
    }