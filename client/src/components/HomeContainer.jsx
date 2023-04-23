import React from "react";
import Fade from "react-reveal/Fade";
import circle from "../img/circle.svg"
import { useStateValue } from "../context/StateProvider";

const HomeContainer = () => {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  // console.log(user.displayName.substring(0, user.displayName.indexOf(' ')))
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className="py-0 flex-1 flex flex-col items-start justify-center gap-2">
      <div style={{zIndex:-0}} className="absolute lg:-bottom-60 -bottom-72 lg:-left-44 -left-80  object-contain overflow-hidden">
        <Fade left>
        <img src={circle} alt="" width={400} height={400} />
        </Fade>
      </div>

      <div style={{zIndex:-0}} className="absolute top-16 lg:left-72 left-60 lg:w-auto sm:w-10 w-8 object-contain overflow-hidden">
        <Fade top>
        <img src={circle} alt="" width={80} height={80} />
        </Fade>
      </div>

        <div  className="text-[2rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          Are you 
          <p>hungry {user? <span className="text-orange-600">{user.displayName.substring(0, user.displayName.indexOf(' '))}</span>: ""}?</p>
          <p className="text-orange-600 text-[3rem] lg:text-[5rem]">
            Dont Wait!
          </p>
        </div>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
        Welcome to our online food canteen! With our user-friendly interface, you can easily browse through the college menu, customize your order, and have it ready for pickup at your convenience. Place your order now and treat yourself to the college's  food without leaving the comfort of your own class!
        </p>

        <button
        style={{zIndex:3}}
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          {user? "Order Now": "Log in to order"}
        </button>
      </div>
    
    </section>
    
  );
};

export default HomeContainer;
