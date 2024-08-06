import mongoose from "mongoose"

export async function connectDB() {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(
                process.env.MONGODB_CONNECTION_STRING || 'mongodb+srv://kyrolineadmin:3fD-hLu%23g7Q_jaq@development.omdds9q.mongodb.net/azura-labs-dev?retryWrites=true&w=majority&appName=development'
            )
            return console.log('Mongodb Connected')
        }
        return console.log('Using existing db')
    } catch (error) {
        console.error('error: ', error)
    }
}