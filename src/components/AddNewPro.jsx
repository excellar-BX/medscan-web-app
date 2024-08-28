import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';

export default function AddNewPro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    manufacturerName: "",
    productName: "",
    productCategory: "",
    productDescription: "",
    // issn: "",
    manufacturedDate: "",
    expiryDate: "",
    batchNumber: "",
    nafdacRegistration: "",
    quantityPerPackage: "",
    howManyPackage: "",
    productsPerPackage: "",
    currentHumidity: "",
    currentTemperature: "",
    productComponent: "",
  });

  const [pdfUrl, setPdfUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID is missing from localStorage");
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
      },
    };

    try {
      const response = await axios.post(
        "https://meds-scan-backend.vercel.app/api/products/create",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Product added successfully");
        setFormData({
          manufacturerName: "",
          productName: "",
          productCategory: "",
          productDescription: "",
          // issn: "",
          manufacturedDate: "",
          expiryDate: "",
          batchNumber: "",
          nafdacRegistration: "",
          quantityPerPackage: "",
          howManyPackage: "",
          productsPerPackage: "",
          currentHumidity: "",
          currentTemperature: "",
          productComponent: "",
        });
        setPdfUrl(response.data.pdfPath);
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDownloadAndNavigate = async () => {
    if (pdfUrl) {
      try {
        const response = await axios.get(`https://meds-scan-backend.vercel.app/${pdfUrl}`, {
          responseType: 'blob',
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, 'product_codes.pdf');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error downloading the PDF:', error);
      }
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
          <div className="text-base">Product Category : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="productCategory"
            type="text"
            placeholder="Product Category"
            value={formData.productCategory}
            onChange={handleInputChange}
            required
          />
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

        {/* Batch Number */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Batch Number : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="batchNumber"
            type="text"
            placeholder="Batch Number"
            value={formData.batchNumber}
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

        {/* Quantity Per Package */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Quantity : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="quantityPerPackage"
            type="text"
            placeholder="Quantity Per Package"
            value={formData.quantityPerPackage}
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

        {/* Products Per Package */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Products Per Package : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="productsPerPackage"
            type="text"
            placeholder="Products Per Package"
            value={formData.productsPerPackage}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* Current Humidity */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Humidity : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="currentHumidity"
            type="text"
            placeholder="Current Humidity"
            value={formData.currentHumidity}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* Current Temperature */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Temperature : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="currentTemperature"
            type="text"
            placeholder="Current Temperature"
            value={formData.currentTemperature}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* Product Component */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Product Component : </div>
          <input
            className="px-3 py-2 text-sm rounded-xl"
            name="productComponent"
            type="text"
            placeholder="Product Component"
            value={formData.productComponent}
            onChange={handleInputChange}
            required
          />
        </section>

        {/* Submit Button */}
        <button
          className="bg-blue-700 w-[300px]  py-2 px-4 text-sm text-white rounded-xl mt-4"
          type="submit"
        >
          Register
        </button>
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