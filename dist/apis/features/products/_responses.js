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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductNotFound = exports.getProductCreated = exports.deleteProduct = exports.getProducts = exports.getProduct = void 0;
const responses = __importStar(require("./responses"));
const getProduct = (product) => {
    return {
        status: 200,
        upload: responses.Product(product)
    };
};
exports.getProduct = getProduct;
const getProducts = (products) => {
    return {
        status: 200,
        upload: responses.Products(products)
    };
};
exports.getProducts = getProducts;
const deleteProduct = (id) => {
    return {
        status: 200,
        upload: responses.ProductDeleted(id)
    };
};
exports.deleteProduct = deleteProduct;
const getProductCreated = (product) => {
    return {
        status: 201,
        upload: responses.Product(product)
    };
};
exports.getProductCreated = getProductCreated;
exports.ProductNotFound = {
    status: 404,
    upload: responses.ProductNotFound
};
