
import useUser from '../hooks/useUser'
import EditPage from './EditPage'
import { useSelector } from 'react-redux'

const Profile = () => {
  useUser();
  const user = useSelector(store=>store.user)
  
  return (

    user && (
    <div className=''>
      <EditPage user={user}/>
      
      
      </div>
    
    )
  )
}

export default Profile