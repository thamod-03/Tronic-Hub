import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import useApp from "../hooks/useApp";
import useOrder from "../hooks/useOrder";

const OrderCard = ({ order }) => {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-GB");
  const { capitalizeWords } = useApp();
  const { cancelUserOrder } = useOrder();
  
  const handleCancelOrder = async () => {
    const data = await cancelUserOrder(order._id);
    if (data.success) toast.success(data.message);
    else toast.error(data.message);
  };

  return (
    <div
      key={order._id}
      className="w-full max-w-4xl rounded-md border border-gray-300 text-gray-800 p-5 mb-6 bg-white shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-6 md:items-center">
        <div className="flex gap-4">
          <img
            className="w-12 h-12 object-cover opacity-60 shrink-0"
            src={assets.boxIcon}
            alt="boxIcon"
          />
          <div className="flex flex-col gap-1 max-h-auto overflow-y-auto pr-2">
            {order.items.map((item, index) => (
              <p key={index} className="font-medium text-sm truncate">
                {item.product?.name ? item.product?.name.toUpperCase() : "Product has removed"}
                {' '}
                <span
                  className={`text-blue-500 ${
                    item.quantity < 2 || !(item.product?.name) ? "hidden" : ""
                  }`}
                >
                  x {item.quantity}
                </span>
              </p>
            ))}
          </div>
        </div>

        <div className="text-sm wrap-break-words">
          <p className="font-medium mb-1">{order.shippingAddress.fullName}</p>
          <p>
            {order.shippingAddress.addressLine}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.phone}
          </p>
        </div>

        <p className="font-medium text-base text-black/70">
          LKR {order.totalPrice.toFixed(2)}
        </p>

        <div className="flex flex-col text-sm gap-1">
          <p>Method: {order.type.toUpperCase()}</p>
          <p>Date: {formattedDate}</p>
          <p>Status: {capitalizeWords(order.status)}</p>

          {order.type === "cod" && order.status === "pending" && (
            <button
              onClick={handleCancelOrder}
              className="mt-2 px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded transition"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
