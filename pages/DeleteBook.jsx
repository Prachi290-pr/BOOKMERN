import React from 'react'
import { useState } from 'react'
import BackButton from '../components/backButton'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar();


  const handleDeleteBook = () => {
    setLoading(true)
    axios
      .delete(`http://localhost:5555/books/${id}`)  
      .then((response)=> {
        setLoading(false)
        enqueueSnackbar('Book Deleted Successfully', {variant: 'success'})
        navigate('/')
      })
      .catch((error)=> {
        setLoading(false)
        // alert('An Error Occured. Please check console')
        enqueueSnackbar('Error', {variant: 'error'})

        console.log(error)
      })
  }

  return (
    <div className='p-4 '>
    <BackButton />
    <h1 className='text-4xl my-4 flex justify-center underline decoration-red-300 mb-8'>Delete Book</h1>
    {loading ? <Spinner /> : ''}

      <div className='flex flex-col items-center bg-white border-2 border-red-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Yes, Delete it</button>

      </div>
      <div className='bg-sky-800 flex justify-center p-1 text-white fixed bottom-0 right-0 left-0'>Book Management System</div>

    </div>
  )
}

export default DeleteBook
