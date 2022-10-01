const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { token, roleChannelId } = require('../config/config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildVoiceStates]
});

// dbButton format: "name": "id"
const dbButton = {
    "Announcements": "1025795431353032766",
    "Epitech": "1025797114644680744",
    "Epita": "1025797494405345381",
    "42": "1025797637921845270",
    "Workshop": "1025797767609724958",
    "Hackathon": "1025797841563680772",
    "Talk": "1025797806356713543",
    "SpeedHack": "1025798624715743252",
    "Software": "1025797900606910575",
    "Hardware": "1025798189628002396",
    "Security": "1025798019007905822",
    "AI": "1025798098330583181",
    "P2P": "1025798139325718548",
    "AR-VR": "1025798235798908978"
}

const AnnouncementsButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("Announcements")
            .setLabel('Announcements')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1025800659037073478')
    );

const SchoolButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("Epitech")
            .setLabel('Epitech')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1025800771540877334'),
        new ButtonBuilder()
            .setCustomId("Epita")
            .setLabel('Epita')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1025800770135785584'),
        new ButtonBuilder()
            .setCustomId("42")
            .setLabel('42')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1025800766998462524')
    );

const EventButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("Workshop")
            .setLabel('Workshop')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("Hackathon")
            .setLabel('Hackathon')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("Talk")
            .setLabel('Talk')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId("SpeedHack")
            .setLabel('SpeedHack')
            .setStyle(ButtonStyle.Secondary),
    );


const CategoryButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("Software")
            .setLabel('Software')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('💻'),
        new ButtonBuilder()
            .setCustomId("Hardware")
            .setLabel('Hardware')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('🛠️'),
        new ButtonBuilder()
            .setCustomId("Security")
            .setLabel('Security')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('🔒'),
    );

const CategoryButton2 = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId("AI")
            .setLabel('AI')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('🧠'),
        new ButtonBuilder()
            .setCustomId("P2P")
            .setLabel('P2P')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('🌐'),
        new ButtonBuilder()
            .setCustomId("AR-VR")
            .setLabel('AR-VR')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1025806573018292365'),
    );


client.on('ready', () => {
    const channel = client.channels.cache.get(roleChannelId);

    if (!channel) return console.error('The channel does not exist!');

    channel.send({
        content: '**Announcements role**',
        components: [ AnnouncementsButton ]
    });

    channel.send({
        content: '**Choose your school role**',
        components: [ SchoolButton ]
    });

    channel.send({
        content: '**Choose your event role**',
        components: [ EventButton ]
    });

    channel.send({
        content: '**Choose your category role**',
        components: [CategoryButton, CategoryButton2]
    });

});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    // get the button that was clicked
    const button = interaction.customId;
    const person = interaction.member;

    if (!dbButton[button]) return;


    // find if person already has the role
    const hasRole = person.roles.cache.has(dbButton[button]);
    if (hasRole) {
        // remove the role
        await person.roles.remove(dbButton[button]);
        await interaction.reply({ content: `Removed role ${button}`, ephemeral: true });
        console.log(`Removed role ${button} from ${person.user.username}`);
    }
    else {
        // add the role
        await person.roles.add(dbButton[button]);
        await interaction.reply({ content: `Added role ${button}`, ephemeral: true });
        console.log(`Added role ${button} to ${person.user.username}`);
    }
});

client.login(token);

module.exports = client;
