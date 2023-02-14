"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = __importDefault(require("./../../../middlewares/validate"));
const inputs = __importStar(require("./inputs"));
const controllers = __importStar(require("./controllers"));
const httpResponses = __importStar(require("../../../utils/httpResponses"));
const router = (0, express_1.Router)();
// A new product
router.post('/', (0, validate_1.default)(inputs.addProduct), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, category, brand, quantity, price } = req.body;
        const response = yield controllers.addProduct(name, category, brand, quantity, price, description);
        httpResponses.general(res, response);
    }
    catch (error) {
        console.error(error);
        httpResponses.serverError(res, error);
    }
}));
// Retrieve many products by using filter
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, category, brand, min_quantity, max_quantity, min_price, max_price, min_date, max_date } = req.query;
        const response = yield controllers.getProducts(name, description, category, brand, min_quantity, max_quantity, min_price, max_price, min_date, max_date);
        httpResponses.general(res, response);
    }
    catch (error) {
        console.error(error);
        httpResponses.serverError(res, error);
    }
}));
// Get a product by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield controllers.getProductById(id);
        httpResponses.general(res, response);
    }
    catch (error) {
        console.error(error);
        httpResponses.serverError(res, error);
    }
}));
// Update a product
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, category, brand, quantity, price } = req.body;
        const response = yield controllers.updateProduct(id, name, description, category, brand, quantity, price);
        httpResponses.general(res, response);
    }
    catch (error) {
        console.error(error);
        httpResponses.serverError(res, error);
    }
}));
// Delete a product
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield controllers.deleteProduct(id);
        httpResponses.general(res, response);
    }
    catch (error) {
        console.error(error);
        httpResponses.serverError(res, error);
    }
}));
exports.default = router;
