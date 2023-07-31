const express = require("express");
const participantsController = require("./controllers/participants.controller.js");
const cors = require("cors");

const routes = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use("/participants", participantsController);
};

module.exports = routes;
