import express from "express";
const router = express.Router();
const users = require("./users")
const publications = require("./publications")
const cloudinary = require("./cloudinary")
const reviews = require("./review");
const qAndAs = require("./qAndA");
const mercadoPago = require("./checkout")
const carrito = require("./carrito")
const discount = require("./discount")

const denunciation = require("./denunciation")

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
    denunciation
};
