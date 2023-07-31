const express = require("express");
const postsController = require("./controllers/posts.controller.js");
const cors = require("cors");

const routes = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use("/posts", postsController);
};

module.exports = routes;
