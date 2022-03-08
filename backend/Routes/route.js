import express from 'express';

import multer from 'multer';

const upload = multer({ storage: storage })

import { addGenres, deleteGenre, getAllGenres, getGenres, updateGenre } from '../Controller/genres-controller.js';
import storage, { uploadImage } from '../Controller/image-controller.js';

import { addUser, loginUser } from '../Controller/user-controller.js';

const router = express.Router();

router.post('/adduser', addUser)
router.post('/loginuser', loginUser)

router.post('/addgenres', addGenres)
router.get('/genres', getAllGenres)
router.get('/genre/:id', getGenres)
router.post('/update/:id', updateGenre)
router.delete('/delete/:id', deleteGenre)

router.post('/file/upload', upload.single('file'), uploadImage)


export default router;
