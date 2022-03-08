import mongoose from "mongoose";

const genresSchema = new mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        require: true,
        maxlength: 100
    },
    description: {
        type: String,
        require: true,
        maxlength: 255
    }
});

const genres = mongoose.model('genres', genresSchema);

export default genres;