////////// GENERAL DEPENDENCIES //////////

// const Discord = require('discord.js');
// const config = require('dotenv').config();
// const client = new Discord.Client();
// const token = process.env.DISCORD_BOT_SECRET;
// const lol_api = process.env.LOL_API_KEY;
// const server = require('./server.js');
// const moment = require('moment');

////////// LEAGUE DEPENDENCIES //////////

// const fs = require('fs');
// const gm = require('gm');
// const request = require('request');
// const urlencode = ('urlencode');
// const roundTo = require('round-to');

/////////////////////////////// ***** LEAGUE API ***** ///////////////////////////////

// League commands here, using the functions in the section below

/* possible commands:
!build
!game
!player
!runes? // will be different now with new system
!masteries?
!championinfo (tips, matchups, etc.)?
*/

// client.on('message', (message) => {
//   const member = message.member;
//   const msg = message.content.toLowerCase(); // easier to handle text inputs this way
//   const args = message.content.split(' ').slice(1).join(" ");
//   const argsTwo = message.content.split(' ').slice(1);
//   const channel = message.channel;
// });
// // placeholder - getPlayerID(), getMatch(), getChampionID(), etc. - add in builds?

// // will see how new runes work as opposed to getrunes/get masteries endpoints for the old setup

// let queues = {
//   '0': 'Custom',
//   '2': 'Normal 5v5 Blind Pick',
//   '14': 'Normal 5v5 Draft Pick',
//   '4': 'Ranked Solo 5v5',
//   '6': 'Ranked Premade 5v5', // does this ID still work with flex queues?
//   '65': 'ARAM'

//   // basic setup for now, there may be some overlap with new/old i.e. 'Ranked Solo 5v5' vs. 'Ranked Solo'
// };

// let maps = {
//   '1': `Summoner's Rift`,
//   '4': 'Twisted Treeline',
//   '12': 'Howling Abyss'

//   // there is also another SR map at ID 11 and TT at 10, not sure what any differences are
// };

// const liveMatch = "https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/"; // constant path to retrieve live match data
// const playerID = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/"; // constant path to retrieve summoner names (player names)
// const championID = "https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=" + lol_api;
// const getChampion = "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json";
// const routeInfo = 'http://api.champion.gg/v2/champions?limit=200&champData=hashes,firstitems,summoners,skills,finalitemshashfixed,masterieshash&api_key=' + champggToken;


// // ///// League API functions: getPlayerID(), getMatch(), getChampionID(), matchInfo(), championBuild()

// function getPlayerID(player, cb) {
    
//   request(playerID + urlencode(summoner) + "?api_key=" + lol_api, function(error, response,body) {
//     if(err) {
//       cb(err); // error handling
//     } else {
//       // parse the returned data and create a summoner object to contain it
//       let dataJSON = JSON.parse(response.body);
//       let summonerid = dataJSON.id;
//       let accountLevel = dataJSON.summonerLevel;
//       let profileID = dataJSON.profileIconId;
//       let summonername = dataJSON.name;
//       let summonerObject = {
//         "summonerid": summonerid,
//         "accountlvl": accountlvl,
//         "profileid": profileID,
//         "name": summonername
//       }
//       cb(false, summonerObject);
//     }
//   });
// } // end getPlayerID()

// function getMatch(summonerObject, cb) {

//   request(liveMatch + summonerObject.summonerid + "?api_key=" + lol_api, function(err, response, body) {
//     if(response.statusCode == 404) {
//       cb('The player is not currently in a live match.'); // simple error handling for likely the most frequent issue
//     } else {
//       requesterror(liveMatch, response.statusCode, function(err) {
//         if(err) {
//           cb(err); // generic error handler
//         } else {
//           // block occurs only when the given player is in a match
//           console.log('Parsing match data.');
          
//           // as with getPlayerID(), parse data and create an object. This is an object for a live game rather than a player.
//           let dataJSON = JSON.parse(response.body);
//           let gameID = dataJSON.gameId;
//           let gameMode = dataJSON.gameMode;
//           let mapID = dataJSON.mapID;
//           let gameType = dataJSON.gameType;
//           let gameStart = dataJSON.gameStartTime;
//           let players = dataJSON.participants;
//           let gameObject = {
//             "gameid": gameid,
//             "gamemode": gamemode,
//             "mapid": mapid,
//             "gametype": gameType,
//             "gametime": gametime,
//             "participants": participants,
//             "queue": dataJSON.gameQueueConfigId
//           }
//           cb(false, gameObject);
//         }
//       });
//     }
//   });
// } // end getMatch()

// function getChampionID(championName, cb) {

//   request(championID, function(error, response, body) {
//     requesterror(championID, response.statusCode, function(err) {
//     if(err) {
//       cb(err); // basic error handling
//     } else {
//       let dataJSON = JSON.parse(response.body);
//       // normalizing champion name input (capitalization, spacing, etc.) to minimize edge cases
//       // the next two lanes make every name lowercase and then capitalize the first letter
//       // this will hopefully cut down the number of elifs required to manage other cases

//       championname = championname.toLowerCase();
//       championname = championname.charAt(0).toUpperCase() + championname.slice(1);

//       // add cases for potential exceptions: MF, Kai'sa, Kog, ASol, J4, Lee, Xin, Yi, Mundo, TF, Rek'sai
//       // more: Wukong? (MonkeyKing in JSON, will investigate), Cho, Vel, Nunu? (will check with new name)
//       // can do an includes() for nicknames as well: Cass, Kass, Malph, etc.
        
//     // 3/13/20 note: grab names/info of all newer champion releases not on this list along with nicknames

//       // for the purpose of the following statements, the number "data" is assigned to references the individual champion keys on Riot's end
//       if(championname.includes("Miss") || championname.includes("Fortune")) {
//         data = 21;
//       } else if(championname.includes("Kai'")) {
//         // this is not in the Riot data I'm looking at, will add in
//       } else if(championname.includes("Kog")) {
//         data = 96;
//       } else if(championname.includes("Aurelion") || championname === "ASol") {
//         data = 136;
//       } else if(championname.includes("Jarvan" || championname === "J4")) {
//         data = 59;
//       } else if(championname === "Leesin" || championname === "Lee sin") { // using exact matches here because "Lee" will cause errors with Nidalee
//         data = 64;
//       } else if(championname.includes("Xin")) {
//         data = 5;
//       } else if(championname.includes("Master") || championname === "Yi") {
//         data = 11;
//       } else if(championname.includes("Mundo")) {
//         data = 36;
//       } else if(championname.includes("Twisted") || championname.includes("Fate") || championname === "TF") {
//         data = 4;
//       } else if(championname.includes("Rek")) {
//         data = 421;
//       } else if(championname.includes("Wu")) {
//         data = 62; // not spaced or a name with an apostrophe, but Wukong is internally known in Riot's database as "MonkeyKing" so this requires more specificity
//       } else if(championname.includes("Cho")) {
//         data = 31;
//       } else if(championname === "Velkoz" || championname === "Vel" || championname === "velkoz") { // using exact matches again because "vel" also appears in Evelynn's name
//         data = 161;
//       } else if(championname.includes("Nunu") || championname.includes("Willump")) { // probably not required but covering an extra base here since he's now named "Nunu & Willump"
//         data = 20;
//       }
//       // may add some more catches for nicknames in the future, just getting a standard working version for now
//         else {
//           try {
//             let data = dataJSON.data[championname].id;
//           } catch(err) {
//             cb('Not recognized as a valid champion name. Please try again!');
//             return;
//           }
//         }
//         cb(false, data);
//     }
//   });
//  });
// } // end getChampionID()

// // function matchInfo(matchObject, summonerObject, cb) {

// //   let placeholder = matchObject.queue;
// //   let gametype = queues[placeholder];
// //   // placeholder then gets the type of map that has been queued for:
// //   placeholder = matchObject.mapid;
// //   let map = mapname[placeholder];
// //   let matchid = matchObject.gameid;
// //   let time = matchObject.gametime;

// //   // time variables
// //   let ms = (new Date).getTime(); // milliseconds
// //   time = ((time - ms) * -1);
// //   let second = (time / 1000) % 70 - 0.5;
// //   let minute = (time / (1000 * 60)) % 60 - 0.5;
// //   let hour = (time / (1000 * 60 * 60)) - 0.5;
// //   // round all time variable values
// //   second = roundTo(second, 0);
// //   minute = roundTo(minute, 0);
// //   hour = roundTo(hour, 0);

// //   // two possible cases: match is live and there's a time or players are still loading in (no game time)
// //   if(hour > 100) {
// //     time = "Players loading!";
// //   } else {
// //     time = `Game live for ${hour} hours, ${minute} minutes, ${second} seconds.`;
// //     // may add another case here for anything below two minutes returning "one minute" instead of `${minute} minutes`, but this is a nitpicky detail.
// //   }

// //   // player-related variables and functions
// //   let players = matchObject.participants;
// //   let bluePlayers = [];
// //   let redPlayers = [];
// //   let team; // players will be moved from the empty objects based on their team

// //   // gathers player information and sorts them onto the appropriate teams
// //   for(let i = 0; i < players.length; i++) {
// //     let playerObject = {};
// //     if(players[i].teamId === 100) {
// //       playerObject.summonername = players[i].summonerName;
// //       playerObject.championId = players[i].championId;
// //       playerObject.summonerid = players[i].summonerId;
// //       playerObject.runes = players[i].runes;
// //       playerObject.masteries = players[i].masteries; // not sure how runes/masteries work with the new combined system, will see what's returned
// //       playerObject.team = "BLUE";
// //     }
// //     bluePlayers.push(playerObject);
// //     if(summonerObject.summonerid == players[i].summonerId) {
// //       team = 'BLUE';
// //     } else {
// //         playerObject.summonername = players[i].summonerName;
// //         playerObject.championId = players[i].championId;
// //         playerObject.summonerid = players[i].summonerId;
// //         playerObject.runes = players[i].runes;
// //         playerObject.masteries = players[i].masteries; // not sure how runes/masteries work with the new combined system, will see what's returned
// //         playerObject.team = "RED";

// //         redPlayers.push(playerObject);
// //         if(summonerObject.summonerid == players[i].summonerId) {
// //           team = 'RED';
// //       }
// //     }
// //   }

// //   // general match information
// //   matchObject = {
// //     'gametype': gametype,
// //     'map': map,
// //     'time': time,
// //     'blueplayers': blueplayers,
// //     'redplayers': redplayers,
// //     'team': team
// //   }
// //   liveMatchChampion(matchObject, function(err, newMatch) {
// //     if(err) {
// //       cb(err);
// //     } else {
// //       cb(false, newMatch, summonerObject);
// //     }
// //   });
// // } // end matchInfo()

// function liveMatchChampion() {

//   request(getChampion, function(error, response, body) {
//     requesterror(getChampion, response.statusCode, function(err) {
//       if(err) {
//         cb(err);
//       } else {
//         let dataJSON = JSON.parse(response.body);
//         let secondJSON = dataJSON.data;
//         for(let i = 0; i < matchObject.blueplayers.length; i++) {
//           for(let key in secondJSON) {
//             if(secondJSON[key].key == (matchObject.blueplayers[i].championid + "")) {
//               matchObject.blueplayers[i].championname = secondJSON[key].id;
//             // once again we handle exceptions, these being newer champions. Still have to find Kai'sa in the JSON and add her.
//             } else if(matchObject.blueplayers[i].championid === 141) {
//               matchObject.blueplayers[i].championname = "Kayn";
//             } else if(matchObject.blueplayers[i].championid === 498) {
//               matchObject.blueplayers[i].championname = "Xayah";
//             } else if(matchObject.blueplayers[i].championid === 497) {
//               matchObject.blueplayers[i].championname = "Rakan";
//             } else {
//               continue;
//             }
//           }
//         }
//         // now do the same exact thing, but loop through the red players instead.
//         for(let i = 0; i < matchObject.blueplayers.length; i++) {
//           for(let key in secondJSON) {
//             if(secondJSON[key].key == (matchObject.blueplayers[i].championid + "")) {
//               matchObject.blueplayers[i].championname = secondJSON[key].id;
//             // once again we handle exceptions, these being newer champions. Still have to find Kai'sa in the JSON and add her.
//             } else if(matchObject.blueplayers[i].championid === 141) {
//               matchObject.blueplayers[i].championname = "Kayn";
//             } else if(matchObject.blueplayers[i].championid === 498) {
//               matchObject.blueplayers[i].championname = "Xayah";
//             } else if(matchObject.blueplayers[i].championid === 497) {
//               matchObject.blueplayers[i].championname = "Rakan";
//             } else {
//               continue;
//             }
//           }
//         }
//       }

//       // leaving a placeholder here for future features.
//       // can handle runes, masteries, champion mastery, etc. in this function
//     });
//   });
// } // end liveMatchChampion()

// // // get build information for a specific champion
// function championBuild(champID, argsTwo, cb) {

//   console.log('Parsing build data.');
//   // handling Riot naming conventions here, the following line is required because their internal role data is uppercase
//   let role = argsTwo.slice(1).join('_').toUpperCase
//   // these lines handle the three roles that are called different things internally and externally
//   // jungle/top are the same but in uppercase
//   if(role == 'ADC' || role == 'AD' || role == 'DUOCARRY') {
//     role = 'DUO_CARRY';
//   } else if(role = 'SUPPORT' || role == 'SUPP' || role == 'DUO_SUPPORT') {
//     role = 'DUO_SUPPORT';
//   } else if(role == 'MID' || role == 'MIDLANE') {
//     role = 'MIDDLE';
//   }
//   request(routeInfo, function(err, response, body) {
//     requesterror(routeInfo, response.statusCode, function(err) {
//       if(err) {
//         cb(err); // basic error handler
//       } else {
//         let dataJSON = JSON.parse(response.body);
//         let champObject = {};
//         let notfound = true;

//         if(role == "") {
//           for(var key in dataJSON) {
//             if(dataJSON[key].championId == champid) {
//               champObject = dataJSON[key];
//               notfound = false;
//               break;
//             }
//           }
//         } else {
//           for(var key in dataJSON) {
//             if(dataJSON[key].championId == champid && dataJSON.role == role) {
//               champObject = dataJSON[key];
//               notfound = false;
//               break;
//             }
//           }
//         }
//       }
//     })
//   }
// } // end championBuild()