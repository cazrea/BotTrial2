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
                .setDescription('Who do you want to give this to?')
                .setFooter({text: 'Try tagging the person.'});

            message.channel.send({embeds: [whodisEmbed]});
        };

        const amount = args[1];
        const target = message.mentions.users.first();
        
        
        if (!target) {

            const noPersEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Oops!')
                .setDescription('That person is not around!')
                .setFooter({text: `Try giving it to someone that's here.`});

            message.channel.send({embeds: [noPersEmbed]});

        } else if (amount % 1 != 0 || amount <= 0) {
            const notAWholeNumEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Oops! The transaction went wrong!')
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
                        .setDescription(`That's not a person I know!`)
                        .setFooter({text: `Try giving it to someone that's here.`});
        
                    message.channel.send({embeds: [notPersEmbed]});
        
                } else if (amount > profileData.BC) {
                    const tooManyEmbed = new MessageEmbed()
                        .setColor('#800020')
                        .setTitle(`Oh no, you don't have that many Brain Cells!`)
                        .setDescription(`You currently have ${profileData.BC} Micro Brain Cell/s available to deposit.`)
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
        
                    message.channel.send('success sent');
    
                }
        
    
            } catch (err) {
                console.log(err);
            }

        }

        
    }
}
