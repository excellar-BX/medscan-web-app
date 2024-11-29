import React from 'react'
import img1 from "../assets/images/Group11.png"
import img2 from "../assets/images/Group13.png"
import img3 from "../assets/images/Group14.png"

const WhyMedscan = () => {
  return (
    <div className='p-5 bg-[#F5F5F5] my-10 mx-10'>
      <h2 className='text-center text-3xl text-[#3E59E8] font-semibold my-10 '>Why MedScan</h2>
      <div className=' flex flex-col md:flex-row justify-center items-center h-full'>
        <div className='w-full md:w-1/3 p-5'>
          <div className='flex flex-col text-center items-center space-y-3 justify-center'>
            <img src={img1} alt="" height={75} width={75} />
            <h3 className='font-semibold text-2xl'>Partnership</h3>
            <p className='mx-0 md:mx-10 text-[#3F3D3D]'>Designed specifically for the Nigerian market, addressing local challenges and opportunities.</p>
          </div>
        </div>
        <div className='w-full md:w-1/3 p-5'>
          <div className='flex flex-col text-center items-center space-y-3 justify-center'>
            <img src={img2} alt="" height={75} width={75} />
            <h3 className='font-semibold text-2xl'>Real time monitoring</h3>
            <p className=' text-[#3F3D3D]'>Collaborating with key stakeholders including local manufacturers and regulatory bodies to drive industry-wide change.</p>
          </div>
        </div>
        <div className='w-full md:w-1/3 p-5'>
          <div className='flex flex-col text-center items-center space-y-3 justify-center'>
            <img src={img3} alt="" height={75} width={75} />
            <h3 className='font-semibold text-2xl'>Innovation</h3>
            <p className='mx-0 md:mx-10 text-[#3F3D3D]'>Continuously improving our technology to stay ahead of counterfeit threats and ensure the highest standards of product safety</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyMedscan