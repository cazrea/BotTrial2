const profileModel = require("../models/profileSchema");
const { MessageEmbed, User } = require("discord.js");

module.exports = {
    name: 'gm',
    aliases: ['gmbc', "givembc"],
    async execute(message, args, cmd, client, Discord, profileData) {
        

        if(!args.length) {
            const whodisEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('???')
                .setDescription(`Who do you want to give this to, ${message.member.displayName}?`)
                .setFooter({text: 'Try tagging the person.'});

            message.channel.send({embeds: [whodisEmbed]});
        };

        const amount = args[1];
        const target = message.mentions.users.first();
        
        
        if (!target) {

            const noPersEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Oops!')
                .setDescription(`That person is not around, ${message.member.displayName}!`)
                .setFooter({text: `Try giving it to someone that's here.`});

            message.channel.send({embeds: [noPersEmbed]});

        } else if (amount % 1 != 0 || amount <= 0) {
            const notAWholeNumEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle(`Oops! The transaction went wrong, ${message.member.displayName}!`)
                .setDescription('The number must be a whole number!')
                .setFooter({text: 'Try sending again.'});

            message.channel.send({embeds: [notAWholeNumEmbed]});
        } else {
            try {
                const targetData = await profileModel.findOne({userID: target.id});
                if (!targetData) {
    
                    const notPersEmbed = new MessageEmbed()
                        .setColor('#800020')
                        .setTitle('Oops!')
                        .setDescription(`That's not a person I know, ${message.member.displayName}!`)
                        .setFooter({text: `Try giving it to someone that's here.`});
        
                    message.channel.send({embeds: [notPersEmbed]});
        
                } else if (amount > profileData.MBC) {
                    const tooManyEmbed = new MessageEmbed()
                        .setColor('#800020')
                        .setTitle(`Oh no, ${message.member.displayName} doen't have that many Micro Brain Cells!`)
                        .setDescription(`You currently have 🧫${profileData.MBC} Micro Brain Cell/s available to give.`)
                        .setFooter({text: 'Try sending again.'});
    
                    message.channel.send({embeds: [tooManyEmbed]});
    
    
                } else {
    
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
        
                    const dBCSuccEmbed = new MessageEmbed()
                    .setColor('#CD7F32')
                    .setTitle(`Congrats, ${message.member.displayName}!`)
                    .setDescription(`You've successfully given 🧫${amount} Brain Cells to ${target}!`)
                    .setFooter({text: 'Check your ~balance to confirm.'});

                    message.channel.send({embeds: [dBCSuccEmbed]});   
    
                }
        
    
            } catch (err) {
                console.log(err);
            }

        }

        
    }
}
