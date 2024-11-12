import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import StoriesTable from '../components/home/StoriesTable';
import StoriesCard from '../components/home/StoriesCard';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    axios
      .get('http://localhost:8000/stories')
      .then((response) => {
        setStories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-gray-200 hover:bg-gray-400 px-6 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-gray-200 hover:bg-gray-400 px-6 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Story List</h1>
        <Link to='/stories/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      { showType === 'table' ? (
        <StoriesTable stories={stories} />
      ) : (
        <StoriesCard stories={stories} />
      )}
    </div>
  );
};

export default Home;