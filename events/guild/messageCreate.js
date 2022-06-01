module.exports = (Discord, client, message) => {
    
    //Prefix
    const prefix = '~';

    //Message Codes
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(alias => alias.aliases && alias.aliases.includes(cmd));

    if(command) command.execute(client, message, args, Discord);

}