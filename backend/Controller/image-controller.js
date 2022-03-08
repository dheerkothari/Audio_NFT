import mongoose from 'mongoose';
// import Grid from 'gridfs-stream';

import multer from 'multer';

const url = 'http://localhost:8000'

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploadImage')
    },
    filename: function (req, file, cb) {
        console.log("file", file);
        cb(null, `${Date.now()}-blog-${file.originalname}`);
    }
})

// let gfs, gridfsBucket;
// const conn = mongoose.connection;

// conn.once('open', () => {
//     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: 'photos'
//     });

//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('fs');
// })


// let gfs;

// conn.once('open', () => {
//     gfs = Grid(conn.db, mongoose.mongo)
//     console.log('gfs', gfs)
//     gfs.collection('fs')
// })

export const uploadImage = async (req, res) => {
    try {
        if (!req.file)
            return res.status(404).json("File not found");

        const imageURL = `${url}/${req.file.filename}`

        res.status(200).json(imageURL);
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getImage = async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename })
        res.set('Content-Type', 'image/jpeg');
        gfs.createReadStream({
            filename: file.filename
        }).pipe(res);


        // res.status(200).json(imageURL);
    } catch (err) {
        console.log('error', err)
        res.status(500).json(err)
    }
}

export default storage;
