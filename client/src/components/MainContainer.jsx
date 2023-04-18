import React, { useEffect, useRef, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
import axios from "axios";
import Spinner from "./Spinner/Spinner";
import { getPopularFoodItems } from "../utils/firebaseFunctions";
const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  const [hehe, sethehe] = useState();
  let items= []

  useEffect(() => {}, [scrollValue, cartShow]);
  const fetchData = async () => {
    const popular_df = await axios.post("https://66e0-2401-4900-56db-fec0-583c-b15d-2f7c-4567.ngrok-free.app/getpopular")
    console.log(popular_df.data)
    for(let i=0; i< popular_df.data.length;i++){
      await getPopularFoodItems(popular_df.data[i]).then((data) => {
     items.push(data[0])
   });
    }
    sethehe(items)
   };
  ;
useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">

      <HomeContainer />

      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-bold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Most Popular
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        {hehe? (
          <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={hehe}
        />
        ):(<>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Spinner/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        </>)
        
      }
        
      </section>

      <MenuContainer />

      {cartShow && <CartContainer />}

    </div>
  );
};

export default MainContainer;
