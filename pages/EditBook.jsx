import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/backButton'
import { useNavigate , useParams} from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(()=> {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response)=> {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error)=> {
        setLoading(false);
        // alert('An error occured. Please check console');
        enqueueSnackbar('Error', {variant: 'error'})

        console.log(error)
      })
  },[]);

  const handleEditBook = ()=> {
    const data = {
      title, 
      author,
      publishYear,
    };
    setLoading(true);

    axios
        .put(`http://localhost:5555/books/${id}`, data)
        .then(()=> {
          setLoading(false);
          enqueueSnackbar('Book Edited Successfully', {variant: 'success'})
          navigate('/');
        })
        .catch((error) => {
          setLoading(false)
          alert('An Error occured. Please check console')
          console.log(error)
        })
  }


  return (
    <div className='p-4 bg-yellow-50'>
      <BackButton />
      <h1 className='text-4xl my-4 flex justify-center underline decoration-yellow-300'>Edit Book</h1>

      {loading ? (<Spinner />) : ''}
      <div className='flex flex-col bg-white border-2 border-sky-400 rounded-xl w-[600px] p=4 mx-auto '>
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
        <button className='p-2 bg-yellow-300 m-8' onClick={handleEditBook}>
          Save Changes

        </button>

      </div>
          <div className='bg-sky-800 flex justify-center p-1 text-white fixed bottom-0 right-0 left-0'>Book Management System</div>

    </div>
  )
}

export default EditBook

