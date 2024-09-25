import { useState, useEffect } from "react";
import axios from "axios";
import {
  ComposedChart,
  PieChart,
  Pie,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [salesTrend, setSalesTrend] = useState([]);
  const [marketShare, setMarketShare] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [userId, setUserId] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");
  const [error, setError] = useState("");
  const { userRole } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [salesTrendRes, marketShareRes, topProductsRes] =
          await Promise.all([
            axios.get(
              "https://meds-scan-backend.onrender.com/api/dashboard/sales-trend",
              { headers }
            ),
            axios.get(
              "https://meds-scan-backend.onrender.com/api/dashboard/market-share",
              { headers }
            ),
            axios.get(
              "https://meds-scan-backend.onrender.com/api/dashboard/top-products",
              { headers }
            ),
          ]);

        console.log("Sales Trend Response:", salesTrendRes.data);
        console.log("Market Share Response:", marketShareRes.data);
        console.log("Top Products Response:", topProductsRes.data);

        // Format Sales Trend Data
        const formattedSalesTrend = salesTrendRes.data.salesTrend.map(
          (item) => ({
            date: item.day
              ? new Date(item.day).toLocaleDateString()
              : "Invalid Date",
            totalSales: item.sales || 0,
          })
        );

        // Format Market Share Data
        const formattedMarketShare = Object.keys(
          marketShareRes.data.marketShare
        ).map((key) => ({
          name: key,
          value: marketShareRes.data.marketShare[key] || 0,
        }));

        // Format Top Products Data
        const formattedTopProducts = topProductsRes.data.topProducts.map(
          (item) => ({
            name: item.productName || "Unknown",
            totalRevenue: item.sales || 0,
          })
        );

        setSalesTrend(formattedSalesTrend);
        setMarketShare(formattedMarketShare);
        setTopProducts(formattedTopProducts);
        setUserId(salesTrendRes.data.userId || "");
        setManufacturerId(marketShareRes.data.manufacturerId || "");
      } catch (error) {
        setError("Failed to fetch dashboard data. Please try again later.");
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white h-screen p-6">
        <nav className="space-y-4">
          <Link
            to="/"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="/allProducts"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            All Products
          </Link>
          <Link
            to="/addNewPro"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Add New Product
          </Link>
          <Link
            to="/track-products"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Track Products
          </Link>
          <Link
            to="/message"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Message
          </Link>
          <Link
            to="/profile"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Profile
          </Link>
          <Link
            to="/team"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Team Members
          </Link>
          <Link
            to="/support"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Support
          </Link>
          <Link
            to="/addStock"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Add Stock
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Manufacturer Dashboard</h1>
          <p className="text-sm text-gray-600">15th of August, 2024</p>
        </header>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
            <ComposedChart width={500} height={300} data={salesTrend}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSales" barSize={20} fill="#8884d8" />
            </ComposedChart>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Market Share</h3>
            <PieChart width={300} height={300}>
              <Pie
                data={marketShare}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Top Products</h3>
            <BarChart width={500} height={300} data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalRevenue" fill="#8884d8" />
            </BarChart>
          </div>
        </section>
      </main>
    </div>
  );
}