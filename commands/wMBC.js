const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const profileModel = require("../models/profileSchema");


module.exports = {
    name: 'wMBC',
    aliases: ['withdraw Micro Brain Cell', 'w Micro Brain Cell', 'w MBC'],
    async execute(message, args, cmd, client, Discord, profileData) {
        const amount = args[0];

        if(amount % 1 != 0 || amount <=0) {
            const notAWholeNumEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Oops! The transaction went wrong!')
                .setDescription('The number must be a whole number!')
                .setFooter({text: 'Do ~w MBC # again'});

            message.channel.send({embeds: [notAWholeNumEmbed]});

        }; try {
            if(amount > profileData.MBBank) {
                const notEnoughEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Oh no, you don't have that many micro brain cells!`)
                    .setDescription(`You currently have ${profileData.MBBank} Micro Brain Cell/s available to withdraw.`)
                    .setFooter({text: 'Do ~w MBC # again'});

                message.channel.send({embeds: [notEnoughEmbed]});
            }

            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    MBC: amount,
                    MBBank: -amount,
                },
            });

            const swMBCEmbed = new MessageEmbed()
                .setColor('#CD7F32')
                .setTitle(`Congrats!`)
                .setDescription(`You've successfully withdrawn ${amount} Micro Brain Cells from the Brain Bank!`)
                .setFooter({text: 'Check your ~balance to confirm.'});

            message.channel.send({embeds: [swMBCEmbed]});

        } catch(err) {
            console.log(err);
        }
    },
};