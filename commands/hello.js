const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");

const greetings = [
  "I am scouting for animals!",
  "Do you think the wildlife will eat us?",
  "How do you have so much food!",
  "Meow",
  "I'm pretty sure they're all friendly!",
  "No, I don't take the snacks!",
  "I wonder if they wait outside our house for food...",
  "You really think they're not gonna eat us?",
  "I'm pretty hungry myself...",
  "Why are there so many animals out here?",
  "Sometimes I wonder what'll happen if I was wild.",
  "Oh man, I'm pretty hungry myself!",
  "If you were a wildling, would you take a snack?",
  "As much as I'd like to play with the animals, I'd rather just watch",
  "I know, why don't you add more food in the feeders!",
]

module.exports = {
    name: 'hello',
    aliases: ["hi", "bye"],
    execute(client, message, args) {
      var randGreet = Math.floor(Math.random() * greetings.length);
      
        const greetEmbed = new MessageEmbed()
          .setColor('#CD7F32')
          .setTitle('Hello, thanks for inviting me!')
          .setDescription(greetings[randGreet])
          .setFooter({text: 'Use ~help to check out my commands!'});

      message.channel.send({embeds: [greetEmbed]})
    }
};