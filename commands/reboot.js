exports.run = async(client, message) => {
    message.channel.sendMessage(`Are you sure you want to reboot? Reply with 'cancel' to abort, or allow 30 seconds for self-abort.`);

    const valid = ['yes', 'y', 'no', 'n', 'cancel'];
    const collector = message.channel.createCollector(m =>
        m.author.id === message.author.id, { time: 30000 });
    
    collector.on('message', async m => {
        const lower = m.content.toLowerCase();

        if(lower === 'cancel' || lower === 'no' || lower === 'n') {
            return collector.stop('abort');
        } else if(lower === 'yes' || lower === 'y') {
            return collector.stop('kill');
        }

        return message.channel.sendMessage(`Please supply a valid answer: \`${valid.join('`, `')}!`).catch(console.error);
    });

    collector.on('end', async(collected, reason) => {
        if(reason === 'kill') {
            await client.destroy();
            process.exit();
        } else if(reason === 'time') {
            return message.channel.sendMessage('Reboot timed out!');
        } else if(reason === 'abort') {
            return message.channel.sendMEssage('Aborting reboot!');
        }

        console.error('Invalid reason!');
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 10
};

exports.help = {
    name: 'reboot',
    description: 'Reboots the bot.',
    usage: 'reboot'
};