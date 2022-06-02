const profileModel = require('../../models/profileSchema');
module.exports = async (message, args, cmd, client, Discord, profileData) => {
    
    //Prefix
    const prefix = '~';

    //Message Codes
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    try {
        profileData = await profileModel.findOne({
            userID: message.author.id
        });

        if(!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                MBC: 500,
                BrainCells: 0,
                bank: 0,
                MBBank: 0,
                food: 0,
            });     
        }
    }catch(err){
        console.log("Error");
    };

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(alias => alias.aliases && alias.aliases.includes(cmd));
    
    try {
        command.execute(message, args, cmd, client, Discord, profileData);
    } catch (err) {
        message.reply("There was an error with the command!");
        console.log(err);
    }

}