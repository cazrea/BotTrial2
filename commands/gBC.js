const profileModel = require("../models/profileSchema");
const { MessageEmbed, User } = require("discord.js");

module.exports = {
    name: 'gb',
    aliases: ['gbc', "givebc"],
    async execute(message, args, cmd, client, Discord, profileData) {
        

        if(!args.length) {
            const whodisEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('???')
                .setDescription(`Who is this for, ${message.member.displayName}?`)
                .setFooter({text: 'Try tagging the person.'});

            message.channel.send({embeds: [whodisEmbed]});
        };

        const amount = args[1];
        const target = message.mentions.users.first();
        
        
        if (!target) {

            const noPersEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle(`Oops, ${message.member.displayName}!`)
                .setDescription('That person is not around!')
                .setFooter({text: `Try giving it to someone that's here.`});

            message.channel.send({embeds: [noPersEmbed]});

        } else if (amount % 1 != 0 || amount <= 0) {
            const notAWholeNumEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Oops! The transaction went wrong!')
                .setDescription('The number must be a whole number!')
                .setFooter({text: `Try sending again, ${message.member.displayName}.`});

            message.channel.send({embeds: [notAWholeNumEmbed]});
        } else {
            try {
                const targetData = await profileModel.findOne({userID: target.id});
                if (!targetData) {
    
                    const notPersEmbed = new MessageEmbed()
                        .setColor('#800020')
                        .setTitle(`Sorry, ${message.member.displayName}!`)
                        .setDescription(`That's not a person I know!`)
                        .setFooter({text: `Try giving it to someone that's here.`});
        
                    message.channel.send({embeds: [notPersEmbed]});
        
                } else if (amount > profileData.BC) {
                    const tooManyEmbed = new MessageEmbed()
                        .setColor('#800020')
                        .setTitle(`Oh no, ${message.member.displayName} doesn't have that many 🦠Brain Cells!`)
                        .setDescription(`You currently have 🦠${profileData.BC} Brain Cell/s available to give.`)
                        .setFooter({text: 'Try sending again.'});
    
                    message.channel.send({embeds: [tooManyEmbed]});
    
    
                } else {
    
                    await profileModel.findOneAndUpdate(
                        {userID: message.author.id},
                        {$inc: {
                            BC: -amount,
                        }
                    });
        
                    await profileModel.findOneAndUpdate(
                        {userID: target.id},
                        {$inc: {
                            BC: amount,
                        }
                    });
        
                    const dBCSuccEmbed = new MessageEmbed()
                    .setColor('#CD7F32')
                    .setTitle(`Congrats, ${message.member.displayName}!`)
                    .setDescription(`You've successfully given 🦠${amount} Brain Cells to ${target}!`)
                    .setFooter({text: 'Check your ~balance to confirm.'});

                    message.channel.send({embeds: [dBCSuccEmbed]});   
    
                }
        
    
            } catch (err) {
                console.log(err);
            }

        }

        
    }
}
