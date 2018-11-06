const Sequelize = require('sequelize');

function initUser(sequelize) {
	return sequelize.define('user' , {
		id : {
			type : Sequelize.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
		username : {
			type : Sequelize.STRING(15),
			unique : true
		},
		password : {
			type : Sequelize.STRING(15)
		},
		mail : {
			type : Sequelize.STRING(30),
			unique : true
		},
		picture : {
			type : Sequelize.STRING
		},
		status : {
			type : Sequelize.TEXT
		}
	});
}

module.exports = initUser;