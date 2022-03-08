import express from 'express';

import { addGenres } from '../Controller/genres-controller.js';

import { addUser, loginUser } from '../Controller/user-controller.js';

const router = express.Router();

router.post('/adduser', addUser)
router.post('/loginuser', loginUser)

router.post('/addgenres', addGenres)


export default router;
