import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';
import './App.css';

function App() {
  const version = process.env.REACT_APP_VERSION || '1.0.0';
  const [salesData, setSalesData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Simulated sales data
    //..
    setSalesData([
      { month: 'Jan', sales: 4000, revenue: 2400 },
      { month: 'Feb', sales: 3000, revenue: 1398 },
      { month: 'Mar', sales: 2000, revenue: 9800 },
      { month: 'Apr', sales: 2780, revenue: 3908 },
      { month: 'May', sales: 1890, revenue: 4800 },
      { month: 'Jun', sales: 2390, revenue: 3800 },
    ]);

    setUserData([
      { name: 'New Users', value: 400 },
      { name: 'Active Users', value: 300 },
      { name: 'Inactive Users', value: 100 },
    ]);
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const stats = [
    { title: 'Total Revenue', value: '$45,231', icon: DollarSign, color: '#0088FE' },
    { title: 'Total Users', value: '1,234', icon: Users, color: '#00C49F' },
    { title: 'Total Orders', value: '679', icon: ShoppingCart, color: '#FFBB28' },
    { title: 'Growth Rate', value: '+23%', icon: TrendingUp, color: '#FF8042' },
  ];

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>Analytics Dashboard</h1>
          <div className="version-badge">v{version}</div>
        </div>
      </header>

      <main className="dashboard">
        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
              <div className="stat-icon" style={{ backgroundColor: stat.color + '20' }}>
                <stat.icon size={24} color={stat.color} />
              </div>
              <div className="stat-content">
                <p className="stat-title">{stat.title}</p>
                <h2 className="stat-value">{stat.value}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          {/* Line Chart */}
          <div className="chart-card">
            <h3>Sales & Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#0088FE" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="#00C49F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="chart-card">
            <h3>Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="chart-card">
            <h3>User Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Card */}
          <div className="chart-card activity-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <Activity size={16} color="#0088FE" />
                <span>New order received #1234</span>
              </div>
              <div className="activity-item">
                <Activity size={16} color="#00C49F" />
                <span>User John Doe registered</span>
              </div>
              <div className="activity-item">
                <Activity size={16} color="#FFBB28" />
                <span>Payment processed successfully</span>
              </div>
              <div className="activity-item">
                <Activity size={16} color="#FF8042" />
                <span>New product added to inventory</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Deployment Demo Dashboard • Environment: {process.env.NODE_ENV}</p>
      </footer>
    </div>
  );
}

export default App;
