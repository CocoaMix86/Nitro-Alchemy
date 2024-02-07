module.exports = {
	name: 'garden',
	description: 'Plant currency seeds and apply item effects to literally grow money on trees!',
	aliases: ['g'],
	args: false,
	arglength: 3,
	usage: '',
	details: `WIP`,
	execute(message, args) {
		message.channel.send('WIP')
		
		Start(message, args)
	},
};

const Discord = require('discord.js');
var _asset = ['<:nothing:721237393335910411>','<:fence:721239438130151474>']
const _growth = [_asset[0],'🌱','🍀','🌿',':evergreen_tree:',':christmas_tree:']
var _skies = [
	[`${_asset[0]}${_asset[0]}${_asset[0]}${_asset[0]}${_asset[0]}☀️`, 'Sunny', 'Increases current yield by 10%.'],
	[`☁️${_asset[0]}☁️☁️${_asset[0]}🌥️☁️${_asset[0]}☁️${_asset[0]}☁️`, 'Partly Cloudy', 'No effect.'],
	[`☁☁☁☁☁☁☁☁☁☁☁`, 'Cloud Covered', 'Increases current yield by 4%'],
	[`🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️`, 'Rain', 'Speeds up growth by 2 cycles.'],
	[`🌧️🌧️☁🌧️☁🌦️☁☁🌧️🌧️☁`, 'Light Rain', 'Increases current yield by 5% and speeds up growth by 1 cycle.'],
	[`🌧️⛈️⛈️🌧️🌧️🌧️⛈️🌧️🌧️🌧️⛈️`, 'Thunderstorm', 'Speeds up growth by 2 cycles, but negates the effects of your active item.'],
	[`🌧️🌧️🌧️🌧️🌧️☁🌧️🌧️🌧️🌧️🌧️
	${_asset[0]}${_asset[0]}${_asset[0]}${_asset[0]}${_asset[0]}🌪️`, 'Severe Weather', 'Negates the effect of your active item and destroys a random plot.'],
]

//
//SQL
const sqlite3 = require('sqlite3').verbose();
let db = openDB()

function openDB() {
	var _db = new sqlite3.Database('./currencybot.db', (err) => {
		if (err) {
			console.error(err.message);
		}
		console.log('GARDEN - Connected to CurrencyBot database');
	});
	return _db
}

//
//Filter input
function Start(message, args) {
	if (!args.length)
		GetGarden(message, args)
}

//
//Gets user's garden.
//If one does not exist, create one.
function GetGarden(message, args) {
	_account = 'a'+message.author.id
	_plots = []
	let sql1 = `SELECT COUNT(*) AS 'exists',* From Garden WHERE account_id = ?`
	let sql2 = `INSERT INTO Garden (account_id) VALUES(?)`
	
	db.each(sql1, _account, (err, row) => {
		if (row.exists == 1) {
			args[0] = _growth[row.plot1growth]
			args[1] = _growth[row.plot2growth]
			args[2] = _growth[row.plot3growth]
			args[3] = _growth[row.plot4growth]
			args[4] = _growth[row.plot5growth]
			args[5] = row.item_effect
			args[6] = EffectItemLookup(args[5])
			Embed_GetGarden(message, args)
		}
		else {
			db.run(sql2, _account, () => {}, function() {
				GetGarden(message, args)
			});
		}
	});
}
//
//Output garden view
function Embed_GetGarden(message, args){
	var rand = RndInteger(0,7)
	
	const _weather = []
	_weather.push(`**WEATHER:** ${_skies[rand][1]}`)
	_weather.push(`**EFFECT:** ${_skies[rand][2]}`)

	const Embed = new Discord.MessageEmbed()
	.setColor('#009900')
	.setTitle(`$garden`)
	.setDescription(`requested by ${message.author}\nPlease use \`$garden help\` for more details.`)
	.setThumbnail('https://i.imgur.com/IHAnl9m.png')
	.addFields(
		{ name: 'Your lovely garden plot', value: `${_skies[rand][0]}
		
		
		
		${_asset[1]}${args[0]}${_asset[0]}${args[1]}${_asset[0]}${args[2]}${_asset[0]}${args[3]}${_asset[0]}${args[4]}${_asset[1]} \n <:dirt:721227767831724073><:dirt:721227767831724073><:dirt:721227767831724073><:dirt:721227767831724073><:dirt:721227767831724073><:dirt:721227767831724073><:dirt:721227767831724073><:dirt:721227767831724073><:dirt:721227767831724073><:dirt:721227767831724073><:dirt:721227767831724073>`},
		
		{ name: 'Garden Effects', value: _weather },
	)

	message.channel.send(Embed)
}





function EffectItemLookup(item) {
	return 'does stuff, lol'
}
function RndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}