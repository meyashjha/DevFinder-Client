
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const MyRequests = () => {
    useUser();
    const [ requests, setRequests ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
            // console.log(res.data.connectionRequests);
            setRequests(res.data.connectionRequests);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post( BASE_URL+'/request/review/'+status+'/'+_id , {}, { withCredentials: true } );
            //console.log("Request reviewed:", res.data);
            setRequests(requests.filter(req => req._id !== _id));
        } catch (err) {
            console.error("Error reviewing request:", err);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if(isLoading){
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] px-4'>
                <div className='loading loading-spinner loading-lg text-primary'></div>
                <p className='mt-4 text-base-content/70'>Loading your requests...</p>
            </div>
        )
    }

    if(requests?.length === 0 || !requests){
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] px-4'>
                <div className='text-center max-w-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-6 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h1 className='text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>No Pending Requests</h1>
                    <p className='text-base-content/70 mb-6'>You're all caught up! Check back later for new connection requests.</p>
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
            Connection Requests
          </h1>
          <p className='text-base-content/70 text-sm sm:text-base'>
            You have {requests?.length || 0} pending {requests?.length === 1 ? 'request' : 'requests'}
          </p>
        </div>

        {/* Requests Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {requests?.map(req => (
            <div 
              key={req.fromUserId._id} 
              className='card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-300'
            >
              <div className='card-body p-4 sm:p-6'>
                {/* Avatar and Info */}
                <div className='flex items-start gap-4 mb-4'>
                  <div className='avatar'>
                    <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full ring ring-warning ring-offset-base-100 ring-offset-2'>
                      <img 
                        src={req.fromUserId.photoUrl} 
                        alt={`${req.fromUserId.firstName} ${req.fromUserId.lastName}`}
                        className='object-cover'
                      />
                    </div>
                  </div>
                  
                  <div className='flex-1 min-w-0'>
                    <h2 className='card-title text-lg sm:text-xl mb-1 truncate'>
                      {req.fromUserId.firstName.charAt(0).toUpperCase() + req.fromUserId.firstName.slice(1)}{' '}
                      {req.fromUserId.lastName.charAt(0).toUpperCase() + req.fromUserId.lastName.slice(1)}
                    </h2>
                    <p className='text-sm text-base-content/70 line-clamp-2'>
                      {req.fromUserId.about || 'No bio available'}
                    </p>
                  </div>
                </div>

                {/* Request Badge */}
                <div className='flex items-center gap-2 mb-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-warning" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className='text-xs text-base-content/60'>Pending your response</span>
                </div>

                {/* Action Buttons */}
                <div className='card-actions justify-between gap-2'>
                  <button 
                    className='btn btn-error btn-sm sm:btn-md flex-1 gap-2' 
                    onClick={() => reviewRequest("rejected", req._id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className='hidden sm:inline'>Reject</span>
                  </button>
                  <button 
                    className='btn btn-success btn-sm sm:btn-md flex-1 gap-2' 
                    onClick={() => reviewRequest("accepted", req._id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className='hidden sm:inline'>Accept</span>
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

export default MyRequests