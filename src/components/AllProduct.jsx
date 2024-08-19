import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
        const response = await axios.get(`https://meds-scan-backend.onrender.com/api/products?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token in the headers
          },
        });

        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error:', error.response?.data?.message || error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-20 my-10">
      <h1 className="text-4xl font-extrabold mb-8">All Products</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Manufactured Date</th>
            <th className="px-4 py-2">IPR</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              {/* Access nested properties */}
              <td className="border px-4 py-2">{product.productInformation.productName}</td>
              <td className="border px-4 py-2">{new Date(product.manufacturerInformation.manufacturedDate).toDateString()}</td>
              <td className="border px-4 py-2">{product.ipr || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
