import { Schema, Types, model } from 'mongoose'

export interface IProduct {
    name: string
    description?: string
    category: Types.ObjectId
    brand: Types.ObjectId
    quantity: number
    price: number
    deleted: boolean
    createdAt?: string
    updatedAt?: string
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        description: String,
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
        quantity: { type: Number, default: 0 },
        price: { type: Number, default: 0.0 },
        deleted: { type: Boolean, default: false }
    }, 
    { timestamps: true }
)

export const Product = model<IProduct>('Product', ProductSchema)