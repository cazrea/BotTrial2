const { MessageEmbed, User } = require("discord.js");
const profileModel = require("../models/profileSchema");
const ms = require('ms');

module.exports = {
    name: 'gM',
    aliases: ['gMBC', "giveMBC"],
    async execute(message, args, cmd, client, Discord, profileData) {
        if(!args.length) {
            const whodisEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('???')
                .setDescription('Who do you want to give this to?')
                .setFooter({text: 'Try tagging the person.'});

            message.channel.send({embeds: [whodisEmbed]});  
        };

        if(!target) {
            const noPersEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Oops!')
                .setDescription('That person is not around!')
                .setFooter({text: `Try giving it to someone that's here.`});

            message.channel.send({embeds: [noPersEmbed]});
        };

        if (amount % 1 != 0 || amount <= 0) {
            const notAWholeNumEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Oops! The transaction went wrong!')
                .setDescription('The number must be a whole number!')
                .setFooter({text: 'Try depositing again.'});

            message.channel.send({embeds: [notAWholeNumEmbed]});
        };

        if (amount > profileData.MBC) {
            const tooManyEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle(`Oh no, you don't have that many Micro Brain Cells!`)
                .setDescription(`You currently have ${profileData.MBC} Micro Brain Cell/s available to deposit.`)
                .setFooter({text: 'Try depositing again.'});

            message.channel.send({embeds: [tooManyEmbed]});
        }

        try{
            const targetData = await profileModel.findOne({userID: target.id});

            if(!targetData) {
                const notHereEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle('Oops!')
                    .setDescription('That person is not in the area!')
                    .setFooter({text: `Try inviting them here.`});

                message.channel.send({embeds: [notHereEmbed]});
            };

            await profileModel.findOneAndUpdate(
                {userID: message.author.id},
                {$inc: {
                    MBC: -amount,
                }
            });

            await profileModel.findOneAndUpdate(
                {userID: target.id},
                {$inc: {
                    MBC: amount,
                }
            });

            const dMSuccEmbed = new MessageEmbed()
                .setColor('#CD7F32')
                .setTitle(`Congrats!`)
                .setDescription(`You've successfully given ${amount} Micro Brain Cells to ${target}!`)
                .setFooter({text: 'Check your ~balance to confirm.'});

            message.channel.send({embeds: [dMSuccEmbed]});
            
        } catch(err) {
            console.log(err);
        };
    }
}