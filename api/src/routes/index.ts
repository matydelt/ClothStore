import express from "express";
const router = express.Router();
const users = require("./users.ts");
const publications = require("./publications");
const cloudinary = require("./cloudinary");
const stripe = require("./stripe");

module.exports = {
  router,
  users,
  publications,
  cloudinary,
  stripe,
};
