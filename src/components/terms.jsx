import React from "react";
import Header from "./header";
import Footer from "./Footer";

function Terms(params) {
    return(
        <div>
     <Header/>
     <div>
  <div className="flex justify-center text-2xl font-bold tracking-tight mt-6">
    <h1>Terms and Conditions</h1>
  </div>
  
  <div className="w-[90%] md:w-[80%] lg:w-[90%] m-auto">
    <h1 className="font-bold mt-11">1. Introduction</h1>
    <p className="mt-2 tracking-tight">
      - These terms and conditions outline the rules and regulations for the use of Medscan's website and services.
    </p>
    <p className="mt-2 tracking-tight">
      - By accessing this website, you accept these terms and conditions in full. If you disagree with any part, please do not use Medscan's website.
    </p>
    
    <h1 className="font-bold mt-4">2. Intellectual Property Rights</h1>
    <p className="mt-2 tracking-tight">
      - Unless otherwise stated, Medscan and/or its licensors own the intellectual property rights for all material on the Medscan website.
    </p>
    <p className="mt-2 tracking-tight">
      - You may view, download, and print pages from the website for your personal use, subject to restrictions set in these terms and conditions.
    </p>
    
    <h1 className="font-bold mt-4">3. Use of the Website</h1>
    <p className="mt-2 tracking-tight">- You must not:</p>
    
    <div className="ml-7">
      <p>- Republish material from Medscan’s website.</p>
      <p>- Sell, rent, or sub-license material from the website.</p>
      <p>- Reproduce, duplicate, or copy material for commercial purposes.</p>
      <p>- Redistribute content from Medscan, except for content specifically made available for redistribution.</p>
    </div>

    <h1 className="font-bold mt-4">4. User Obligations</h1>
    <p className="mt-2 tracking-tight">
      - You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
    </p>
    <p className="mt-2 tracking-tight">
      - You must not use the website in any manner that could damage, disable, overburden, or impair Medscan’s servers or networks.
    </p>

    <h1 className="font-bold mt-4">5. Privacy Policy</h1>
    <p className="mt-2 tracking-tight">
      - Medscan is committed to protecting your privacy. Any personal information collected will be handled in accordance with our [Privacy Policy].
    </p>
    <p className="mt-2 tracking-tight">
      - By using the website, you consent to the collection and use of information as outlined in the Privacy Policy.
    </p>

    <h1 className="font-bold mt-4">6. Limitation of Liability</h1>
    <p className="mt-2 tracking-tight">
      - Medscan shall not be liable for any indirect, incidental, special, or consequential damages arising from your use or inability to use the website.
    </p>
    <p className="mt-2 tracking-tight">
      - While Medscan endeavors to ensure the accuracy of the information on the website, we do not warrant its completeness or accuracy.
    </p>

    <h1 className="font-bold mt-4">7. Links to Third-Party Sites</h1>
    <p className="mt-2 tracking-tight">
      - The website may contain links to third-party websites that are not controlled by Medscan. We are not responsible for the content or privacy practices of these websites.
    </p>
    <p className="mt-2 tracking-tight">
      - You acknowledge and agree that Medscan is not responsible or liable for the availability or accuracy of such external sites.
    </p>

    <h1 className="font-bold mt-4">8. Modification of Terms</h1>
    <p className="mt-2 tracking-tight">
      - Medscan reserves the right to modify these terms and conditions at any time. Any changes will be posted on this page, and it is your responsibility to review them periodically.
    </p>
    <p className="mt-2 tracking-tight">
      - Your continued use of the website after any changes constitutes acceptance of the new terms.
    </p>

    <h1 className="font-bold mt-4">9. Governing Law</h1>
    <p className="mt-2 tracking-tight">
      - These terms and conditions are governed by and construed in accordance with the laws of the World, and you submit to the exclusive jurisdiction of the courts in that state.
    </p>

    <h1 className="font-bold mt-4">10. Contact Information</h1>
    <p className="mt-2 tracking-tight">
      - For any questions or concerns about these terms and conditions, please contact us at support@medscan.africa.
    </p>
  </div>
</div>
<div className="w-full mt-10">
        <Footer />
      </div>
        </div>
    )
}

export default Terms