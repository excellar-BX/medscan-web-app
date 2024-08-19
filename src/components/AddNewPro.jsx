import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function AddNewPro() {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Set up state for each input field
  const [formData, setFormData] = useState({
    manufacturerName: '',
    productName: '',
    productCategory: '',
    productDescription: '',
    issn: '',
    manufacturedDate: '',
    expiryDate: '',
    batchNumber: '',
    nafdacRegistration: '',
    quantityPerPackage: '',
    howManyPackage: '',
    productsPerPackage: '',
    currentHumidity: '',
    currentTemperature: '',
    productComponent: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID is missing from localStorage');
      return;
    }

    const productData = {
      userId: userId,
      productInformation: {
        productName: formData.productName,
        productCategory: formData.productCategory,
        productDescription: formData.productDescription,
        issn: formData.issn,
      },
      manufacturerInformation: {
        manufacturerName: formData.manufacturerName,
        manufacturedDate: formData.manufacturedDate,
        expiryDate: formData.expiryDate,
        batchNumber: formData.batchNumber,
        nafdacRegistration: formData.nafdacRegistration,
      },
      packageInformation: {
        quantityPerPackage: formData.quantityPerPackage,
        howManyPackage: formData.howManyPackage,
        productsPerPackage: formData.productsPerPackage,
        currentHumidity: formData.currentHumidity,
        currentTemperature: formData.currentTemperature,
        productComponent: formData.productComponent,
      }
    };

    try {
      const response = await axios.post('https://meds-scan-backend.vercel.app/api/products/create', productData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.status === 201) {
        console.log('Product added successfully');
        setFormData({ // Clear all input fields
          manufacturerName: '',
          productName: '',
          productCategory: '',
          productDescription: '',
          issn: '',
          manufacturedDate: '',
          expiryDate: '',
          batchNumber: '',
          nafdacRegistration: '',
          quantityPerPackage: '',
          howManyPackage: '',
          productsPerPackage: '',
          currentHumidity: '',
          currentTemperature: '',
          productComponent: '',
        });
        navigate('/dashboard'); // Navigate to /dashboard
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
    }
  };

  // Handle input change to update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="text-2xl mx-20">
      <h1 className="mt-8 text-4xl font-extrabold">Register New Product To Blockchain</h1>
      <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
        <input className="border-b-2 p-4" name="manufacturerName" type="text" placeholder="Manufacturer Name" value={formData.manufacturerName} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="productName" type="text" placeholder="Product Name" value={formData.productName} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="productCategory" type="text" placeholder="Product Category" value={formData.productCategory} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="productDescription" type="text" placeholder="Product Description" value={formData.productDescription} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="issn" type="text" placeholder="ISSN" value={formData.issn} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="manufacturedDate" type="date" placeholder="Manufactured Date" value={formData.manufacturedDate} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="expiryDate" type="date" placeholder="Expiry Date" value={formData.expiryDate} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="batchNumber" type="text" placeholder="Batch Number" value={formData.batchNumber} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="nafdacRegistration" type="text" placeholder="NAFDAC Registration" value={formData.nafdacRegistration} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="quantityPerPackage" type="text" placeholder="Quantity Per Package" value={formData.quantityPerPackage} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="howManyPackage" type="text" placeholder="How many Package" value={formData.howManyPackage} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="productsPerPackage" type="text" placeholder="How many Products Per Package" value={formData.productsPerPackage} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="currentHumidity" type="text" placeholder="Current Humidity" value={formData.currentHumidity} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="currentTemperature" type="text" placeholder="Current Temperature" value={formData.currentTemperature} onChange={handleInputChange} required />
        <input className="border-b-2 p-4" name="productComponent" type="text" placeholder="Product Component" value={formData.productComponent} onChange={handleInputChange} required />
        <button className='bg-[#3b82f6] w-[300px] my-14 text-white text-center py-6 px-6 rounded-xl'>Submit</button>
      </form>
    </div>
  );
}
