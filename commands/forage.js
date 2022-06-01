const profileModel = require("../models/profileSchema");

module.exports = {
    name: 'forage',
    aliases: ['for', 'fg'],
    async execute(message, args, cmd, client, discord, profileData) {
        const randomNum = Math.round(Math.random());
        const resp = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                BrainCells: randomNum,
            },
        });

        const forageEmbed = new MessageEmbed()
          .setColor('#CD7F32')
          .setTitle("Looking for some Brain Cells...")
          .setDescription(`You acquired ${randomNum} brain cells.`)
          .setFooter({text: 'Use ~help to check out my commands!'});

        message.channel.send({embeds: [forageEmbed]});

    }
}