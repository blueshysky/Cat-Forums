const express = require("express");
const router = express.Router();
const { QueryTypes } = require('sequelize');
const session = require('express-session');
const models = require("../models");

router.get("/", async (req, res) => {
  try {
    let posts = await MODELS.Post.findAll()
    console.log(posts)
    res.send(posts);
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
});

router.post('/newpost', async function (req, res) {
  console.log("newpost")
  console.log(req);
  var posttitle = req.body.posttitle;
  var postcontent = req.body.postcontent;
  var username = req.body.username;
  var postimage = req.body.postimage;
  console.log("Post Title = " + posttitle + " Post Content = " + postcontent + " Post User = " + username);
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

  let createPost = await MODELS.Post.create({
    title: posttitle,
    content: postcontent,
    userCredentialUserId: number,
    image: postimage
  }, {
    include: [MODELS.User]
  });

  console.log("if statement executes");
  return res.send("true");
})

router.post('/flagpost', async function (req, res) {
  console.log("flagpost")
  console.log(req);
  var postId = req.body.postId;

  MODELS.Post.findOne(
    {
      where: { post_id: postId }
    }).then(function (flagPost) {
      return flagPost.update({ flag: 1 });
    }).then(function (flagPost) {
      res.sendStatus(200);
    })
})

router.post('/unflagpost', async function (req, res) {
  console.log("unflagpost")
  console.log(req);
  var postId = req.body.postId;

  MODELS.Post.findOne(
    {
      where: { post_id: postId }
    }).then(function (unflagPost) {
      return unflagPost.update({ flag: 0 });
    }).then(function (unflagPost) {
      res.sendStatus(200);
    })
})

router.post('/delpost', async function (req, res) {
  console.log("delpost")
  console.log(req);
  var postId = req.body.postId;

  MODELS.Post.findOne(
    {
      where: { post_id: postId }
    }).then(function (delPost) {
      return delPost.destroy();
    }).then(function (delPost) {
      res.sendStatus(200);
    })
})

module.exports = router;
