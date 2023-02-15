import { Schema, Types, model } from 'mongoose'

export interface ICategory {
    name: string
    description?: string
    deleted: boolean
    createdAt?: string
    updatedAt?: string
}

const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true },
        description: String,
        deleted: { type: Boolean, default: false }
    }, 
    { timestamps: true }
)

export const Category = model<ICategory>('Category', CategorySchema)