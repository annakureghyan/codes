const Sequelize = require('sequelize');

function initMessages(sequelize) {
	return sequelize.define('messages', {
		id : {
			type : Sequelize.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
		from_ID : {
			type : Sequelize.INTEGER
		},
		to_ID : {
			type : Sequelize.INTEGER
		},
		sent_on : {
			type : Sequelize.DATE
		},
		read_on : {
			type : Sequelize.DATE
		},
		message : {
			type : Sequelize.TEXT
		}
	});
}

module.exports = initMessages;