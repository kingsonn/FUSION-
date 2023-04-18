import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer, Orders, Success } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import { Link } from "react-router-dom";
import {store} from "./utils/store";
import StorageService from "./utils/StorageService";
import { hydrate} from "./utils/cartSlice"
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./components/Admin";
import Mood from "./components/Mood";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    // console.log("heell")
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
    // console.log(foodItems)
  };
  useEffect(() => {
    store.subscribe(() => {
        StorageService.set("cart", JSON.stringify(store.getState().cart));
    });
    let cart = StorageService.get("cart");
    cart = cart ? JSON.parse(cart) : { items: [] };
    store.dispatch(hydrate(cart));
}, []);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
            <ToastContainer limit={4} />
    
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/orders" element={<Orders/>}/> 
            <Route path="/success" element={<Success/>}/> 
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/mood" element={<Mood/>} />
          </Routes>
        </main>
      </div>
        <Footer/>
    </AnimatePresence>
  );
};

export default App;
