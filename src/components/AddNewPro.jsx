import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import { jwtDecode } from 'jwt-decode';
import { useGetUserQuery } from "../Helper/Apis/UseFetch";





export default function AddNewPro() {
  const navigate = useNavigate();

  const { data } = useGetUserQuery();

  const [formData, setFormData] = useState({
    manufacturerName: "",
    productName: "",
    productCategory: "",
    productDescription: "",
    // issn: "",
    manufacturedDate: "",
    expiryDate: "",
    nafdacRegistration: "",
    howManyPackage: "",
    productsPerPackage: "",
    currentHumidity: "",
    currentTemperature: "",
    productComponent: "",
  });

  const [pdfUrl, setPdfUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing from localStorage");
      return;
    }
  
    // Decode the token to get the userId
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
  
      if (!userId) {
        console.error("User ID is missing from token");
        return;
      }
  
      console.log("Token from localStorage:", token);
      console.log("UserId:", userId);
  
      // Ensure all required fields are included
      const productData = {
        manufacturerInformation: {
          manufacturerName: formData.manufacturerName,
          nafdacRegistration: formData.nafdacRegistration,
          manufacturedDate: formData.manufacturedDate,
          expiryDate: formData.expiryDate,
        },
        productInformation: {
          productName: formData.productName,
          productCategory: formData.productCategory,
          productDescription: formData.productDescription,
          // issn: formData.issn,
        },
        packageInformation: {
          howManyPackage: formData.howManyPackage,
          productsPerPackage: formData.productsPerPackage,
          currentHumidity: formData.currentHumidity,
          currentTemperature: formData.currentTemperature,
          productComponent: formData.productComponent,
        },
        userId: userId,
      };
  
      console.log("productData:", productData);
  
      try {
        const response = await fetch("https://medscan-backend.vercel.app/api/products/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        });
  
        if (response.status === 201) {
          // const data = await response.json()
          const data = await response.json();
            console.log("Response data:", data);
          console.log("<<<<<<<<<<<<<<<<<<Data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
          console.log("Response from backend:",data);
          console.log("<<<<<<<<<<<<<<<<<<Data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
          console.log("Product added successfully");
          setFormData({
            manufacturerName: "",
            productName: "",
            productCategory: "",
            productDescription: "",
            // issn: "",
            manufacturedDate: "",
            expiryDate: "",
            nafdacRegistration: "",
            howManyPackage: "",
            productsPerPackage: "",
            currentHumidity: "",
            currentTemperature: "",
            productComponent: "",
          });
           // Extract pdfUrl from the response
            // Log the entire response object
          console.log("Full response:", response);

          if (data && data.pdfUrl) {
            // Download the PDF
            downloadPdf(data.pdfUrl);
          } else {
            console.error("PDF URL is not available");
          }
        } else {
          console.error("Failed to add product");
        }
      } catch (error) {
        console.error("Error:", error.response?.data?.message || error.message);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleDownloadAndNavigate = async () => {
  //   if (pdfUrl) {
  //     try {
  //       const response = await axios.get(`https://meds-scan-backend.vercel.app/${pdfUrl}`, {
  //         responseType: 'blob',
  //       });
  //       const blob = new Blob([response.data], { type: 'application/pdf' });
  //       saveAs(blob, 'product_codes.pdf');
  //       navigate('/dashboard');
  //     } catch (error) {
  //       console.error('Error downloading the PDF:', error);
  //     }
  //   }
  // };
  // Function to handle downloading the PDF
  const downloadPdf = async (url) => {
    try {
      const response = await axios.get(url, {
        responseType: "blob", // Ensures the response is treated as a file
      });
  
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "product_codes.pdf"; // You can customize the filename
      link.click();
  
      // Clean up the URL object
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading the PDF:", error);
    }
  };

  return (
    <div className="text-2xl md:mx-20">
      <h1 className="md:mt-16 mt-4 text-2xl font-bold">
        Register New Product To Blockchain
      </h1>
      <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
        {/* Manufacturer Name */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base"> Name : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="manufacturerName"
            type="text"
            placeholder="Manufacturer Name"
            value={formData.manufacturerName}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* Product Name */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Product Name : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="productName"
            type="text"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* Product Category */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Product Category:</div>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="productCategory"
              value="Pharmaceuticals/ Drugs"
              checked={formData.productCategory === 'Pharmaceuticals/ Drugs'}
              onChange={handleInputChange}
              className="text-sm"
            />
            Pharmaceuticals/ Drugs
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="productCategory"
              value="Foods & Beverages"
              checked={formData.productCategory === 'Foods & Beverages'}
              onChange={handleInputChange}
              className="text-sm"
            />
            Foods & Beverages
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="productCategory"
              value="Cosmetics"
              checked={formData.productCategory === 'Cosmetics'}
              onChange={handleInputChange}
              className="text-sm"
            />
            Cosmetics
          </label>
        </section>


        {/* Product Description */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Product Description : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="productDescription"
            type="text"
            placeholder="Product Description"
            value={formData.productDescription}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* ISSN */}
        {/* <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">ISSN : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="issn"
            type="text"
            placeholder="ISSN"
            value={formData.issn}
            onChange={handleInputChange}
            required
          />
        </section> */}

        {/* Manufactured Date */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base"> Manufactured Date : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="manufacturedDate"
            type="date"
            placeholder="Manufactured Date"
            value={formData.manufacturedDate}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* Expiry Date */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Expiry Date : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="expiryDate"
            type="date"
            placeholder="Expiry Date"
            value={formData.expiryDate}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* Nafdac Registration Number */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Nafdac Registration Number : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="nafdacRegistration"
            type="text"
            placeholder="NAFDAC Registration"
            value={formData.nafdacRegistration}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* How Many Packages */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">How Many : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="howManyPackage"
            type="text"
            placeholder="How many Package"
            value={formData.howManyPackage}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* Units Per Package */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Units Per Package : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="productsPerPackage"
            type="text"
            placeholder="Units Per Package"
            value={formData.productsPerPackage}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* Current Humidity */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Humidity in Celcius : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="currentHumidity"
            type="text"
            placeholder="Current Humidity in Celcius"
            value={formData.currentHumidity}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* Current Temperature */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Temperature in Celcius : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="currentTemperature"
            type="text"
            placeholder="Current Temperature in Celcius"
            value={formData.currentTemperature}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* Product Components */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Product Components : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="productComponent"
            type="text"
            placeholder="Product Components"
            value={formData.productComponent}
            onChange={handleInputChange}
            required
          />
        </section>

          {/* Submit button */}
        {data?. is_kyc_verified ?(
          <button
            className="bg-blue-700 w-[300px] py-2 px-4 text-sm text-white rounded-xl mt-4"
            type="submit"
          >
            Register
          </button>
        ) : (
          <p className="text-red-500 mt-4">
            Verify your KYC to register a product 
          </p>
        )}
      </form>

      {/* Download Button */}
      {pdfUrl && (
        <button
          className="bg-green-700 py-2 px-4 text-sm text-white rounded-xl mt-4"
          onClick={handleDownloadAndNavigate}
        >
          Download PDF & Go to Dashboard
        </button>
      )}
    </div>
  );
}