
import { Button, Image } from "antd";
import QRCode from "qrcode";
import { useEffect,useState,useRef } from "react";

const Index =(props)=>{
    const {qrCodeDetails,setQrcodeDetails} = props
    const [qrCodeImages, setQrCodeImages] = useState([]);
    const contentRef = useRef();
    
  
  

    useEffect(() => {
      if (qrCodeDetails) {
        generateQRCodeImages();
      }
    }, [qrCodeDetails]);

//     useEffect(()=>{
//       if(qrCodeDetails && qrCodeImages ){
//         handlePrint();
//       }
      
// },[qrCodeDetails])

useEffect(() => {
  console.log(qrCodeDetails)
  if (qrCodeImages.length > 0) {
    handlePrint();  // Automatically trigger printing once images are generated
  }
}, [qrCodeImages]); 
  
    const generateQRCodeImages = async () => {
      const images = await Promise.all(
        qrCodeDetails.packageInformation.productCodes.map(async (code) => {
          try {
            return await QRCode.toDataURL(code);
          } catch (err) {
            console.error(err);
            return null;
          }
        })
      );
     
      setQrCodeImages(images);
    };

   
    const handlePrint = async () => {
      if (!qrCodeImages.length) {
        await generateQRCodeImages();  // Ensure images are generated
      }
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
                text-align: center;
              }
              h1 {
                color: #333;
              }
              .product-info {
                margin-bottom: 20px;
              }
              .qrcode {
                margin: 20px 0;
              }
              .qr-code-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
              }
              .qr-code-item {
                width: 30%;
                margin: 10px;
                text-align: center;
                border: 1px solid #ccc;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
            </style>
          </head>
          <body>
            <div class="qr-code-container">
              ${QrCodeCard()}
            </div>
          </body>
        </html>
      `);
      setQrcodeDetails(null);

      printWindow.document.close();
      printWindow.focus();
  
      // Wait for the window to fully load all content before printing
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };

      // printWindow.document.close();
      // printWindow.print();
      // printWindow.close();
    };
    
    const QrCodeCard = () => {
      return qrCodeDetails?.packageInformation?.productCodes.map((code, index) => {
        const productName = qrCodeDetails?.productInformation?.productName || 'Unknown Product';
        const productDescription = qrCodeDetails?.productInformation?.productDescription || 'No Description';
        
        const qrImage = qrCodeImages[index];
       
        return `
          <div class="qr-code-item" style="width:30%; margin: 10px; text-align: center;">
            <h4>Product Information</h4>
            <div class="product-info">
              <h4>${productName}</h4>
              <p>${productDescription}</p>
              <p>${code}</p>
            </div>
           
              ${qrImage ? `<img src="${qrImage}"/>` : `<p>No QR Code available</p>`}
          </div>`;
      }).join(''); 
    };


    
   return (
    <div>
    {/* Render QR Code Cards for on-screen viewing */}
    <div className="qr-code-container">
      {qrCodeDetails?.packageInformation?.productCodes.map((code, index) => {
        const productName = qrCodeDetails?.productInformation?.productName || 'Unknown Product';
        const productDescription = qrCodeDetails?.productInformation?.productDescription || 'No Description';
        const qrImage = qrCodeImages[index];

        return (
          <div key={index} className="qr-code-item" style={{ width: '30%', margin: '10px', textAlign: 'center' }}>
            <h4>Product Information</h4>
            <div className="product-info">
              <h2>{productName}</h2>
              <p>{productDescription}</p>
            </div>
            {qrImage ? <img src={qrImage} alt="QR Code" style={{ width: '100%' }} /> : <p>No QR Code available</p>}
          </div>
        );
      })}
    </div>

    {/* <button onClick={handlePrint}>Print QR Codes</button> */}
  </div>
   )
  
}

export default Index;
