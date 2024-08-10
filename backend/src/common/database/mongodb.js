import mongoose from "mongoose"
import 'dotenv/config'

export async function connectDB() {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(
                process.env.MONGODB_CONNECTION_STRING
            )
            return console.log('Mongodb Connected')
        }
        return console.log('Using existing db')
    } catch (error) {
        console.error('error: ', error)
    }
}