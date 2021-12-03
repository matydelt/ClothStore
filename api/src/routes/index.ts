import express from "express";
const router = express.Router();
const users = require("./users.ts")
const publications = require("./publications")
const cloudinary = require("./cloudinary")
const mercadoPago = require("./checkout")
const carrito = require("./carrito")


module.exports = {
    router,
    users,
    publications,
    cloudinary,
    mercadoPago,
    carrito
};
