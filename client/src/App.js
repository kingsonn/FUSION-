import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import { Link } from "react-router-dom";

function Footer() {

  const gmailHandler = () => {
    window.open(
      "mailto:" +
      "hansonnnnnnn@gmail.com" +
      "?subject=" +
      " " +
      "&body=" +
      " ",
      "_self"
    );
  };
  return (
    <div className="bg-gradient-to-br from-orange-400 to-orange-500 py-8 px-6 text-black  lg:text-base text-sm">
      <div className="max-w-screen-xl w-full mx-auto">
        <div className="flex justify-between items-center">
          <div  className="flex items-center lg:space-x-8 space-x-4" >
          
              <span onClick={gmailHandler} className=" test-black cursor-pointer hover:text-black">Email</span>
                <a href="https://github.com/kingsonn" className="cursor-pointer hover:text-black">Github</a>
          </div>
                
          
        </div>
        <p className="mt-6 text-black text-center flex items-center flex-wrap justify-center">
        © 2023, Built by<span className="text-black hover:underline ml-2">Hanson Braganza
          </span>
        </p>
      </div>
    </div>
  );
}

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
        <Footer/>
    </AnimatePresence>
  );
};

export default App;
