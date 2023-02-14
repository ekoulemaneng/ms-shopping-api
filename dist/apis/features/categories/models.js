"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const config_1 = require("../../../config");
const Category = (category) => {
    return {
        id: category._id.toString(),
        name: category.name,
        description: category.description,
        url: `${config_1.host}/apis/v1/categories/${category._id.toString()}`
    };
};
exports.Category = Category;
