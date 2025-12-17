import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [period, setPeriod] = useState('30');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/analytics/sales?period=${period}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnalytics(response.data.analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading analytics...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Sales Analytics</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
          <p className="text-2xl font-bold text-green-600">${analytics?.totalSales?.toFixed(2) || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold text-blue-600">{analytics?.totalOrders || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">New Users</h3>
          <p className="text-2xl font-bold text-purple-600">{analytics?.newUsers || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Avg Order Value</h3>
          <p className="text-2xl font-bold text-orange-600">
            ${analytics?.totalOrders ? (analytics.totalSales / analytics.totalOrders).toFixed(2) : 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {analytics?.topProducts?.map((product, index) => (
              <div key={product._id} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{index + 1}. {product.name}</span>
                  <p className="text-sm text-gray-500">Sold: {product.totalSold} units</p>
                </div>
                <span className="font-semibold text-green-600">${product.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {analytics?.paymentMethods?.map((method) => (
              <div key={method._id} className="flex justify-between items-center">
                <span className="capitalize">{method._id}</span>
                <span className="font-semibold">{method.count} orders</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Daily Sales</h3>
          <div className="space-y-2">
            {analytics?.dailySales?.map((day) => (
              <div key={day._id} className="flex justify-between items-center py-2 border-b">
                <span>{day._id}</span>
                <div className="text-right">
                  <div className="font-semibold">${day.sales.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">{day.orders} orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coupon Usage */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Top Coupons</h3>
          <div className="space-y-3">
            {analytics?.couponUsage?.map((coupon) => (
              <div key={coupon._id} className="flex justify-between items-center">
                <span className="font-medium">{coupon.code}</span>
                <span className="text-sm text-gray-500">Used {coupon.usedCount} times</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;