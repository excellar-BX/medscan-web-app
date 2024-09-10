import { QrCode } from "@mui/icons-material";
import QRCode from "react-qr-code";
import { useEffect,useState,useRef } from "react";

const Index =(props)=>{
    const {qrCodeDetails,setQrcodeDetails} = props
    const contentRef = useRef();
    console.log('QrCode',qrCodeDetails)

    useEffect(()=>{
            handlePrint();
    },[])

    const product = {
        name: 'Sample Product',
        description: 'This is a description of the sample product.',
        price: '$19.99',
        qrValue: 'https://example.com/product/sample-product', // URL or data for QR code
      };

    const handlePrint = () => {
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
              </style>
            </head>
            <body>
              <h4>Product Information</h4>
              <div class="product-info">
                <h2>${qrCodeDetails?.productInformation?.productName}</h2>
                <p>${qrCodeDetails.productInformation?.productDescription}</p>
               
              </div>
              <div class="qrcode">${contentRef.current.innerHTML}</div>
            </body>
          </html>
        `);
        setQrcodeDetails(null)
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    
      };
    


    return (
        <div  ref={contentRef} className="w-[100px] h-[100px]">
                <QRCode value={qrCodeDetails._id}/>
        </div>
            
    )
}

export default Index;
