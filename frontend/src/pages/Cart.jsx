import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
    <h1 className="text-2xl font-semibold mb-4 p-4 ">Shopping Cart</h1> 
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
           
            <div className="flex flex-col md:flex-col lg:flex-row w-[96%] md:w-[60%] lg:w-[100%] mx-auto">
             

              {cartItems.map((item) => (
                <div key={item._id} className="lg:flex items-enter mb-[1rem] pb-2 justify-between ">
                  <div className="lg:w-[60%] h-[30]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex justify-between w-[100] lg:block my-6">
                    <Link to={`/product/${item._id}`} className="text-pink-500 pt-1">
                      {item.name}
                    </Link>

                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className="mt-2 text-white font-bold">
                      $ {item.price}
                    </div>
                  </div>

                  <div className="flex lg:pt-8   justify-between ">
                    <select
                      className="w-ful p-1 h-fit border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>

                    <div>
                    <button
                      className="text-red-500 mr-[2rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[1rem] lg:mt-0" />
                    </button>
                  </div>
                </div>
                  </div>

                 
              ))}

              
              
            </div>
           
          </>
        )}
        
      </div>

      <div className="mt-8 w-[40re]">
                <div className="p-4 rounded-lg flex justify-center gap-16">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="text-2xl font-bold">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>

                </div>
                
              </div>

      <div className="mx-auto w-[80%] lg:w-[30%]">
      <button
                    className="bg-pink-500 mt-4 py-2 px-4  rounded-full text-lg w-[100%] mx-auto"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
      </div>
     
    </>
  );
};

export default Cart;
