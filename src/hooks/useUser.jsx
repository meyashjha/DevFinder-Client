import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { addUser } from '../utils/userSlice';

const useUser = () => {
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

     useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      res.data.firstName = res.data.firstName.charAt(0).toUpperCase()+res.data.firstName.slice(1);
      res.data.lastName = res.data.lastName.charAt(0).toUpperCase()+res.data.lastName.slice(1);
      dispatch(addUser(res.data));
    } catch (err) {
      // Only redirect to login if NOT already on login/signup pages
      if (err.response && err.response.status === 401) {
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
          navigate('/login');
        }
      } else {
        console.error("Fetch user failed:", err.message);
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
          navigate('/login');
        }
      }
    }
  };

  // Only fetch if user doesn't exist
  if (!user) {
    fetchUser();
  }
}, [location.pathname]); // Removed 'user' from dependencies to prevent re-fetch when user is added
  
}

export default useUser;