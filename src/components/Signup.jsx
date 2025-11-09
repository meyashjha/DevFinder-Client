import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const pass = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state=>state.user);
  const [err, setErr] = useState(null);

  // No useEffect redirect needed - we handle navigation after signup in handleSignup

  const handleSignup = async ()=>{
    try{
      const firstNameValue = firstName.current.value;
      const lastNameValue = lastName.current.value;
      const emailId = email.current.value;
      const password = pass.current.value;
      
      const res = await axios.post(BASE_URL+"/signup", {
        firstName: firstNameValue,
        lastName: lastNameValue,
        emailId,
        password
      }, {withCredentials:true})
      
      dispatch(addUser(res.data));
      // Use setTimeout to ensure navigation happens after state updates
      setTimeout(() => navigate('/profile'), 0);
    } catch (err) {
      if (!err.response) {
        setErr("Cannot reach the server. Check your internet or backend.");
        return;
      }
      setErr(err.response.data || "Something went wrong. Try again.");
    }
  }

  return (
    <div className=" flex justify-center mx-5 my-20 p-5">
      <form onSubmit={(e)=>e.preventDefault()} className='flex flex-col p-5 m-5 border border-solid w-3/4 md:w-80 rounded-lg shadow-2xl shadow-amber-400 hover:scale-125 hover:shadow-amber-300 transition-transform duration-1000'>
        <h1 className='p-2 m-2 font-extrabold text-2xl'>Sign Up</h1>
        <input ref={firstName} type='text' placeholder='First Name' className="input input-bordered p-2 my-2" /> 
        <input ref={lastName} type='text' placeholder='Last Name' className="input input-bordered p-2 my-2" /> 
        <input ref={email} type='email' placeholder='Email' className="input input-bordered p-2 my-2" /> 
        <input ref={pass} type='password' placeholder='Password' className="input input-bordered p-2 my-2" />
        <div>
          <p className="text-red-500">{err}</p>
          <button onClick={handleSignup} className="btn btn-primary p-2 m-2">Sign Up</button>
          <p className="p-2 m-2">Already have an account? <span className="cursor-pointer text-blue-500 hover:text-blue-700 font-semibold" onClick={() => navigate('/login')}>Login Now</span></p>
        </div>
      </form>
    </div>
  )
}

export default Signup