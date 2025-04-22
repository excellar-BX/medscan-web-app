import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import { jwtDecode } from 'jwt-decode';
import { useGetUserQuery } from "../Helper/Apis/UseFetch";
import { message } from "antd";
import PrintQrCode from '../Helper/PrintOut'
import { BASE_URL } from "../constant/ServerUrl";

export default function AddNewPro() {
  const navigate = useNavigate();
  const { data } = useGetUserQuery();

  const [formData, setFormData] = useState({
    manufacturerName: "",
    productName: "",
    productCategory: "",
    productDescription: "",
    manufacturedDate: "",
    expiryDate: "",
    nafdacRegistration: "",
    howManyPackage: "",
    productsPerPackage: "",
    currentHumidity: "",
    currentTemperature: "",
    productComponent: "",
    batchNumber: "",
    howManyBatches: ""
  });

  const [loading, setLoading] = useState(false);
  const [qrCodeDetails, setQrcodeDetails] = useState(null);
  const [pdfUrl, setPdfUrl] = useState()
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [buttonText, setButtonText] = useState('Download PDF')

  const generateProductCodes = (totalProducts) => {
    const codes = [];
    for (let i = 0; i < totalProducts; i++) {
      const array = new Uint8Array(8); // 8 bytes for a 16-character hex code
      window.crypto.getRandomValues(array);
      const uniqueCode = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
      codes.push(uniqueCode);
    }
    return codes;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing from localStorage");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      if (!userId) {
        console.error("User ID is missing from token");
        return;
      }

      const productCodesArray = generateProductCodes(formData.howManyPackage * formData.productsPerPackage);

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
          productCode: productCodesArray[0],  //i had errors while passing all the value here that is why i picked one 
          manufacturer: "i dont know ",
          store: "60f8b2f71c9d3d3456b4f1e0"// Example valid ObjectId
        },
        packageInformation: {
          batchNumber: formData.batchNumber,
          howManyBatches: formData.howManyBatches,
          howManyPackage: formData.howManyPackage,
          productsPerPackage: formData.productsPerPackage,
          currentHumidity: formData.currentHumidity,
          currentTemperature: formData.currentTemperature,
          productComponent: formData.productComponent,
        },
        userId: userId,
      };

      setLoading(true);

      const response = await fetch(`${BASE_URL}/products/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.status === 201) {
        const data = await response.json();
        setLoading(false);
        message.success("Product Successfully Added");

        setFormData({
          manufacturerName: "",
          productName: "",
          productCategory: "",
          productDescription: "",
          manufacturedDate: "",
          expiryDate: "",
          nafdacRegistration: "",
          howManyPackage: "",
          productsPerPackage: "",
          currentHumidity: "",
          currentTemperature: "",
          productComponent: "",
          batchNumber: "",
          howManyBatches: ""
        });

        setQrcodeDetails(data.product);  // Store product data for QR code
        console.log(data.pdfUrl)
        setPdfUrl(data.pdfUrl); // Set the PDF URL for download
        setButtonText('Download PDF')
      } else {
        setLoading(false);
        message.error('Failed to add product');
        console.error("Failed to add product");
      }

     
    } catch (error) {
      setLoading(false);
      message.error(error.message || "An error occurred");
      console.error("Error:", error.message || error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleDownloadPdf = async () => {
    if (!pdfUrl) {
      console.error("PDF URL is not available");
      setButtonText('PDF Not Available')
      return;
    }

    setButtonText('Checking PDF Status...')

    try {
      const fullUrl = pdfUrl.startsWith('https') ? pdfUrl : `https://medscan-backend-4lgk.onrender.com${pdfUrl}`;
      const response = await axios.get(fullUrl, { responseType: 'blob' })
      console.log("Response:", response.data)

      const contentType = response.data.type;
      if(contentType === 'application/pdf'){
        const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url;
      link.setAttribute('download',  "product_codes.pdf"); //for customised name
      document.body.appendChild(link)
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url)
      console.log("DownLoaded PDF Sucessfully");
      setIsGenerating(false)
      setButtonText('DownLoad PDF')
      }else{
        const text = await response.data.message.text().catch(() => null);
        console.log("Text response:", text)
        if(text.includes('Generating')){
          console.log('PDF still generating', text)
          setIsGenerating(true)
          setButtonText("Generating PDF...Please wait")
        }else{
          console.log("Unexpected text response:", text)
        }
      }

      
    } catch (error) {
        console.error("Error downloading the PDF:", error);
        setButtonText('Download Failed, Try Again');
    }
  
  //   try {
  //     const fullUrl = pdfUrl.startsWith('https') ? pdfUrl : `'https://medscan-backend-4lgk.onrender.com'${pdfUrl}`;
  //     const response = await axios.get(fullUrl, { responseType: 'blob' });
  //     const data = await response.json();
  //     console.log(data)// just to check if its still generating or generated

  //     //this is to check if the pdf is still generating, by attempting to read the response
  //     const text = await response.data.text().catch(() =>nulll);

  //     if (text && text.includes("Generating")){
  //       setIsGenerating(true)
  //       setButtonText('Generating PDF..., please wait');
  //       return;
  //     }


  //     const blob = new Blob([response.data], { type: 'application/pdf' });
  //     const link = document.createElement("a");
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = "product_codes.pdf"; //for customised name
  //     link.click();
  //     window.URL.revokeObjectURL(link.href);
  //     setIsGenerating(false)
  //     setButtonText('DownLoad PDF')
  //   } catch (error) {
  //     console.error("Error downloading the PDF:", error);
  //     setButtonText('Download Failed, Try Again');
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // }


  // const downloadPdf = async (url) => {
  //   try {
  //     const fullUrl = url.startsWith('https') ? url : `${BASE_URL}/${url}`;
  //     const response = await axios.get(fullUrl, { responseType: "blob" });
  //     const blob = new Blob([response.data], { type: "application/pdf" });
  //     const link = document.createElement("a");
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = "product_codes.pdf";
  //     link.click();
  //     window.URL.revokeObjectURL(link.href);
  //   } catch (error) {
  //     console.error("Error downloading the PDF:", error);
  //   }
 };

  const handleQRcode = (productDetails) => {
    setQrcodeDetails(productDetails);
  };

  return (
    <div className="text-2xl pb-40 md:mx-20">
      {qrCodeDetails && <PrintQrCode qrCodeDetails={qrCodeDetails} setQrcodeDetails={setQrcodeDetails} />}
      <h1 className="md:mt-16 mt-4 text-2xl font-bold">Register New Product To Blockchain</h1>
      <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
        {/* Manufacturer Name */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Name:</div>
          <input className="px-3 py-2 text-sm rounded-xl" name="manufacturerName" type="text" placeholder="Manufacturer Name" value={formData.manufacturerName} onChange={handleInputChange} required />
        </section>

        {/* Product Name */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Product Name:</div>
          <input className="px-3 py-2 text-sm rounded-xl" name="productName" type="text" placeholder="Product Name" value={formData.productName} onChange={handleInputChange} required />
        </section>

        {/* Product Category */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Product Category:</div>
          <label className="flex items-center gap-2">
            <input type="radio" name="productCategory" value="Pharmaceuticals/ Drugs" checked={formData.productCategory === 'Pharmaceuticals/ Drugs'} onChange={handleInputChange} />
            Pharmaceuticals/ Drugs
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="productCategory" value="Foods & Beverages" checked={formData.productCategory === 'Foods & Beverages'} onChange={handleInputChange} />
            Foods & Beverages
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="productCategory" value="Cosmetics" checked={formData.productCategory === 'Cosmetics'} onChange={handleInputChange} />
            Cosmetics
          </label>
        </section>

        {/* Product Description */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Product Description:</div>
          <input className="px-3 py-2 text-sm rounded-xl" name="productDescription" type="text" placeholder="Product Description" value={formData.productDescription} onChange={handleInputChange} required />
        </section>

        {/* Manufactured Date */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Manufactured Date:</div>
          <input className="px-3 py-2 text-sm rounded-xl" name="manufacturedDate" type="date" value={formData.manufacturedDate} onChange={handleInputChange} required />
        </section>

        {/* Expiry Date */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Expiry Date:</div>
          <input className="px-3 py-2 text-sm rounded-xl" name="expiryDate" type="date" value={formData.expiryDate} onChange={handleInputChange} required />
        </section>

        {/* Nafdac Registration Number */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Nafdac Registration Number:</div>
          <input className="px-3 py-2 text-sm rounded-xl" name="nafdacRegistration" type="text" placeholder="NAFDAC Registration" value={formData.nafdacRegistration} onChange={handleInputChange} required />
        </section>

        {/* Package Information */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">How many Packages:</div>
          <input className="px-3 py-2 text-sm rounded-xl" name="howManyPackage" type="number" placeholder="How many Packages" value={formData.howManyPackage} onChange={handleInputChange} required />
        </section>

        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Products per Package:</div>
          <input className="px-3 py-2 text-sm rounded-xl" name="productsPerPackage" type="number" placeholder="Products per Package" value={formData.productsPerPackage} onChange={handleInputChange} required />
        </section>

        {/* Humidity and Temperature */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Current Humidity:</div>
          <input className="px-3 py-2 text-sm rounded-xl" name="currentHumidity" type="number" placeholder="Current Humidity" value={formData.currentHumidity} onChange={handleInputChange} required />
        </section>

        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Current Temperature:</div>
          <input className="px-3 py-2 text-sm rounded-xl" name="currentTemperature" type="number" placeholder="Current Temperature" value={formData.currentTemperature} onChange={handleInputChange} required />
        </section>

        {/* Product Component */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Product Component:</div>
          <input className="px-3 py-2 text-sm rounded-xl" name="productComponent" type="text" placeholder="Product Component" value={formData.productComponent} onChange={handleInputChange} required />
        </section>

        {/* Batch Number */}
        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">Batch Number:</div>
          <input className="px-3 py-2 text-sm rounded-xl" name="batchNumber" type="text" placeholder="Batch Number" value={formData.batchNumber} onChange={handleInputChange} required />
        </section>

        <section className="py-2 text-base flex-col flex justify-center gap-2">
          <div className="text-base">How many Batches:</div>
          <input className="px-3 py-2 text-sm rounded-xl" name="howManyBatches" type="number" placeholder="How many Batches" value={formData.howManyBatches} onChange={handleInputChange} required />
        </section>

        <button type="submit" className="bg-blue-700 w-[300px] py-2 px-4 text-sm text-white rounded-xl mt-4" disabled={loading}>
          {loading ? "Please wait" : "Register"}
        </button>
      </form>

      {/* Conditionally render the download button */}
      {pdfUrl&& (
        <button onClick={handleDownloadPdf} disabled={isGenerating || isDownloading} className="w-full py-2 mt-4 text-white bg-green-500 rounded-lg" >
          {buttonText}
        </button>
      )}
     
    </div>
  );
}
