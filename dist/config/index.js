"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.url_db = exports.host = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `./env/.env.${process.env.NODE_ENV}` });
exports.port = typeof process.env.PORT !== 'undefined' ? parseInt(process.env.PORT) : 3000;
exports.host = typeof process.env.HOST !== 'undefined' ? process.env.HOST : 'http://127.0.0.1:3000';
exports.url_db = typeof process.env.URL_DB !== 'undefined' ? process.env.URL_DB : 'mongodb://127.0.0.1:27017/shoppingmsdb';
