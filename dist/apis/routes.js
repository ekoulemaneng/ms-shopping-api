"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("./features/products/routes"));
const routes_2 = __importDefault(require("./features/brands/routes"));
const routes_3 = __importDefault(require("./features/categories/routes"));
const routes = (0, express_1.Router)();
routes.use('/products', routes_1.default);
routes.use('/brands', routes_2.default);
routes.use('/categories', routes_3.default);
exports.default = routes;
