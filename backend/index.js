import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import connection from './database/db.js';
import Router from './Routes/route.js'

const app = express();

// app.use(express.static('uploadImage'))

// const corsOptions = {
//     origin: '*',
//     credentials: true,            //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
// }

app.use(cors())
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', Router);

const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

connection()