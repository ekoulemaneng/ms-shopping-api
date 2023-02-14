import { Schema, Types, model } from 'mongoose'

export interface IBrand {
    name: string
    description?: string
    createdAt?: string
    updatedAt?: string
}

const BrandSchema = new Schema<IBrand>(
    {
        name: { type: String, required: true },
        description: String
    }, 
    { timestamps: true }
)

export const Brand = model<IBrand>('Brand', BrandSchema)