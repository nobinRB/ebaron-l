'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiChevronDown, FiBox, FiMail, FiShoppingCart, FiUsers, FiSettings, 
  FiHelpCircle, FiPhoneCall, FiLogOut, FiPackage, FiBarChart2, FiStar, FiList, 
  FiDatabase, FiGrid, FiImage, FiMaximize2, FiRefreshCw, FiPieChart, FiTrendingUp, 
  FiDollarSign, FiPercent, FiEye, FiGlobe, FiEdit, FiBell } from 'react-icons/fi';
import { removeAuthToken, redirectToLogin } from '@/utils/auth';
import { getAuthToken } from '@/utils/auth';  // Add this import

// First, add isNotificationsOpen to the state declarations at the top
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ name: 'Admin User' });
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Add this effect after the checkAuth effect
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getAuthToken();
        if (!token) return;

        const response = await fetch('/api/admin/auth/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache'
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
  
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  // Update the profile section to use userData
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const checkAuth = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          redirectToLogin();
          return;
        }

        const response = await fetch('/api/admin/auth/check', {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache'
          }
        });
        
        const data = await response.json();
        if (!response.ok || !data.authenticated) {
          redirectToLogin();
          return;
        }
    
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        redirectToLogin();
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 30000);
    return () => clearInterval(interval);
  }, [isClient]);

  if (!isClient || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      removeAuthToken();
      redirectToLogin();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-900">
              {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <h1 className="text-xl font-semibold ml-4 text-gray-900">Redbaron</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search"
                className="bg-gray-100 px-4 py-2 rounded-lg w-64 text-gray-900"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <FiBell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2">
                  <div className="px-4 py-2 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <p className="text-sm">New order received</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <p className="text-sm">Product stock running low</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t">
                    <Link href="/admin/notifications" className="text-sm text-blue-600 hover:text-blue-800">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 text-gray-900"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random&size=32`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>{userData.name}</span>
                <FiChevronDown />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <Link href="/admin/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/" target="_blank" className="block px-4 py-2 hover:bg-gray-100">
                    Open Your Site
                  </Link>
                  <hr className="my-2" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-red-600"
                  >
                    <FiLogOut />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white shadow-sm w-64 pt-16 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="p-4 h-full flex flex-col">
          <div className="flex-1">
            <div className="space-y-2">
              {/* Remove the duplicate import statement and fix the JSX structure */}
              <div>
                <button
                  onClick={() => setIsOverviewOpen(!isOverviewOpen)}
                  className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 text-gray-900"
                >
                  <span>Overview</span>
                  <FiChevronDown className={`transform transition-transform ${isOverviewOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOverviewOpen && (
                  <div className="ml-4 space-y-2">
                    <Link href="/admin/dashboard" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Summary
                    </Link>
                    <Link href="/admin/dashboard/custom" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Custom view
                    </Link>
                  </div>
                )}
              </div>

                          
              {/* Orders Dropdown */}
              <div>
                <button
                  onClick={() => setIsOrdersOpen(!isOrdersOpen)}
                  className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    <FiShoppingCart />
                    <span>Orders</span>
                  </div>
                  <FiChevronDown className={`transform transition-transform ${isOrdersOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOrdersOpen && (
                  <div className="ml-4 space-y-2">
                    <Link href="/admin/orders/all" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      All Orders
                    </Link>
                    <Link href="/admin/orders/drafts" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Drafts
                    </Link>
                    <Link href="/admin/orders/abandoned" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Abandoned Checkouts
                    </Link>
                  </div>
                )}
              </div>
            
              {/* Products Dropdown */}
              <div>
                <button
                  onClick={() => {
setIsProductsOpen(!isProductsOpen)
                  }}
                  className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    <FiBox />
                    <span>Products</span>
                  </div>
                  <FiChevronDown className={`transform transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isProductsOpen && (
                  <div className="ml-4 space-y-2">
                    <Link href="/admin/products/all" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      All Products
                    </Link>
                    <Link href="/admin/products/inventory" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Inventory
                    </Link>
                    <Link href="/admin/products/collections" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Collections
                    </Link>
                    <Link href="/admin/products/watermark" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Watermark
                    </Link>
                    <Link href="/admin/products/size-charts" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Size Charts
                    </Link>
                    <Link href="/admin/products/bulk-update" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Bulk Update
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/admin/fulfillment" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-gray-900">
                <FiPackage />
                <span>Fulfillment</span>
              </Link>
            
              {/* Analytics Dropdown */}
              <div>
                <button
                  onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
                  className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    <FiBarChart2 />
                    <span>Analytics</span>
                  </div>
                  <FiChevronDown className={`transform transition-transform ${isAnalyticsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isAnalyticsOpen && (
                  <div className="ml-4 space-y-2">
                    <Link href="/admin/analytics/overview" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Overview
                    </Link>
                    <Link href="/admin/analytics/conversion" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Conversion Analytics
                    </Link>
                    <Link href="/admin/analytics/sales" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Sales Reports
                    </Link>
                    <Link href="/admin/analytics/taxes" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Taxes Reports
                    </Link>
                    <Link href="/admin/analytics/live" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Live View
                    </Link>
                    <Link href="/admin/analytics/traffic" className="block p-2 rounded hover:bg-gray-100 text-gray-900">
                      Traffic Sources
                    </Link>
                  </div>
                )}
              </div>
            
              <Link href="/admin/customers" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-gray-900">
                <FiUsers />
                <span>Customers</span>
              </Link>

              <Link href="/admin/reviews" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-gray-900">
                <FiStar />
                <span>Reviews</span>
              </Link>
            
              <Link href="/admin/messages" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-gray-900">
                <FiMail />
                <span>Email</span>
              </Link>
            
              <Link href="/admin/settings" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-gray-900">
                <FiSettings />
                <span>Settings</span>
              </Link>
            </div>
          </div>
          <div className="space-y-2 border-t pt-4">
            <Link href="/admin/help" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
              <FiHelpCircle />
              <span>Help</span>
            </Link>
            <Link href="/admin/contact" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
              <FiPhoneCall />
              <span>Contact us</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}