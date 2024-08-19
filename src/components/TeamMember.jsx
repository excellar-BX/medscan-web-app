import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TeamMember() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    position: ''
  });
  const navigate = useNavigate(); // For navigation

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    axios.get('https://meds-scan-backend.onrender.com/api/team', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(response => setTeamMembers(response.data))
      .catch(error => console.error('Error fetching team members:', error.response || error.message));
  }, []);

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    axios.post('https://meds-scan-backend.onrender.com/api/team', newMember, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(response => {
        setTeamMembers([...teamMembers, response.data]);
        setNewMember({ name: '', email: '', phone: '', position: '' });
      })
      .catch(error => console.error('Error adding team member:', error.response || error.message));
  };

  const handleDeleteMember = (id) => {
    axios.delete(`https://meds-scan-backend.onrender.com/api/team/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(() => {
        setTeamMembers(teamMembers.filter(member => member._id !== id));
      })
      .catch(error => console.error('Error deleting team member:', error.response || error.message));
  };

  const handleMessageClick = (id) => {
    navigate(`/message?receiverId=${id}`);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-8">Team Members</h2>
      
      <form onSubmit={handleAddMember} className="mb-8">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newMember.name}
          onChange={handleChange}
          className="border p-2 mr-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newMember.email}
          onChange={handleChange}
          className="border p-2 mr-4"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={newMember.phone}
          onChange={handleChange}
          className="border p-2 mr-4"
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={newMember.position}
          onChange={handleChange}
          className="border p-2 mr-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Team Member</button>
      </form>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div key={member._id} className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full"></div>
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-gray-600">{member.position}</p>
            <button
              onClick={() => handleDeleteMember(member._id)}
              className="bg-red-500 text-white p-2 mt-2"
            >
              Delete
            </button>
            <button
              onClick={() => handleMessageClick(member._id)}
              className="bg-green-500 text-white p-2 mt-2"
            >
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
