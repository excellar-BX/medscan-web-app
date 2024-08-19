import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Message() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/team', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => setTeamMembers(response.data))
    .catch(error => console.error('Error fetching team members:', error));
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedMember) return;

      const senderId = localStorage.getItem('userId');
      const receiverId = selectedMember._id;

      if (!senderId || !receiverId) {
        console.error('senderId or receiverId is missing');
        return;
      }

      try {
        const response = await axios.get(`https://meds-scan-backend.onrender.com/api/messages/${senderId}/${receiverId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [selectedMember]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const senderId = localStorage.getItem('userId');
    const receiverId = selectedMember?._id;

    if (!senderId || !receiverId || !newMessage) {
      console.error('Missing required data');
      return;
    }

    try {
      const response = await axios.post('https://meds-scan-backend.onrender.com/api/messages', {
        senderId,
        receiverId,
        content: newMessage,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-1/3 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">Team Members</h2>
        <ul>
          {teamMembers.map((member) => (
            <li key={member._id} className="my-4 p-2 bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setSelectedMember(member)}>
              <strong>{member.name}</strong>
              <p>{member.position}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-2/3 bg-white p-4 flex flex-col">
        <div className="flex-grow overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg._id} className={`my-4 p-2 ${msg.senderId === localStorage.getItem('userId') ? 'text-right' : ''}`}>
              <strong>{msg.senderId}</strong>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex mt-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l-lg"
            placeholder="Type a message..."
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Send</button>
        </form>
      </div>
    </div>
  );
}
