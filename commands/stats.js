exports.run = (client, message) => {
    const queueTotal = client.queues.array().reduce((prev, curr) => 
        prev + curr.queue.length, 0);
    const guildTotal = client.queues.array().filter(q => 
        !!q.dispatcher).length;

    message.channel.sendMessage(`🤠 Currently queueing a total of ${queueTotal} songs across ${guildTotal} servers. 🤠`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['info'],
    permLevel: 0
};

exports.help = {
    name: 'stats',
    description: 'Returns the total number of songs and servers currently using this bot\'s queue.',
    usage: 'stats'
};