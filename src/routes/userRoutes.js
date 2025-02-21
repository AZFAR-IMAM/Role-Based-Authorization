const express = require("express");
const route = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/roleMiddleware");

//Only admin can access this route
route.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Admin pannel" });
});

//Both admin and manager can access this route
route.get("/manager",verifyToken,authorizeRole("admin","manager"), (req, res) => {
  res.json({ message: "Wellcome manager" });
});

//All can access this route
route.get("/user",verifyToken,authorizeRole("admin","manager","user"), (req, res) => {
  res.json({ message: "Wellcome user" })
});

module.exports = route;
