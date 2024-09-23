/* eslint-disable no-unused-vars */
// import React from 'react'

import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import CustomizedSteppers from "./Stepper";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast } from "react-toastify";
import { patchRequest } from "../../api/api";

const PaymentOfParticipation = () => {
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const getCookie = (name) => {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };
    const jwtToken = getCookie("jwt_auth_token");
    if (jwtToken) {
      setToken(jwtToken);
    } else {
      console.log("JWT Token not found in cookies");
    }
  }, []);
  const launchRazorPay = () => {
    let options = {
      key: "rzp_test_UR1RXcKK4NZyYp",
      amount: 100 * 100,
      currency: "INR",
      name: "G Sort",
      description: "Movie purchase or rental",
      image:
        "https://i.ibb.co/zPBYW3H/imgbin-bookmyshow-office-android-ticket-png.png",
      handler: (response) => {
        const payId = response.razorpay_payment_id;
        setPaymentId(payId);
        setConfirmPayment(true);
        if (payId) {
          patchRequest(
            `/players/create_team/${id}`,
            { verified: true, payment_id: payId },
            token
          )
            .then((data) => {
              toast.success("Operation was successful!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
                // navigate(`/organizer/register/add-members/${id}`);
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                console.error("API error: Invalid Creedentials");
                toast.error("Error", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              } else {
                console.error("API error:", error);
              }
            });
        }
      },
      theme: { color: "#ff9800" },
    };
    let razorPay = window.Razorpay(options);
    razorPay.open();
  };

  function Success() {
    return (
      <div>
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-6xl">
            <CheckCircleOutlineIcon
              fontSize="inherit"
              className="text-green-400"
            />
          </p>
          <p className="font-poppins text-xl">Payment Succesfully</p>
          <p>Payment ID: {paymentId}</p>
          <p className="font-poppins text-sm text-gray-600">
            Now you can add players to the tournament
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 bg-white shadow-md rounded-lg py-5 px-4">
      <div className="w-full">
        <CustomizedSteppers step={1} />
      </div>
      {confirmPayment ? (
        <>
          <Success />
          <div className="w-full flex flex-row  items-center justify-center pt-10 gap-4">
            <div className="text-xl w-full flex items-end justify-center">
              <Button size="lg" color="orange">
                Download Receipt
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 mx-auto rounded-lg py-14 my-4">
              <div className="flex flex-col text-center w-full  ">
                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                  Participation Fees
                </h1>
              </div>
              <div className="">
                <div className="p-4 w-full">
                  <div className="h-full p-6 rounded-lg  flex flex-col relative overflow-hidden">
                    <h2 className="text-sm tracking-widest title-font mb-4 border-b pb-1 border-gray-300 font-medium">
                      100 To Be Paid
                    </h2>
                  
                    
                    <button
                      onClick={launchRazorPay}
                      className="flex items-center mt-auto text-white bg-orange-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
                    >
                      Procced To pay
                      <svg
                        fill="none"
                        stroke="currentColor"
                        className="w-4 h-4 ml-auto text-white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <div className="w-full flex flex-row  items-center justify-between lg:justify-between gap-4 ">
        <Button
          color="orange"
          onClick={() => navigate(`/organizer/register/player-details`)}
        >
          Prev
        </Button>
        <Button
          color="orange"
          onClick={() => navigate(`/organizer/register/add-members/${id}`)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaymentOfParticipation;
