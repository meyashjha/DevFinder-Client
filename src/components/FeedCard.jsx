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
    <div className="flex justify-center ">
      <div className="card bg-base-100 w-96 h-130 shadow-lg shadow-amber-400 mb-4 hover:shadow-amber-300 border border-solid">
        <figure>
          <img
            src={photoUrl}
            alt="photo"
          />
        </figure>
        <div className="card-body text-white">
          <h2 className="card-title">{firstName.charAt(0).toUpperCase()+firstName.slice(1)} {lastName.charAt(0).toUpperCase()+lastName.slice(1)}</h2>
          { age && gender && <p>{age} {gender.toUpperCase().slice(0,1)} </p>}
          <p> {about} </p>
          <div className="card-actions justify-between">
            <button className="btn bg-red-500 text-white" onClick={() => handleRequest("ignored", user._id)}>Ignore</button>
            <button className="btn bg-pink-500 text-white" onClick={() => handleRequest("interested", user._id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
