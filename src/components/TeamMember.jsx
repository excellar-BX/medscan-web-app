import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HiDotsVertical } from 'react-icons/hi';
import { MdDeleteOutline } from "react-icons/md";
import { MdMessage } from "react-icons/md";

export default function TeamMember() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    position: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // For dropdown menu
  const navigate = useNavigate(); // For navigation

  const getToken = () => localStorage.getItem('token');


  useEffect(() => {
    axios.get('https://meds-scan-backend.onrender.com/api/team', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(response => setTeamMembers(response.data))
      .catch(error => console.error('Error fetching team members:', error.response || error.message));
  }, []);

  const handleAddMember = (e) => {
    e.preventDefault();
    axios.post('https://meds-scan-backend.onrender.com/api/team', newMember, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(response => {
        setTeamMembers([...teamMembers, response.data]);
        setNewMember({ name: '', email: '', phone: '', position: '' });
        setIsModalOpen(false);
      })
      .catch(error => console.error('Error adding team member:', error.response || error.message));
  };

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleDeleteMember = (id) => {
    axios.delete(`https://meds-scan-backend.onrender.com/api/team/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(() => {
        setTeamMembers(teamMembers.filter(member => member._id !== id));
        setDropdownOpen(null); // Close dropdown menu
      })
      .catch(error => console.error('Error deleting team member:', error.response || error.message));
  };

  const handleMessageClick = (id) => {
    navigate(`/message?receiverId=${id}`);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div className="p-8 max-sm:p-4 sm:p-4">
      <div className='lg:flex items-center justify-between mb-8'>
        <h2 className="lg:text-2xl font-bold w-full">Team Members</h2>
        <button 
          className='bg-blue-500 text-white p-2 rounded-md w-1/4'
          onClick={() => setIsModalOpen(true)}
        >
          Add Team Member
        </button>
      </div>

      {/* Modal for adding a new team member */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center max-sm:z-50 sm:z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-10">
            <h3 className="text-xl font-semibold mb-4">Add New Team Member</h3>
            <form onSubmit={handleAddMember}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newMember.name}
                onChange={handleChange}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newMember.email}
                onChange={handleChange}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={newMember.phone}
                onChange={handleChange}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={newMember.position}
                onChange={handleChange}
                className="border p-2 mb-4 w-full"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="ml-4 bg-gray-500 text-white p-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display team members or no members message */}
      {teamMembers.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-sm:grid-cols-1 sm:grid-cols-1">
          {teamMembers.map((member) => (
            <div key={member._id} className="text-center bg-white shadow-lg rounded-md relative p-5 max-sm:w-[100%]">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full"></div>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-black">{member.position}</p>
              <p className='text-black'>{member.email}</p>

              {/* More options dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(member._id)}
                  className="absolute bottom-40 right-0 text-gray-300 hover:text-gray-500"
                >
                  <HiDotsVertical size={20} />
                </button>
                {dropdownOpen === member._id && (
                  <div className="absolute bottom-14 right-0 mt-2 bg-white border rounded-md shadow-lg">
                   <div className="flex gap-1 px-4 py-2 text-red-500 hover:bg-gray-100 w-full items-center">
                    <MdDeleteOutline />
                    <button
                        onClick={() => handleDeleteMember(member._id)}
                        
                      >
                        Delete
                      </button>
                   </div>
                   <div className="flex items-center gap-1 px-4 py-2 text-green-500 hover:bg-gray-100 w-full">
                    <MdMessage />
                    <button
                        onClick={() => handleMessageClick(member._id)}
                      >
                        Message
                      </button>
                   </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No member added</p>
      )}
    </div>
  );
}


 
  