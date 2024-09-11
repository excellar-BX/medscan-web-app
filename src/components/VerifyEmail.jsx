import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logi from "../assets/images/image 2.png";
import bgImage from "../assets/images/login-img.jpg";
import "../App.css";
import { useSendEmailMutation, useVerifyEmailMutation } from "../Helper/Apis/UseMutate";
import { Alert, CircularProgress, Snackbar } from "@mui/material";

export default function VerifyEmail() {
  const { search } = useLocation();
  const email = new URLSearchParams(search).get("email");
  const token = new URLSearchParams(search).get("token");
  const navigate = useNavigate();
  const [verifyEmail,{isLoading, isSuccess, isError}] = useVerifyEmailMutation();
  const [sendEmail] = useSendEmailMutation();
  const [message, setMessage] = useState("");
  useEffect(() => {
    verifyEmail({email,token}).unwrap().then(()=>{
        setMessage("verification successfull");
        navigate("/logoption");
    }).catch((err)=>{
        setMessage(err?.message ?? "an unexpected error ocurred");
        sendEmail({email}).unwrap().then(()=>{
            navigate(`/send-email?email=${email}`);
        }).catch(()=>{
            navigate("/logoption");
        })
    })
  }, [email,token]);

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
           <CircularProgress />
          </div>
        </div>
      </div>
    </div>
  );
}
