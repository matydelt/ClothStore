import express from "express"
const router = express.Router();
const users = require("./users.ts")
const publications = require("./publications")


module.exports = {
    router,
    users,
    publications
};
