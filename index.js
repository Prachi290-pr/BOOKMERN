import express from "express";
import  { PORT , mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js'
import cors from 'cors';

const app = express();
app.use(express.json())
app.get('/', (request, response)=> {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial')
})

//MiddleWARE for handling CORS policy
//Method 1: allowing all users
app.use(cors())
//Method 2: allowing custom users only
// app.use(cors ({
//     origin:'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders:[Content-Type],
// })
// );


app.use('/books', bookRoutes)
mongoose 
    .connect(mongoDBURL)
    .then(()=> {
        console.log('App Connected to DB');
        app.listen(PORT, ()=>{
            console.log(`Everything is okay on port: ${PORT}`);
        });
    })
    .catch((error)=> {
        console.log(error);
    });