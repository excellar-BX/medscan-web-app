import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManufacturerForm = () => {
  const [formData, setFormData] = useState({
  manufacturerName: '',
  contactPerson: '',
  email: '',
  phoneNumber: '',
  productCategory: '',
  marketShare: {
    pot1: 0,
    pot2: 0,
    pot3: 0,
    pot4: 0,
  },
  topProducts: [{ productName: '', sales: 0 }],
  salesTrend: [{ day: '', sales: 0 }],
  regions: [{ name: '', sales: 0 }],
});


  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('https://meds-scan-backend.vercel.app//api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserId(response.data._id);
      } catch (error) {
        setErrorMessage('Failed to fetch user ID. Please try again.');
      }
    };

    fetchUserId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'marketShare' ? parseFloat(value) : value,
    });
  };

  const handleMarketShareChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    marketShare: {
      ...formData.marketShare,
      [name]: parseFloat(value),
    },
  });
};

 const handleTopProductsChange = (e, index) => {
  const { name, value } = e.target;
  const newTopProducts = [...formData.topProducts];
  newTopProducts[index] = {
    ...newTopProducts[index],
    [name]: name === 'sales' ? parseFloat(value) : value,
  };
  setFormData({ ...formData, topProducts: newTopProducts });
};


  const handleAddTopProduct = () => {
    setFormData({
      ...formData,
      topProducts: [...formData.topProducts, ''],
    });
  };

  const handleRemoveTopProduct = (index) => {
    const newTopProducts = formData.topProducts.filter((_, i) => i !== index);
    setFormData({ ...formData, topProducts: newTopProducts });
  };

  const handleSalesTrendChange = (e, index) => {
    const { name, value } = e.target;
    const newSalesTrend = [...formData.salesTrend];
    newSalesTrend[index] = {
      ...newSalesTrend[index],
      [name]: name === 'sales' ? parseFloat(value) : value,
    };
    setFormData({ ...formData, salesTrend: newSalesTrend });
  };

  const handleAddSalesTrend = () => {
    setFormData({
      ...formData,
      salesTrend: [...formData.salesTrend, { date: '', sales: 0 }],
    });
  };

  const handleRemoveSalesTrend = (index) => {
    const newSalesTrend = formData.salesTrend.filter((_, i) => i !== index);
    setFormData({ ...formData, salesTrend: newSalesTrend });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Include the userId with the form data
      const dataToSend = { ...formData, userId };

      await axios.post('https://meds-scan-backend.onrender.com/api/manufacturer/create', dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage('Manufacturer information successfully submitted!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to submit manufacturer information. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{errorMessage}</div>}
      {successMessage && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{successMessage}</div>}

      {/* Manufacturer Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Manufacturer Name</label>
        <input 
          type="text" 
          name="manufacturerName" 
          value={formData.manufacturerName} 
          onChange={handleChange} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      {/* Contact Person */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Contact Person</label>
        <input 
          type="text" 
          name="contactPerson" 
          value={formData.contactPerson} 
          onChange={handleChange} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input 
          type="text" 
          name="phoneNumber" 
          value={formData.phoneNumber} 
          onChange={handleChange} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      {/* Product Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Product Category</label>
        <input 
          type="text" 
          name="productCategory" 
          value={formData.productCategory} 
          onChange={handleChange} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      {/* Market Share */}
     
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Market Share</label>
  {['pot1', 'pot2', 'pot3', 'pot4'].map((pot, index) => (
    <input
      key={index}
      type="number"
      name={pot}
      value={formData.marketShare[pot]}
      onChange={handleMarketShareChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      placeholder={`Market Share ${pot.toUpperCase()}`}
    />
  ))}
</div>


     {/* Top Products */}
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Top Products</label>
  {formData.topProducts.map((product, index) => (
    <div key={index} className="flex space-x-2 mb-2">
      <input
        type="text"
        name="productName"
        value={product.productName}
        onChange={(e) => handleTopProductsChange(e, index)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        placeholder="Product Name"
      />
      <input
        type="number"
        name="sales"
        value={product.sales}
        onChange={(e) => handleTopProductsChange(e, index)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        placeholder="Sales"
      />
      <button
        type="button"
        onClick={() => handleRemoveTopProduct(index)}
        className="text-red-500"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddTopProduct}
    className="text-blue-500 mt-2"
  >
    Add Top Product
  </button>
</div>

      {/* Sales Trend */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Sales Trend</label>
        {formData.salesTrend.map((trend, index) => (
          <div key={index} className="flex space-x-2">
            <input 
              type="date" 
              name="date" 
              value={trend.date} 
              onChange={(e) => handleSalesTrendChange(e, index)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            <input 
              type="number" 
              name="sales" 
              value={trend.sales} 
              onChange={(e) => handleSalesTrendChange(e, index)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            <button 
              type="button" 
              onClick={() => handleRemoveSalesTrend(index)} 
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={handleAddSalesTrend} 
          className="text-blue-500 mt-2"
        >
          Add Sales Trend
        </button>
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ManufacturerForm;
