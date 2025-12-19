
const AdminOrderCard = ({ order, onStatusChange, onView }) => {
  return (
    <tr className="border-t border-gray-500/20">
      <td className="px-4 py-3 truncate">{order._id}</td>
      <td className="px-4 py-3">
        {order.user?.name} ({order.user?.email})
      </td>
      <td className="px-4 py-3">LKR {order.totalPrice}</td>
      <td className="px-4 py-3">
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order._id, e.target.value)}
          className="border rounded px-2 py-1"
        >
          {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-3">{order.type}</td>
      <td className="px-4 py-3 flex gap-2">
        <button
          onClick={() => onView(order._id)}
          className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default AdminOrderCard;
