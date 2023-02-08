import React from "react";
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
      <div className="relative bottom-auto bg-gradient-to-br from-orange-400 to-orange-500 py-8 px-6 text-black  lg:text-base text-sm">
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

  export default Footer