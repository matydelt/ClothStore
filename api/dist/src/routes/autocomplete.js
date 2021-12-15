"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autocompleteController_1 = __importDefault(require("../controllers/autocompleteController"));
const router = (0, express_1.Router)();
router.get('/autocomplete', autocompleteController_1.default.getAutocomplete);
module.exports = router;
