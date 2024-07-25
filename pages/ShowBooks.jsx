import React from 'react'
import BackButton from '../components/backButton';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(()=> {
    setLoading(true);
    axios
    .get(`http://localhost:5555/books/${id}`)
    .then((response)=> {
      setBook(response.data || response.data.data)
      setLoading(false);
    })
    .catch((error)=>{
      console.log(error)
      setLoading(false)
    })
  },[id]);


  return (
    <div className='p-4 bg-cyan-50 '>
      <BackButton />
      <h1 className='text-4xl my-4  flex justify-center underline decoration-cyan-500/30'>Show Book</h1>
      <div className='flex justify-center'>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col bg-white border-2 border-cyan-400 rounded-xl w-[450px] p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
      </div>
      <div className='bg-sky-800 flex justify-center p-1 text-white fixed bottom-0 right-0 left-0'>Book Management System</div>

    </div>
  );
};

export default ShowBooks;
