'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FiShoppingBag, FiUsers, FiRefreshCcw } from 'react-icons/fi';
import { getAuthToken } from '@/utils/auth';  // Add this import

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardPage() {
    //@ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getAuthToken();
        if (!token) return;

        const response = await fetch('/api/admin/auth/user', {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const salesData = {
    labels: ['03 Wed', '04 Thu', '05 Fri', '06 Sat', '07 Sun', '08 Mon', '09 Tue', '10 Wed', '11 Thu', '12 Fri', '13 Sat', '14 Sun', '15 Mon', '16 Tue'],
    datasets: [
      {
        label: 'Earnings',
        data: [30, 40, 45, 35, 40, 50, 55, 45, 35, 40, 45, 35, 45, 50],
        borderColor: 'rgb(75, 85, 99)',
        tension: 0.4,
      },
      {
        label: 'Costs',
        data: [20, 25, 30, 25, 30, 40, 35, 25, 30, 35, 30, 25, 30, 35],
        borderColor: 'rgb(209, 213, 219)',
        tension: 0.4,
      },
    ],
  };

  const categoryData = {
    labels: ['Electronics', 'Laptops', 'Phones'],
    datasets: [{
      data: [3000, 2000, 1200],
      backgroundColor: ['rgb(31, 41, 55)', 'rgb(107, 114, 128)', 'rgb(209, 213, 219)'],
    }],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Welcome back, {userData?.name || 'Admin'}
      </h1>
      
      <p className="text-gray-600">Here are today's stats from your online store!</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Sales Card */}
        <div className="bg-gray-800 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-800 rounded-lg">
              <FiShoppingBag size={24} />
            </div>
            <button className="text-sm">View all</button>
          </div>
          <h3 className="text-2xl font-bold mb-1">$9,328.55</h3>
          <p className="text-sm mb-2">731 Orders</p>
          <div className="flex items-center text-green-400">
            <span>+15.6%</span>
            <span className="ml-2">+1.4k this week</span>
          </div>
        </div>

        {/* Visitors Card */}
        <div className="bg-white p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FiUsers size={24} />
            </div>
            <button className="text-sm">View all</button>
          </div>
          <h3 className="text-2xl font-bold mb-1">12,302</h3>
          <p className="text-sm mb-2 text-gray-600">Avg. time: 4:30m</p>
          <div className="flex items-center text-green-600">
            <span>+12.7%</span>
            <span className="ml-2">+1.2k this week</span>
          </div>
        </div>

        {/* Refunds Card */}
        <div className="bg-white p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FiRefreshCcw size={24} />
            </div>
            <button className="text-sm">View all</button>
          </div>
          <h3 className="text-2xl font-bold mb-1">963</h3>
          <p className="text-sm mb-2 text-gray-600">2 Disputed</p>
          <div className="flex items-center text-red-600">
            <span>-12.7%</span>
            <span className="ml-2">-213</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Performance Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Sales Performance</h3>
            <div className="flex gap-4">
              <button className="text-sm">Export data</button>
              <select className="text-sm bg-transparent">
                <option>Last 14 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
          </div>
          <Line data={salesData} options={{ responsive: true }} />
        </div>

        {/* Top Categories */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-6">Top Categories</h3>
          <div className="relative">
            <Doughnut data={categoryData} options={{ responsive: true }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-2xl font-bold">$6.2k</div>
              <div className="text-sm text-gray-600">Total Sales</div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                <span>Electronics</span>
              </div>
              <span>$3,000</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span>Laptops</span>
              </div>
              <span>$2,000</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span>Phones</span>
              </div>
              <span>$1,200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}