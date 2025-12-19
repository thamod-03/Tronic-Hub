import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useState } from "react";
import EmptyCart from "../components/EmptyCart";
import useOrder from "../hooks/useOrder";
import { toast } from "react-toastify";
import useApp from "../hooks/useApp";

const CartPage = () => {
  const { cart, updateItem, removeItem, clear } = useCart();
  const { placeOrder } = useOrder();
  const { navigate } = useApp();

  const [option, setOption] = useState("cod");
  const [address, setAddress] = useState({
    fullName: "",
    addressLine: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const items = cart?.items || [];

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.newPrice * item.quantity,
    0
  );
  const tax = subtotal * 0.02;
  const shipping = option === "pickme" ? 0 : 350;
  const total = subtotal + tax + shipping;

  const handleSelectChange = (e) => {
    setOption(e.target.value);
  };

  const handlePlaceOrder = async () => {
    const result = await placeOrder(address, option);

    if (result.success) {
      toast.success("Order has placed successfully");
      window.location.href = "/orders"
    } else {
      toast.error(`Failed to place order: ${result.message}`);
    }
  };

  if (!items.length) {
    return <EmptyCart />;
  }

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <div className="flex justify-between pr-16 mb-8">
          <h1 className="text-3xl font-medium mb-6">
            Shopping Cart{" "}
            <span className="text-sm text-blue-500">{items.length} Items</span>
          </h1>
          <button
            onClick={() => clear()}
            className="bg-blue-500 text-white rounded-xl px-4 py-2 h-10 font-semibold hover:bg-blue-600 transition"
          >
            Clear
          </button>
        </div>
        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {items.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div className="w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                <img
                  className="max-w-full h-full object-cover"
                  src={
                    item.product.imageUrl || "https://i.imgur.com/EJLFNOw.png"
                  }
                  alt={item.product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">
                  {item.product.name.toUpperCase()}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() =>
                      updateItem(item.product._id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateItem(item.product._id, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.product.stock}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <p className="text-center">
              LKR {(item.product.newPrice * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeItem(item.product._id)}
              className="cursor-pointer mx-auto text-red-500"
            >
              Remove
            </button>
          </div>
        ))}

        <Link
          to="/products"
          className="group flex items-center mt-8 gap-2 text-blue-500 font-medium"
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#615fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </Link>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <form className="space-y-3 mt-2">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
              value={address.fullName}
              onChange={(e) =>
                setAddress({ ...address, fullName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Street Address"
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
              value={address.addressLine}
              onChange={(e) =>
                setAddress({ ...address, addressLine: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
              value={address.postalCode}
              onChange={(e) =>
                setAddress({ ...address, postalCode: e.target.value })
              }
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
              value={address.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
            />
          </form>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            onChange={handleSelectChange}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="cod">Cash On Delivery</option>
            <option value="pickme">Pick Me Flash</option>
            <option value="online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>LKR {subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">
              {shipping === 0 ? "Free" : `LKR ${shipping}`}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>LKR {tax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>LKR {total.toFixed(2)}</span>
          </p>
          {option === "pickme" && (
            <p className="text-sm text-red-500 font-semibold">
              Note: Shipping Fee varying according to the location and time. You
              have to pay it to the PickMe agent.
            </p>
          )}
        </div>

        <button onClick={handlePlaceOrder} className="w-full py-3 mt-6 bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
