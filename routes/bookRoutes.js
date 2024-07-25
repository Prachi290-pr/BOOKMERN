import express from 'express';
import { Book } from '../Models/bookModels.js'

const router = express.Router();
//create a new book in postman 
router.post('/', async (request, response)=> {
    try{
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({message: 'Send all required fields'});
        }

        const newbook = {
            title : request.body.title, 
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newbook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
});

//get all books with mongoose
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({})
        return response.status(200).json({count: books.length, data: books});
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
});

//to get specific book by id
router.get('/:id', async (request, response)=> {
    try {
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book)
    } catch (error) {
        console.log(error);
        response.send(500).send({message:error.message});
    }
})

//route to update a book
router.put('/:id', async (request, response)=> {
    try {
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).send({message: 'Book not found'});
        }
        return response.status(200).send({message:'Book updated successfully'})
        
    } catch (error) {
        console.log(error);
        response.status(500).send({message: 'Send all required fields'});
    }
})

//delete a book on mongoose
router.delete('/:id', async (request, response)=> {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).send({message:'Book not found'})
        }
        return response.status(200).send({message:'Book deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    };
});


export default router;