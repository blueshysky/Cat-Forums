const express = require("express");
const router = express.Router();
const { QueryTypes } = require('sequelize');
const session = require('express-session');
const models = require("../models");

router.get("/", async (req, res) => {
  try {
    let comments = await MODELS.Comment.findAll()
    console.log(comments)
    res.send(comments);
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
});

router.post('/newcomment', async function (req, res) {
  console.log("newcomment")
  console.log(req);
  var comment = req.body.comment;
  var postID = req.body.postID;
  var username = req.body.username;
  console.log("Comment = " + comment + " PostID = " + postID + " Comment User = " + username);
  let userID = await MODELS.User.findAll({
    attribute: ['user_id'],
    where: {
      u_name: username
    }
  })

  if (userID[0].dataValues.is_admin == 2) {
    return res.send(false);
  }

  var number = userID[0].dataValues.user_id

  let createComment = await MODELS.Comment.create({
    com_content: comment,
    postPostId: postID,
    userCredentialUserId: number
  }, {
    include: [MODELS.User]
  });

  console.log("if statement executes");
  return res.send("true");
})

module.exports = router;
