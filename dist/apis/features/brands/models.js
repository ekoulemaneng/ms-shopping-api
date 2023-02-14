"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const config_1 = require("../../../config");
const Brand = (brand) => {
    return {
        id: brand._id.toString(),
        name: brand.name,
        description: brand.description,
        url: `${config_1.host}/apis/v1/products/${brand._id.toString()}`
    };
};
exports.Brand = Brand;
