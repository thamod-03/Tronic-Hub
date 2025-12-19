import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AdminOrderCard from "../../components/Admin/AdminOrderCard";
import OrderDetails from "../../components/Admin/OrderDetails";
import useOrder from "../../hooks/useOrder";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { fetchAllOrders, updateOrderStatusAdmin, fetchOrderById } = useOrder();
  const rowsPerPage = 20;

  useEffect(() => {
    const reloadOrders = async () => {
      const data = await fetchAllOrders();
      if (data.success) setOrders(data.orders);
    };
    reloadOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    const res = await updateOrderStatusAdmin(id, status);
    if (res.success) {
      Swal.fire("Updated!", res.message, "success");
      setOrders(orders.map((o) => (o._id === id ? { ...o, status } : o)));
    } else {
      Swal.fire("Error!", res.message, "error");
    }
  };

  const handleView = async (id) => {
    const res = await fetchOrderById(id);
    if (res.success) {
      setSelectedOrder(res.order);
    } else {
      Swal.fire("Error!", res.message, "error");
    }
  };

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentOrders = orders.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(orders.length / rowsPerPage);

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Orders</h2>

        <div className="flex flex-col items-center max-w-6xl w-full rounded-md bg-white border border-gray-500/20">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y scroll-auto">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">Order ID</th>
                  <th className="px-4 py-3 font-semibold">User</th>
                  <th className="px-4 py-3 font-semibold">Total Price</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {currentOrders.map((order) => (
                  <AdminOrderCard
                    key={order._id}
                    order={order}
                    onStatusChange={handleStatusChange}
                    onView={handleView}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 py-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default AdminOrder;
