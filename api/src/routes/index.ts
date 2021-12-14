import express from "express";
const router = express.Router();
const users = require("./users.ts")
const publications = require("./publications")
const cloudinary = require("./cloudinary")
const reviews = require("./review");
const qAndAs = require("./QAndA");
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
