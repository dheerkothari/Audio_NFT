import Genres from '../Schema/genres-schema.js';
import constants from '../Constance/constance.js'

export const addGenres = async (req, res) => {
    try {
        const genres = await new Genres(req.body)
        genres.save()

        res.status(200).json({
            statusCode: constants.code.ok,
            statusMessaage: constants.message.addGenres
        });

    } catch (error) {
        res.status(500).json(error)
    }
}

export const getAllGenres = async (req, res) => {
    let username = req.query.username;
    let genres;

    try {
        if (username) {
            genres = await Genres.find({ username: username });
        }
        else {
            genres = await Genres.find()
        }

        res.status(200).json({
            statusCode: constants.code.ok,
            statusMessaage: constants.message.getAllGenres,
            genres
        });

    } catch (error) {
        res.status(500).json(error)
    }
}

export const getGenres = async (req, res) => {
    try {
        let genres = await Genres.findById(req.params.id)

        res.status(200).json({
            statusCode: constants.code.ok,
            statusMessaage: constants.message.getGenres,
            genres
        });

    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateGenre = async (req, res) => {
    try {
        await Genres.findByIdAndUpdate(req.params.id, { $set: req.body })

        res.status(200).json({
            statusCode: constants.code.ok,
            statusMessaage: constants.message.updateGenre,
        });

    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteGenre = async (req, res) => {
    try {
        let genre = await Genres.findById(req.params.id)
        await genre.delete();

        res.status(200).json({
            statusCode: constants.code.ok,
            statusMessaage: constants.message.deleteGenre,
        });

    } catch (error) {
        res.status(500).json(error)
    }
}

export const countGenre = async (req, res) => {
    try {
        const result = await Genres.find().countDocuments();
        console.log(result);
        res.status(200).json({
            statusCode: constants.code.ok,
            statusMessaage: constants.message.getUser,
            result
        });
    } catch (err) {
        console.log(err);
    }
}
