"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const config_1 = require("../../../config");
const Product = (product) => {
    return {
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        category: {
            id: product.category._id.toString(),
            name: product.category.name,
            description: product.category.description
        },
        brand: {
            id: product.brand._id.toString(),
            name: product.brand.name,
            description: product.brand.description
        },
        quantity: product.quantity,
        price: product.price,
        date: product.date,
        url: `${config_1.host}/apis/v1/products/${product._id.toString()}`
    };
};
exports.Product = Product;
