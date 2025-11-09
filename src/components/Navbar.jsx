
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector(store=>store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/logout`,
      {}, 
      { withCredentials: true } 
    );
    dispatch(removeUser());
    navigate('/login');
  } catch (err) {
    console.error(err);
  }
};

  
  return (
   <div className="navbar bg-base-500  rounded-2xl shadow-lg shadow-amber-400 mb-4 hover:shadow-amber-300">
  <div className="flex-1">
    <Link to={'/'} className="btn btn-ghost text-xl">DevFinder</Link>
  </div>
     <p className="mx-2">Welcome, {user?.firstName}</p>
  <div className="flex gap-2">
   
    <div className="dropdown dropdown-end">
    
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full mr-2">
            
              { user ? <img
                  alt="User avatar"
                  src={user?.photoUrl}
                  
                /> :  <img
                alt="Default avatar"
                src="https://p.kindpng.com/picc/s/24-248253_user-profile-default-image-png-clipart-png-download.png"
              />}
             
          </div>

      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to={'/profile'} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to={'/connections'}>My Connections</Link></li>
          <li><Link to={'/requests'}>My Requests</Link></li>
        { user ? <li><button onClick={handleLogout}>Logout</button></li> :<></>}
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar;