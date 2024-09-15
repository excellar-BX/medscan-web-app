import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export default function AllProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
  
      // Decode the token and set userId if not already set
      if (!userId && token) {
        try {
          const decodedToken = jwtDecode(token);
          userId = decodedToken.userId;
          if (userId) {
            localStorage.setItem("userId", userId);
          } else {
            console.error("User ID is missing from the token");
            return;
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          return;
        }
      }
  
      if (!userId || !token) {
        console.error("User ID or token is missing");
        return;
      }
  
      try {
        const response = await fetch(`https://medscan-backend.vercel.app/api/products?userId=${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <div className="mx-4 md:mx-20 my-5 md:my-10">
   <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 space-y-4 md:space-y-0">
  <h1 className="text-xl md:text-2xl font-bold">All Products</h1>
  <Link to="/dashboard/add-products">
    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full md:w-auto">
      + Add New Product
    </button>
  </Link>
</div>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products added yet</p>
      ) : (
        <>
          {/* Table Section */}
          <table className="table-auto w-full border-collapse">
    <thead className="bg-gray-100">
      <tr>
        <th className="border px-2 md:px-4 py-2 text-left font-semibold">ID</th>
        <th className="border px-2 md:px-4 py-2 text-left font-semibold">Product Name</th>
        <th className="border px-2 md:px-4 py-2 text-left font-semibold">Manufactured Date</th>
        <th className="border px-2 md:px-4 py-2 text-left font-semibold">IPR</th>
        <th className="border px-2 md:px-4 py-2 text-left font-semibold">Details</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product, index) => (
        <tr key={index} className="hover:bg-gray-50">
          <td className="border px-2 md:px-4 py-2 text-sm">{index + 1}</td>
          <td className="border px-2 md:px-4 py-2 text-sm">
            {product.productInformation.productName}
          </td>
          <td className="border px-2 md:px-4 py-2 text-sm">
            {new Date(product.manufacturerInformation.manufacturedDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </td>
          <td className="border px-2 md:px-4 py-2 text-sm">{product.ipr || "N/A"}</td>
          <td className="border px-2 md:px-4 py-2 text-sm text-blue-500 cursor-pointer">
            View Details
          </td>
        </tr>
      ))}
    </tbody>
  </table>

          {/* Pagination Section */}
          <div className="flex justify-center md:justify-end mt-4">
  <ul className="inline-flex items-center space-x-1">
    <li>
      <button className="px-2 py-1 text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 hover:text-gray-700">
        &laquo;
      </button>
    </li>
    <li>
      <button className="px-2 py-1 text-blue-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
        1
      </button>
    </li>
    <li>
      <button className="px-2 py-1 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
        2
      </button>
    </li>
    <li>
      <button className="px-2 py-1 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
        3
      </button>
    </li>
    <li>
      <button className="px-2 py-1 text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 hover:text-gray-700">
        &raquo;
      </button>
    </li>
  </ul>
</div>

        </>
      )}
    </div>
  );
}
