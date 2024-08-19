
import '../App.css'
import Footer from './Footer'
import OurService from './OurService'
import { Link } from 'react-router-dom'
export default function Welcomepage() {
  return (
    <>
    <div className='welcome  p-8' >
        <div className=' text-white text-center '>
            <h2 className='text-3xl font-bold py-5'>SAFE PRODUCTS, SECURE FUTURE</h2>
            <p className='leading-snug text-xl font-mono'>Forefront of transforming the supply chain landscape in Nigeria, focusing on the critical sectors of drugs, food
and beverages. Leveraging advanced blockchain technology, we ensure the integrity,transparency
and safety of products from production to consumption  </p>
<Link className=''>Contact Us</Link>
        </div>
    </div>
    <OurService/>

    <div className='meds md:h-80 sm:h-[700px]'>
      <div className=' mx-6 py-12'>
     <p className=' w-1/2 mt-12 text-white font-serif'>At MedScan,we believe in the power of technology to create safer and more transparent supply chains. Join us in our mission to protect consumers and promote genuine products in Nigeria.</p>
    <p className=' mt-10 text-white'>Download the MedScan App available on Android and iOS devices. </p>
      </div>
    </div>
    <Footer />
    </>

  )
}
