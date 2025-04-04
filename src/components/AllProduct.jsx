import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "antd";
import PrintQrCode from "../Helper/PrintOut";
import { BASE_URL } from "../constant/ServerUrl";

export default function AllProduct() {
  const [products, setProducts] = useState([]);
  const [qrCodeDetails, setQrcodeDetails] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    // Retrieve the role from localStorage
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        let endpoint = `${BASE_URL}/products/all`;

        // Update the API endpoint based on the role
        if (userRole === "Distributor") {
          endpoint = `${BASE_URL}/products/user/scans/${userId}`;
        } else if (userRole === "Store") {
          endpoint = `${BASE_URL}/products/user/scans/${userId}`;
        }

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Ensure the response is an array
          if (Array.isArray(data)) {
            setProducts(data);
          } else if (data.products && Array.isArray(data.products)) {
            setProducts(data.products);
          } else {
            setProducts([]); // Fallback to an empty array
          }
        } else {
          setProducts([]); // Fallback to an empty array
        }
      } catch (error) {
        setProducts([]); // Fallback to an empty array
      }
    };

    fetchProducts();
  }, []);

  const handleQRcode = (productDetails) => {
    setQrcodeDetails(productDetails);
  };

  return (
    <div className="md:mx-20 mx-5 md:mt-10 mb-5 mt-5">
      {qrCodeDetails != null && (
        <PrintQrCode
          qrCodeDetails={qrCodeDetails}
          setQrcodeDetails={setQrcodeDetails}
        />
      )}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold md:mb-5">
          {role === "Distributor"
            ? "Distributor Products"
            : role === "Store"
            ? "Store Products"
            : "All Products"}
        </h1>
        {/* Conditionally render the Add New Product button */}
        {role === "Manufacturer" && (
          <Link to="/dashboard/add-products">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              + Add New Product
            </button>
          </Link>
        )}
      </div>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p>
      ) : (
        <>
          {/* Table Section */}
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left font-semibold">ID</th>
                <th className="border px-4 py-2 text-left font-semibold">
                  Product Name
                </th>
                <th className="border px-4 py-2 text-left font-semibold">
                  Manufactured Date
                </th>
                <th className="border px-4 py-2 text-left font-semibold">IPR</th>
                <th className="border px-4 py-2 text-left font-semibold">
                  Details
                </th>
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
                    {new Date(
                      product.manufacturerInformation.manufacturedDate
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="border px-4 py-2 text-sm">
                    {product.ipr || "N/A"}
                  </td>
                  <td className="flex gap-2">
                    <Button type="primary">View Details</Button>
                    <Button
                      type="dashed"
                      onClick={() => handleQRcode(product)}
                    >
                      Print QrCode
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Section */}
          <div className="flex justify-end mt-4">
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <button className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
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
                <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
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