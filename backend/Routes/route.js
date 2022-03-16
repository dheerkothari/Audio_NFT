import express from 'express';

import multer from 'multer';

const upload = multer({ storage: storage })

import { addGenres, countGenre, deleteGenre, getAllGenres, getGenres, updateGenre } from '../Controller/genres-controller.js';
import storage, { uploadImage } from '../Controller/image-controller.js';

import { addUser, countUser, getUser, loginUser, newPassword, resetPassword, verifyToken } from '../Controller/user-controller.js';

const router = express.Router();

router.post('/adduser', addUser)
router.post('/loginuser', loginUser)
router.post('/resetpassword', resetPassword)
router.post('/newpassword', newPassword)
router.get('/getuser', verifyToken, getUser)
router.get('/countuser', countUser)

router.post('/addgenres', addGenres)
router.get('/genres', getAllGenres)
router.get('/genre/:id', getGenres)
router.post('/update/:id', updateGenre)
router.delete('/delete/:id', deleteGenre)
router.get('/countgenre', countGenre)

router.post('/file/upload', upload.single('file'), uploadImage)


export default router;
