import { Link } from 'react-router-dom'
import group1 from '../assets/images/Group 11.png'
import group2 from '../assets/images/Group 13.png'
import group3 from '../assets/images/Group 14.png'
import group4 from '../assets/images/Rectangle 12our-mission-img-1.png'
import group5 from '../assets/images/Rectangle 17our-miss-2.png'
 import '../App.css'
export default function OurService() {
  return (
    <div className='my-20 sm:mx-40 mx-10'>
        <h1 className='text-center font-serif  font-extrabold text-3xl justify-center'>What We Do</h1>
  <div className=' sm:flex-col mb-10 flex-wrap md:justify-center flex md:flex-row items-center'>
  <div className='px-6 shadow-md py-8 max-w-xl'>
    <img src={group1} alt="" />
    <h3 className='py-5 font-bold'>Blockchain Technology</h3>
    <p className='text-lg'>
      MedScan utilizes blockchain technology to create an immutable, tamper-proof record of every transaction in the supply chain.
    </p>
  </div>
  <div className='px-6 shadow-md py-8 max-w-xl'>
    <img src={group2} alt="" />
    <h3 className='py-5 font-bold'>Real-Time Monitoring</h3>
    <p className='text-lg'>
      Our platform provides real-time monitoring, smart contract automation, and end-to-end traceability, making it easier to detect and eliminate counterfeit products.
    </p>
  </div>
  <div className='px-6 shadow-md py-8 max-w-xl'>
    <img src={group3} alt="" />
    <h3 className='py-5 font-bold'>Permission Network</h3>
    <p className='text-lg'>
      Grant access only to authorized personnel.
    </p>
    
  </div>
</div>



         <div className="flex h-1/2 flex-col">
    <img src={group4} alt="" className=''/>
    <div className="uppercase tracking-wide mt-10 text-xl text-indigo-500 font-bold">Our Mission</div>
    <div className='flex relative justify-between'>
        <p className="mt-2 text-gray-500 text-2xl md:w-[800px] sm:w-[400px] ">Our mission is to combat counterfeit products and enhance customer trust by providing a secure, transparent and efficient supply chain solution. We strive to safeguard public health and bolster the economy by ensuring that only genuine, high-quality products reach the market.</p>
       
        <img className=" h-72 ml-10 absolute lg:w-60 right-0 bottom-0 -top-24 object-cover " src={group5} alt="Mission Image"/>
    
    </div>
</div>

       <h1 className='text-center font-serif font-extrabold text-3xl mt-16'>Why MedScan?</h1>
        <div className=' md:flex-row flex-wrap md:justify-center flex sm:flex-col py-8 gap-6 '>
            <div className='px-6 shadow-md py-8 max-w-xl'>
                <img src={group1} alt="" />
                <h3 className=' py-5 font-bold'>Tailored Solutions</h3>
                <p className=' text-lg'>MedScan Utilizes blockchain technology to create immutable, tamper-roofrecord of every transaction in the supply chain.</p>
            </div>
            <div className='px-6 shadow-md py-8 max-w-xl'>
                <img src={group2} alt="" />
                <h3 className=' py-5 font-bold'>Partnerships</h3>
                <p className=' text-lg'>Our platform provides real-time monitoring, smart contract automation and end-to-end traceability, making it easier to detect and eliminate counterfeit products.</p>
            </div>
            <div className='px-6 shadow-md py-8 max-w-xl flex-grow'>
                <img src={group3} alt="" />
                <h3 className=' py-5 font-bold'>Innovation</h3>
               <p className=' text-lg'>Grant access only to authorized</p>
            </div>
        </div>
    </div>
  )
}
