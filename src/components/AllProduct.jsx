import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { Button, message } from "antd";
import PrintQrCode from '../Helper/PrintOut'
import { BASE_URL } from "../constant/ServerUrl";

export default function AllProduct() {
  const [products, setProducts] = useState([]);
  const [qrCodeDetails,setQrcodeDetails] = useState(null)
  

  useEffect(() => {
    const fetchProducts = async () => {
      let userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
  
      // Decode the token and set userId if not already set
      if (!userId && token) {
        try {
          const decodedToken = jwtDecode(token);
          userId = decodedToken.userId;
          console.log("this is the token here want to confirm what i got from here ", userId)
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
        const response = await fetch(`${BASE_URL}/products/all?userId=${userId}`, {
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

  const handleQRcode=(productDetails)=>{
      // message.info(productDetails._id)
    
      setQrcodeDetails(productDetails)
  }

  return (
    <div className="md:mx-20 mx-5 md:mt-10 mb-5 mt-5">
      {qrCodeDetails != null && <PrintQrCode qrCodeDetails={qrCodeDetails} setQrcodeDetails={setQrcodeDetails}/>}
      <div className="flex items-center justify-between mb-5">
      <h1 className="text-2xl font-bold md:mb-5">All Products</h1>
      <Link to="/dashboard/add-products">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
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
                <th className="border px-4 py-2 text-left font-semibold">ID</th>
                <th className="border px-4 py-2 text-left font-semibold">Product Name</th>
                <th className="border px-4 py-2 text-left font-semibold">Manufactured Date</th>
                <th className="border px-4 py-2 text-left font-semibold">IPR</th>
                <th className="border px-4 py-2 text-left font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-sm">{index + 1}</td>
                  <td className="border px-4 py-2 text-sm">
                    {product.productInformation.productName}
                  </td>
                  <td className="border px-4 py-2 text-sm">
                    {new Date(product.manufacturerInformation.manufacturedDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="border px-4 py-2 text-sm">{product.ipr || "N/A"}</td>
                  <td className="flex gap-2">
                    <Button type="primary">View Details</Button>
                    <Button type="dashed" onClick={()=>handleQRcode(product)}>Print QrCode</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Section */}
          <div className="flex justify-end mt-4">
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <button
                  className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  &laquo;
                </button>
              </li>
              <li>
                <button className="px-3 py-2 leading-tight text-blue-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                  1
                </button>
              </li>
              <li>
                <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                  2
                </button>
              </li>
              <li>
                <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                  3
                </button>
              </li>
              <li>
                <button
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                >
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
