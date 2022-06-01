// Express for 24/7 Bot
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//Require Discord JS Framework
const Discord = require('discord.js');

//Discord Client
const client = new Discord.Client({ 
    intents: ["GUILDS", "GUILD_MESSAGES"] 
});

// Require Mongoose
const mongoose = require('mongoose');


//Collection of Commands & Events
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

//List of files
['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(process.env.MONGODB_SRV, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Successfully Connected to Database.');
}).catch((err) => {
  console.log('Connection failed.');
});

//Activities List
const activities_list = [
    { type: 'WATCHING', message: 'for animals! ❤ ~help'  },
    { type: 'WATCHING', message: 'for wildlife! ❤ ~help' },
    { type: 'PLAYING', message: 'outside! ❤ ~help' }
];
client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);

        client.user.setActivity(activities_list[index].message, { type: activities_list[index].type });
    }, 15000);
});

// Should be last code
client.login(process.env.TOKEN)