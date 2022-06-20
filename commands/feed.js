const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const ms = require('ms');
const profileModel = require("../models/profileSchema");

const inter1 = '🍋';
const inter2 = '🍑';
const inter3 = '🍉';

const animalpics = [
    'https://www.recatorobin.com/wp-content/uploads/2022/05/HTC_Heritage-Library_Forest-Animals-04Element-7.png',
    'https://www.recatorobin.com/wp-content/uploads/2022/05/HTC_Heritage-Library_Forest-Animals-04Element-6.png',
    'https://www.recatorobin.com/wp-content/uploads/2022/05/HTC_Heritage-Library_Forest-Animals-04Element-5.png',
    'https://www.recatorobin.com/wp-content/uploads/2022/05/HTC_Heritage-Library_Forest-Animals-04Element-4.png',
    'https://www.recatorobin.com/wp-content/uploads/2022/05/HTC_Heritage-Library_Forest-Animals-04Element-3.png',
    'https://www.recatorobin.com/wp-content/uploads/2022/05/HTC_Heritage-Library_Forest-Animals-04Element-2.png',
    'https://www.recatorobin.com/wp-content/uploads/2022/05/HTC_Heritage-Library_Forest-Animals-04Element-1.png',
]

const Description = [
    'It is fairly skittish.',
    'It seems to enjoy the scenery.',
    'Probably wants some food',
    'Seems to be wary of its surroundings.',
    'Looks like it wants to rest.',
    'It might be asking for pets!',
    'Pretty aloof at the moment.',
]

const wildColors = [
    '#7393B3', // blue gray from htmlcolorcodes.com
    '#8A9A5B', // sage green
    '#E4D00A', // citrine
    '#E5E4E2', // platinum
    '#FBCEB1', // apricot
    '#FFC0CB', // pink
    '#BDB5D5', // wisteria
    '#E9DCC9', // linen
    '#FFDB58', // mustard yellow
    '#B4C424', // peridot
    '#F4C430', // saffron
    '#A95C68', // puce
    '#FAA0A0', // pastel red
]

// const animalReact = [
//     'It did not like that!',
//     'It was not fond of it.',
//     'It liked that!',
//     'It might love you already.',
//     'It seemed like it wanted more.',
//     'It ignored you.',
//     'It seems like it is having fun!',
//     'It did not care much of that.',
// ]

module.exports = {
    name: 'feed',
    aliases: ["f", "fd"],
    async execute(message, args, cmd, client, Discord, profileData) {
        var animalQty = +(args.slice(1).join(' '));
        var time = +(args[0]);
        var timeRun = 0;

        if (!time && !animalQty) {
                const nobothEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Please fill up Autofeeders, ${message.member.displayname}!`)
                    .setDescription('How much food you give and how long for?')
                    .setFooter({text: 'Use ~feed (time in seconds) (how many portions)'});
                message.channel.send({embeds:[nobothEmbed]});
            } else

            if (!time || isNaN(time)) {
                const noTimeEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Please fill up Autofeeders, ${message.member.displayname}!`)
                    .setDescription('How often will the autofeeders give food?')
                    .setFooter({text: 'Use ~feed (time in seconds) (how many portions)'});
                message.channel.send({embeds:[noTimeEmbed]});
            } else 
            
            if (!animalQty || isNaN(animalQty)) {         
                const noqtyEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Please fill up Autofeeders, ${message.member.displayname}!`)
                    .setDescription('How much food you give?')
                    .setFooter({text: 'Use ~feed (time in seconds) (how many portions)'});

                message.channel.send({embeds:[noqtyEmbed]});   
            } else 
            
            if (animalQty > profileData.food) {
                const noEnfoodEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Please buy food, ${message.member.displayname}!`)
                    .setDescription(`You tried to fill the autofeeder with 🥮${animalQty} food, but only have 🥮${profileData.food} available.`)
                    .setFooter({text: 'Use ~shop to buy more!'});

                message.channel.send({embeds:[noEnfoodEmbed]});  

            } else {
                await profileModel.findOneAndUpdate({
                    userID: message.author.id,
                    }, {
                        $inc: {
                        food: -animalQty,
                        },
                    });

                var animalInterval = setInterval(animalTimer, ms(time +'s'));
    
                async function animalTimer() {
                    var randomAnimal = Math.floor(Math.random() * animalpics.length);
                    var randomDesc = Math.floor(Math.random() * Description.length);
                    var randomClr = Math.floor(Math.random() * wildColors.length);
                    const randMBC = Math.floor(Math.random() * 10) + 5;

                    const spawnAnimal = new MessageEmbed()
                    .setColor(wildColors[randomClr])
                    .setTitle(`A New Visitor for ${message.member.displayname} has Arrived`)
                    .setDescription(Description[randomAnimal])
                    .setImage(animalpics[randomDesc])
                    .setFooter({text: `Congrats! ${message.member.displayname} gained 🧫${randMBC} MBC!`});

                    message.channel.send({embeds:[spawnAnimal]}); 

                    await profileModel.findOneAndUpdate({
                        userID: message.author.id,
                        }, {
                            $inc: {
                            MBC: parseInt(randMBC),
                            },
                        });

    
                    if (++timeRun === parseInt(animalQty)) {
                        clearInterval(animalInterval);
                        const noFood = new MessageEmbed ()
                        .setColor('#800020')
                        .setTitle(`The feeder is empty, ${message.member.displayname}!`)
                        .setDescription(`Please refill the feeder.`)
                        .setFooter({text: 'Use ~feed (time in s) (portions) again.'});
                        
                        setTimeout(function (){
                            message.channel.send({embeds:[noFood]});
                        }, 5000);       
                    };
                
                    // let messageEmbed = await message.channel.send({embeds:[spawnAnimal]});
                    // messageEmbed.react(inter1);
                    // messageEmbed.react(inter2);
                    // messageEmbed.react(inter3);
                    
                }  
    
            }
        }
    }

