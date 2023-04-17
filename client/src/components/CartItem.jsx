import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateQty, removeFromCart} from "../utils/cartSlice";

const CartItem = ({  Item_id,
  item,
  Item_name,
  Price,
  Description,
  Category,
  Image,
  qty,
  border,
  disabled, }) => {
  const dispatch = useDispatch();
  const total = Price * qty;
  const removeItemFromCart = () => dispatch(removeFromCart({ Item_id }));
  const incQty = () =>{
  dispatch(
    updateQty({
      Item_id,
      Item_name,
      Price,
      Description,
      Category,
      Image,
      qty: qty + 1,
    })
  );
  
}

const decQty = () =>{
  dispatch(
    updateQty({
      Item_id,
      Item_name,
      Price,
      Description,
      Category,
      Image,
      qty: qty - 1,
    })
  );
}

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
     
        src={Image}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{Item_name}</p>
        <p className="text-sm block text-gray-300 font-semibold">
        ₹ {total}
        </p>
      </div>

      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={decQty}
        >
          <BiMinus className="text-gray-50 " />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={incQty}
        >
          <BiPlus className="text-gray-50 " />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
