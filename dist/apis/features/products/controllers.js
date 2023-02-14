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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.addProduct = void 0;
const _responses = __importStar(require("./_responses"));
const _brandResponses = __importStar(require("../brands/_responses"));
const _categoryResponses = __importStar(require("../categories/_responses"));
const mongoose_1 = require("mongoose");
const db_1 = require("./db");
const db_2 = require("../brands/db");
const db_3 = require("../categories/db");
/**
 * @param name Name of the product
 * @param description Description of the product
 * @param category Category id of the product
 * @param brand Brand id of the product
 * @param quantity Quantity of the product
 * @param price Price of the product
 * @returns New created product with data
 */
const addProduct = (name, category, brand, quantity, price, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(yield db_2.Brand.exists({ _id: brand })))
            return _brandResponses.BrandNotFound;
        if (!(yield db_3.Category.exists({ _id: brand })))
            return _categoryResponses.CategoryNotFound;
        let product = yield db_1.Product.create({ name, description, category, brand, quantity, price });
        product = yield db_1.Product.findById(product._id.toString()).populate('category brand').lean();
        return _responses.getProductCreated(product);
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
});
exports.addProduct = addProduct;
/**
 * @param name Name of the product
 * @param description Description of the product
 * @param category Category id of the product
 * @param brand Brand id of the product
 * @param min_quantity Minimum quantity of the product
 * @param max_quantity Maximum quantity of the product
 * @param min_price Minimum price of the product
 * @param max_price Maximum price of the product
 * @param min_date - minimum date of the product
 * @param max_date  maximum date of the product
 * @returns List of products with data
 */
const getProducts = (name, description, category, brand, min_quantity, max_quantity, min_price, max_price, min_date, max_date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {};
        const products = yield db_1.Product.find(filter).populate('category brand').lean();
        return _responses.getProducts(products);
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
});
exports.getProducts = getProducts;
/**
 * @param id Unique id of the product
 * @returns Product data
 */
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield db_1.Product.findById(id).populate('category brand').lean();
        if (!product)
            return _responses.ProductNotFound;
        return _responses.getProduct(product);
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
});
exports.getProductById = getProductById;
/**
 * @param id Unique id of product
 * @param name Name of product
 * @param description Description of product
 * @param brand Brand id of the product
 * @param category Category id of product
 * @param quantity Quantity of the product
 * @param price Price of the product
 * @returns Product data
 */
const updateProduct = (id, name, description, category, brand, quantity, price) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let product = yield db_1.Product.findById(id);
        if (!product)
            return _responses.ProductNotFound;
        if (!(yield db_2.Brand.exists({ _id: brand })))
            return _brandResponses.BrandNotFound;
        if (!(yield db_3.Category.exists({ _id: brand })))
            return _categoryResponses.CategoryNotFound;
        if (typeof name !== 'undefined')
            product.name = name;
        if (typeof description !== 'undefined')
            product.description = description;
        if (typeof brand !== 'undefined')
            product.brand = new mongoose_1.Types.ObjectId(brand);
        if (typeof category !== 'undefined')
            product.category = new mongoose_1.Types.ObjectId(category);
        if (typeof quantity !== 'undefined')
            product.quantity = quantity;
        if (typeof price !== 'undefined')
            product.price = price;
        yield product.save();
        product = yield db_1.Product.findById(id).populate('category brand').lean();
        return _responses.getProduct(product);
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
});
exports.updateProduct = updateProduct;
// Delete a product
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let product = yield db_1.Product.findById(id);
        if (!product)
            return _responses.ProductNotFound;
        product.deleted = true;
        product = yield product.save();
        return _responses.deleteProduct(product._id.toString());
    }
    catch (error) {
        console.error(error);
        throw new Error(error);
    }
});
exports.deleteProduct = deleteProduct;
