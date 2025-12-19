import { useState } from "react";
import OrderCard from "../components/OrderCard";
import useOrder from "../hooks/useOrder";
import EmptyOrder from "../components/EmptyOrder";

const OrdersPage = () => {
  const { orders } = useOrder();
  const [page, setPage] = useState(1);

  const limit = 5;
  const initialIndex = limit * (page - 1);
  const lastIndex = limit * page - 1;
  const filderedOrders = orders.slice(initialIndex, lastIndex + 1);
  const pages = Math.ceil(orders.length / limit);

  if(!orders.length) return <EmptyOrder />

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
      {filderedOrders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
      <div className="flex justify-center gap-4 mt-6 mb-4">
        <button
          disabled={page === 1}
          className="px-4 py-2 bg-blue-200 rounded disabled:opacity-50 cursor-pointer"
          onClick={() => {
            if (page !== 1) setPage(page - 1);
          }}
        >
          Prev
        </button>
        <span className="mt-2">
          Page {page} of {pages}
        </span>
        <button
          disabled={page === pages}
          className="px-4 py-2 bg-blue-200 rounded disabled:opacity-50 cursor-pointer"
          onClick={() => {
            if (page !== pages) setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;
