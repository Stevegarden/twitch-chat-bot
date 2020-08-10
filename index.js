/**
 * Include the configuration.
 */
const config = require('./config.json');

/**
 * Include the tmi.js library.
 */
const tmi = require('tmi.js');

/**
 * Create a new tmi.js client.
 */
const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: config.username,
        password: config.password
    },
    channels: [
        config.username
    ]
});

/**
 * Connect your client to Twitch.
 */
client.connect()
    .then(() => {
        console.log('connected to Twitch chat');
    })
    .catch(err => {
        console.warn('failed to connect to Twitch chat');
        console.log(err);
    });

/**
 * Add a handler for the chat event.
 */
client.on('chat', (channel, userstate, message, self) => {
    if (message.trimLeft().startsWith('!hello')) {
        client.say(channel, `Hello, ${userstate['display-name']}!`);
    }
});

/**
 * Add a handler for the cheer event.
 */
client.on('cheer', (channel, userstate, message) => {
    console.log(`${userstate.username} cheered ${userstate.bits} bits with message: ${message}`);
});
