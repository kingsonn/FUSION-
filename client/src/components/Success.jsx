import { CheckCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";

function Success() {

  return (
    <>
      <head>
        <title>Zinger | Order Placed Successfully</title>
      </head>
      <div className="h-screen relative bg-gray-100  flex items-center sm:px-6">
        <main className="max-w-screen-lg mx-auto">
          <div className="flex flex-col md:p-10 sm:p-8 p-6 bg-white shadow-md rounded-md">
            <div className="flex items-center space-x-2 mb-5">
              <CheckCircleIcon className="text-green-500 lg:h-10 md:h-8 h-6" />
              <h1 className="sm:text-2xl xxs:text-xl text-lg font-medium ml-2">
                Order Placed Successfully
              </h1>
            </div>
            <p className="sm:text-base text-sm">
              Thank you for shopping with us. Your order will be delivered soon.
            </p>
            <Link to={"/orders"}><button
              className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg mt-8"
            
            >
              Go to my orders
            </button></Link>
          </div>
        </main>
      </div>
    </>
  );
}

export default Success;
