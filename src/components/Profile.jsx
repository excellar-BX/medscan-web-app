import { useState, useEffect } from 'react';
import axios from 'axios';
import logi from '../assets/images/login-img.jpg';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.get('https://meds-scan-backend.onrender.com/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setEditedUser(response.data); // Initialize editedUser with the fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/auth/profile', editedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('https://meds-scan-backend.vercel.app/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Handle successful delete, e.g., redirect to login or home page
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div className="p-4 mt-20 bg-white shadow-md rounded-lg">
      <h1 className="text-[26px] font-medium leading-8 uppercase mb-4">
        Profile
      </h1>
      <img src={logi} className=' w-52 h-52 object-cover rounded-full my-10'/>
      {editMode ? (
        <div>
          <div className="mb-4">
            <label className="block">Name:</label>
            <input
              type="text"
              name="fullName"
              value={editedUser.fullName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block">Email:</label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block">Country:</label>
            <input
              type="text"
              name="country"
              value={editedUser.country}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block">Role:</label>
            <input
              type="text"
              name="role"
              value={editedUser.role}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4 border-b px-2 py-2 gap-1 border-b-gray-300 flex-col">
            <div className="text-[16px] font-medium mb-1">Company Name:</div>
            {editedUser.fullName}
          </div>
          <div className="mb-4 border-b px-2 py-2 gap-1 border-b-gray-300 flex-col">
            <div className="text-[16px] font-medium mb-1">Address:</div>
            {user.address}
          </div>
          <div className="mb-4 border-b px-2 py-2 gap-1 border-b-gray-300 flex-col">
            <div className="text-[16px] font-medium mb-1">
              Officail Email Address:
            </div>
            {user.email}
          </div>
          <div className="mb-4 border-b px-2 py-2 gap-1 border-b-gray-300 flex-col">
            <div className="text-[16px] font-medium mb-1">
              Official Phone Number:
            </div>
            {user.phoneNumber}
          </div>
          <div className="mb-4 border-b px-2 py-2 gap-1 border-b-gray-300 flex-col">
            <div className="text-[16px] font-medium mb-1">Website :</div>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </div>
          <div className="mb-4 border-b px-2 py-2 gap-1 border-b-gray-300 flex-col">
            <div className="text-[16px] font-medium mb-1">Number of Products Manufactured :</div>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </div>
          <button
            onClick={handleEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
