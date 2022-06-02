const { MessageEmbed, User } = require("discord.js");
const profileModel = require("../../models/profileSchema");
const ms = require('ms');

module.exports = {
    name: 'dmbc',
    aliases: ["dm", "mbcd"],
    execute(message, args, cmd, client, Discord, profileData) {
        const channelID = ['980722586847707196','979817858370527292']
        var time = args[0];

        if (amount % 1 != 0 || amount <= 0) {
                message.channel.send("whole number");
            } 
            
            else if (amount > profileData.MBC) {
                message.channel.send("not enough");
            } 
            
            else {         
                await profileModel.findOneAndUpdate(
                    {userID: message.author.id}, 
                    {$inc: {
                            MBC: -amount,
                            MBBank: amount,
                            }
                    });  
    
                    message.channel.send("deposit success");   
            } 
        }
    }