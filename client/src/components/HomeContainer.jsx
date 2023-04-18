import React from "react";
import Fade from "react-reveal/Fade";
import circle from "../img/circle.svg"
const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className="py-1 flex-1 flex flex-col items-start justify-center gap-6">
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

        <div  className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          Are you 
          <p>Hungry?</p>
          <p className="text-orange-600 text-[3rem] lg:text-[5rem]">
            Dont Wait!
          </p>
        </div>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
          eaque fugit distinctio est nam voluptatum architecto, porro iusto
          deserunt recusandae ipsa minus eos sunt, dolores illo repellat facere
          suscipit!
        </p>

        <button
        style={{zIndex:3}}
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>
    
    </section>
    
  );
};

export default HomeContainer;
