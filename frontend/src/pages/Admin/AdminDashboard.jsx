import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useOrder from "../../hooks/useOrder";
import useProduct from "../../hooks/useProduct";
import OrderStatusChart from "../../components/Admin/OrderStatusChart";
import MonthlyRevenueChart from "../../components/Admin/MonthlyRevenueChart";
import Loading from "../../components/Loading";

const AdminDashboard = () => {
  const { fetchUserCount } = useAuth();
  const { fetchOrderStats, fetchRevenue, fetchAllOrders } = useOrder();
  const { fetchProductStats } = useProduct();

  const [isLoading, setIsLoading] = useState(true);
  const [userCount, setUserCount] = useState(null);
  const [orderStats, setOrderStats] = useState({});
  const [orderCount, setOrderCount] = useState(null);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [productCount, setProductCount] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const userData = await fetchUserCount();
      const productData = await fetchProductStats();
      const orderData = await fetchOrderStats();
      const revenueData = await fetchRevenue();
      const orderResponse = await fetchAllOrders();

      if (userData.success) setUserCount(userData.count);

      if (productData.success) {
        setLowStockProducts(productData.products);
        setProductCount(productData.count);
      }

      if (orderData.success) {
        setOrderStats(orderData.stats);
        setOrderCount(orderData.count);
      }

      if (revenueData.success) {
        setTotalRevenue(revenueData.totalRevenue);
        setMonthlyRevenue(revenueData.monthlyRevenue);
      }

      if (orderResponse.success) setOrders(orderResponse.orders.slice(0, 5));

      setIsLoading(false);
    };

    fetchData();
    console.log(orders);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen content-center">
        <Loading size={60} fullScreen={false} />
      </div>
    );
  }

  return (
    <div className="flex-1 md:p-10 p-4">
      <h2 className="pb-6 text-2xl font-semibold">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold text-blue-600">{productCount}</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold text-blue-600">{orderCount}</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold text-blue-600">{userCount}</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
          <p className="font-bold text-blue-600 text-xs md:text-sm lg:text-2xl">
            LKR {totalRevenue}
          </p>
        </div>
      </div>

      {/* Middle Section: Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <OrderStatusChart orderStats={orderStats} />
        <MonthlyRevenueChart monthlyRevenue={monthlyRevenue} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <li key={index}>
                  Order {order._id} — {order.status}
                </li>
              ))
            ) : (
              <li className="text-gray-400 italic">No recent orders</li>
            )}
          </ul>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-lg font-medium mb-4">Low Stock Products</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((product, index) => (
                <li>
                  {product.name.toUpperCase()} — {product.stock} left
                </li>
              ))
            ) : (
              <li className="text-gray-400 italic">No low stock products</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
