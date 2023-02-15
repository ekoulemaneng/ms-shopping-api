import { Schema, Types, model } from 'mongoose'

export interface IBrand {
    name: string
    description?: string
    deleted: boolean
    createdAt?: string
    updatedAt?: string
}

const BrandSchema = new Schema<IBrand>(
    {
        name: { type: String, required: true },
        description: String,
        deleted: { type: Boolean, default: false }
    }, 
    { timestamps: true }
)

export const Brand = model<IBrand>('Brand', BrandSchema)