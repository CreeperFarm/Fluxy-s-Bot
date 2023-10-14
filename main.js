const {Client, Events, GatewayIntentBits, EmbedBuilder, messageLink} = require('discord.js');
const fs = require('fs');
const client = new Client({intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages]});

const warns = JSON.parse(fs.readFileSync('./warns.json'))
let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

const TOKEN = config.botToken;

prefix = "$";

// TODO: Fix it
//  prefix = config.prefix;

client.on("ready", () => {
    console.log("Logged in as " + client.user.tag + "! The prefix is " + prefix + " .");
});

// msg when someone join the server

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'arriver-départ-✈');
    console.log(member.guild.memberCount);
    if (!channel) return;
    const embed = new EmbedBuilder()
        .setColor('#B072FF')
        .setTitle("Quelqu'un vient d'arriver !")
        .setAuthor({name: "CreeperFarm", iconURL: "https://avatars.githubusercontent.com/u/62711198?s=96&v=4", url:"https://github.com/CreeperFarm"})
        .addFields(
            {name: `Bienvenue à toi ${member} sur le serveur !`},
            {name: "Nous sommes désormais " + member.guild.memberCount + " sur le serveur !"}
        )
    channel.send({ embeds: [embed]});
    console.log(member.guild.memberCount + " members on the server");
    console.log(member + " joined the server");
});

// msg when someone leave the server

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'arriver-départ-✈');
    if (!channel) return;
    channel.send(`${member} a quitté le serveur, à bientôt !`);
    console.log(member.guild.memberCount + " members on the server");
    console.log(member + " left the server");
});

// Respond to commands
client.on('messageCreate', msg => {
    if (msg.author.bot) return;


    // Help command
    if (msg.content === prefix + "help"){
        const embed = new EmbedBuilder()
           .setColor('#B072FF')
           .setTitle("Liste des commandes:")
           .setAuthor({name: "Serveur de Fluxy"})
           .setFooter({text: "Développé par CreeperFarm", iconURL: "https://avatars.githubusercontent.com/u/62711198?s=96&v=4", url:"https://github.com/CreeperFarm"})
           .addFields(
                {name: prefix + "help", value: "Affiche la liste des commandes."},
                {name: prefix + "ping", value: "Affiche Pong!"},
                {name: prefix + "twitch", value: "Affiche le lien de la chaîne Twitch."},
                {name: prefix + "tiktok", value: "Affiche le lien du compte TikTok."},
                {name: prefix + "instagram", value: "Affiche le lien du compte Instagram."},
                //{name: prefix + "réseaux ou " + prefix + "reseaux", value: "Affiche le lien de tous les réseaux."},
            )
        msg.reply({ embeds: [embed]});
        console.log("Help command sent");
    }

    if (msg.content === prefix + "ping") {
        msg.reply("Pong!");
        console.log("Pong!");
    }

    // Social networks links
    if (msg.content === prefix + "twitch") {
        msg.reply("Le lien de la chaîne Twitch est https://www.twitch.tv/jxstefluxy");
        console.log("Twitch link sent");
    }
    if (msg.content === prefix + "tiktok") {
        msg.reply("Le lien du compte TikTok est https://www.tiktok.com/@jxstefluxy");
        console.log("TikTok link sent");
    }
    if (msg.content === prefix + "instagram") {
        msg.reply("Le lien du compte Instagram est https://www.instagram.com/jxste_fluxy._/")
        console.log("Instagram link sent");
    }
    //if (msg.content === prefix + "réseaux" || msg.content === prefix + "reseaux") {
    //    msg.reply("Le lien de tous les réseaux est https://linktr.ee/creeperfarm")
    //    console.log("All links sent");
    //}

    // Clear command
    if (msg.content.startsWith(prefix + "clear")) {
        if (msg.member.permissions.has("MANAGE_MESSAGES") == true) {
            if (msg.content === prefix + "clear") {
                msg.channel.bulkDelete(1);
                msg.channel.send("Veuillez indiquer le nombre de messages à supprimer.");
                console.log("Clear explain sent");
            } else {
                let args = msg.content.split(" ");
                msg.channel.bulkDelete(args[1]);
                msg.channel.send(args[1] + " messages supprimés.");
                // wait 5 seconds then delete the msg
                setTimeout(() => {msg.channel.bulkDelete(1);}, 25000);
                console.log(args[1] + " messages deleted");
            }
        } else {
            msg.channel.send("Vous n'avez pas la permission de faire ça.");
            console.log("Permission denied");
        }
    }

    // Warn command
    if (msg.content.startsWith(prefix + "warn")) {
        if (msg.member.permissions.has("MANAGE_ROLES") == true) {
            if (msg.content === prefix + "warn") {
                msg.channel.send("Veuillez indiquer le membre à avertir.");
                console.log("Warn explain sent");
            } else {
                let args = msg.content.split(" ");
                let dUser = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[1]);
                console.log(dUser.member);
                console.log(dUser);
                if (dUser == true) {
                    if (dUser.member.permissions.has("MANAGE_ROLES") == true) {
                        msg.channel.send("Vous ne pouvez pas avertir ce membre.");
                        console.log(`Try ${author} warn an admin`);
                    }
                    else {
                        if (args[2] === undefined) {
                            msg.channel.send("Veuillez indiquer la raison de l'avertissement.");
                            console.log("Warn reason explain sent");
                        } else {
                            if (!warns[args[1].id]) {
                                warns[[args].id] = []
                            }
                            // Combine the args[2] and plus to make the reason
                            let reason = args.slice(2).join(' ');
                            
                            warns[args[1].id].unshift({
                                reason: reason,
                                date: Date.now(),
                                mod: message.author.id
                            })
                            fs.writeFileSync('./warns.json', JSON.stringify(warns))
                            msg.channel.send(args[1] + " a été averti pour " + reason + " par " + msg.author + ".");
                            console.log(args[1] + " has been warned for " + reason + " by " + msg.author + ".");
                        }
                    }
                }
                else {
                    msg.channel.send("Veuillez indiquer le membre à avertir.");
                    console.log("Warn explain sent");
                }
            }
        } else {
            msg.channel.send("Vous n'avez pas la permission de faire ça.");
            console.log("Permission denied");
        }
    }

    // Unwarn command
    if (msg.content.startsWith(prefix + "unwarn")) {
        if (msg.member.permissions.has("MANAGE_ROLES") == true) {
            if (msg.content === prefix + "unwarn") {
                msg.channel.bulkDelete(1);
                msg.channel.send("Veuillez indiquer le membre à unavertir.");
                console.log("Unwarn explain sent");
            } else {
                let args = msg.content.split(" ");
                msg.channel.bulkDelete(1);
                msg.channel.send(args[1] + " a été unaverti.");
                console.log(args[1] + " has been unwarned");
            }
        } else {
            msg.channel.send("Vous n'avez pas la permission de faire ça.");
            console.log("Permission denied");
        }
    }

    // Warn number spectate command
    if (msg.content.startsWith(prefix + "warnspectate")) {
        if (msg.member.permissions.has("MANAGE_ROLES") == true) {
            if (msg.content === prefix + "warnspectate") {
                msg.channel.bulkDelete(1);
                msg.channel.send("Veuillez indiquer le nombre de warn à atteindre.");
                console.log("Warnnumber explain sent");
            } else {
                let args = msg.content.split(" ");
                msg.channel.bulkDelete(1);
                msg.channel.send("Le nombre de warn à atteindre est " + args[1] + ".");
                console.log("Warnnumber set to " + args[1]);
            }
        } else {
            msg.channel.send("Vous n'avez pas la permission de faire ça.");
            console.log("Permission denied");
        }
    }
});

// Send a msg every minute
minutes = 0;
hours = 0;
days = 0;
years = 0;
setInterval(() => {
    minutes++;
    if (minutes >= 60) {
        minutes -= 60;
        hours++;
    } else if (hours >= 24) {
        hours -= 24;
        days++;
    } else if (days >= 365) {
        days -= 365;
        years++;
    }
    if (years === 0 && days === 0 && hours === 0) {
        console.log(`The bot is online since ${minutes} minute(s).`);
    } else if (years === 0 && days === 0) {
        console.log(`The bot is online since ${hours} hour(s) and ${minutes} minute(s).`)
    } else if (years === 0) {
        console.log(`The bot is online since ${days} day(s) , ${hours} hour(s) and ${minutes} minute(s).`)
    } else {
        console.log(`The bot is online since ${years} year(s) , ${days} day(s) , ${hours} hour(s) and ${minutes} minute(s).`)
    }
}, 60000);

client.on('messageCreate', msg => {
    if (msg.author.bot) return;

    if (msg.content === prefix + "uptime" || msg.content === prefix + "up") {
        if (years === 0 && days === 0 && hours === 0) {
            msg.reply(`The bot is online since ${minutes} minute(s).`);
        } else if (years === 0 && days === 0) {
            msg.reply(`The bot is online since ${hours} hour(s) and ${minutes} minute(s).`)
        } else if (years === 0) {
            msg.reply(`The bot is online since ${days} day(s) , ${hours} hour(s) and ${minutes} minute(s).`)
        } else {
            msg.reply(`The bot is online since ${years} year(s) , ${days} day(s) , ${hours} hour(s) and ${minutes} minute(s).`)
        }
        console.log("Up time send");
    }
});

client.login(TOKEN)