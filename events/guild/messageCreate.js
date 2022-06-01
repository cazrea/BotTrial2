const profileModel = require('../../models/profileSchema');
module.exports = async (Discord, client, message) => {
    
    //Prefix
    const prefix = '~';

    //Message Codes
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    let profileData;
    try {
        profileData = await profileModel.findOne({
            userID: message.author.id
        });

        if(!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                BrainCells: 1,
                bank: 0,
            });     
        }
    }catch(err){
        console.log("Error");
    };

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(alias => alias.aliases && alias.aliases.includes(cmd));

    if(command) command.execute(client, message, args, Discord);

}