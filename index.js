// Express for 24/7 Bot
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const MongoClient = require('mongodb').MongoClient;
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@rawbeans.fb9azhr.mongodb.net/?retryWrites=true&w=majority`;
const mclient = new MongoClient(uri, { useNewUrlParser: true });


//Require Discord JS Framework
const Discord = require('discord.js');

//Discord Client
const client = new Discord.Client({ 
    intents: ["GUILDS", "GUILD_MESSAGES"] 
});

//Collection of Commands & Events
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

//List of files
['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

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