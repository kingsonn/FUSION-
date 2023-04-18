import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import Spinner from "./Spinner/Spinner";
const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const dispatch = useDispatch();
  const addItemToCart = (Item_id, Item_name, Price, Description, Category, Image) => {
    //Sending the Dish as an action to the REDUX store... the cart slice
    dispatch(
      addToCart({
        Item_id,
        Item_name,
        Price,
        Description,
        Category,
        Image,
        qty: 1,
        toast: true,
      })
    );
  };
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);
  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-300 h-[250px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item.Image}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => addItemToCart(item.Item_id, item.Item_name, item.Price, item.Description, item.Category, item.Image)}
              >
                <MdShoppingBasket className=" text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.Item_name}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.Description } 
              </p>
              <div className="mt-2 flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">₹</span> {item?.Price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
         <Spinner/>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
