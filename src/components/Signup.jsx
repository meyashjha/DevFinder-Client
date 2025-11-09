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
    <div className="flex justify-center px-4 py-8 sm:py-20">
      <form onSubmit={(e)=>e.preventDefault()} className='flex flex-col p-6 sm:p-8 w-full max-w-md border border-solid rounded-lg shadow-2xl shadow-amber-400 hover:scale-105 sm:hover:scale-110 hover:shadow-amber-300 transition-transform duration-500'>
        <h1 className='p-2 mb-4 font-extrabold text-2xl sm:text-3xl text-center'>Sign Up</h1>
        <input ref={firstName} type='text' placeholder='First Name' className="input input-bordered p-3 my-2 w-full text-base" /> 
        <input ref={lastName} type='text' placeholder='Last Name' className="input input-bordered p-3 my-2 w-full text-base" /> 
        <input ref={email} type='email' placeholder='Email' className="input input-bordered p-3 my-2 w-full text-base" /> 
        <input ref={pass} type='password' placeholder='Password' className="input input-bordered p-3 my-2 w-full text-base" />
        <div>
          <p className="text-red-500 text-sm mb-2">{err}</p>
          <button onClick={handleSignup} className="btn btn-primary w-full p-3 my-2 text-base">Sign Up</button>
          <p className="text-center text-sm sm:text-base mt-4">Already have an account? <span className="cursor-pointer text-blue-500 hover:text-blue-700 font-semibold" onClick={() => navigate('/login')}>Login Now</span></p>
        </div>
      </form>
    </div>
  )
}

export default Signup