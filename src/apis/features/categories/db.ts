import { Schema, Types, model } from 'mongoose'

export interface ICategory {
    name: string
    description?: string
    createdAt?: string
    updatedAt?: string
}

const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true },
        description: String
    }, 
    { timestamps: true }
)

export const Category = model<ICategory>('Category', CategorySchema)