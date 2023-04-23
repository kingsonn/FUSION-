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
import { getOrders } from "../utils/firebaseFunctions";
import { getPopularFoodItems } from "../utils/firebaseFunctions";
const Rec = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  const [{user}] = useStateValue();
  const [yolo, setyolo] = useState();
  const [hehe, sethehe] = useState();
  const [haha, sethaha] = useState();
  let items= []
  let rec =[]
  useEffect(() => {}, [scrollValue, cartShow]);
  const fetchData = async () => {
    const bang =await getOrders(user.email).then((data) => {
            //   console.log(data)
              return data
         });
        if(bang.length>0){
            setyolo(1)
        }
      
    const popular_df = await axios.post("https://mkmkm-cxj46yitqa-uc.a.run.app/recommend",{
        yo: bang[0].items[0].Item_name
    })
    for(let i=0; i< popular_df.data.length;i++){
      await getPopularFoodItems(popular_df.data[i]).then((data) => {
     items.push(data[0])
   });
    }
    sethehe(items)
   };
  ;

  // const fetchR = async () => {
  //   await getOrders(user.email).then((data) => {
  //       console.log(data)
  //       setyolo(data[0])
  //  });
  //  console.log(yolo)
  // }
  //  if(yolo){
  //   console.log(yolo)
  //    const r = await axios.post("https://66e0-2401-4900-56db-fec0-583c-b15d-2f7c-4567.ngrok-free.app/recommend",{
  //    yo: yolo
  //   }
  //   )
  //   console.log(r.data)
  //  }
//    for(let i=0; i< r.data.length;i++){
//     await getPopularFoodItems(r.data[i]).then((data) => {
//    rec.push(data[0])
//  });
//   }
//   sethaha(rec)
  
useEffect(() => {
    fetchData();
    // fetchR()
  }, []);





  return (
    <>
{yolo?(
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-bold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
           Recommended for you!
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
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">Generating recommendations for you</p>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        </>)
        
      }
        
      </section>
):(<></>)}
</>
  );
};

export default Rec;
