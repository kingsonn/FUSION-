import { toast } from "react-toastify";


const addedToCartToast = (image, title) => {
  toast(
    <div className="flex text-gray-800 gap-4">
      <div className="w-3/12 my-auto">
        <img
          src={image}
          width={40}
          height={40}
          alt=""
          objectFit="cover"
          className="min-w-auto w-40 cover "
        />
      </div>
      <div className="w-full">
        <h3 className="font-bold">Added to cart</h3>
        <p className="text-sm mb-2 capitalize">
          {title.slice(0, 22)}
          {title.length > 22 ? "…" : ""}
        </p>
        
          {/* <button className="px-8 py-2 w-full flex items-center bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg justify-center button">
             Checkout
          </button> */}
      
      </div>
    </div>,

    {
      position: "top-right",
      autoClose: 6000,
      style: {
        backgroundColor: "white",
        color: "#1f2937",
        fontFamily: "Poppins, sans-serif",
        height: "auto",
      },
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: true,
      draggablePercent: 25,
    }
  );
};

export default addedToCartToast;
