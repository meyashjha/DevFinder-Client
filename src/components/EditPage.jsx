import  { useState } from 'react'
import FeedCard from './FeedCard'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import useUser from '../hooks/useUser';

const EditPage = ({user}) => {
    useUser();
    const[err, seterr] = useState();
    const [firstName, setfirstName]= useState(user.firstName);
    const [lastName, setlastName]= useState(user.lastName);
    const [gender, setgender]= useState(user.gender);
    const [about, setabout]= useState(user.about);
    const [email, setemail]= useState(user.emailId);
    const [age, setage]= useState(user.age);
    const [photoUrl, setphotoUrl]= useState(user.photoUrl);
    const dispatch = useDispatch();
    const [shownotification, setShownotification] = useState(false);
    const [showalert, setshowalert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async ()=>{
      seterr(null);
      setIsLoading(true);
        try{
        const res = await axios.post(BASE_URL+'/profile/edit', {firstName, lastName, about, gender, photoUrl , age} ,{withCredentials:true})
        dispatch(addUser(res.data));
        setTimeout(() => {setShownotification(false)}, 5000);
        setShownotification(true);

        } catch(err){
             console.log(err);
        if (!err.response) {
            seterr("Cannot reach the server. Check your internet or backend.");
            return;
        }
        seterr(err.response.data || "Something went wrong. Try again.");
        } finally {
          setIsLoading(false);
        }
    };

    const handleReadOnlyClick = () => {
      setshowalert(true);
      setTimeout(() => setshowalert(false), 2000);
    };
        
  return (
    <>
      {/* Toast Notifications */}
      <div className="toast toast-top toast-center z-50">
        {shownotification && (
          <div className="alert alert-success shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Profile Saved Successfully!</span>
          </div>
        )}
        {showalert && (
          <div className="alert alert-error shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className='text-white'>Cannot Edit Email</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className='min-h-screen bg-base-100 py-6 sm:py-10 px-4'>
        <div className='max-w-7xl mx-auto'>
          
          {/* Header Section */}
          <div className='mb-6 sm:mb-8'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2'>
              Edit Your Profile
            </h1>
            <p className='text-base-content/70 text-sm sm:text-base'>
              Update your information and see how it looks to others
            </p>
          </div>

          {/* Two Column Layout - Stacks on Mobile */}
          <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
            
            {/* Edit Form - Left Side */}
            <div className='w-full lg:w-1/2'>
              <form onSubmit={(e)=>e.preventDefault()} className='card bg-linear-to-br from-base-200 to-base-300 shadow-2xl border border-base-300 rounded-2xl'>
                <div className='card-body p-4 sm:p-6'>
                  
                  {/* Form Header */}
                  <div className='flex items-center gap-3 mb-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <h2 className='text-xl sm:text-2xl font-bold'>Profile Information</h2>
                  </div>

                  {/* Form Fields */}
                  <div className='space-y-3 sm:space-y-4'>
                    
                    {/* First Name */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">First Name</span>
                      </label>
                      <input 
                        type='text' 
                        value={firstName} 
                        placeholder='Enter your first name' 
                        className="input input-bordered w-full" 
                        onChange={(e)=>{setfirstName(e.target.value)}} 
                      />
                    </div>

                    {/* Last Name */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Last Name</span>
                      </label>
                      <input 
                        type='text' 
                        value={lastName} 
                        placeholder='Enter your last name' 
                        className="input input-bordered w-full" 
                        onChange={(e)=>{setlastName(e.target.value)}} 
                      />
                    </div>

                    {/* Email (Read-only) */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Email</span>
                        
                      </label>
                      <input 
                        type='email' 
                        readOnly={true} 
                        value={email} 
                        placeholder='Email' 
                        className="input input-bordered w-full cursor-not-allowed opacity-70" 
                        onChange={()=>{}} 
                        onClick={handleReadOnlyClick} 
                      />
                    </div>

                    {/* Age and Gender - Side by Side on Desktop */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                      
                      {/* Age */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">Age</span>
                        </label>
                        <input 
                          type='number' 
                          value={age} 
                          placeholder='Your age' 
                          className="input input-bordered w-full" 
                          onChange={(e)=>{setage(e.target.value)}} 
                        />
                      </div>

                      {/* Gender */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">Gender</span>
                        </label>
                        <div className="dropdown dropdown-bottom w-full">
                          <label tabIndex={0} className="btn btn-outline w-full justify-between">
                            <span>{gender || "Select Gender"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </label>
                          <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-box w-full mt-2 z-10">
                            <li><a onClick={() => setgender("Female")}>Female</a></li>
                            <li><a onClick={() => setgender("Male")}>Male</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Photo URL */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Photo URL</span>
                      </label>
                      <input 
                        type='url' 
                        value={photoUrl} 
                        placeholder='https://example.com/photo.jpg' 
                        className="input input-bordered w-full" 
                        onChange={(e)=>{setphotoUrl(e.target.value)}} 
                      />
                    </div>

                    {/* About */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">About</span>
                        <span className="label-text-alt text-base-content/60">{about?.length || 0}/200</span>
                      </label>
                      <textarea 
                        value={about} 
                        placeholder='Tell us about yourself...' 
                        className="textarea textarea-bordered w-full h-24 resize-none" 
                        maxLength={200}
                        onChange={(e)=>{setabout(e.target.value)}} 
                      />
                    </div>

                  </div>

                  {/* Error Message */}
                  {err && (
                    <div className="alert alert-error mt-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{err}</span>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className='card-actions justify-end mt-4'>
                    <button 
                      onClick={handleSave} 
                      className={`btn btn-primary w-full sm:w-auto gap-2 shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1 ${isLoading ? 'loading' : ''}`}
                      disabled={isLoading}
                    >
                      {!isLoading && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                        </svg>
                      )}
                      {isLoading ? 'Saving...' : 'Save Profile'}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Preview Card - Right Side */}
            <div className='w-full lg:w-1/2'>
              <div className='lg:sticky lg:top-6'>
                {/* Preview Header */}
                <div className='mb-4'>
                  <div className='flex items-center gap-3 mb-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <h2 className='text-xl sm:text-2xl font-bold'>Live Preview</h2>
                  </div>
                  <p className='text-sm text-base-content/70 pl-9'>
                    This is how your profile appears to others
                  </p>
                </div>

                {/* Feed Card Preview */}
                <div className='transition-all duration-300'>
                  <FeedCard user={{firstName, lastName, about, gender, photoUrl , age}}/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default EditPage
