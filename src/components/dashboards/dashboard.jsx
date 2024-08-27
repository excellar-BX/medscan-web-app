// src/components/Dashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import flow from "../../assets/images/flow.png";
import details from "../../assets/images/details.png";
import recent from "../../assets/images/recent.png";

const data = [
  { name: "Jan", uv: 400, pnmv: 2400, amt: 2400 },
  { name: "Feb", uv: 300, pnmv: 1398, amt: 2210 },
  { name: "Mar", uv: 200, pnmv: 9800, amt: 2290 },
  { name: "Apr", uv: 278, pnmv: 3908, amt: 2000 },
];

const pieData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Dashboards = () => {
  const [salesTrend, setSalesTrend] = useState([]);
  const [marketShare, setMarketShare] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [userId, setUserId] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");
  const [error, setError] = useState("");

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
    <main className="flex-1 px-8 py-10 bg-gray-100 overflow-y-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Manufacturer Dashboard</h1>
        <p className="text-sm text-gray-600">15th of August, 2024</p>
      </header>
      <div className=" text-[#0084FC] font-bold text-xl leading-7 text-center mb-4">
        Overall Product Analysis
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow overflow-hidden">
          <LineChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            {/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
          </LineChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow overflow-hidden">
          <PieChart width={400} height={250}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            />
          </PieChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow overflow-hidden">
          <BarChart width={400} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pnmv" fill="#8884d8" />
          </BarChart>
        </div>
      </section>

      <section className="bg-[#d9d9d932] p-4 rounded my-5 relative w-full">
        <img src={flow} alt="bf" className="w-full  object-cover" />
      </section>

      <section className="bg-[#d9d9d932] p-4 rounded my-5 relative w-full">
        <img src={recent} alt="bf" className="w-full  object-cover" />
      </section>

      <section className="bg-[#d9d9d932] p-4 rounded my-5 relative w-full">
        <img src={details} alt="bf" className="w-full  object-cover" />
      </section>
    </main>
  );
};

export default Dashboards;
