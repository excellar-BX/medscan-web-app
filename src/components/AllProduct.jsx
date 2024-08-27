import { useEffect, useState } from "react";
import axios from "axios";

const product = [
  {
    productInformation: {
      productName: "Aspirin 500mg",
    },
    manufacturerInformation: {
      manufacturedDate: "2023-08-15T00:00:00Z",
    },
    ipr: "IPR-001-ASP",
  },
  {
    productInformation: {
      productName: "Paracetamol 250mg",
    },
    manufacturerInformation: {
      manufacturedDate: "2023-07-10T00:00:00Z",
    },
    ipr: null, // Will display as 'N/A'
  },
  {
    productInformation: {
      productName: "Ibuprofen 200mg",
    },
    manufacturerInformation: {
      manufacturedDate: "2023-06-20T00:00:00Z",
    },
    ipr: "IPR-003-IBU",
  },
  {
    productInformation: {
      productName: "Amoxicillin 500mg",
    },
    manufacturerInformation: {
      manufacturedDate: "2023-05-05T00:00:00Z",
    },
    ipr: "IPR-004-AMX",
  },
  {
    productInformation: {
      productName: "Ciprofloxacin 250mg",
    },
    manufacturerInformation: {
      manufacturedDate: "2023-04-12T00:00:00Z",
    },
    ipr: undefined, // Will display as 'N/A'
  },
  {
    productInformation: {
      productName: "Metformin 850mg",
    },
    manufacturerInformation: {
      manufacturedDate: "2023-03-18T00:00:00Z",
    },
    ipr: "IPR-006-MET",
  },
  {
    productInformation: {
      productName: "Lisinopril 10mg",
    },
    manufacturerInformation: {
      manufacturedDate: "2023-02-25T00:00:00Z",
    },
    ipr: "IPR-007-LIS",
  },
  {
    productInformation: {
      productName: "Omeprazole 20mg",
    },
    manufacturerInformation: {
      manufacturedDate: "2023-01-30T00:00:00Z",
    },
    ipr: null, // Will display as 'N/A'
  },
  {
    productInformation: {
      productName: "Atorvastatin 40mg",
    },
    manufacturerInformation: {
      manufacturedDate: "2022-12-15T00:00:00Z",
    },
    ipr: "IPR-009-ATO",
  },
  {
    productInformation: {
      productName: "Losartan 50mg",
    },
    manufacturerInformation: {
      manufacturedDate: "2022-11-20T00:00:00Z",
    },
    ipr: "IPR-010-LOS",
  },
];

export default function AllProduct() {
  const [products, setProducts] = useState(product);

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
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left">Product Name</th>
            <th className="px-4 py-3 text-left">Manufactured Date</th>
            <th className="px-4 py-3 text-left">IPR</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              {/* Access nested properties */}
              <td className="border px-4 py-2 text-sm">
                {product.productInformation.productName}
              </td>
              <td className="border px-4 py-2 text-sm">
                {new Date(
                  product.manufacturerInformation.manufacturedDate
                ).toDateString()}
              </td>
              <td className="border px-4 py-2 text-sm">
                {product.ipr || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
