import React, { useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/backButton'
import { useNavigate, useRouteError } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar} = useSnackbar()
  const handleSaveBook = ()=> {
    const data = {
      title, 
      author,
      publishYear,
    };
    setLoading(true);

    axios
        .post('http://localhost:5555/books', data)
        .then(()=> {
          setLoading(false);
          enqueueSnackbar('Book Created Successfully', {variant: 'success'})
          navigate('/'); // after saving the book, it directly navigates to home page '/'
        })
        .catch((error) => {
          setLoading(false)
          // alert('An Error occured. Please check console')  we can also use snackbar popup
          enqueueSnackbar('Error', { variant: 'error'});
          console.log(error)
        })
  }


  return (
    <div className='p-4 bg-cyan-50 w-full h-fit]' >
      <BackButton />
      <h1 className='text-4xl my-4 flex justify-center items-center underline decoration-cyan-500/30'>Create Book</h1>

      {loading ? (<Spinner />) : ''}
      <div className='flex flex-col bg-white border-2 border-cyan-500 rounded-xl w-[600px] p=4 mx-auto  '>
        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type='text' value={title} 
          onChange={ (e)=> setTitle(e.target.value)} 
          className='border-2 border-gray-500 px-4 py-2 w-full'  />
        </div>

        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type='text' value={author} onChange={(e)=> setAuthor(e.target.value)}
          className='border-2 border-gray-500 px-4 w-full py-2' />
        </div>

        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type='number' value={publishYear} onChange={(e)=> setPublishYear(e.target.value)}
          className='border-2 border-gray-500 px-4 w-full py-2' />
        </div>
        <button className='p-2 bg-gradient-to-r from-cyan-500 ... m-8' onClick={handleSaveBook}>
          Save
        </button>

      </div>
      <div className='bg-sky-800 flex justify-center p-1 text-white fixed bottom-0 right-0 left-0'>Book Management System</div>
    </div>
  )
}

export default CreateBook

