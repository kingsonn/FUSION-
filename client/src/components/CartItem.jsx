import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateQty, removeFromCart} from "../utils/cartSlice";

const CartItem = ({  _id,
  item,
  title,
  price,
  description,
  category,
  image,
  qty,
  border,
  disabled, }) => {
  const dispatch = useDispatch();
  const total = price * qty;
  const removeItemFromCart = () => dispatch(removeFromCart({ _id }));
  const incQty = () =>{
  dispatch(
    updateQty({
      _id,
      title,
      price,
      description,
      category,
      image,
      qty: qty + 1,
    })
  );
  
}

const decQty = () =>{
  dispatch(
    updateQty({
      _id,
      title,
      price,
      description,
      category,
      image,
      qty: qty - 1,
    })
  );
}

  // const [{ cartItems }, dispatch] = useStateValue();
  // const [qty, setQty] = useState(item.qty);

  // const cartDispatch = () => {
  //   localStorage.setItem("cartItems", JSON.stringify(items));
  //   dispatch({
  //     type: actionType.SET_CARTITEMS,
  //     cartItems: items,
  //   });
  // };

  // const updateQty = (action, id) => {
  //   if (action == "add") {
  //     setQty(qty + 1);
  //     cartItems.map((item) => {
  //       if (item.id === id) {
  //         item.qty += 1;
  //         setFlag(flag + 1);
  //       }
  //     });
  //     cartDispatch();
  //   } else {
  //     // initial state value is one so you need to check if 1 then remove it
  //     if (qty == 1) {
  //       items = cartItems.filter((item) => item.id !== id);
  //       setFlag(flag + 1);
  //       cartDispatch();
  //     } else {
  //       setQty(qty - 1);
  //       cartItems.map((item) => {
  //         if (item.id === id) {
  //           item.qty -= 1;
  //           setFlag(flag + 1);
  //         }
  //       });
  //       cartDispatch();
  //     }
  //   }
  // };

  // useEffect(() => {
  //   items = cartItems;
  // }, [qty, items]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
     
        src={image}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{title}</p>
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
