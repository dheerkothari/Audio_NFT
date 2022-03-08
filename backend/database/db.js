import mongoose from 'mongoose'

const connection = async () => {
    try {
        const url = 'mongodb://localhost:27017/Audio'

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database Connect Successfully")
    } catch (error) {
        console.log("Error while connecting DB", error);
    }
}

export default connection;