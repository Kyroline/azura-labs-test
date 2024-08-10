import { model, Schema, Types } from "mongoose"

export const bookCategorySchema = new Schema({
    title: { type: String, required: true, unique: true },
    book_count: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

export const BookCategory = model('BookCategory', bookCategorySchema)