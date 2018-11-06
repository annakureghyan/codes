const Sequelize = require('sequelize');

function initGroup(sequelize) {
	return sequelize.define('group', {
		id : {
			type : Sequelize.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
		group_name : {
			type : Sequelize.STRING,
			unique : true
		}
	});
}

module.exports = initGroup;