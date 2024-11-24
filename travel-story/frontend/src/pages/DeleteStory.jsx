import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteStory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteBook = () => {

    axios
      .delete(`http://localhost:8000/stories/${id}`)
      .then(() => {
        enqueueSnackbar(' Story Deleted successfully :( ', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center text-gray-500'>Delete Story</h1>
      <div className='flex flex-col items-center border-2 border-gray-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>You Sure bruh ?</h3>

        <button
          className='p-4 bg-red-500 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteStory;

