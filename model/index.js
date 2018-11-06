const Sequelize = require('sequelize');
const UserInit = require('./user');
const GroupInit = require('./group');
const MessageInit = require('./messages');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'database/database.sqlite'
});

const User = UserInit(sequelize);
const Group = GroupInit(sequelize);
const Messages = MessageInit(sequelize);

sequelize.sync()

module.exports = {
	sequelize,
	User,
	Group,
	Messages
};
