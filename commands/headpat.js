exports.run = (client, message) => {
    if(message.content.startsWith(process.env.prefix)) {
        message.reply("<:headpat:637295953925111818>")
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [''],
    permLevel: 0
};

exports.help = {
    name: 'headpat',
    description: 'Headpats the user.',
    usage: 'headpat'
};