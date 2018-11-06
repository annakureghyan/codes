const sha256  = require ('sha256')
const express = require ('express')
const bodyParser = require('body-parser')
const dbConnection = require('./model')
const mapper = require('./mappers/model')

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', function(req, res) {
	res.send('Hello!')
})

app.post('/login', async function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  if (!username) {
    res.send(JSON.stringify({error : true, message : "Please provide username!!"}))
    return;
  }

  const result = await dbConnection.User.findOne({ where: { username, password } })
    if (!result) {
        res.send(JSON.stringify({error: true, message: 'No such user'}))
        return;
      }
      res.send(result.toJSON())
})

app.get('/users', async function(req, res) {
  const result = await dbConnection.User.findAll();
  const dtos = result.map(el => mapper.toUserDTO(el));
      res.send(JSON.stringify(dtos))
})

app.get('/messages', async function(req, res) {
  const to_ID = req.query.to_ID;
  const from_ID = req.query.from_ID;
  if (!to_ID) {
    res.send(JSON.stringify({error : true, message : " Enter to_ID !!"}))
    return;
  }

  const result1 = await dbConnection.Messages.findOne({ where: { to_ID, from_ID } });
  const result2 = await dbConnection.Messages.findOne({ where: { from_ID : to_ID, to_ID : from_ID} });
  if (!result1 && !result2) {
    res.send(JSON.stringify({message: 'Say hello'}))
    return;
  }

  const result = result1.concat(result2)
  res.send(result.toJSON())
})

app.post('/messages/send', async function(req, res) {
  const to_ID = req.body.to_ID;
  const from_ID = req.body.from_ID;
  const message = req.body.message;
  if (!message || !to_ID || !from_ID) {
    res.send(JSON.stringify({error: true, message: "can't send message !"}))
    return;
  }

  const result = await dbConnection.Messages.create({to_ID, from_ID, message })
  res.send(JSON.stringify(result))
})

app.post ('/registration', async function(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const mail = req.body.mail;
  console.log(username, password, mail)
	if (!username || !password || !mail) {
		res.send(JSON.stringify({error: true, message: "Fill all fields !"}))
        return;
	}
	const result_usn = await dbConnection.User.findOne({where : { username } })
	if (result_usn) {
		res.send(JSON.stringify({error: true, message: "Username already exist !"}))
        return;
	}
  const result_mail = await dbConnection.User.findOne({where : { mail } })
	if (result_mail) {
		res.send(JSON.stringify({error: true, message: "Mail already exist !"}))
        return;
	}
	const userModel = await dbConnection.User.create({username, password, mail})
  const dto = mapper.toUserDTO(userModel);
	res.send(JSON.stringify(dto))
})

/*app.post ('/settings/save', async function(req,res) {
	const username = req.body.username;
	const password = req.body.password;
	const mail = req.body.mail;
	const status = req.body.status;
	var picture = req.body.picture;

})*/


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
