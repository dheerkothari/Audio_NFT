import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minlength: 8
    },
    picture: {
        type: String,
    },
    audio: {
        type: String,
    },
    phone: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        unique: true,
    },
    role: {
        type: String,
    },
    metamaskAddress: {
        type: String,
        unique: true
    },
    token: {
        type: String
    },
    resetToken: String,
    expireToken: Date
    // gender: {
    // 	type: String,
    // 	default: 'Not selected'
    // }
});
//userSchema.plugin(uniqueValidator);
userSchema.pre('save', async function (next) {
    try {
        console.log(this.password)
        const salt = await bcrypt.genSalt(10)
        console.log("salt", salt);
        console.log("password", this.password);
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    }
    catch (error) {
        next(error)
    }
})


const user = mongoose.model('users', userSchema);

export default user;