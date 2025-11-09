import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeedUser } from "../utils/feedSlice";

const FeedCard = ({user}) => {
    const dispatch = useDispatch();
    
    if (!user) {
        return <div className='text-center my-15'>No user data available</div>;
    }
    
    const { firstName, lastName, photoUrl, about , age , gender,} = user;

    const handleRequest = async(status, _id) => {
        try {
            const res = await axios.post(BASE_URL+'/request/send/'+status+'/'+_id, {}, { withCredentials: true });
            // console.log("Request sent:", res.data);
            dispatch(removeFeedUser(_id));
        } catch (err) {
            console.error("Error sending request:", err);
        }
    }

  return (
    <div className="flex justify-center px-4 py-4 sm:py-8">
      <div className="relative card bg-linear-to-br from-base-200 to-base-300 w-full max-w-sm sm:max-w-md shadow-2xl hover:shadow-amber-500/50 transition-all duration-500 border border-base-300 rounded-3xl overflow-hidden group">
        {/* Premium Badge */}
        <div className="absolute top-4 right-4 z-10 badge badge-primary badge-lg shadow-lg">
          New
        </div>
        
        {/* Image with Gradient Overlay */}
        <figure className="relative h-72 sm:h-96 overflow-hidden">
          <img
            src={photoUrl}
            alt="photo"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-base-300 via-transparent to-transparent opacity-60"></div>
          
          {/* Vignette effect for premium look */}
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]"></div>
        </figure>
        
        {/* Card Body with Glass Effect */}
        <div className="card-body bg-base-100/80 backdrop-blur-sm relative -mt-6 mx-3 mb-3 rounded-2xl shadow-xl border border-base-300/50 p-5">
          {/* Name with Gradient */}
          <h2 className="card-title text-xl sm:text-2xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
            {firstName.charAt(0).toUpperCase()+firstName.slice(1)} {lastName.charAt(0).toUpperCase()+lastName.slice(1)}
          </h2>
          
          {/* Age & Gender Tags */}
          {age && gender && (
            <div className="flex gap-2 mb-2">
              <span className="badge badge-outline gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {age} years
              </span>
              <span className="badge badge-outline">
                {gender === 'male' ? '♂' : gender === 'female' ? '♀' : '⚥'} {gender.charAt(0).toUpperCase()+gender.slice(1)}
              </span>
            </div>
          )}
          
          {/* About Section */}
          <div className="bg-base-200/50 rounded-lg p-3 mb-3 min-h-20 backdrop-blur-sm border border-base-300/30">
            <p className="text-base-content/90 leading-relaxed line-clamp-3">
              {about || "No bio available"}
            </p>
          </div>
          
          {/* Action Buttons with Icons */}
          <div className="card-actions justify-between gap-2 mt-1">
            <button 
              className="btn btn-error flex-1 gap-2 text-white shadow-lg hover:shadow-error/50 transition-all duration-300 hover:-translate-y-1" 
              onClick={() => handleRequest("ignored", user._id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Pass
            </button>
            <button 
              className="btn btn-success flex-1 gap-2 text-white shadow-lg hover:shadow-success/50 transition-all duration-300 hover:-translate-y-1" 
              onClick={() => handleRequest("interested", user._id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
