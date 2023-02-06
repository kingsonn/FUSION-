import React, {useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { emptyCart, selectItems, selectTotal } from "../utils/cartSlice";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { loadStripe } from "@stripe/stripe-js";
import NormalToast from "../utils/Toast/NormalToast";

const stripePromise = loadStripe('pk_test_51MWG4bSIlus8ySuKYDlTWGGBW8xk6LHYgBRNu8LP9l1WutzVPZF4F86Fs6e1kbbmDNBs5avspCzo7ffJy929fi4f00NpPatsfC');

const CartContainer = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const dispatcha = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [time, setTime] = useState("");
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  // console.log(user.email)
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };


const createCheckoutSession = async () => {
  setDisabled(true);
  const today= new Date()
  const currentTime= today.getHours() + ':' + parseInt(today.getMinutes() +30)
  const startTime = "09:00";
  const endTime = "18:00";
  console.log(time==""||(currentTime<time && time>=startTime && time<=endTime))
  const a= 1
  if(time==""||(currentTime<time && time>=startTime && time<=endTime)){
  try {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("https://346d-2401-4900-1c97-96f5-fe8a-782d-f572-b000.in.ngrok.io/create-checkout-session", {
      items: items,
      email: user.email,
      time: time,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
      console.error(result.error.message);
    }
    console.log(checkoutSession.data.id)
  } catch (err) {
    console.error(err);
    alert(err);
  }
  setDisabled(false);
}
else{
 NormalToast("Select approprite order time or cancel for immediate order", true)
 setDisabled(false)
};
}

const handleChange = (event) => {
  setTime(event.target.value);
};
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={() => dispatcha(emptyCart())}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {items && items.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart Items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Item */}
            {items &&
              items.length > 0 &&
              items.map((item,i) => (
                <CartItem
                  key={item._id}
                  _id={item?._id}
                  item={item}
                    title={item?.title}
                    price={item?.price}
                    description={""}
                    category={item?.category}
                    image={item.image}
                    qty={item?.qty}
                    border={i !== items?.length - 1}
                    disabled={disabled}
                />
              ))}
          </div>


          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                {user? (
                    <div className="flex py-full px-full">
                    <label htmlFor="time-input" className=" text-white font-m mr-2">
                      Select<br/>time:
                    </label>
                    <input
                      type="time"
                      id="time-input"
                      value={time}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-500"
                    />
                    <motion.button whileTap={{ scale: 0.75 }} className=" ml-1.5 text-white" onClick={()=>setTime("")}>Cancel</motion.button>
                  </div>
                ):()=>{}}
            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
              ₹{total}
              </p>
            </div>

            {user ? (
              
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                onClick={createCheckoutSession}
                
                className={`${!disabled?"w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg": "w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 opacity-40 text-gray-50 text-lg my-2 hover:shadow-lg"}`}
              >
                
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
