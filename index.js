////////// GENERAL DEPENDENCIES //////////

const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const lol_api = process.env.LOL_API_KEY;
const server = require('./server.js');

////////// LEAGUE DEPENDENCIES //////////

const fs = require('fs');
const gm = require('gm');
const request = require('request');
const urlencode = ('urlencode');
const roundTo = require('round-to');

// more to come as this is set up
/////////////////////////////////////////
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
      .setTitle('Azur Lane')
      .setAuthor('**final bot name here**', 'https://imgur.com/se0joaV.png')
      .setColor('00AE86')
      .setDescription('Azur Lane - Official Website')
      .setImage('https://imgur.com/se0joaV.png')
      .setFooter('Here is some footer text', 'https://imgur.com/se0joaV.png' )
      .setThumbnail('https://imgur.com/se0joaV.png')
      .setTimestamp()
       .setURL("https://azurlane.yo-star.com/")
      .addField('Twitter', 'https://twitter.com/AzurLane_EN', true)
      .addBlankField(true) // for space
      .addField('Reddit', 'https://www.reddit.com/r/AzureLane/', true)
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

/////////////////////////////// ***** USER HANDLING ***** ///////////////////////////////

// includes features like greeting new users, kicking, banning, permission handling, etc.

// handles greeting of new users and removes users from the newUsers list if they leave while on it so the greeting
// is not addressed to an invalid user. This won't be necessary for small servers while the message triggers on
// each join, but for larger batches (i.e. newUsers[guild.id].size > 10) it will be useful.

const newUsers = [];
// maybe test some sort of message trigger here?
client.on('guildMemberAdd', (member) => {
  const guild = member.guild;
  if(!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
  newUsers[guild.id].set(member.id, member.user);

  if(newUsers[guild.id].size = 1) {
    const userlist = newUsers[guild.id].map(u => u.toString()).join(' '); // not necessary for 1, useful for larger servers
    guild.channels.find(channel => channel.name === 'general').send(`Welcome, ${userlist}!`);
    newUsers[guild.id].clear();
  }
});

client.on('guildMemberRemove', (member) => {
  const guild = member.guild;
  if(newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
}); // prevents greeting of invalid users if they leave while in the newUsers greeting queue

// kicks user from a voice channel (in kind of an inefficient way for now, will edit later)

// client.on('message', async (message) => {
//   if(!message.guild.me.hasPermission(['MANAGE_CHANNELS', 'MOVE_MEMBERS']))
//     return message.reply('Missing required channel management and/or member moving permission(s).');

//   const user = message.mentions.users.first();
//   const member = message.mentions.members.first();
// //   // above line stores the @mentioned user, following lines check to make sure
// //   // there is a mention and that the user is in a voice channel.
//   if(!member) return message.reply('Please @mention a specific user.');
//   if(!member.voiceChannel) return message.reply('Specified user is not in a voice channel.');

//   const temp_voice = await message.guild.createChannel(user.id, 'voice', [
//     { id: guild.id,
//       deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'], },
//     { id: member.id,
//       deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'] }
//   ]);
//   await member.setVoiceChannel(temp_voice);

//   await temp_voice.delete(); // creates temporary voice channel that awaits the
// //   // mention and then moves the user in before deleting the channel

//   msg.react('👍'); // check with a reaction
// });

////////// testing out some guild-related features to familiarize myself with the issues the voice channel permissions code might be having //////////

// create a guild (limited to bots with < 10 guilds for now)

// client.on('message', (message) => {

//   if(message.content === (prefix + 'guildtest')) {
//     async function createGuild(client, message) {
//       try {
//         const guild = await client.user.createGuild('Test Guild', 'hello');
//         const defaultChannel = guild.channels.find(channel => channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
//         const invite = await defaultChannel.createInvite();
//         await message.author.send(invite.url);
//         const role = await guild.createRole({ name: 'Test Role', permissions: ['ADMINISTRATOR'] });
//         await message.author.send(role.id);
//       } catch(err) {
//         console.error(err);
//       }
//     }

//     createGuild(client, message);
//     message.member.addRole('<ROLE>');
//   }
// })

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

const liveMatch = "https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/"; // constant path to retrieve live match data
const playerID = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/"; // constant path to retrieve summoner names (player names)
const championID = "https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=" + lol_api;
const getChampion = "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json";

///// League API functions

function getPlayerID(player, cb) {
  request(playerID + urlencode(summoner) + "?api_key=" + lol_api, function(error, response,body) {
    if(err) {
      cb(err); // error handling
    } else {
      // parse the returned data and create a summoner object to contain it
      let dataJSON = JSON.parse(response.body);
      let summonerid = dataJSON.id;
      let accountLevel = dataJSON.summonerLevel;
      let profileID = dataJSON.profileIconId;
      let summonername = dataJSON.name;
      let summonerObject = {
        "summonerid": summonerid,
        "accountlvl": accountlvl,
        "profileid": profileID,
        "name": summonername
      }
      cb(false, summonerObject);
    }
  });
} // end getPlayerID()

function getMatch(summonerObject, cb) {
  request(liveMatch + summonerObject.summonerid + "?api_key=" + lol_api, function(err, response, body) {
    if(response.statusCode == 404) {
      cb('The player is not currently in a live match.'); // simple error handling for likely the most frequent issue
    } else {
      requesterror(liveMatch, response.statusCode, function(err) {
        if(err) {
          cb(err); // generic error handler
        } else {
          // block occurs only when the given player is in a match
          console.log('Parsing match data.');
          
          // as with getPlayerID(), parse data and create an object. This is an object for a live game rather than a player.
          let dataJSON = JSON.parse(response.body);
          let gameID = dataJSON.gameId;
          let gameMode = dataJSON.gameMode;
          let mapID = dataJSON.mapID;
          let gameType = dataJSON.gameType;
          let gameStart = dataJSON.gameStartTime;
          let players = dataJSON.participants;
          let gameObject = {
            "gameid": gameid,
            "gamemode": gamemode,
            "mapid": mapid,
            "gametype": gameType,
            "gametime": gametime,
            "participants": participants,
            "queue": dataJSON.gameQueueConfigId
          }
          cb(false, gameObject);
        }
      });
    }
  });
} // end getMatch()

function getChampionID(championName, cb) {
  request(championID, function(error, response, body) {
    requesterror(championID, response.statusCode, function(err) {
    if(err) {
      cb(err); // basic error handling
    } else {
      let dataJSON = JSON.parse(response.body);
      // normalizing champion name input (capitalization, spacing, etc.) to minimize edge cases
      // the next two lanes make every name lowercase and then capitalize the first letter
      // this will hopefully cut down the number of elifs required to manage other cases

      championname = championname.toLowerCase();
      championname = championname.charAt(0).toUpperCase() + championname.slice(1);

      // add cases for potential exceptions: MF, Kai'sa, Kog, ASol, J4, Lee, Xin, Yi, Mundo, TF, Rek'sai
      // more: Wukong? (MonkeyKing in JSON, will investigate), Cho, Vel, Nunu? (will check with new name)
      // can do an includes() for nicknames as well: Cass, Kass, Malph, etc.

      // for the purpose of the following statements, the number "data" is assigned to references the individual champion keys on Riot's end
      if(championname.includes("Miss") || championname.includes("Fortune")) {
        data = 21;
      } else if(championname.includes("Kai'")) {
        // this is not in the Riot data I'm looking at, will add in
      } else if(championname.includes("Kog")) {
        data = 96;
      } else if(championname.includes("Aurelion") || championname === "ASol") {
        data = 136;
      } else if(championname.includes("Jarvan" || championname === "J4")) {
        data = 59;
      } else if(championname === "Leesin" || championname === "Lee sin") { // using exact matches here because "Lee" will cause errors with Nidalee
        data = 64;
      } else if(championname.includes("Xin")) {
        data = 5;
      } else if(championname.includes("Master") || championname === "Yi") {
        data = 11;
      } else if(championname.includes("Mundo")) {
        data = 36;
      } else if(championname.includes("Twisted") || championname.includes("Fate") || championname === "TF") {
        data = 4;
      } else if(championname.includes("Rek")) {
        data = 421;
      } else if(championname.includes("Wu")) {
        data = 62; // not spaced or a name with an apostrophe, but Wukong is internally known in Riot's database as "MonkeyKing" so this requires more specificity
      } else if(championname.includes("Cho")) {
        data = 31;
      } else if(championname === "Velkoz" || championname === "Vel" || championname === "velkoz") { // using exact matches again because "vel" also appears in Evelynn's name
        data = 161;
      } else if(championname.includes("Nunu") || championname.includes("Willump")) { // probably not required but covering an extra base here since he's now named "Nunu & Willump"
        data = 20;
      }
      // may add some more catches for nicknames in the future, just getting a standard working version for now
        else {
          try {
            let data = dataJSON.data[championname].id;
          } catch(err) {
            cb('Not recognized as a valid champion name. Please try again!');
            return;
          }
        }
        cb(false, data);
    }
  });
 });
} // end getChampionID()

function matchInfo(matchObject, summonerObject, cb) {
  let placeholder = matchObject.queue;
  let gametype = queues[placeholder];
  // placeholder then gets the type of map that has been queued for:
  placeholder = matchObject.mapid;
  let map = mapname[placeholder];
  let matchid = matchObject.gameid;
  let time = matchObject.gametime;

  // time variables
  let ms = (new Date).getTime(); // milliseconds
  time = ((time - ms) * -1);
  let second = (time / 1000) % 70 - 0.5;
  let minute = (time / (1000 * 60)) % 60 - 0.5;
  let hour = (time / (1000 * 60 * 60)) - 0.5;
  // round all time variable values
  second = roundTo(second, 0);
  minute = roundTo(minute, 0);
  hour = roundTo(hour, 0);

  // two possible cases: match is live and there's a time or players are still loading in (no game time)
  if(hour > 100) {
    time = "Players loading!";
  } else {
    time = `Game live for ${hour} hours, ${minute} minutes, ${second} seconds.`;
    // may add another case here for anything below two minutes returning "one minute" instead of `${minute} minutes`, but this is a nitpicky detail.
  }

  // player-related variables and functions
  let players = matchObject.participants;
  let bluePlayers = [];
  let redPlayers = [];
  let team; // players will be moved from the empty objects based on their team

  // gathers player information and sorts them onto the appropriate teams
  for(let i = 0; i < players.length; i++) {
    let playerObject = [];
    if(players[i].teamId === 100) {
      playerObject.summonername = players[i].summonerName;
      playerObject.championId = players[i].championId;
      playerObject.summonerid = players[i].summonerId;
      playerObject.runes = players[i].runes;
      playerObject.masteries = players[i].masteries; // not sure how runes/masteries work with the new combined system, will see what's returned
      playerObject.team = "BLUE";
    }
    bluePlayers.push(playerObject);
    if(summonerObject.summonerid == players[i].summonerId) {
      team = 'BLUE';
    } else {
        playerObject.summonername = players[i].summonerName;
        playerObject.championId = players[i].championId;
        playerObject.summonerid = players[i].summonerId;
        playerObject.runes = players[i].runes;
        playerObject.masteries = players[i].masteries; // not sure how runes/masteries work with the new combined system, will see what's returned
        playerObject.team = "RED";

        redPlayers.push(playerObject);
        if(summonerObject.summonerid == players[i].summonerId) {
          team = 'RED';
      }
    }
  }

  // general match information
  matchObject = {
    'gametype': gametype,
    'map': map,
    'time': time,
    'blueplayers': blueplayers,
    'redplayers': redplayers,
    'team': team
  }
  // will add another function to get champions in the match and then call here, placeholder
} // end matchInfo()

function liveMatchChampion() {
  request(getChampion, function(error, response, body) {
    requesterror(getChampion, response.statusCode, function(err) {
      if(err) {
        cb(err);
      } else {
        let dataJSON = JSON.parse(response.body);
        let secondJSON = dataJSON.data;
        for(let i = 0; i < matchObject.blueplayers.length; i++) {
          for(let key in secondJSON) {
            if(secondJSON[key].key == (matchObject.blueplayers[i].championid + "")) {
              matchObject.blueplayers[i].championname = secondJSON[key].id;
            // once again we handle exceptions, these being newer champions. Still have to find Kai'sa in the JSON and add her.
            } else if(matchObject.blueplayers[i].championid === 141) {
              matchObject.blueplayers[i].championname = "Kayn";
            } else if(matchObject.blueplayers[i].championid === 498) {
              matchObject.blueplayers[i].championname = "Xayah";
            } else if(matchObject.blueplayers[i].championid === 497) {
              matchObject.blueplayers[i].championname = "Rakan";
            } else {
              continue;
            }
          }
        }
      }
    })
  })
}