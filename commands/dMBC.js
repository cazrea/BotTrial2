const { MessageEmbed, User } = require("discord.js");
const profileModel = require("../models/profileSchema");
const ms = require('ms');

module.exports = {
    name: 'dMBC',
    aliases: ['dM'],
    async execute(message, args, cmd, client, discord, profileData) {
        const amount = args[0];

        if (amount % 1 != 0 || amount <=0) 
            return message.channel.send("Whole Number")

        try {
            if (amount > profileData.MBC) return message.channel.send("Not enough")

            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id
                }, 
                {
                    $inc: {
                        MBC: -amount,
                        MBBank: amount,
                        }
                });  

                return message.channel.send("deposit success");


        } catch(err) {
            console.log(err);
        }
    },
};