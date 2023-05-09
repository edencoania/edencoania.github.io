var express = require('express');
var router = express.Router();
const entryBL = require('../BL/usersBL');
const http = require('http');
const { useDeferredValue } = require('react');
const usersDAL = require('../DAL/usersDAL.JS');
const teamsDAL = require('../DAL/teamsDAL');
const utils = require('../BL/utils');
const secretKey = require('../key/secretKey');
const jwt = require('jsonwebtoken');

//const myteams = require('../BL/myteams')

router.get("/", async (req, res) => {
	let users = await usersDAL.getAllUsers();
	//console.log(users);
	//res.json(users);

	res.send(users);
  });

router.post("/addFriend",async (req,res) =>{
	let userId= req.body.userId;
	let friendUserName= req.body.friendUserName;	
	let userName= req.body.userName;

	//console.log(userName + " --- server recive post line 40 --- "+ friendUserName);
	let addTry = await usersDAL.addFriendToUser(userName,friendUserName);
	if(addTry=="success")
	{
		res.status(200).send({ message: "friend added" });
	}
	else if(addTry=="friend name is not correct")
	{
		res.status(400).send({ message: addTry });
	}
	else if (addTry=="fail"){
		res.status(400).send({ message: "username or friend username not added" });
	} else
	{	
		//not supposed to happen at all - dont touch the data manually
		res.status(400).send({ message: "one friend already existed" });
	}

});


router.get("/:id", async (req, res) => {
	let user = await usersDAL.getUserByID(req.params.id);
	//console.log(users);
	//res.json(user);
	const authHeader = req.headers.authorization;
	const token = authHeader.split(' ')[1];
	jwt.verify(token, secretKey.secretKey, (err, decodedToken) => {
  if (err) {
    console.log('Invalid token');
	res.send(err);

  } else {
	//console.log(decodedToken);
	res.send(user);
  }
});
  });


module.exports = router;