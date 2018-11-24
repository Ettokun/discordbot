const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const lol_api = process.env.LOL_API_KEY;
const server = require('./server.js');

client.login(token);

client.on('ready', () => {
  console.log('Bot connected!');
  console.log(`${client.user.username} ready for use.`);
});

// some general message rules

const prefix = process.env.prefix;

client.on('message', (message) => {

  if(message.author.id === process.env.ownerID) {
    console.log('Owner!');
  }

  if(message.content.includes('tama') && !message.content.startsWith(prefix)) {
    // const cop = client.emojis.find(emoji => emoji.name === 'cop');
    // message.channel.send(`👮`);
    // message.reply(`👮`);
    message.react('👮');
  }

  if(!message.content.startsWith(prefix) || message.author.bot) return;


  if(message.content === (prefix + 'test')) {
    message.channel.send('Hello!');
  }

  if(message.content === (prefix + 'azur')) {
    const embed = new Discord.RichEmbed()
      .setTitle('This is a test embed.')
      .setAuthor('AUTHOR NAME', 'https://imgur.com/se0joaV.png')
      .setColor('00AE86')
      .setDescription('Hello, this is a BallsBot embed test.')
      .setImage('https://imgur.com/se0joaV.png')
      .setFooter('Here is some footer text', 'https://imgur.com/se0joaV.png' )
      .setThumbnail('https://imgur.com/se0joaV.png')
      .setTimestamp()
       .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
      .addField('Test field', 'text', true)
      .addBlankField(true) // for space
      .addField('Another field', 'text again', true)
      .addBlankField(true)
      .addField('A final field', 'more text', true);

    message.channel.send({embed});
  }

  // testing emoji replies and reactions

  if(message.content === (prefix + 'DrSEG')) {
    const DrSEG = client.emojis.find(emoji => emoji.name === 'DrSEG');
    message.reply(`${DrSEG}`);
    message.react(DrSEG);
  }

  // return a list of the server's custom emojis

  if(message.content === (prefix + 'list')) {
    const emojiList = message.guild.emojis.map(e => e.toString()).join('   ');
    message.channel.send(emojiList);
  }

  // return a list of custom emojis with emoji ID included

  if(message.content === (prefix + 'listnames')) {
    // this version includes the numerical ID of each custom emoji:
    // const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' + e.name).join('\n');
    const emojiList = message.guild.emojis.map((e) => (e) + '   |   ' + e.name).join('\n\n');
    message.channel.send(emojiList);
  }

});

/////////////////////////////// ***** MUSIC BOT ***** ///////////////////////////////

/////////////////////////////// ***** LEAGUE API ***** ///////////////////////////////

// League API and associated endpoints

//
// const url_info =
// const url_champion =
// const url_items =
// const url_itempicture =
// const url_summonerID =
// const url_live =
// const url_getchamp =
// const url_getchampmastery =
// const url_getrank =

// will see how new runes work as opposed to getrunes/get masteries endpoints for the old setup

let queues = {
  '0': 'Custom',
  '2': 'Normal 5v5 Blind Pick',
  '14': 'Normal 5v5 Draft Pick',
  '4': 'Ranked Solo 5v5',
  '6': 'Ranked Premade 5v5', // does this ID still work with flex queues?
  '65': 'ARAM'

  // basic setup for now, there may be some overlap with new/old i.e. 'Ranked Solo 5v5' vs. 'Ranked Solo'
};

let maps = {
  '1': `Summoner's Rift`,
  '4': 'Twisted Treeline',
  '12': 'Howling Abyss'

  // there is also another SR map at ID 11 and TT at 10, not sure what any differences are
};
