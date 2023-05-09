const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const usersDAL = require('./DAL/usersDAL.JS');
const teamsRouter = require('./routes/teams');
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const jwt = require('jsonwebtoken');
const {google} = require('googleapis');
const url = require('url');

const loginRouter = require('./routes/login');
const { getAllUsers } = require("./DAL/usersDAL.JS");
const { getUserByID } = require("./DAL/usersDAL.JS");

const secrets = require('./key/secretKey');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/login', loginRouter);
app.use('/teams', teamsRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);


app.get("/message", (req, res) => {
  //res.json({ message: "Hello from server!" });
  res.send({ message: "Hello from server!" });
});

app.get("/", (req, res) => {
	//res.json({ message: "Hello from server!" });
	const data = {
		message: "Hello from server!",
		links: [
		  { label: "users", url: "http://www.localhost:8000/users" },
		  { label: "teams", url: "http://www.localhost:8000/teams" },
		  // add more links here
		],
	  };
	  res.send(data);  });



app.post("/signup/try", async (req, res) => {
	let exist = await usersDAL.checkUserName(req.body.userName);
	if(exist)
	{res.status(409).json({ message: "username already exist" });}
else{
	let userId = await usersDAL.addUser(req.body);
	//let users = await usersDAL.getAllUsers();
	let user = await usersDAL.getUserByID(userId);
		// Generate JWT token
		const payload = { userId: user.userId, user:user, password:user.password };
		const options = { expiresIn: '1h' };
		const token = jwt.sign(payload, secrets.secretKey, options);
    res.status(200).send({message: "signup successful",user:user,token: token });
	}
  });

  app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});