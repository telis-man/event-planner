const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Router used" + JSON.stringify(req.body));
  next();
});

router.get("/", (req, res) => {
  res.send("Students home page");
});

router.get("/about", (req, res) => {
  res.send("About students");
});

module.exports = router;
