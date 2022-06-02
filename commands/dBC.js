const { MessageEmbed, User } = require("discord.js");
const ms = require('ms');
const profileModel = require("../models/profileSchema");


module.exports = {
    name: 'dBC',
    aliases: ['deposit Brain Cell', 'd Brain Cell', 'd BC'],
    async execute(message, args, cmd, client, Discord, profileData) {
        const amount = args[0];

        if(amount % 1 != 0 || amount <=0) {
            const notAWholeNumEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Oops! The transaction went wrong!')
                .setDescription('The number must be a whole number!')
                .setFooter({text: 'Do ~d BC # again'});

            message.channel.send({embeds: [notAWholeNumEmbed]});

        }; try {
            if(amount > profileData.BrainCells) {
                const notEnoughEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Oh no, you don't have that many brain cells!`)
                    .setDescription(`You currently have ${profileData.BrainCells} Brain Cell/s available to deposit.`)
                    .setFooter({text: 'Do ~d BC # again'});

                message.channel.send({embeds: [notEnoughEmbed]});
            }

            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    BrainCells: -amount,
                    bank: amount,
                },
            });

            const sdBCEmbed = new MessageEmbed()
                .setColor('#CD7F32')
                .setTitle(`Congrats!`)
                .setDescription(`You've successfully deposited ${amount} Brain Cells into the Brain Bank!`)
                .setFooter({text: 'Check your ~balance to confirm.'});

            message.channel.send({embeds: [sdBCEmbed]});

        } catch(err) {
            console.log(err);
        }
    },
};