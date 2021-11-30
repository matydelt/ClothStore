import express from "express"
const router = express.Router();
const users = require("./users.ts")
const publications = require("./publications")
const cloudinary = require("./cloudinary")
const reviews = require("./review");


module.exports = {
    router,
    users,
    publications,
    cloudinary,
    reviews
};
