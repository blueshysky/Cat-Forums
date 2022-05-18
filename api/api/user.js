const express = require("express");
const router = express.Router();
const { QueryTypes } = require('sequelize');
const session = require('express-session');
const bcrypt = require('bcrypt');

function generateHash(password) {
  return(bcrypt.hashSync(password, 8));
}

async function validPassword(pass, hash) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(pass, hash, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

router.get("/", async (req, res) => {
  try {
    let users = await MODELS.User.findAll()
    console.log(users)
    res.send(users);
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
});

router.post('/login', async function (req, res) {
  console.log("worked")
  var username = req.body.username;
  var password = req.body.password;
  console.log("Username = " + username + ", password is " + password);

  let user = await MODELS.User.findAll({
    attributes: [
      'u_name'
    ],
    where: {
      u_name: username
    }
  })

  console.log(user)
  let stringUser = JSON.stringify(user)
  console.log(stringUser.length);

  let pass = await MODELS.User.findAll({
    attribute: ['password'],
    where: {
      u_name: username
    }
  }) 
  let stringPass = pass[0].password;
  console.log(stringPass);
  console.log("if statement executes");

  let admin = await MODELS.User.findAll({
    attribute: ['is_admin'],
    where: {
      u_name: username
    }
  })
  console.log(admin)
  let stringAdmin = JSON.stringify(admin)
  console.log(stringAdmin.length);
  
  var goodPass = await validPassword(password, stringPass)
  if (stringUser.length > 2 & goodPass) {
    console.log(admin[0].dataValues.is_admin)
    if (admin[0].dataValues.is_admin == 1) {
      console.log(user[0].dataValues.u_name) // this is the current logged in user 
                                            //this will be set as the cookie
      return res.status(200).send("admin," + user[0].dataValues.u_name); //this returns the string "admin,?" the ? is the current user
    }
    else if (admin[0].dataValues.is_admin == 2) {
      return res.status(200).send("banned,"); //If user is banned, they cannot log in.
    }
    else { //if the if-else statement is false then this is a regular user
      console.log("in the else case")
      return res.status(200).send("user," + user[0].dataValues.u_name);//this returns the string "user,?" the ? is the current user
  }
} //if the first if-else statement is false the user doesn't exist so pass/user is wrong
  //console.log("username and password do not exist")
  return res.status(200).send("false, ");
})


router.post('/signup', async function (req, res) {
  console.log("signup")
  var email = req.body.email;
  var username = req.body.username;
  var password = generateHash(req.body.password);
  var confPass = req.body.confPass;
  var admin = 0;
  console.log("Email = " + email + "Username = " + username + ", password is " + password + "confirm pass is" + confPass);

  let allUsers = await MODELS.User.findAll();
  if (allUsers.length == 0)
    admin = 1;

  let user = await MODELS.User.findAll({
    attributes: [
      'u_name'
    ],
    where: {
      u_name: username
    }
  })

  console.log(password, confPass)
  let stringUser = JSON.stringify(user)
  console.log(stringUser.length);

  if (stringUser.length == 2) {
    if (validPassword(confPass, password)) {

      let createUser = await MODELS.User.create({ 
        e_mail: email,
        u_name: username,
        password: password,
        is_admin: admin
      })
      console.log("if statement executes");
      if (admin == 1)
        return res.send("admin")
      else
        return res.send('user')
    }
    console.log("passwords don't match");
    return res.send("false");
  }
    console.log("username already exists");
    return res.send("false");
})

router.post('/banuser', async function (req, res) {
  console.log("banuser")
  console.log(req);
  var userId = req.body.userId;

  MODELS.User.findOne(
    {
      where: { user_id: userId }
    }).then(function (banUser) {
      return banUser.update({is_admin: 2});
    }).then(function (banUser) {
      res.sendStatus(200);
    })
})

router.post('/unbanuser', async function (req, res) {
  console.log("unbanuser")
  console.log(req);
  var userId = req.body.userId;

  MODELS.User.findOne(
    {
      where: { user_id: userId }
    }).then(function (unBanUser) {
      return unBanUser.update({is_admin: 0});
    }).then(function (unBanUser) {
      res.sendStatus(200);
    })
})

router.post('/makeadmin', async function (req, res) {
  console.log("makeadmin")
  console.log(req);
  var userId = req.body.userId;

  MODELS.User.findOne(
    {
      where: { user_id: userId }
    }).then(function (makeAdmin) {
      return makeAdmin.update({is_admin: 1});
    }).then(function (makeAdmin) {
      res.sendStatus(200);
    })
})

module.exports = router;
