import express from "express";
const router = express.Router();
const users = require("./users")
const publications = require("./publications")
const cloudinary = require("./cloudinary")
const reviews = require("./review");
const qAndAs = require("./qAndA");
const mercadoPago = require("./checkout")
const carrito = require("./carrito")
const denunciation = require("./denunciation")
const discount = require("./discount")
const autocomplete = require("./autocomplete")


module.exports = {
    router,
    users,
    publications,
    cloudinary,
    reviews,
    qAndAs,
    mercadoPago,
    carrito,
    discount,
    denunciation,
    autocomplete
};
