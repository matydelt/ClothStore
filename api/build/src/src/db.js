"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const conn = mongoose_1.default.connect(`mongodb+srv://matydelt:matias133@clothstore.jqw1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
exports.default = conn;
