const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({transport: 'ipc'});

const config = require('./config.js');

clientId = config.clientId;

DiscordRPC.register(clientId);

async function setActivity() {
    if (!RPC) return;
    RPC.setActivity({
        details: "Developing a bot",
        state: "Developing a Fluxy's bot",
        startTimestamp: new Date(),
        largeImageKey: 'pxfuel',
        largeImageText: `Bot developed by CreeperFarm`,
        //smallImageKey: 'pxfuel',
        //smallImageText: `Bot developed by CreeperFarm`,
        instance: false,
        buttons: [
            {
                label: "GitHub",
                url: "https://github.com/CreeperFarm"
            },
            {
                label: "GitHub's bot repo",
                url: "https://github.com/CreeperFarm/Fluxy-s-Bot"
            }
        ],
    });
}
// When the bot is ready

RPC.on('ready', async () => {
    setActivity();
    setInterval(() => {
        setActivity();
    }, 15e3);
});

// Bot login

RPC.login({clientId}).catch(console.error());