const sqlite3 = require('sqlite3');

//login to the DB
let db = new sqlite3.Database('./databases/currencybot.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('[INFO] Connected to CurrencyBot database');
});
module.exports = {db};