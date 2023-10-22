const {Client, Events, GatewayIntentBits, EmbedBuilder, ActivityType} = require('discord.js');
//const DiscordRPC = require('discord-rpc');
const fs = require('fs');
//const RPC = new DiscordRPC.Client({transport: 'ipc'});
const client = new Client({intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildModeration]});

const config = require('./config.js');
warns = JSON.parse(fs.readFileSync('./warns.json'))
statusofbot = JSON.parse(fs.readFileSync('./status.json'))

prefix = config.prefix;
ownerid = config.ownerid;
/*clientId = config.clientId;

DiscordRPC.register(clientId);

date = Date.now();
async function setActivity() {
    if (!RPC) return;
    RPC.setActivity({
        details: "Development",
        state: "Being developed by CreeperFarm",
        startTimestamp: date,
        largeImageKey: 'pxfuel',
        largeImageText: `Bot developed by CreeperFarm`,
        //smallImageKey: 'pxfuel',
        //smallImageText: `Bot developed by CreeperFarm`,
        instance: false,
        buttons: [
            {
                label: "GitHub",
                url: "https://github.com/CreeperFarm"
            }
        ],
    });
}*/

if (statusofbot === "in-dev") {
    testmode = true;
} else if (statusofbot === "in-prod") {
    testmode = true;
} else if (statusofbot === "normal") {
    testmode = false;
}

// When the bot is ready

client.on("ready", async () => {
    if (testmode === true) {
        console.log("Logged in as " + client.user.tag + "! The prefix is " + prefix + " . The bot is in test mod.");
        const channel = client.channels.cache.find(ch => ch.name === 'testbot');
        channel.send("Le bot est en ligne !");
    } else {
        console.log("Logged in as " + client.user.tag + "! The prefix is " + prefix + " .");
        const channel = client.channels.cache.find(ch => ch.name === '『🤖』commandes');
        channel.send("Le bot est en ligne !");
    }
    /*client.user.setPresence({
        activities: [{
            name: "Development",
            type: ActivityType.Playing,
            url: "https://twitch.tv/CreeperFarm",
            state: "Being developed by CreeperFarm",
            assets: "./src/images/logo_bot.png",
        }],
    });*/
    //client.user.bannerUrl(["https://cdn.statically.io/gh/CreeperFarm/AppManga/main/fw.jpg"]);
});

/*RPC.on('ready', async () => {
    setActivity();
    setInterval(() => {
        setActivity();
    }, 15e3);
});*/

// msg when someone join the server

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === '『🌎』acceuil');
    console.log(member.guild.memberCount);
    if (!channel) return;
    const embed = new EmbedBuilder()
        .setColor('#B072FF')
        .setTitle("Quelqu'un vient d'arriver !")
        .setAuthor({name: "Serveur de Fluxy"})
        .addFields(
            {name: `Bienvenue à toi ${member} sur le serveur !`},
            {name: "Nous sommes désormais " + member.guild.memberCount + " sur le serveur !"}
        )
        .setFooter({text: "Développé par CreeperFarm", iconURL: "https://avatars.githubusercontent.com/u/62711198?s=96&v=4", url:"https://github.com/CreeperFarm"})
    channel.send({ embeds: [embed]});
    console.log(member.guild.memberCount + " members on the server");
    console.log(member + " joined the server");
});

// msg when someone leave the server

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === '『🌎』acceuil');
    if (!channel) return;
    channel.send(`${member} a quitté le serveur, à bientôt !`);
    console.log(member.guild.memberCount + " members on the server");
    console.log(member + " left the server");
});

// Respond to commands
client.on('messageCreate', msg => {
    //if (msg.author.bot) return;
    if (msg.author.bot) {
        console.log(msg.author.id);
    }


    // Help command
    if (msg.content === prefix + "help"){
        const embed = new EmbedBuilder()
            .setColor('#B072FF')
            .setTitle("Liste des commandes:")
            .setAuthor({name: "Serveur de Fluxy"})
            .setFooter({text: "Développé par CreeperFarm", iconURL: "https://avatars.githubusercontent.com/u/62711198?s=96&v=4", url:"https://github.com/CreeperFarm"})
            .addFields(
                {name: "Commande Standard : ", value: " "},
                {name: prefix + "help", value: "Affiche la liste des commandes."},
                {name: prefix + "ping", value: "Affiche Pong!"},
                {name: prefix + "twitch", value: "Affiche le lien de la chaîne Twitch."},
                {name: prefix + "tiktok", value: "Affiche le lien du compte TikTok."},
                {name: prefix + "instagram", value: "Affiche le lien du compte Instagram."},
                //{name: prefix + "réseaux ou " + prefix + "reseaux", value: "Affiche le lien de tous les réseaux."},
                {name: "Commande de modération : ", value: " "},
                {name: prefix + "clear", value: "Supprime le nombre de messages indiqués."}
                //{name: prefix + "warn", value: "Avertis un membre."},
                //{name: prefix + "unwarn", value: "Unavertis un membre."},
                //{name: prefix + "warnspectate", value: "Indique le nombre de warn à atteindre pour être spectateur."},
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
    try {
        if (msg.content.startsWith(prefix + "clear")) {
            try {
                if (msg.member.permissions.has("MANAGE_MESSAGES") === true) {
                    if (msg.content === prefix + "clear") {
                        msg.channel.bulkDelete(1);
                        msg.channel.send("Veuillez indiquer le nombre de messages à supprimer.");
                        console.log("Clear explain sent");
                    } else {
                        try {
                            let args = msg.content.split(" ");
                            if (args[1] === undefined) {
                                msg.reply("Veuillez indiquer un nombre de messages à supprimer.");
                                console.log("No number of messages to delete");
                            } else if (args[1] > 100) {
                                msg.reply("Veuillez indiquer un nombre inférieur à 100.");
                                console.log("Too many messages to delete");
                            } else if (args[1] < 1) {
                                msg.reply("Veuillez indiquer un nombre supérieur à 0.");
                                console.log("Too few messages to delete");
                            } else {
                                msg.channel.bulkDelete(args[1]);
                                msg.channel.send(args[1] + " messages supprimés.");
                                // wait 5 seconds then delete the msg
                                setTimeout(() => {msg.channel.bulkDelete(2);}, 12000);
                                console.log(args[1] + " messages deleted");
                            }
                        } catch (err) {
                            msg.reply("Veuillez indiquer un nombre valide.");
                            console.log(err);
                        }
                    }
                } else {
                    msg.reply("Vous n'avez pas la permission de faire ça.");
                    console.log("Permission denied");
                }
            } catch (err) {
                msg.reply("Vous n'avez pas la permission de faire ça.");
                console.log("Permission denied");
                console.log(err);
            }
        }
    } catch (err) {
        console.log(err);
        msg.reply("An error as ocurred");
    }

    // Warn command
    if (msg.content.startsWith(prefix + "warn")) {
        if (msg.member.permissions.has("MANAGE_ROLES") === true) {
            if (msg.content === prefix + "warn") {
                msg.reply("Veuillez indiquer le membre à avertir.");
                console.log("Warn explain sent");
            } else {
                let args = msg.content.split(" ");
                try {
                    let dUser = msg.mentions.users.first();
                    console.log(dUser.id);
                    console.log(dUser);
                    if (dUser = msg.guild.members.cache.get(dUser.id)) {
                        if (args[2] === undefined) {
                            msg.reply("Veuillez indiquer la raison de l'avertissement.");
                            console.log("Warn reason explain sent");
                        } else {
                            // Combine the args[2] and plus to make the reason
                            let reason = args.slice(2).join(' ');
                            const warns = require("./warns.json");
                            if (!warns[dUser.id]) {
                                warns[dUser.id] = {
                                    reason: reason,
                                    date: Date.now(),
                                    mod: msg.author.id
                                }
                            } else {
                                warns[dUser.id].warns.push({
                                    reason: reason,
                                    date: Date.now(),
                                    mod: msg.author.id
                                })
                            }
                            console.log(warns)
                            fs.writeFileSync('./warns.json', JSON.stringify(warns), function (err) {
                                console.log(err);
                            });
                            msg.reply(`${dUser} a été averti pour ${reason} par ${msg.author}.`);
                            console.log(dUser + " has been warned for " + reason + " by " + msg.author + ".");
                        }
                    }
                    else {
                        msg.reply("Veuillez indiquer le membre à avertir.");
                        console.log("Warn explain sent");
                    }
                } catch (err) {
                    msg.reply("Veuillez mentionnez un utilisateur. An error occured.");
                    console.log(err);
                }
            }
        } else {
            msg.reply("Vous n'avez pas la permission de faire ça.");
            console.log("Permission denied");
        }
    }

    // Unwarn command
    if (msg.content.startsWith(prefix + "unwarn")) {
        if (msg.member.permissions.has("MANAGE_ROLES") === true) {
            if (msg.content === prefix + "unwarn") {
                msg.channel.bulkDelete(1);
                msg.channel.send("Veuillez indiquer le membre à unavertir.");
                console.log("Unwarn explain sent");
            } else {
                let args = msg.content.split(" ");
                msg.channel.bulkDelete(1);
                msg.channel.send(dUser + " a été unaverti.");
                console.log(dUser + " has been unwarned");
            }
        } else {
            msg.channel.send("Vous n'avez pas la permission de faire ça.");
            console.log("Permission denied");
        }
    }

    // Warn number spectate command
    if (msg.content.startsWith(prefix + "warnspectate")) {
        if (msg.member.permissions.has("MANAGE_ROLES") === true) {
            if (msg.content === prefix + "warnspectate") {
                msg.channel.bulkDelete(1);
                msg.channel.send("Veuillez indiquer le nombre de warn à atteindre.");
                console.log("Warnnumber explain sent");
            } else {
                let args = msg.content.split(" ");
                msg.channel.bulkDelete(1);
                msg.channel.send("Le nombre de warn à atteindre est " + dUser + ".");
                console.log("Warnnumber set to " + dUser);
            }
        } else {
            msg.channel.send("Vous n'avez pas la permission de faire ça.");
            console.log("Permission denied");
        }
    }

    // Change log command
    if (msg.content.startsWith(prefix + "change-log") || msg.content.startsWith(prefix + "changelog")) {
        if (msg.author.id == ownerid) {
            if (msg.content === prefix + "change-log" || msg.content === prefix + "changelog") {
                msg.channel.send("Veuillez indiquer le message du changelog.");
                console.log("Changelog explain sent");
            } else {
                if (testmode === true) {
                    const channel = client.channels.cache.find(ch => ch.name === 'testbot');
                    let args = msg.content.split(",");
                    if (args[0].startsWith(prefix + "changelog")) {
                        args[0] = args[0].replace(prefix + "changelog", "");
                    } else {
                        args[0] = args[0].replace(prefix + "change-log", "");
                    }

                    changenum = 1;

                    // For each element in args, add a field to the embed
                    fieldsMap = []
                    args.forEach(Element => {
                        fieldsMap.push({name: "Changement n°" + changenum + ":", value: Element})
                        changenum++;
                    })

                    embed = {
                        color: 0xB072FF,
                        title: "Change Log du bot:",
                        author: {
                            name: "Serveur de Fluxy"
                        },
                        footer: {
                            text: "Développé par CreeperFarm",
                            iconURL: "https://avatars.githubusercontent.com/u/62711198?s=96&v=4",
                            url:"https://github.com/CreeperFarm"
                        },
                        fields: fieldsMap
                    }

                    console.log("Changelog send by " + msg.author + " are " + args);
                    return channel.send({ embeds: [embed]});
                } else {
                    const channel = client.channels.cache.find(ch => ch.name === '『🤖』change-log-du-bot');
                    let args = msg.content.split(",");
                    if (args[0].startsWith(prefix + "changelog")) {
                        args[0] = args[0].replace(prefix + "changelog", "");
                    } else {
                        args[0] = args[0].replace(prefix + "change-log", "");
                    }

                    changenum = 1;

                    // For each element in args, add a field to the embed
                    fieldsMap = []
                    args.forEach(Element => {
                        fieldsMap.push({name: "Changement n°" + changenum + ":", value: Element})
                        changenum++;
                    })

                    embed = {
                        color: 0xB072FF,
                        title: "Change Log du bot:",
                        author: {
                            name: "Serveur de Fluxy"
                        },
                        footer: {
                            text: "Développé par CreeperFarm",
                            iconURL: "https://avatars.githubusercontent.com/u/62711198?s=96&v=4",
                            url:"https://github.com/CreeperFarm"
                        },
                        fields: fieldsMap
                    }

                    console.log("Changelog send by " + msg.author + " are " + args);
                    return channel.send({ embeds: [embed]});
                }
            }
        } else {
            msg.channel.send("Vous n'avez pas la permission de faire ça.");
            console.log("Permission denied");
        }
    }

    if (msg.content.startsWith(prefix + "status") || msg.content.startsWith(prefix + "status-bot") || msg.content.startsWith(prefix + "statusbot")) {
        if (msg.author.id == ownerid) {
            if (msg.content === prefix + "status" || msg.content === prefix + "status-bot" || msg.content === prefix + "statusbot") {
                msg.channel.send(`Le statut actuel du bot est : ${statusofbot}.`);
                console.log("Statut actuelle envoyé");
            } else {
                if (msg.content === prefix + "status help" || msg.content === "status-bot help" || msg.content === prefix + "statusbot help") {
                    msg.channel.send("Les statuts disponibles sont : in-dev, in-prod, normal.");
                    msg.channel.send(`Le statut actuel du bot est : ${statusofbot}.`);
                    console.log("Statut help envoyé");
                } else if (msg.content === prefix + "status normal" || msg.content === prefix + "statusbot normal" || msg.content === prefix + "status-bot normal") {
                    statusofbot = "normal";
                    fs.writeFileSync('./status.json', JSON.stringify(statusofbot), function (err) {
                        console.log(err);
                    });
                    msg.channel.send("Le statut du bot est maintenant en mode normal.");
                    console.log("Statut normal set");
                    testmode = false;
                } else if (msg.content === prefix + "status in-dev" || msg.content === prefix + "statusbot in-dev" || msg.content === prefix + "status-bot in-dev") {
                    statusofbot = "in-dev";
                    fs.writeFileSync('./status.json', JSON.stringify(statusofbot), function (err) {
                        console.log(err);
                    });
                    msg.channel.send("Le statut du bot est maintenant en mode in-dev.");
                    console.log("Statut in-dev set");
                    testmode = true;
                } else if (msg.content === prefix + "status in-prod" || msg.content === prefix + "statusbot in-prod" || msg.content === prefix + "status-bot in-prod") {
                    statusofbot = "in-prod";
                    fs.writeFileSync('./status.json', JSON.stringify(statusofbot), function (err) {
                        console.log(err);
                    });
                    msg.channel.send("Le statut du bot est maintenant en mode in-prod.");
                    console.log("Statut in-prod set");
                    testmode = true;
                } else {
                    msg.channel.send("Veuillez indiquer un statut valide.");
                    console.log("Statut invalide");
                }
            }
        } else {
            msg.channel.send(`Le statut actuel du bot est : ${statusofbot}.`);
            console.log("Statut actuelle envoyé");
        }
    }

    // Stop Command
    if (msg.content === prefix + "stop") {
        if (msg.author.id === ownerid) {
            msg.channel.send("Arrêt du bot.");
            console.log("Bot stopped by " + msg.author + "(CreeperFarm).");
            client.destroy();
        } else {
            msg.reply("Vous n'avez pas la permission de faire ça.");
            console.log("Permission denied to stop the bot");
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

// Bot login

client.login(config.token)
//RPC.login({clientId}).catch(console.error());