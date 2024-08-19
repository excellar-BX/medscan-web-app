import { Link } from "react-router-dom";
 import logi from '../assets/images/image 2.png'
 import '../App.css'

export default function SignOption() {
  return (
    <div className=" flex">
     <div className="login-image h-[700px] w-1/2 flex justify-center items-center">
  <img src={logi} alt="" className="contrast-200 w-44" />
</div>
      <div className="w-1/2 bg-[#FFFFFF] rounded-2xl text-center ">
        <h1 className=" text-center text-2xl font-extrabold mb-8 m"> Login Your Account</h1>
        <h4 className=" mb-20">Kindly click on one of the categories below and provide all valid information as required.</h4>
       <div className=" flex flex-wrap justify-center gap-14">
         <Link to="./logDistributor" className=" py-16 px-10 shadow-md">Manufacturer </Link>
          <Link to="./logDistributor" className=" py-16 px-10 shadow-md">Distributor</Link>
           <Link to="./logDistributor" className="py-16 px-16 shadow-md">Store</Link>
       </div>
      </div>
    </div>
  )
}
