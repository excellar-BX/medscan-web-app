import { useEffect, useState } from "react";
import axios from "axios";



export default function AllProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
        const response = await axios.get(
          `https://meds-scan-backend.onrender.com/api/products?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the headers
            },
          }
        );

        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error:", error.response?.data?.message || error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="md:mx-20 mx-5 md:mt-10 mb-5 mt-5">
      <h1 className="text-2xl font-bold md:mb-5">All Products</h1>
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
                  <td className="border px-4 py-2 text-sm text-blue-500 cursor-pointer">
                    View Details
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
