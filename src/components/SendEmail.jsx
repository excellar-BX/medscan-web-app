import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logi from "../assets/images/image 2.png";
import bgImage from "../assets/images/login-img.jpg";
import "../App.css";
import { useSendEmailMutation } from "../Helper/Apis/UseMutate";
import { Alert, Snackbar } from "@mui/material";

export default function SendEmail() {
  const { search } = useLocation();
  const email = new URLSearchParams(search).get("email");
  const [sendEmail,{isLoading, isSuccess, isError}] = useSendEmailMutation();
  const [counter,setCounter] = useState(60);
  const [message, setMessage] = useState("");
  const resendEmail = (email) => {
    sendEmail({email}).unwrap().then(()=>{
        setMessage("Email verification sent");
        setCounter(60);
    }).catch((err)=>{
        setMessage(err?.data?.message ?? "An unexpected error ocurred");
    })
  }
  useEffect(() => {
    const timer = setInterval(() => {
        setCounter((prev)=> (prev > 0 ? prev - 1 : 0))
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [counter])

  return (
    <div className="flex h-screen overflow-hidden">
      <Snackbar
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
        open={Boolean(message)}
        autoHideDuration={6000}
      >
        <Alert
          onClose={(
            event,
            reason,
          ) => {
            if (reason === 'clickaway') {
              return;
            }
            setMessage("")
          }}
          severity={isSuccess?"success":"error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      <div className="w-full h-full">
        <div className="relative h-full flex">
          <img
            src={bgImage}
            alt=""
            className="w-full absolute z-20 object-cover"
          />
          <div className="lg:w-[50%] w-0 flex justify-center items-center h-full relative z-40">
            <img src={logi} alt="" className="top-0 z-40 contrast-200 w-44" />
          </div>

          <div className="lg:w-[50%] w-full bg-white p-12 rounded-l-[10px] flex flex-col items-center h-full relative z-40">
            <h3 className="py-5 font-[800] text-[30px]">Verify Email</h3>
            <p className="text-center md:text-[22px] md:w-[497px]">
              An Email verification link have been sent to the provided email address please verify to complete registration.
              Didn't get an email? click "Resend" button below
            </p>
            <div className="flex md:flex-row flex-col justify-center md:gap-14 gap-12 lg:py-24 py-8 w-full">
              <button onClick={()=>resendEmail(email)} type="submit" disabled={isLoading || counter>1} className="w-full bg-[#0084FC] text-white py-2 rounded-lg">
                {isLoading? 'Loading...' : `Resend ${counter > 1?`in ${counter}`:""}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
