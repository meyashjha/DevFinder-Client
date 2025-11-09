import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

const Chat = () => {
  const params = useParams();
  const navigate = useNavigate();
  const withUserId = params.id;
  const user = useSelector(state => state.user)
  const userId =  user?._id ;
  const [newMessage, setNewMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const connections = useSelector(state => state.connection);
  const withUser = connections?.find(u => u._id === withUserId);
  const messagesEndRef = useRef(null);



    const fetchChatMessages = async()=>{
    try{
      const res = await axios.get(BASE_URL+"/chat/"+withUserId, {withCredentials:true});
      const msg = res.data.messages.map(m=>({
        senderId: m.senderId._id,
        senderName: m.senderId.firstName.charAt(0).toUpperCase() + m.senderId.firstName.slice(1),
        text: m.text,
        timestamp: new Date(m.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }));
      setSentMessages(msg);

    }catch(err){
      console.log("Error", err.message);
    }
  }
  useEffect(()=>{
    if(!withUser) { navigate('/connections'); }
    fetchChatMessages();
  },[]);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit('joinChat',{userId, withUserId});
    
    const handleReceiveMessage = (data) => {
      console.log('New message received:', data);
      // Only add message if it's from the other user (not our own message)
      if (data.senderId !== userId) {
        setSentMessages((prevMessages) => [...prevMessages, { 
          senderId: data.senderId,
          senderName: data.senderName,
          text: data.message,
          timestamp: data.timestamp || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    };
    
    socket.on('receiveMessage', handleReceiveMessage);
    
    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
      // Don't disconnect completely, just clean up listeners
    };
  },[userId, withUserId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sentMessages]);

  const sendMessage = (message) => {
    if (!message.trim()) return; // Prevent empty messages
    const socket = createSocketConnection();
    const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    // Optimistically add message to UI
    setSentMessages((prevMessages) => [...prevMessages, {
      senderId: userId,
      senderName: user.firstName,
      text: message,
      timestamp
    }]);
    
    socket.emit('sendMessage', { userId, withUserId, message, senderName: user.firstName });
  };

  return (
    withUser && (
    <div className="flex flex-col h-[70vh] max-w-4xl mx-auto p-4 border my-10 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Chat with {withUser.firstName.charAt(0).toUpperCase()+withUser.firstName.slice(1)}</h1>
      
      <div className="flex-1 overflow-y-auto mb-4">
        {sentMessages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          sentMessages.map((msg, index) => (
            <div key={index} className={msg.senderId === userId ? 'chat chat-end' : 'chat chat-start'}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={msg.senderId === userId ? user.photoUrl || "https://img.daisyui.com/images/profile/demo/anakeen@192.webp" : withUser.photoUrl || "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"}
                  />
                </div>
              </div>
              <div className="chat-header">
                {msg.senderName || (msg.senderId === userId ? user.firstName : 'User')}
                <time className="text-xs opacity-50 ml-1">{msg.timestamp}</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="flex gap-2" onSubmit={(e)=>{e.preventDefault(); sendMessage(newMessage); setNewMessage('');}} >
        <input 
        value={newMessage}
        onChange={(e)=>setNewMessage(e.target.value)}
          type="text" 
          placeholder="Type a message..." 
          className="input input-bordered flex-1"
        />
        <button className="btn btn-primary" type="submit">Send</button>
      </form>
    </div>
  )
)
}

export default Chat