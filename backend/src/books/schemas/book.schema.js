import { model, Schema, Types } from "mongoose"

export const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publication_date: { type: Date, required: true },
    publisher: { type: String, required: true },
    num_pages: { type: Number, required: true },
    categories: [{ type: String, ref: 'BookCategory' }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

export const Book = model('Book', bookSchema)