import axios from 'axios';
import  { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { addConnection } from '../utils/connectionSlice';
import { useDispatch, useSelector } from 'react-redux';

const MyConnections = () => {
    useUser();
    const dispatch = useDispatch();
    const connections = useSelector(state => state.connection);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const fetchConnections = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
            dispatch(addConnection(res.data.myConnections));
            // console.log(res.data.myConnections);
        } catch (error) {
            console.error('Error fetching connections:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if(isLoading){
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] px-4'>
                <div className='loading loading-spinner loading-lg text-primary'></div>
                <p className='mt-4 text-base-content/70'>Loading your connections...</p>
            </div>
        )
    }

    if(connections?.length === 0 || !connections){
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] px-4'>
                <div className='text-center max-w-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-6 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h1 className='text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>No Connections Yet</h1>
                    <p className='text-base-content/70 mb-6'>Start connecting with people to build your network!</p>
                    <button className='btn btn-primary btn-wide' onClick={() => navigate('/')}>
                        Discover People
                    </button>
                </div>
            </div>
        )
    }

  return (
    <div className='min-h-screen bg-base-100 py-6 sm:py-10 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='mb-8 sm:mb-12'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2'>
            My Connections
          </h1>
          <p className='text-base-content/70 text-sm sm:text-base'>
            You have {connections?.length || 0} {connections?.length === 1 ? 'connection' : 'connections'}
          </p>
        </div>

        {/* Connections Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {connections?.map(conn => (
            <div 
              key={conn._id} 
              className='card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-300'
            >
              <div className='card-body p-4 sm:p-6'>
                {/* Avatar and Info */}
                <div className='flex items-start gap-4'>
                  <div className='avatar online'>
                    <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                      <img 
                        src={conn.photoUrl} 
                        alt={`${conn.firstName} ${conn.lastName}`}
                        className='object-cover'
                      />
                    </div>
                  </div>
                  
                  <div className='flex-1 min-w-0'>
                    <h2 className='card-title text-lg sm:text-xl mb-1 truncate'>
                      {conn.firstName.charAt(0).toUpperCase() + conn.firstName.slice(1)}{' '}
                      {conn.lastName.charAt(0).toUpperCase() + conn.lastName.slice(1)}
                    </h2>
                    <p className='text-sm text-base-content/70 line-clamp-2 mb-3'>
                      {conn.about || 'No bio available'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='card-actions justify-end mt-2'>
                  <button 
                    className='btn btn-primary btn-sm sm:btn-md gap-2' 
                    onClick={() => navigate(`/chat/${conn._id}`)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    <span className='hidden sm:inline'>Chat</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyConnections;