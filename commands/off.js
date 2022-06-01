module.exports = {
    name: 'off',
    aliases: ["o", "sd"],
    execute(client, message, args, Discord) {
        const robinRole = message.member.roles.cache

        if(robinRole.has('979797191239565344')) {
            message.channel.send("Restarting!").then(() => 
            {client.destroy();})
        } else {
            message.channel.send("You do not have access to this command!")
        }
    }
};
