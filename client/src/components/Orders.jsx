import React from "react";
import { getOrders } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { useEffect, useState } from "react";
import CartContainer from "./CartContainer";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import empty from "../img/empty.svg"
import authentication from "../img/authentication.svg"

const Orders = () => {
const [{user}] = useStateValue();
const [order, setorder] = useState();
const [{cartShow }, dispatch] = useStateValue();
useEffect(() => {}, [cartShow]);

const fetchData = async () => {
    await getOrders(user.email).then((data) => {
        console.log(data)
        setorder(data)
   });
  };
useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <div className=" heightFix px-6">
        <main className="max-w-screen-xl mx-auto md:py-20 py-12 pb-20">
          <h1 className="sm:text-2xl text-xl font-semibold border-b-2 mb-2 pb-4 border-gray-200 text-gray-700 h-full">
            Your Orders
          </h1>
          {user ? (
            <>
              <h2 className="font-medium text-lg  my-2 text-primary-light">
                {order ? (
                  <>
                    <span className="font-semibold text-xl mr-2">
                      {order?.length}
                    </span>
                    Orders
                  </>
                ) : (
                  <Skeleton width={100} />
                )}
              </h2>
         <div >
        {order ? (
                order.length ? (
    <div className="mt-5 space-y-6">
        {order?.map((order,i)=>(
    <div>
        <div className="w-full space-x-2">
        { order.order_status.status ? (
          <div
            className={`border border-b-0 xs:text-sm text-xs px-4 py-2 rounded-t-md  ${order.order_status.status === "cancelled"
                ? "bg-red-500"
                : order.order_status.status !== "Ready"
                  ? "bg-blue-500"
                  : "bg-green-500"
              } text-white inline-block capitalize`}
          >
            {order.order_status.status}
          </div>
        ) : (
          <></>
        )}
        
      </div>
            <div className={"relative border rounded-md rounded-tl-none cursor-pointer hover:shadow-sm bg-white overflow-hidden "}  key={`categoriv${i}`}>
                <div className="sm:p-6 p-4 bg-gray-100 sm:text-sm text-xs text-gray-600">
             <p className="sm:absolute sm:top-2 sm:right-2 sm:w-56 lg:w-72 truncate text-xs whitespace-nowrap sm:mb-0 mb-2 font-medium">
              ORDER # <span className="text-green-500">{order.order_ID}</span>
            </p>
            <div className="flex sm:items-center sm:gap-6 gap-1 sm:flex-row flex-col">
              <div className="flex items-center sm:gap-6 gap-4">
                <div>
                  <p className="font-bold text-xs">ORDER PLACED</p>
                  <p>{moment(order.timestamp).format("DD MMM YYYY")}</p>
                </div>
                <div>
                  <p className="text-xs font-bold">TOTAL</p>
                  <p className="text-xs font-bold text-red-500">
                    {parseInt(order.total/100)}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-xs">Time</p>
                 {order.time==""? <p>Instant</p>: <p className="text-xs font-bold text-red-500">{order.time}</p>} 
                </div>
              </div>
              <p className="lg:text-xl md:text-lg sm:text-base text-sm font-medium  whitespace-nowrap  self-end flex-1 text-right text-blue-500">
                {order.items?.length} items
              </p>
            </div>
            </div>
            <div className="sm:p-6 p-4">
            <div className="flex space-x-6 overflow-x-auto py-4 hideScrollBar">
              {order?.items?.map((item) => (
                <img
                  key={`item-img-${item?.Item_id}`}
                  className="h-20 object-contain sm:h-32"
                  src={item?.Image}
                  alt=""
                  loading="lazy"
                />
              ))}
            </div>
          </div>
            </div>
          </div>  
        ))}
        </div>
         ) : (
            <div className="h-full flex items-center justify-center mt-16 sm:w-auto w-3/4 mx-auto sm:max-w-xs ">
              <img
                src={empty}
                width={300}
                height={300}
                alt=""
                className="w-300 h-300 contain"
                objectFit="contain"
              />
            </div>
          )
          ) : (
            <Skeleton count={12} />
          )}
      
           {cartShow && <CartContainer />}

    </div>
    </>
    ) : (
            <>
              <div className="text-center sm:text-lg text-base  font-medium mt-12">
                <h2>
                  Please
                  <span
                    className=" text-primary-light mx-2"
                  
                  >
                    login
                  </span>
                  in to view your orders.
                </h2>
                <div className="md:max-w-none max-w-xs sm:w-auto w-3/4 mx-auto">
                  <img
                    src={authentication}
                    width={450}
                    height={450}
                    alt=""
                    className="w-450 h-450"
                  />
                </div>
              </div>
            </>
          )}
    </main>
    </div>
    </>
  );
};

export default Orders;
