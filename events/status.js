const { Events, Client, GatewayIntentBits, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	execute(client) {
		client.user.setPresence({
			activities: [{ name: `The Markets`, type: ActivityType.Watching }],
			status: 'online',
		  });
	},
};
