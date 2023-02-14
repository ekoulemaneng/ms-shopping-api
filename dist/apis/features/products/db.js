"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: String,
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    brand: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Brand', required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0.0 },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
