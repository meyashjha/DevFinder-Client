import axios from 'axios'
import  { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import FeedCard from './FeedCard';
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import useUser from '../hooks/useUser';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store=>store.feed);
  useUser();

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      dispatch(addFeed(res.data.feed));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => { getFeed(); }, []);

  if (!feed) {
    return <div className='text-center my-15'>Loading feed...</div>;
  }

  if (feed.length === 0) {
    return <div className='text-center my-15'>No more users in feed!</div>;
  }

  return (
    <div className='my-15'>
      <FeedCard user={feed[0]} />
    </div>
  );
};

export default Feed;
