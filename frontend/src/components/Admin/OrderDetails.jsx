
const OrderDetails = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Order Details</h3>
          <p>
            <strong>User:</strong> {order.user?.name} ({order.user?.email})
          </p>
          <p>
            <strong>Address:</strong> {order.shippingAddress.fullName},{" "}
            {order.shippingAddress.addressLine}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode}
          </p>
          <p>
            <strong>Phone:</strong> {order.shippingAddress.phone}
          </p>
          <p>
            <strong>Total Price:</strong> LKR {order.totalPrice}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Type:</strong> {order.type}
          </p>

          <h4 className="mt-4 font-semibold">Items</h4>
          <ul className="list-disc pl-5">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.product?.name.toUpperCase()} ×{" "}
                {item.quantity} — LKR {item.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
