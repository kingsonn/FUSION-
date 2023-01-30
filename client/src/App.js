import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import { Link } from "react-router-dom";
import {store} from "./utils/store";
import StorageService from "./utils/StorageService";
import { hydrate} from "./utils/cartSlice"
import Footer from "./components/Footer";

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
