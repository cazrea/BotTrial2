const { MessageEmbed, User } = require("discord.js");
const profileModel = require("../models/profileSchema");
const ms = require('ms');

module.exports = {
    name: 'dbc',
    aliases: ["db", "depositbc"],
    async execute(message, args, cmd, client, Discord, profileData) {
        var amount = args[0];

        if (amount % 1 != 0 || amount <= 0) {
            const notAWholeBNumEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Oops! The transaction went wrong!')
                .setDescription('The number must be a whole number!')
                .setFooter({text: 'Try depositing again.'});

            message.channel.send({embeds: [notAWholeBNumEmbed]});
            } 
            
            else if (amount > profileData.BrainCells) {
                const tooManyBEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Oh no, you don't have that many Brain Cells!`)
                    .setDescription(`You currently have ${profileData.BrainCells} Brain Cell/s available to deposit.`)
                    .setFooter({text: 'Try depositing again.'});

                message.channel.send({embeds: [tooManyBEmbed]});
            } 
            
            else {         
                await profileModel.findOneAndUpdate(
                    {userID: message.author.id}, 
                    {$inc: {
                            BrainCells: -amount,
                            bank: amount,
                            }
                    });  
    
                const dBSSuccEmbed = new MessageEmbed()
                    .setColor('#CD7F32')
                    .setTitle(`Congrats!`)
                    .setDescription(`You've successfully deposited ${amount} Brain Cells into the Brain Bank!`)
                    .setFooter({text: 'Check your ~balance to confirm.'});

                message.channel.send({embeds: [dBSuccEmbed]});   
            } 
        }
    }